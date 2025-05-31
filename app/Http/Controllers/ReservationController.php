<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Customer;
use App\Models\Reservation;
use App\Models\RestaurantTable;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Carbon\Carbon;

class ReservationController extends Controller
{
    public function index()
    {
        return Inertia::render('reservation');
    }

    public function getAvailableTimes(Request $request)
    {
        $request->validate([
            'date' => 'required|date_format:Y-m-d',
            'size' => 'required|integer|min:1|max:10',
        ]);

        $date = $request->input('date');
        $size = $request->input('size');
        $fixedSlots = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'];
        $availableSlots = [];

        foreach ($fixedSlots as $slot) {
            $dateTime = Carbon::createFromFormat('Y-m-d H:i', "$date $slot");

            // FIX: Clone the Carbon instance to avoid mutation issues in isTimeSlotAvailable
            if ($this->isTimeSlotAvailable($dateTime->copy(), $size)) {
                $availableSlots[] = $slot;
            }
        }

        return response()->json($availableSlots);
    }

    public function checkAvailability(Request $request)
    {
        $request->validate([
            'date_time' => 'required|date_format:Y-m-d H:i',
            'size' => 'required|integer|min:1|max:10',
        ]);

        $dateTime = Carbon::createFromFormat('Y-m-d H:i', $request->date_time);
        $size = $request->size;

        $isAvailable = $this->isTimeSlotAvailable($dateTime, $size);

        return response()->json(['available' => $isAvailable]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'date_time' => 'required|date_format:Y-m-d H:i',
            'size' => 'required|integer|min:1|max:10',
        ]);

        $user = auth()->user();

        $customer = Customer::create([
            'userID' => $user?->userID,
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
        ]);

        $dateTime = Carbon::createFromFormat('Y-m-d H:i', $request->date_time);

        $table = RestaurantTable::where('capacity', '>=', $request->size)
            ->where('table_status', 'available')
            ->orderBy('capacity', 'asc')
            ->get()
            ->filter(function ($table) use ($dateTime) {
                return !Reservation::where('tableID', $table->tableID)
                    ->where('date_time', '<', $dateTime->copy()->addMinutes(120))  // Slot end
                    ->whereRaw('DATE_ADD(date_time, INTERVAL duration MINUTE) > ?', [$dateTime]) // Slot start
                    ->exists();
            })
            ->first();

        if (!$table) {
            return back()->withErrors(['date_time' => 'No available tables for this time and party size.']);
        }

        $reservation = Reservation::create([
            'customerID' => $customer->customerID,
            'tableID' => $table->tableID,
            'date_time' => $dateTime,
            'size' => $request->size,
            'status' => 'pending',
            'duration' => 120,
        ]);

        return redirect()->route('checkout', ['reservationID' => $reservation->reservationID]);
    }

    private function isTimeSlotAvailable($dateTime, $guestCount)
    {
        $reservationEnd = $dateTime->copy()->addMinutes(120);

        return RestaurantTable::where('capacity', '>=', $guestCount)
            ->where('table_status', 'available')
            ->get()
            ->filter(function ($table) use ($dateTime, $reservationEnd) {
                return !Reservation::where('tableID', $table->tableID)
                    ->where('date_time', '<', $reservationEnd)  // Existing reservation starts before slot ends
                    ->whereRaw('DATE_ADD(date_time, INTERVAL duration MINUTE) > ?', [$dateTime])  // Existing reservation ends after slot starts
                    ->exists();
            })
            ->isNotEmpty();
    }
}
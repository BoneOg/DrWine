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
        $fixedSlots = [
            '09:00', // 9:00 AM
            '11:00', // 11:00 AM
            '13:00', // 1:00 PM
            '14:00', // 2:00 PM
            '15:00', // 3:00 PM
            '16:00', // 4:00 PM
            '17:00', // 5:00 PM
            '18:00', // 6:00 PM
            '19:00'  // 7:00 PM
        ];
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

        // Check if the requested time is in the past
        if ($dateTime <= now()) {
            return response()->json([
                'available' => false,
                'message' => 'Cannot book reservations in the past'
            ]);
        }

        // Check if it's one of our valid time slots
        $validTimeSlots = ['09:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
        if (!in_array($dateTime->format('H:i'), $validTimeSlots)) {
            return response()->json([
                'available' => false,
                'message' => 'Invalid time slot selected'
            ]);
        }

        $isAvailable = $this->isTimeSlotAvailable($dateTime, $size);

        return response()->json([
            'available' => $isAvailable,
            'message' => $isAvailable ? 'Time slot is available' : 'No tables available for this time slot'
        ]);
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

        $dateTime = Carbon::createFromFormat('Y-m-d H:i', $request->date_time);

        // Check if the requested time is in the past
        if ($dateTime <= now()) {
            return back()->withErrors(['date_time' => 'Cannot book reservations in the past']);
        }

        // Check if it's one of our valid time slots
        $validTimeSlots = ['09:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
        if (!in_array($dateTime->format('H:i'), $validTimeSlots)) {
            return back()->withErrors(['date_time' => 'Invalid time slot selected']);
        }

        // Check if the time slot is available
        if (!$this->isTimeSlotAvailable($dateTime, $request->size)) {
            return back()->withErrors(['date_time' => 'No available tables for this time and party size.']);
        }

        $user = auth()->user();

        $customer = Customer::create([
            'userID' => $user?->userID,
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
        ]);

        $table = RestaurantTable::where('capacity', '>=', $request->size)
            ->where('table_status', 'available')
            ->orderBy('capacity', 'asc')
            ->get()
            ->filter(function ($table) use ($dateTime) {
                return !Reservation::where('tableID', $table->tableID)
                    ->whereBetween('date_time', [
                        $dateTime,
                        $dateTime->copy()->addMinutes(120)
                    ])
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
            ->get();

        // If no tables can accommodate the party size, return false
        if ($availableTables->isEmpty()) {
            return false;
        }

        // Check each table for availability during the requested time slot
        foreach ($availableTables as $table) {
            // Check for any overlapping reservations
            $hasOverlap = Reservation::where('tableID', $table->tableID)
                ->where(function ($query) use ($dateTime, $reservationEnd) {
                    $query->where(function ($q) use ($dateTime, $reservationEnd) {
                        // Check if any existing reservation overlaps with the requested time
                        $q->where('date_time', '<', $reservationEnd)
                          ->whereRaw('DATE_ADD(date_time, INTERVAL duration MINUTE) > ?', [$dateTime]);
                    })
                    ->where('status', '!=', 'cancelled'); // Exclude cancelled reservations
                })
                ->exists();

            // If we found a table with no overlapping reservations, return true
            if (!$hasOverlap) {
                return true;
            }
        }

        // If we get here, no tables are available for the requested time
        return false;
    }
}

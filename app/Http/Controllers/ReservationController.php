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
        $date = $request->input('date');
        $fixedSlots = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'];

        $availableSlots = [];

        foreach ($fixedSlots as $slot) {
            $dateTime = Carbon::createFromFormat('Y-m-d H:i', "$date $slot");

            $availableTable = RestaurantTable::where('table_status', 'available')
                ->get()
                ->filter(function ($table) use ($dateTime) {
                    return !Reservation::where('tableID', $table->tableID)
                        ->whereBetween('date_time', [
                            $dateTime,
                            $dateTime->copy()->addMinutes(120)
                        ])
                        ->exists();
                })
                ->count();

            if ($availableTable > 0) {
                $availableSlots[] = $slot;
            }
        }

        return response()->json($availableSlots);
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

        // Determine if the request is from an authenticated user
        $user = auth()->user();

        $customer = Customer::create([
            'userID' => $user?->userID, // Set to null if guest
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
        ]);

        $dateTime = Carbon::createFromFormat('Y-m-d H:i', $request->date_time, config('app.timezone'));

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

    public function cancel(Request $request, $reservationID)
    {
        $reservation = Reservation::findOrFail($reservationID);
        
        // Check if the user has permission to cancel this reservation
        if (auth()->check()) {
            $customer = Customer::where('userID', auth()->id())->first();
            if ($reservation->customerID !== $customer->customerID) {
                return redirect()->route('reservation')->with('error', 'You are not authorized to cancel this reservation.');
            }
        }

        $reservation->status = 'cancelled';
        $reservation->save();

        return redirect()->route('reservation')->with('success', 'Reservation cancelled successfully');
    }
}

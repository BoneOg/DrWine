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

        $fixedSlots = [
            '09:00', '11:00', '13:00', '15:00', '17:00', '19:00',
        ];

        $existing = Reservation::whereDate('date_time', $date)
            ->whereIn('status', ['confirmed', 'completed'])
            ->pluck('date_time');

        $takenTimes = [];
        foreach ($existing as $res) {
            $time = Carbon::parse($res)->format('H:i');
            $takenTimes[] = $time;
        }

        $available = array_diff($fixedSlots, $takenTimes);
        return response()->json(array_values($available));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'date' => 'required|date',
            'time' => 'required',
            'size' => 'required|integer|min:1|max:10',
        ]);

        // Create guest user and customer
        $user = User::create([
            'username' => 'guest_' . uniqid(),
            'email' => $request->email,
            'password' => bcrypt('guest123'),
            'role' => 'guest',
        ]);

        $customer = Customer::create([
            'userID' => $user->userID,
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
        ]);

        $dateTime = Carbon::parse($request->date . ' ' . $request->time);

        // Find available table
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
            return back()->withErrors(['time' => 'No available tables for this time and party size.']);
        }

        // Create reservation
        Reservation::create([
            'customerID' => $customer->customerID,
            'tableID' => $table->tableID,
            'date_time' => $dateTime,
            'size' => $request->size,
            'status' => 'confirmed',
            'duration' => 120,
        ]);

       return Inertia::location('/checkout');
    }
}

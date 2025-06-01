<?php

namespace App\Http\Controllers; 

use Illuminate\Support\Facades\DB;
use App\Models\Reservation;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Customer;
use App\Models\RestaurantTable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class StaffController extends Controller
{
 
    public function dashboard(Request $request)
    {
        // 1. Determine selected date (default = today)
        $selectedDate = $request->query('date', now()->toDateString());

        // 2. Fetch all reservations for that date (eager‐load customer, table, transaction)
        $rawReservations = Reservation::with(['customer', 'table', 'transaction'])
            ->whereDate('date_time', $selectedDate)
            ->orderBy('date_time')
            ->get();

        // 3. Build reservationsForDate exactly as React expects:
        $reservationsForDate = $rawReservations->map(function ($res) {
            return [
                'id'            => $res->reservationID,
                // Format as "h:i A" → e.g. "03:00 PM"
                'time'          => Carbon::parse($res->date_time)->format('h:i A'),
                'customer_name' => $res->customer->name ?? 'N/A',
                'guest_count'   => $res->size,
                'table_number'  => $res->table?->table_number ?? 'N/A',
                // If there's a transaction, use that status; otherwise fallback to reservation.status
                'status'        => $res->transaction->status ?? $res->status,
            ];
        });

        // 4. Fetch every table (no "status" here)
        $tableOccupancy = RestaurantTable::all()->map(function ($tbl) {
            return [
                'id'           => $tbl->tableID,
                'table_number' => $tbl->table_number,
                'capacity'     => $tbl->capacity,
            ];
        });

        // 5. Return just the props we need:
        return Inertia::render('staff_side/staff_dashboard', [
            'selectedDate'        => $selectedDate,
            'reservationsForDate' => $reservationsForDate,
            'tableOccupancy'      => $tableOccupancy,
        ]);
    }

    public function booking()
    {
        $reservations = Reservation::with(['customer', 'table', 'transaction'])
            ->orderByDesc('created_at')
            ->get();

        $counts = [
            'pending' => Reservation::where('status', 'pending')->count(),
            'confirmed' => Reservation::where('status', 'confirmed')->count(),
            'cancelled' => Reservation::where('status', 'cancelled')->count(),
            'completed' => Reservation::where('status', 'completed')->count(),
        ];

        return Inertia::render('staff_side/staff_booking', [
            'reservations' => $reservations,
            'counts' => $counts,
        ]);
    }

    public function handleReservationAction(Request $request)
    {
        $request->validate([
            'reservationID' => 'required|exists:reservation,reservationID',
            'action' => 'required|in:confirm,cancel',
        ]);

        $reservation = Reservation::with('transaction')->findOrFail($request->reservationID);
        $transaction = $reservation->transaction;

        switch ($request->action) {
            case 'confirm':
                // Update reservation status to 'confirmed' if pending
                if ($reservation->status === 'pending') {
                    $reservation->status = 'confirmed';
                }

                // Update transaction status to 'completed' if currently 'confirmed'
                if ($transaction && $transaction->status === 'confirmed') {
                    $transaction->status = 'completed';
                    $transaction->save();
                }
                break;

            case 'cancel':
                // Update reservation status to 'cancelled'
                $reservation->status = 'cancelled';

                // Update transaction status to 'cancelled' if not failed/refunded
                if ($transaction && !in_array($transaction->status, ['failed', 'refunded'])) {
                    $transaction->status = 'cancelled';
                    $transaction->save();
                }
                break;
        }

        $reservation->save();

        return redirect()->back()->with('success', 'Status updated successfully.');
    }

    public function userlist()
        {
            $users = User::all(); 

        return Inertia::render('staff_side/staff_users', [
            'users' => $users,
        ]);
    }

   public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('staff.userlist')->with('success', 'User deleted successfully.');
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'username' => 'required|string|max:255|unique:users,username,' . $user->userID . ',userID',
            'email' => 'required|email|max:255|unique:users,email,' . $user->userID . ',userID',
            'role' => 'required|in:user,staff',
        ]);

        $user->update([
            'username' => $request->username,
            'email' => $request->email,
            'role' => $request->role,
        ]);

        return redirect()->back()->with('success', 'User updated successfully.');
    }

    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255|unique:users,username',
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:8',
            'role' => 'required|in:user,staff',
        ]);

        // Create user with all profile information
        User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
            'name' => $request->username, // Using username as initial name
            'phone' => null, // Initialize with null, user can update later
        ]);

        return redirect()->back()->with('success', 'User created successfully.');
    }

    public function updateProfile(Request $request)
    {
        $user = auth()->user();
        
        $validated = $request->validate([
            'username' => ['required', 'string', 'max:255', Rule::unique('users')->ignore($user->userID, 'userID')],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->userID, 'userID')],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'current_password' => ['nullable', 'string'],
            'new_password' => ['nullable', 'string', 'min:6', 'confirmed'],
        ]);

        // If current password is provided, verify it
        if ($request->filled('current_password')) {
            if (!Hash::check($validated['current_password'], $user->password)) {
                return back()->withErrors([
                    'current_password' => 'The provided password does not match your current password.'
                ]);
            }
        }

        // Update basic information
        $user->username = $validated['username'];
        $user->email = $validated['email'];
        $user->name = $validated['name'];
        $user->phone = $validated['phone'];

        // Update password if provided
        if ($request->filled('new_password')) {
            $user->password = Hash::make($validated['new_password']);
        }

        $user->save();

        return back()->with('success', 'Profile updated successfully');
    }

    public function createReservation(Request $request) 
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $date = $request->input('date'); 
        $time = $request->input('time'); 
        $guests = (int) $request->input('guests');

        $dateTimeStr = $date . ' ' . $time; 
        $requestedStart = Carbon::createFromFormat('Y-m-d H:i', $dateTimeStr);
        $requestedEnd = $requestedStart->copy()->addMinutes(120);
        $customer = Customer::where('email', $email)->orWhere('phone', $phone)->first();
        if (!$customer) {
            $customer = Customer::create([
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'userID' => null,
            ]);
        }

        $tables = RestaurantTable::where('capacity', '>=', $guests)
            ->orderBy('capacity')
            ->get();

        $availableTable = null;
        foreach ($tables as $table) {
            $conflicts = Reservation::where('tableID', $table->tableID)
                ->where('status', '!=', 'cancelled')
                ->where(function ($query) use ($requestedStart, $requestedEnd) {
                    $query->whereBetween('date_time', [$requestedStart, $requestedEnd])
                        ->orWhereRaw('DATE_ADD(date_time, INTERVAL duration MINUTE) > ?', [$requestedStart]);
                })
                ->count();

            if ($conflicts === 0) {
                $availableTable = $table;
                break;
            }
        }

        if (!$availableTable) {
            return response()->json(['error' => 'No available tables for this date/time/guest count'], 409);
        }

        $reservation = Reservation::create([
            'customerID' => $customer->customerID,
            'tableID' => $availableTable->tableID,
            'date_time' => $requestedStart,
            'size' => $guests,
            'status' => 'confirmed',
            'duration' => 120,
        ]);

        DB::table('transaction')->insert([
            'reservationID' => $reservation->reservationID,
            'status' => 'confirmed',
            'amount' => 20,
            'transaction_type' => 'reservation',
            'payment_method' => 'WalkIn',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->route('staff.booking')->with('success', 'Reservation created!');
    }

}
<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Customer;
use App\Models\Transaction; // make sure to import Transaction if you use it
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect('/login');
        }

        $customers = Customer::where('userID', $user->userID)->pluck('customerID');

        // Get all reservations for the user
        $reservations = Reservation::with(['customer', 'table', 'transaction'])
            ->whereIn('customerID', $customers)
            ->orderBy('date_time', 'desc')
            ->get()
            ->map(function ($reservation) {
                // Allow cancellation for pending and confirmed reservations
                $canCancel = in_array($reservation->status, ['pending', 'confirmed']) && 
                            // Only allow cancellation if the reservation date hasn't passed
                            $reservation->date_time > now();

                return [
                    'id' => $reservation->reservationID,
                    'date' => $reservation->date_time->format('Y-m-d'),
                    'time' => $reservation->date_time->format('g:i A'),
                    'size' => $reservation->size,
                    'status' => $reservation->status,
                    'table_id' => $reservation->tableID,
                    'table_name' => $reservation->table->name,
                    'table_number' => $reservation->table->table_number,
                    'can_cancel' => $canCancel,
                    'transaction' => $reservation->transaction ? [
                        'status' => $reservation->transaction->status,
                        'amount' => $reservation->transaction->amount,
                    ] : null,
                ];
            });

        $transactions = Transaction::with('reservation')
            ->whereHas('reservation', function ($query) use ($customers) {
                $query->whereIn('customerID', $customers);
            })
            ->get()
            ->map(function ($transaction) {
                return [
                    'transactionID' => $transaction->transactionID,
                    'amount' => $transaction->amount,
                    'transaction_type' => $transaction->transaction_type,
                    'status' => $transaction->status,
                    'created_at' => $transaction->created_at,
                    'reservation' => $transaction->reservation ? [
                        'date_time' => $transaction->reservation->date_time
                    ] : null
                ];
            });

        // Get customer info only if they have made reservations
        $primaryCustomer = Customer::where('userID', $user->userID)->first();

        return Inertia::render('user_side/user', [
            'user' => $user,
            'customer' => $primaryCustomer,
            'reservations' => $reservations,
            'transactions' => $transactions,
        ]);
    }

    public function viewReservation($reservationID)
    {
        $user = Auth::user();
        $customers = Customer::where('userID', $user->userID)->pluck('customerID');
        
        $reservation = Reservation::with(['customer', 'table', 'transaction'])
            ->whereIn('customerID', $customers)
            ->findOrFail($reservationID);

        return Inertia::render('user_side/reservation_details', [
            'reservation' => [
                'id' => $reservation->reservationID,
                'date' => $reservation->date_time->format('Y-m-d'),
                'time' => $reservation->date_time->format('g:i A'),
                'size' => $reservation->size,
                'status' => $reservation->status,
                'table' => $reservation->table->name,
                'transaction' => $reservation->transaction ? [
                    'status' => $reservation->transaction->status,
                    'amount' => $reservation->transaction->amount,
                ] : null,
            ]
        ]);
    }

    public function deleteAccount()
    {
        $user = Auth::user();

        // Delete user and related data as needed
        $user->delete();
        Inertia::clearHistory();

        Auth::logout();

        return Inertia::render('user_side/user_deleted', [
            'message' => 'Account Deleted Successfully.',
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'username' => ['required', 'string', 'max:255', Rule::unique('users', 'username')->ignore($user->userID, 'userID')],
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        // Update all fields in users table
        $user->update([
            'username' => $request->username,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);

        // If user has a customer record (has made reservations), update that too
        $customer = Customer::where('userID', $user->userID)->first();
        if ($customer) {
            $customer->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);
        }

        return back()->with('success', 'Profile updated successfully');
    }

}

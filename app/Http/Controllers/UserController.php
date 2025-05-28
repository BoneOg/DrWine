<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Customer;
use App\Models\Transaction; // make sure to import Transaction if you use it

class UserController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect('/login');
        }

        $customers = Customer::where('userID', $user->userID)->pluck('customerID');

        $transactions = Transaction::with('reservation')
            ->whereHas('reservation', function ($query) use ($customers) {
                $query->whereIn('customerID', $customers);
            })
            ->get();

        // Optionally show first customer info
        $primaryCustomer = Customer::where('userID', $user->userID)->first();

        return Inertia::render('user_side/user', [
            'user' => $user,
            'customer' => $primaryCustomer,
            'transactions' => $transactions,
        ]);
    }


    public function deleteAccount()
    {
        $user = Auth::user();

        // Delete user and related data as needed
        $user->delete();

        Auth::logout();

        return Inertia::render('user_side/user_deleted', [
            'message' => 'Account deleted successfully.',
        ]);
    }

}

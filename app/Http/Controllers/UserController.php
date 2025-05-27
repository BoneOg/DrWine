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

        $customer = Customer::where('userID', $user->userID)->first();

        $transactions = [];

        if ($customer) {
            $transactions = Transaction::with('reservation')
                ->whereHas('reservation.customer', function ($q) use ($customer) {
                    $q->where('customerID', $customer->customerID);
                })->get();
        }

        return Inertia::render('user_side/user', [
            'user' => $user,
            'customer' => $customer,
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

    public function logout()
    {
        Auth::logout();
        return redirect('/login');
    }
}

<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Customer;
use App\Models\Transaction; // make sure to import Transaction if you use it
use Illuminate\Http\Request;

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
        Inertia::clearHistory();

        Auth::logout();

        return Inertia::render('user_side/user_deleted', [
            'message' => 'Account deleted successfully.',
        ]);
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        $user = Auth::user();
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

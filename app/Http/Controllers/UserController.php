<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Customer;
use App\Models\Transaction; // make sure to import Transaction if you use it
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

        $transactions = Transaction::with('reservation')
            ->whereHas('reservation', function ($query) use ($customers) {
                $query->whereIn('customerID', $customers);
            })
            ->get();

        // Get customer info only if they have made reservations
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

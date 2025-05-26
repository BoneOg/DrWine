<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Customer;
use App\Models\Transaction;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|confirmed|min:6',
        ]);

        // Try to find a guest user (case-insensitive match for email)
        $user = User::whereRaw('LOWER(email) = ?', [strtolower($validated['email'])])
                    ->where('role', 'guest')
                    ->first();

        if ($user) {
            // ✅ Update guest to registered user
            $user->username = $validated['username'];
            $user->password = Hash::make($validated['password']);
            $user->role = 'user';
            $user->save();

            // ✅ Also update the related customer to reflect the same userID
            if ($user->customer) {
                $user->customer->userID = $user->userID;
                $user->customer->save();
            }

        } else {
            // Check if email or username is already used by a non-guest
            if (User::where('email', $validated['email'])->where('role', '!=', 'guest')->exists()) {
                return back()->withErrors(['email' => 'The email is already taken.']);
            }

            if (User::where('username', $validated['username'])->exists()) {
                return back()->withErrors(['username' => 'The username is already taken.']);
            }

            // ✅ Create a new user
            User::create([
                'username' => $validated['username'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => 'user',
            ]);
        }

        return redirect('/login')->with('success', 'Account created successfully!');
    }


    public function login(Request $request)
    {
        $credentials = $request->only('usernameOrEmail', 'password');

        $loginField = filter_var($credentials['usernameOrEmail'], FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        if (Auth::attempt([$loginField => $credentials['usernameOrEmail'], 'password' => $credentials['password']])) {
            $user = Auth::user();
            $user->load(['customer.reservation.transaction']);

            if ($user->role === 'admin') {
                return redirect()->route('admin.dashboard');
            } elseif ($user->role === 'user') {
                return redirect()->route('user.dashboard');
            } else {
                return redirect()->route('menu');
            }
        }

        return back()->withErrors([
            'usernameOrEmail' => 'Invalid credentials.',
        ]);
    }

    public function userDashboard()
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

    public function deleteAccount(Request $request)
    {
        $user = Auth::user();

        // Optionally delete related customer/reservation/transaction records
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

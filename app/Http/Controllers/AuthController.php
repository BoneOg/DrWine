<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
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

        // Try to find a guest account
        $user = User::where('email', $validated['email'])->where('role', 'guest')->first();

        if ($user) {
            // Update guest to user
            $user->username = $validated['username'];
            $user->password = Hash::make($validated['password']);
            $user->role = 'user';
            $user->save();
        } else {
            // Register new user
            // Check for email or username conflicts not tied to guest
            if (User::where('email', $validated['email'])->where('role', '!=', 'guest')->exists()) {
                return back()->withErrors(['email' => 'The email is already taken.']);
            }
            if (User::where('username', $validated['username'])->exists()) {
                return back()->withErrors(['username' => 'The username is already taken.']);
            }

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

        $user->load([
            'customer.reservation.transaction'
        ]);

        return Inertia::render('user_side/user', [
            'user' => $user
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/login');
    }
}

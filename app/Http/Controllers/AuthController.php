<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:users,username',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|confirmed|min:6',
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        // Create user with all profile information
        $user = User::create([
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'user',
            'name' => $validated['name'],
            'phone' => $validated['phone'],
        ]);

        // Create customer record
        Customer::create([
            'userID' => $user->userID,
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
        ]);

        return redirect('/login')->with('success', 'Account created successfully!');
    }
    
    public function login(Request $request)
    {
        $credentials = $request->only('usernameOrEmail', 'password');

        $loginField = filter_var($credentials['usernameOrEmail'], FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        if (Auth::attempt([$loginField => $credentials['usernameOrEmail'], 'password' => $credentials['password']])) {
            $user = Auth::user();

            if ($user->role === 'admin') {
                return Inertia::location(route('admin.dashboard'));
            } elseif ($user->role === 'user') {
                return Inertia::location(route('user.dashboard'));
            } else {
                return Inertia::location(route('menu'));
            }
        }

        return back()->withErrors([
            'usernameOrEmail' => 'Invalid credentials.',
        ]);
    }

    public function logout(Request $request)
    {
        
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();
        Inertia::clearHistory();

        return redirect('/login');
    }
}
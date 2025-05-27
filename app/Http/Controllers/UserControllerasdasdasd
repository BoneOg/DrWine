<?php

namespace App\Http\Controllers\Admin; // This namespace matches the folder path

use App\Http\Controllers\Controller; // Always include this
use App\Models\User; // To interact with the User model
use Illuminate\Http\Request;
use Inertia\Inertia; // For rendering React components
use Illuminate\Support\Facades\Hash; // For hashing passwords
use Illuminate\Validation\Rule; // For validation rules like 'in' or 'unique'

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $query = User::query();

        // --- Search Logic ---
        if ($request->has('search') && $request->input('search') != '') {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%') // Search by new 'name' column
                  ->orWhere('username', 'like', '%' . $search . '%') // Also search by 'username'
                  ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        // --- Sort Logic ---
        $sortBy = $request->input('sort_by', 'username'); // **CHANGE DEFAULT SORT TO 'username'**
        $sortOrder = $request->input('sort_order', 'asc');

        // Validate allowed sort columns to prevent SQL injection
        // **ADD 'username' to allowed sorts**
        $allowedSorts = ['id', 'name', 'username', 'email', 'created_at', 'role'];
        if (!in_array($sortBy, $allowedSorts)) {
            $sortBy = 'username'; // Fallback if invalid sort_by is provided
        }
        if (!in_array($sortOrder, ['asc', 'desc'])) {
            $sortOrder = 'asc'; // Fallback if invalid sort_order is provided
        }

        $query->orderBy($sortBy, $sortOrder);

        $users = $query->paginate(10);

        return Inertia::render('admin_side/users/Index', [
            'users' => $users->toArray(),
            'filters' => $request->only(['search', 'sort_by', 'sort_order']),
        ]);
    }

    // ... (rest of your UserController methods) ...

    /**
     * Store a newly created user in storage.
     * This method handles the POST request from the user creation form.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['nullable', 'string', 'max:255'], // Made nullable if you prefer username
            'username' => ['required', 'string', 'max:255', 'unique:users'], // Assuming you have a username field in your form
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required', 'string', Rule::in(['user', 'admin'])],
        ]);

        User::create([
            'name' => $request->name, // Will be null if not provided, or value if provided
            'username' => $request->username, // Make sure your create form sends this
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

    // ... (rest of your UserController methods) ...
}
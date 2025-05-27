<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UserController; // Make sure this is present and correct

// Public Pages
Route::get('/', fn () => Inertia::render('Welcome'));
Route::inertia('/menu', 'menu')->name('menu');
Route::inertia('/contact', 'contact')->name('contact');
Route::inertia('/about', 'about')->name('about');

// Auth Pages
Route::inertia('/login', 'login')->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');

Route::inertia('/register', 'register')->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.submit');

// Reservation
Route::get('/reservation', [ReservationController::class, 'index'])->name('reservation');
Route::post('/reservation', [ReservationController::class, 'store']);
Route::post('/reservation/available-times', [ReservationController::class, 'getAvailableTimes']);
Route::delete('/reservation/{reservationID}/cancel', [ReservationController::class, 'cancel']);
Route::put('/reservation/{reservationID}/complete', [ReservationController::class, 'markAsCompleted'])->name('reservation.complete');

// Checkout
Route::get('/checkout/{reservationID}', [CheckoutController::class, 'index'])->name('checkout');

// Transactions
Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
Route::get('/transactions/{transaction}', [TransactionController::class, 'show'])->name('transactions.show');

// Authenticated Routes (for all authenticated users)
Route::middleware('auth')->group(function () {

    // User Dashboard (for regular users)
    Route::get('/user', [AuthController::class, 'userDashboard'])->name('user.dashboard');
    Route::delete('/user/delete', [AuthController::class, 'deleteAccount'])->name('user.delete');

    // **ADMINISTRATOR ROUTES GROUP**
    // This group applies 'auth' and 'admin' middleware, sets '/admin' URL prefix, and 'admin.' name prefix
    Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
        // Admin Dashboard
        Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard'); // Becomes /admin, named admin.dashboard

        // Booking Management
        Route::get('/booking', [AdminController::class, 'booking'])->name('booking'); // Becomes /admin/booking, named admin.booking
        Route::post('/reservation-action', [AdminController::class, 'handleReservationAction'])->name('reservation-action');

        // **User Management (ADD THESE ROUTES)**
        Route::get('/users', [UserController::class, 'index'])->name('users.index');         // URL: /admin/users, Name: admin.users.index
        Route::get('/users/create', [UserController::class, 'create'])->name('users.create'); // URL: /admin/users/create, Name: admin.users.create
        Route::post('/users', [UserController::class, 'store'])->name('users.store');         // URL: POST /admin/users, Name: admin.users.store
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy'); // URL: DELETE /admin/users/{id}, Name: admin.users.destroy
    });

}); // Closes the main 'auth' middleware group

// Fallback route for 404
Route::fallback(fn () => Inertia::render('notfound'));
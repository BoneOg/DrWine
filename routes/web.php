<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;


// Public Pages
Route::get('/', fn () => Inertia::render('Welcome'));
Route::inertia('/menu', 'menu')->name('menu');
Route::inertia('/contact', 'contact')->name('contact');
Route::inertia('/about', 'about')->name('about');

// Guest-only (auth pages)
Route::middleware('guest')->group(function () {
    Route::inertia('/login', 'login')->name('login');
    Route::post('/login', [AuthController::class, 'login']);

    Route::inertia('/register', 'register')->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.submit');
});

// Shared Reservation Routes (can be public or protected depending on your use case)
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

// Authenticated Routes
Route::middleware('auth')->group(function () {
    // Logout for all authenticated users
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // USER-only routes
    Route::middleware('role:user')->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('user.dashboard');
        Route::delete('/user/delete', [UserController::class, 'deleteAccount'])->name('user.delete');
    });

    // ADMIN-only routes
    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::get('/booking', [AdminController::class, 'booking'])->name('booking'); 
        Route::post('/reservation-action', [AdminController::class, 'handleReservationAction'])->name('reservation-action');
        Route::get('/admin_users', [AdminController::class, 'userlist'])->name('userlist'); 
    });
});

// Fallback
Route::fallback(fn () => Inertia::render('notfound'));
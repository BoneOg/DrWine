<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

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

// Authenticated Routes
Route::middleware('auth')->group(function () {

    // User Dashboard
    Route::get('/user', [AuthController::class, 'userDashboard'])->name('user.dashboard');
    Route::delete('/user/delete', [AuthController::class, 'deleteAccount'])->name('user.delete')->middleware('auth');

    // Admin Dashboard
    Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/booking', [AdminController::class, 'booking'])->name('admin.booking');

});

// Fallback route for 404
Route::fallback(fn () => Inertia::render('notfound'));

<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\TransactionController;

// Public pages
Route::get('/', fn () => Inertia::render('Welcome'));
Route::inertia('/menu', 'menu')->name('menu');
Route::inertia('/contact', 'contact')->name('contact');
Route::inertia('/about', 'about')->name('about');
Route::inertia('/login', 'login')->name('login');

// Reservation routes
Route::get('/reservation', [ReservationController::class, 'index'])->name('reservation');
Route::post('/reservation', [ReservationController::class, 'store']);
Route::post('/reservation/available-times', [ReservationController::class, 'getAvailableTimes']);
Route::delete('/reservation/{reservationID}/cancel', [ReservationController::class, 'cancel']);
Route::put('/reservation/{reservationID}/complete', [ReservationController::class, 'markAsCompleted'])->name('reservation.complete');

// Checkout route
Route::get('/checkout/{reservationID}', [CheckoutController::class, 'index'])->name('checkout');

// Transaction routes
Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
Route::get('/transactions/{transaction}', [TransactionController::class, 'show'])->name('transactions.show');

// Fallback route
Route::fallback(fn () => Inertia::render('notfound'));

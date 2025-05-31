<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StaffController;


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

Route::get('/reservation', [ReservationController::class, 'index'])->name('reservation');
Route::post('/reservation', [ReservationController::class, 'store'])->name('reservation.store');
Route::post('/reservation/available-times', [ReservationController::class, 'getAvailableTimes'])->name('reservation.times');
Route::post('/reservation/check', [ReservationController::class, 'checkAvailability'])->name('reservation.check');
Route::delete('/reservation/{reservationID}/cancel', [CheckoutController::class, 'cancel'])->name('reservation.cancel');

Route::get('/checkout/{reservationID}', [CheckoutController::class, 'index'])->name('checkout');

Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
Route::get('/transactions/{transaction}', [TransactionController::class, 'show'])->name('transactions.show');


Route::middleware('auth')->group(function () {
    // Logout for all authenticated users
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // USER-only routes
    Route::middleware('role:user')->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('user.dashboard');
        Route::post('/users/delete-account', [UserController::class, 'deleteAccount'])->name('user.delete');
        Route::post('/user/profile/update', [UserController::class, 'updateProfile'])->name('user.profile.update');
        Route::get('/user/reservations/{reservationID}', [UserController::class, 'viewReservation'])->name('user.reservation.view');
        Route::delete('/user/reservations/{reservationID}/cancel', [CheckoutController::class, 'cancel'])->name('user.reservation.cancel');
    });

    // ADMIN-only routes
    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::get('/booking', [AdminController::class, 'booking'])->name('booking'); 
        Route::post('/reservations/action', [AdminController::class, 'handleReservationAction'])->name('reservation-action');
        Route::get('/users', [AdminController::class, 'userlist'])->name('userlist'); 
        Route::delete('/users/{user}', [AdminController::class, 'destroy'])->name('admin.users.destroy');
        Route::put('/users/{user}', [AdminController::class, 'update'])->name('users.update');
        Route::post('/users', [AdminController::class, 'store'])->name('users.store');
        Route::post('/profile/update', [AdminController::class, 'updateProfile'])->name('profile.update');
    });

    // Staff routes
    Route::middleware('role:staff')->prefix('staff')->name('staff.')->group(function () {
        Route::get('/', [StaffController::class, 'dashboard'])->name('dashboard');
        Route::get('/booking', [StaffController::class, 'booking'])->name('booking');
        Route::post('/reservations/action', [StaffController::class, 'handleReservationAction'])->name('reservation-action');
        Route::post('/profile/update', [StaffController::class, 'updateProfile'])->name('profile.update');
    });

});

// Fallback
Route::fallback(fn () => Inertia::render('notfound'));
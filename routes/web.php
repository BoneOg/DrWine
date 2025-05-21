<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\CheckoutController;


Route::get('/', function () {return Inertia::render('Welcome');});
Route::inertia('/menu', 'menu')->name('menu');
Route::inertia('/contact', 'contact')->name('contact');
Route::inertia('/about', 'about')->name('about');
Route::inertia('/login', 'login')->name('login');

Route::get('/reservation', [ReservationController::class, 'index'])->name('reservation');
Route::post('/reservation', [ReservationController::class, 'store']);
Route::post('/reservation/available-times', [ReservationController::class, 'getAvailableTimes']);
Route::get('/checkout', function () {return Inertia::render('checkout');})->name('checkout');



Route::fallback(function () {return inertia('notfound');});


<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {return Inertia::render('welcome');});
Route::inertia('/reservation', 'reservation')->name('reservation');
Route::inertia('/menu', 'menu')->name('menu');
Route::inertia('/contact', 'contact')->name('contact');
Route::inertia('/about', 'about')->name('about');
Route::inertia('/login', 'login')->name('login');


Route::fallback(function () {return inertia('notfound');});


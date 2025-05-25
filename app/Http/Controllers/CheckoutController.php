<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index($reservationID)
    {
        $reservation = Reservation::with(['customer', 'table'])->findOrFail($reservationID);

        return Inertia::render('checkout', [
            'reservation' => $reservation->load('customer'),
        ]);
    }
}
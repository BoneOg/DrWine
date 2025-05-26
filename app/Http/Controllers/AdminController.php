<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Transaction;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function booking()
    {
        // Eager load customer, table, transaction
        $reservations = Reservation::with(['customer', 'table', 'transaction'])->get();

        // Count by statuses
        $counts = [
            'pending' => Reservation::where('status', 'pending')->count(),
            'confirmed' => Transaction::where('status', 'confirmed')->count(),
            'cancelled' => Transaction::where('status', 'cancelled')->count(),
            'completed' => Transaction::where('status', 'completed')->count(),
        ];

        return Inertia::render('admin_side/booking', [
            'reservations' => $reservations,
            'counts' => $counts,
        ]);
    }
}

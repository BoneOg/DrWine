<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the list of bookings for admin.
     */
    public function booking()
    {
        $reservations = Reservation::with(['customer', 'table', 'transaction'])
            ->orderByDesc('created_at')
            ->get();

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

    public function handleReservationAction(Request $request)
    {
        $request->validate([
            'reservationID' => 'required|exists:reservation,reservationID',
            'action' => 'required|in:confirm,cancel',
        ]);

        $reservation = Reservation::with('transaction')->findOrFail($request->reservationID);
        $transaction = $reservation->transaction;

        if (!$transaction) {
            return response()->json(['success' => false, 'message' => 'No transaction found for this reservation.'], 404);
        }

        switch ($request->action) {
            case 'confirm':
                // If already confirmed, mark as completed
                $transaction->status = $transaction->status === 'confirmed' ? 'completed' : 'confirmed';
                break;

            case 'cancel':
                $transaction->status = 'cancelled';
                break;
        }

        $transaction->save();

        return redirect()->back()->with('success', 'Transaction status updated successfully.');
    }
}

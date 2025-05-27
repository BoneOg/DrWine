<?php

namespace App\Http\Controllers\Admin; 

use App\Http\Controllers\Controller; 
use App\Models\Reservation;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function dashboard()
    {
        // Counts from the 'reservation' table's status
        $totalPendingReservations = Reservation::where('status', 'pending')->count();
        $totalConfirmedReservations = Reservation::where('status', 'confirmed')->count();
        $totalCancelledReservations = Reservation::where('status', 'cancelled')->count();
        $totalCompletedReservations = Reservation::where('status', 'completed')->count();

        // Counts from the 'transaction' table's status
        $totalPendingTransactions = Transaction::where('status', 'pending_payment')->count();
        $totalPaidTransactions = Transaction::where('status', 'paid')->count();
        $totalFailedTransactions = Transaction::where('status', 'failed')->count();
        $totalRefundedTransactions = Transaction::where('status', 'refunded')->count();

        // IMPORTANT CHANGE HERE: Render 'admin_side/Dashboard' (note capital D)
        return Inertia::render('admin_side/Dashboard', [
            'totalPendingReservations' => $totalPendingReservations,
            'totalConfirmedReservations' => $totalConfirmedReservations,
            'totalCancelledReservations' => $totalCancelledReservations,
            'totalCompletedReservations' => $totalCompletedReservations,
            'totalPendingTransactions' => $totalPendingTransactions,
            'totalPaidTransactions' => $totalPaidTransactions,
            'totalFailedTransactions' => $totalFailedTransactions,
            'totalRefundedTransactions' => $totalRefundedTransactions,
        ]);
    }

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
            'confirmed' => Reservation::where('status', 'confirmed')->count(),
            'cancelled' => Reservation::where('status', 'cancelled')->count(),
            'completed' => Reservation::where('status', 'completed')->count(),
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

        switch ($request->action) {
            case 'confirm':
                $reservation->status = ($reservation->status === 'confirmed') ? 'completed' : 'confirmed';

                if ($transaction) {
                    if ($transaction->status === 'pending_payment') {
                        $transaction->status = 'paid';
                        $transaction->save();
                    }
                }
                break;

            case 'cancel':
                $reservation->status = 'cancelled';

                if ($transaction && $transaction->status !== 'failed' && $transaction->status !== 'refunded') {
                    $transaction->status = 'cancelled';
                    $transaction->save();
                }
                break;
        }

        $reservation->save();

        return redirect()->back()->with('success', 'Status updated successfully.');
    }
}
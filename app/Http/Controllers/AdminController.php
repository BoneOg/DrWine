<?php

namespace App\Http\Controllers; 

use App\Models\Reservation;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
 
    public function dashboard()
    {
        $totalPendingReservations = Reservation::where('status', 'pending')->count();
        $totalConfirmedReservations = Reservation::where('status', 'confirmed')->count();
        $totalCancelledReservations = Reservation::where('status', 'cancelled')->count();
        $totalCompletedReservations = Reservation::where('status', 'completed')->count();

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

    public function userlist(Request $request)
    {
        $query = User::query();

        // --- Search Logic ---
        if ($request->has('search') && $request->input('search') != '') {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%') // Search by new 'name' column
                  ->orWhere('username', 'like', '%' . $search . '%') // Also search by 'username'
                  ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        // --- Sort Logic ---
        $sortBy = $request->input('sort_by', 'username'); // **CHANGE DEFAULT SORT TO 'username'**
        $sortOrder = $request->input('sort_order', 'asc');

        // Validate allowed sort columns to prevent SQL injection
        // **ADD 'username' to allowed sorts**
        $allowedSorts = ['id', 'name', 'username', 'email', 'created_at', 'role'];
        if (!in_array($sortBy, $allowedSorts)) {
            $sortBy = 'username'; // Fallback if invalid sort_by is provided
        }
        if (!in_array($sortOrder, ['asc', 'desc'])) {
            $sortOrder = 'asc'; // Fallback if invalid sort_order is provided
        }

        $query->orderBy($sortBy, $sortOrder);

        $users = $query->paginate(10);

        return Inertia::render('admin_side/admin_users', [
            'users' => $users->toArray(),
            'filters' => $request->only(['search', 'sort_by', 'sort_order']),
        ]);
    }
}
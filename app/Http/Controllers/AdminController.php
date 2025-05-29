<?php

namespace App\Http\Controllers; 

use App\Models\Reservation;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
 
    public function dashboard()
    {
        $totalPendingReservations = Reservation::where('status', 'pending')->count();
        $totalConfirmedReservations = Transaction::where('status', 'confirmed')->count();
        $totalCancelledReservations = Transaction::where('status', 'cancelled')->count();
        $totalCompletedReservations = Transaction::where('status', 'completed')->count();

        // IMPORTANT CHANGE HERE: Render 'admin_side/Dashboard' (note capital D)
        return Inertia::render('admin_side/admin_dashboard', [
            'totalPendingReservations' => $totalPendingReservations,
            'totalConfirmedReservations' => $totalConfirmedReservations,
            'totalCancelledReservations' => $totalCancelledReservations,
            'totalCompletedReservations' => $totalCompletedReservations,
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

        return Inertia::render('admin_side/admin_booking', [
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
                // Update reservation status to 'confirmed' if pending
                if ($reservation->status === 'pending') {
                    $reservation->status = 'confirmed';
                }

                // Update transaction status to 'completed' if currently 'confirmed'
                if ($transaction && $transaction->status === 'confirmed') {
                    $transaction->status = 'completed';
                    $transaction->save();
                }
                break;

            case 'cancel':
                // Update reservation status to 'cancelled'
                $reservation->status = 'cancelled';

                // Update transaction status to 'cancelled' if not failed/refunded
                if ($transaction && !in_array($transaction->status, ['failed', 'refunded'])) {
                    $transaction->status = 'cancelled';
                    $transaction->save();
                }
                break;
        }

        $reservation->save();

        return redirect()->back()->with('success', 'Status updated successfully.');
    }

    public function userlist()
        {
            $users = User::all(); 

        return Inertia::render('admin_side/admin_users', [
            'users' => $users,
        ]);
    }

   public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.userlist')->with('success', 'User deleted successfully.');
    }

}
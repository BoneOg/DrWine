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

    public function cancel(Request $request, $reservationID)
    {
        $reservation = Reservation::with(['customer', 'transaction'])->findOrFail($reservationID);

        // Check authorization
        if (auth()->check()) {
            $customer = $reservation->customer;
            if ($customer->userID && $customer->userID !== auth()->id()) {
                return redirect()->back()->with('error', 'You are not authorized to cancel this reservation.');
            }
        }

        // If there's no transaction, just delete the reservation
        if (!$reservation->transaction) {
            // Delete the customer record if it was created just for this reservation
            $customer = $reservation->customer;
            $reservation->delete();
            
            if ($customer && !$customer->userID) {
                $customer->delete();
            }

            return redirect()->route('reservation')->with('success', 'Reservation cancelled successfully');
        }

        // For reservations with transactions, handle as before
        if ($reservation->transaction->status === 'cancelled') {
            return redirect()->back()->with('error', 'This reservation is already cancelled.');
        }

        if (in_array($reservation->transaction->status, ['completed', 'confirmed'])) {
            return redirect()->back()->with('error', 'Cannot cancel a paid reservation. Please contact support.');
        }

        // Cancel both the reservation and its pending transaction
        $reservation->status = 'cancelled';
        $reservation->save();

        if ($reservation->transaction->status === 'pending') {
            $reservation->transaction->status = 'cancelled';
            $reservation->transaction->save();
        }

        return redirect()->route('reservation')->with('success', 'Reservation cancelled successfully');
    }
}
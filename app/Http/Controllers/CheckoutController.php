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

        // Check if reservation date has passed
        if ($reservation->date_time <= now()) {
            return redirect()->back()->with('error', 'Cannot cancel past reservations.');
        }

        // Check if reservation status is valid for cancellation
        if (!in_array($reservation->status, ['pending', 'confirmed'])) {
            return redirect()->back()->with('error', 'This reservation cannot be cancelled.');
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

        // Cancel both the reservation and its transaction
        $reservation->status = 'cancelled';
        $reservation->save();

        // Update the transaction status to cancelled
        $reservation->transaction->status = 'cancelled';
        $reservation->transaction->save();

        return redirect()->route('reservation')->with('success', 'Reservation cancelled successfully. If you made a payment, it will be refunded according to our refund policy.');
    }
}
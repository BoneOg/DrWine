<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\Transaction;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index(Request $request, $reservationID)
    {
        $token = $request->query('token');

        $reservation = Reservation::with(['customer', 'table'])
            ->where('reservationID', $reservationID)
            ->where('token', $token)
            ->where('status', 'pending')
            ->firstOrFail();

        return Inertia::render('checkout', ['reservation' => $reservation->load('customer')]);
    }

    public function cancel(Request $request, $reservationID)
    {
        $reservation = Reservation::with(['customer', 'transaction'])->findOrFail($reservationID);

        if (auth()->check()) {
            $customer = $reservation->customer;
            if ($customer->userID && $customer->userID !== auth()->id()) {
                return redirect()->back()->with('error', 'You are not authorized to cancel this reservation.');
            }
        }

        if ($reservation->date_time <= now()) {
            return redirect()->back()->with('error', 'Cannot cancel past reservations.');
        }

        if (!in_array($reservation->status, ['pending', 'confirmed'])) {
            return redirect()->back()->with('error', 'This reservation cannot be cancelled.');
        }

        if (!$reservation->transaction) {
            $customer = $reservation->customer;
            $reservation->delete();
            if ($customer && !$customer->userID) {
                $customer->delete();
            }
            return redirect()->route('reservation')->with('success', 'Reservation cancelled successfully');
        }

        $reservation->status = 'cancelled';
        $reservation->save();

        $reservation->transaction->status = 'cancelled';
        $reservation->transaction->save();

        return redirect()->route('reservation')->with('success', 'Reservation cancelled successfully. If you made a payment, it will be refunded according to our refund policy.');
    }

    public function processPayment(Request $request, $reservationID)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric',
            'transaction_type' => 'required|in:reservation,food',
            'payment_method' => 'required|in:GCash,Mastercard,Visa,PayMaya,PayPal',
        ]);

        $reservation = Reservation::findOrFail($reservationID);

        if ($reservation->status === 'cancelled') {
            return redirect()->back()->withErrors(['reservation' => 'Cannot proceed with cancelled reservation.']);
        }

        $transactionData = [
            'reservationID' => $reservationID,
            'amount' => $validated['amount'],
            'transaction_type' => $validated['transaction_type'],
            'payment_method' => $validated['payment_method'],
            'status' => 'confirmed',
        ];

        $transaction = Transaction::create($transactionData);

        $reservation->update([
            'status' => 'confirmed',
            'token' => null,
        ]);

        return redirect()->route('transactions.show', ['transaction' => $transaction->transactionID]);
    }
}

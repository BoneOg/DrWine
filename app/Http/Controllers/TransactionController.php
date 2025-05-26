<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'reservationID' => 'required|exists:reservation,reservationID',
            'amount' => 'required|numeric',
            'transaction_type' => 'required|in:reservation,food',
            'payment_method' => 'required|in:GCash,Mastercard,Visa,PayMaya,PayPal',
        ]);

        $reservation = \App\Models\Reservation::findOrFail($request->reservationID);
        if ($reservation->status === 'cancelled') {
            return redirect()->back()->withErrors(['reservation' => 'Cannot proceed with cancelled reservation.']);
        }

        // ✅ Add default 'status' to transaction
        $validated['status'] = 'confirmed';

        $transaction = Transaction::create($validated);
        $transaction->load('reservation.customer');

        // ✅ Update reservation status to confirmed after successful transaction
        $reservation->update(['status' => 'confirmed']);

        return Inertia::render('transaction', [
            'transaction' => $transaction,
        ]);
    }

    public function show(Transaction $transaction)
    {
        $transaction->load('reservation.customer');

        return Inertia::render('transaction', [
            'transaction' => $transaction,
        ]);
    }
}

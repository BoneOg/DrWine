<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transaction';

    protected $primaryKey = 'transactionID';

    protected $fillable = [
        'reservationID',
        'amount',
        'transaction_type',
        'payment_method',
        'status', // This confirms 'status' is intended to be on the transaction table
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class, 'reservationID', 'reservationID');
    }
}
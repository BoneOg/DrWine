<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'transaction'; // Explicitly specify table name

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'transactionID'; // Define primary key name

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'reservationID',    // Foreign key to reservation
        'amount',           // Transaction amount
        'transaction_type', // Type of transaction (reservation, food)
        'payment_method',   // Payment method (cash, card)
        // 'created_at' and 'updated_at' are handled automatically by default timestamps
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        // No specific casts needed if created_at is handled by Eloquent timestamps and other fields are strings/integers
    ];

    // Define Relationship: A Transaction belongs to one Reservation
    public function reservation()
    {
        return $this->belongsTo(Reservation::class, 'reservationID', 'reservationID');
        // 'reservationID' is the FK in the 'transaction' table
        // 'reservationID' is the PK in the 'reservation' table
    }
}
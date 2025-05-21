<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'reservation'; // Explicitly specify table name

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'reservationID'; // Define primary key name

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'customerID',      // Foreign key to customer
        'tableID',         // Foreign key to table
        'date_time',       // Date and time of reservation
        'size',            // Number of people
        'status',          // Status of reservation (confirmed, cancelled, completed)
        'preorder_food',   // Boolean for food preorder
        'duration',        // Duration of reservation in minutes
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_time' => 'datetime',
        'preorder_food' => 'boolean',
    ];

    // Define Relationship: A Reservation belongs to one Customer
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customerID', 'customerID');
        // 'customerID' is the FK in the 'reservation' table
        // 'customerID' is the PK in the 'customer' table
    }

    // Define Relationship: A Reservation belongs to one Table
    public function table()
    {
        return $this->belongsTo(Table::class, 'tableID', 'tableID');
        // 'tableId' is the FK in the 'reservation' table
        // 'tableId' is the PK in the 'table' table
    }

    // Define Relationship: A Reservation has one Transaction (for payment)
    public function transaction()
    {
        return $this->hasOne(Transaction::class, 'reservationID', 'reservationID');
        // 'reservationID' is the FK in the 'transaction' table
        // 'reservationID' is the PK in the 'reservation' table
    }

    // If you later add a 'preorder' table with reservationID as a foreign key (as per your schema, but not yet defined):
    // public function preorders()
    // {
    //     return $this->hasMany(Preorder::class, 'reservationID', 'reservationID');
    // }
}
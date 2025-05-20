<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'customer'; // Explicitly specify table name

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'customerID'; // Define primary key name

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'fname', // First name
        'lname', // Last name
        'phone', // Phone number
        'email', // Email
        'user_id', // Optional link to User ID
    ];

    // Define Relationship: A Customer can have many Reservations
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'customerID', 'customerID'); // 'customerID' is the FK in 'reservation', 'customerID' is the PK in 'customer'
    }

    // Define Relationship: A Customer might belong to a User (if they registered)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'userID'); // 'user_id' is the FK in 'customer', 'userID' is the PK in 'users'
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $table = 'customer';

    protected $primaryKey = 'customerID';

    protected $fillable = [
        'name',
        'phone',     // Phone number
        'email',     // Email
        'userID',    // Correct foreign key to User (use 'userID' to match DB column)
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'customerID', 'customerID');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'userID', 'userID'); 
        // FK in customer table is 'userID', PK in users table is 'userID'
    }
}

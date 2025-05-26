<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $table = 'reservation';

    protected $primaryKey = 'reservationID';

    protected $fillable = [
        'customerID',
        'tableID',
        'date_time',
        'size',
        'status',
        'preorder_food',
        'duration',
    ];

    protected $casts = [
        'date_time' => 'datetime',
        'preorder_food' => 'boolean',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customerID', 'customerID');
    }

    public function table()
    {
        return $this->belongsTo(RestaurantTable::class, 'tableID', 'tableID');
    }

    public function transaction()
    {
        return $this->hasMany(Transaction::class, 'reservationID', 'reservationID');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RestaurantTable extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'restaurant_tables'; // Modified: Changed 'table' to 'restaurant_tables'

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'tableId'; // Define primary key name

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'table_number', // Table number
        'capacity',     // Capacity of the table
    ];

    // Define Relationship: A Table can have many Reservations
    public function reservations()
    {
        // Modified: Changed 'table' to 'restaurant_tables' in the relationship definition to match the actual table name
        return $this->hasMany(Reservation::class, 'tableId', 'tableId');
    }
}
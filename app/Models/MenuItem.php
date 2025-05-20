<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'menu_item'; // Explicitly specify table name

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'menu_itemId'; // Define primary key name

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'menuId',      // Foreign key to menu
        'name',        // Item name
        'description', // Item description
        'price',       // Item price
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2', // Cast price to a decimal with 2 decimal places
    ];

    // Define Relationship: A Menu Item belongs to one Menu
    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menuId', 'menuId');
        // 'menuId' is the FK in the 'menu_item' table
        // 'menuId' is the PK in the 'menu' table
    }

    // If you re-add a 'preorder' table later with menu_itemId as a foreign key:
    // public function preorders()
    // {
    //     return $this->hasMany(Preorder::class, 'menu_itemId', 'menu_itemId');
    // }
}
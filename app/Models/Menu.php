<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'menu'; // Explicitly specify table name

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'menuId'; // Define primary key name

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',        // Menu name
        'description', // Menu description
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        // No specific casts needed for name and description
    ];

    // Define Relationship: A Menu can have many Menu Items
    public function menuItems()
    {
        return $this->hasMany(MenuItem::class, 'menuId', 'menuId');
        // 'menuId' is the FK in the 'menu_item' table
        // 'menuId' is the PK in the 'menu' table
    }
}
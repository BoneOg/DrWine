<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users'; // Explicitly specify table name, though it's often the default

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'userID'; // Define primary key name

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username', // Username for login
        'password',
        'role', // Role (admin or user)
        'email', // If you added email to users
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed', // Laravel 10+ automatically hashes passwords
    ];

    // Define Relationship: A User can be linked to many Customer records
    public function customers()
    {
        // A User can have many Customer profiles associated with them (if user_id in customer table is foreign key)
        return $this->hasMany(Customer::class, 'user_id', 'userID'); // 'user_id' is the FK in the 'customer' table, 'userID' is the PK in 'users'
    }
}
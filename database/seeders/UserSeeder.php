<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User; 
use Illuminate\Support\Facades\Hash; 

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => 'admin',
            'password' => Hash::make('123123'), // Always hash passwords for security!
            'role' => 'admin',
            'email' => 'admin@example.com', // Add if you have an email field
            'email_verified_at' => now(), // Optional: Set a timestamp if you want
            // Add any other fields you have in your users table here
        ]);

        User::create([
            'username' => 'user',
            'password' => Hash::make('123123'),
            'role' => 'user',
            'email' => 'user@example.com', // Add if you have an email field
            'email_verified_at' => now(),
        ]);

        // You can add more users here
    }
}
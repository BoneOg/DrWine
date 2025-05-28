<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{

    public function run(): void
    {
        $admin = User::create([
            'username' => 'admin',
            'password' => Hash::make('123123'),
            'role' => 'admin',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
        ]);

        Customer::create([
            'userID' => $admin->userID, 
            'name' => 'adminhere',
            'phone' => '123123',
            'email' => $admin->email,
        ]);

        $user = User::create([
            'username' => 'user',
            'password' => Hash::make('123123'),
            'role' => 'user',
            'email' => 'user@example.com',
            'email_verified_at' => now(),
        ]);

        Customer::create([
            'userID' => $user->userID,
            'name' => 'userhere',
            'phone' => '123123',
            'email' => $user->email,
        ]);
    }
}

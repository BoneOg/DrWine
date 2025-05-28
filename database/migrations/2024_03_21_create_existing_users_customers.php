<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\Customer;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create customer records for any existing users that don't have them
        $users = User::whereNotIn('userID', function($query) {
            $query->select('userID')->from('customer')->whereNotNull('userID');
        })->get();

        foreach ($users as $user) {
            Customer::create([
                'userID' => $user->userID,
                'name' => null,
                'phone' => null,
                'email' => $user->email
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No need to reverse this migration as it just creates missing records
    }
}; 
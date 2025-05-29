<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ReservationTransactionSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();

        // Assuming customers and tables exist
        $customerIDs = DB::table('customer')->pluck('customerID')->toArray();
        $tableIDs = DB::table('restaurant_tables')->pluck('tableID')->toArray();

        // Fixed time slots (24-hour format)
        $timeSlots = [
            '09:00:00',
            '11:00:00',
            '13:00:00',
            '15:00:00',
            '17:00:00',
            '19:00:00',
            '21:00:00',
        ];

        // Random date between June 1-7, 2025 with random fixed time slot
        $randomDateTime = function () use ($timeSlots) {
            $day = rand(1, 7);
            $date = Carbon::create(2025, 6, $day);

            // Pick a random time slot
            $time = $timeSlots[array_rand($timeSlots)];

            // Combine date + time and return full datetime
            return Carbon::parse($date->toDateString() . ' ' . $time);
        };

        // Helper to create a confirmed reservation
        $createConfirmedReservation = function () use (&$customerIDs, &$tableIDs, $randomDateTime, $now) {
            return DB::table('reservation')->insertGetId([
                'customerID' => $customerIDs[array_rand($customerIDs)],
                'tableID' => $tableIDs[array_rand($tableIDs)],
                'date_time' => $randomDateTime(),
                'size' => rand(1, 6),
                'status' => 'confirmed',
                'duration' => 120,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        };

        // 1) Create 6 confirmed reservations + completed transactions
        for ($i = 0; $i < 6; $i++) {
            $reservationID = $createConfirmedReservation();
            DB::table('transaction')->insert([
                'reservationID' => $reservationID,
                'status' => 'completed',
                'amount' => rand(1000, 5000),
                'transaction_type' => 'reservation',
                'payment_method' => 'Visa',
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // 2) Create 4 confirmed reservations + confirmed transactions
        for ($i = 0; $i < 4; $i++) {
            $reservationID = $createConfirmedReservation();
            DB::table('transaction')->insert([
                'reservationID' => $reservationID,
                'status' => 'confirmed',
                'amount' => rand(1000, 5000),
                'transaction_type' => 'reservation',
                'payment_method' => 'Mastercard',
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // 3) Create 2 confirmed reservations + cancelled transactions
        for ($i = 0; $i < 2; $i++) {
            $reservationID = $createConfirmedReservation();
            DB::table('transaction')->insert([
                'reservationID' => $reservationID,
                'status' => 'cancelled',
                'amount' => rand(1000, 5000),
                'transaction_type' => 'reservation',
                'payment_method' => 'GCash',
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // 4) Create 2 pending reservations with NO transactions
        for ($i = 0; $i < 2; $i++) {
            DB::table('reservation')->insert([
                'customerID' => $customerIDs[array_rand($customerIDs)],
                'tableID' => $tableIDs[array_rand($tableIDs)],
                'date_time' => $randomDateTime(),
                'size' => rand(1, 6),
                'status' => 'pending',
                'duration' => 120,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }
}

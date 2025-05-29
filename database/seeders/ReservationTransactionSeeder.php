<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Faker\Factory as Faker;

class ReservationTransactionSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $now = Carbon::now();

        // Create 6 fake customers
        $customerIDs = [];
        for ($i = 0; $i < 6; $i++) {
            $customerIDs[] = DB::table('customer')->insertGetId([
                'name' => Str::limit($faker->name, 20),
                'email' => Str::limit($faker->unique()->safeEmail, 20),
                'phone' => $faker->numerify('09#########'),
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // Get first 6 tables (assuming IDs 1 to 6 exist)
        $tableIDs = range(1, 6);

        // Fixed 6 reservations on June 1 at 11:00 using different payment methods
        $fixedDateTime = Carbon::create(2025, 6, 1, 11, 0, 0);
        $paymentMethods = ['GCash', 'Mastercard', 'Visa', 'Paypal', 'Paymaya'];

        foreach ($tableIDs as $i => $tableID) {
            $reservationID = DB::table('reservation')->insertGetId([
                'customerID' => $customerIDs[$i],
                'tableID' => $tableID,
                'date_time' => $fixedDateTime,
                'size' => rand(1, 6),
                'status' => 'confirmed',
                'duration' => 120,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::table('transaction')->insert([
                'reservationID' => $reservationID,
                'status' => 'completed',
                'amount' => rand(1000, 5000),
                'transaction_type' => 'reservation',
                'payment_method' => $paymentMethods[$i] ?? $paymentMethods[array_rand($paymentMethods)],
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // Remaining random data generation
        $allCustomerIDs = DB::table('customer')->pluck('customerID')->toArray();
        $allTableIDs = DB::table('restaurant_tables')->pluck('tableID')->toArray();

        $timeSlots = [
            '09:00:00', '11:00:00', '13:00:00',
            '15:00:00', '17:00:00', '19:00:00', '21:00:00',
        ];

        $randomDateTime = function () use ($timeSlots) {
            $day = rand(1, 7);
            $date = Carbon::create(2025, 6, $day);
            $time = $timeSlots[array_rand($timeSlots)];
            return Carbon::parse($date->toDateString() . ' ' . $time);
        };

        $createConfirmedReservation = function () use (&$allCustomerIDs, &$allTableIDs, $randomDateTime, $now) {
            return DB::table('reservation')->insertGetId([
                'customerID' => $allCustomerIDs[array_rand($allCustomerIDs)],
                'tableID' => $allTableIDs[array_rand($allTableIDs)],
                'date_time' => $randomDateTime(),
                'size' => rand(1, 6),
                'status' => 'confirmed',
                'duration' => 120,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        };

        // 1) 6 more confirmed + completed transactions
        for ($i = 0; $i < 6; $i++) {
            $reservationID = $createConfirmedReservation();
            DB::table('transaction')->insert([
                'reservationID' => $reservationID,
                'status' => 'completed',
                'amount' => rand(1000, 5000),
                'transaction_type' => 'reservation',
                'payment_method' => $paymentMethods[array_rand($paymentMethods)],
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // 2) 4 confirmed + confirmed transactions
        for ($i = 0; $i < 4; $i++) {
            $reservationID = $createConfirmedReservation();
            DB::table('transaction')->insert([
                'reservationID' => $reservationID,
                'status' => 'confirmed',
                'amount' => rand(1000, 5000),
                'transaction_type' => 'reservation',
                'payment_method' => $paymentMethods[array_rand($paymentMethods)],
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // 3) 2 confirmed + cancelled transactions
        for ($i = 0; $i < 2; $i++) {
            $reservationID = $createConfirmedReservation();
            DB::table('transaction')->insert([
                'reservationID' => $reservationID,
                'status' => 'cancelled',
                'amount' => rand(1000, 5000),
                'transaction_type' => 'reservation',
                'payment_method' => $paymentMethods[array_rand($paymentMethods)],
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // 4) 2 pending reservations (no transaction)
        for ($i = 0; $i < 2; $i++) {
            DB::table('reservation')->insert([
                'customerID' => $allCustomerIDs[array_rand($allCustomerIDs)],
                'tableID' => $allTableIDs[array_rand($allTableIDs)],
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

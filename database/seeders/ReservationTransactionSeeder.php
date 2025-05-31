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

        // Create 12 fake customers (6 fixed + 6 random)
        $customerIDs = [];
        for ($i = 0; $i < 12; $i++) {
            $customerIDs[] = DB::table('customer')->insertGetId([
                'name' => substr($faker->name, 0, 30),
                'email' => Str::limit($faker->unique()->safeEmail, 20),
                'phone' => $faker->numerify('09#########'),
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // Fixed reservations settings
        $fixedDateTime = Carbon::create(2025, 6, 1, 15, 0, 0);
        $paymentMethods = ['GCash', 'Mastercard', 'Visa', 'Paypal', 'Paymaya', 'GCash']; // 6 methods (repeat GCash to fill 6)
        $fixedTableIDs = range(1, 6);

        // Create 6 fixed confirmed + completed reservations on June 1 11:00, occupying tables 1-6
        for ($i = 0; $i < 6; $i++) {
            $reservationID = DB::table('reservation')->insertGetId([
                'customerID' => $customerIDs[$i],
                'tableID' => $fixedTableIDs[$i],
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
                'amount' => 20,
                'transaction_type' => 'reservation',
                'payment_method' => $paymentMethods[$i],
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // Fetch all customers and tables again (includes the 12 created)
        $allCustomerIDs = DB::table('customer')->pluck('customerID')->toArray();
        $allTableIDs = DB::table('restaurant_tables')->pluck('tableID')->toArray();

        // Random time slots for first week of June
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

        // Create helper for confirmed reservations with transaction
        $createReservationWithTransaction = function ($status, $paymentMethod, $customerIDs, $allTableIDs, $randomDateTime, $now) {
            $reservationID = DB::table('reservation')->insertGetId([
                'customerID' => $customerIDs[array_rand($customerIDs)],
                'tableID' => $allTableIDs[array_rand($allTableIDs)],
                'date_time' => $randomDateTime(),
                'size' => rand(1, 6),
                'status' => 'confirmed',
                'duration' => 120,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
            DB::table('transaction')->insert([
                'reservationID' => $reservationID,
                'status' => $status,
                'amount' => 20,
                'transaction_type' => 'reservation',
                'payment_method' => $paymentMethod,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        };

        // 2 pending reservations (no transaction)
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

        // 2 confirmed + confirmed transactions (use random payment methods)
        for ($i = 0; $i < 2; $i++) {
            $createReservationWithTransaction('confirmed', $paymentMethods[array_rand($paymentMethods)], $allCustomerIDs, $allTableIDs, $randomDateTime, $now);
        }

        // 2 confirmed + completed transactions (use random payment methods)
        for ($i = 0; $i < 2; $i++) {
            $createReservationWithTransaction('completed', $paymentMethods[array_rand($paymentMethods)], $allCustomerIDs, $allTableIDs, $randomDateTime, $now);
        }
    }
}

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

        $tableCapacities = DB::table('restaurant_tables')
            ->orderBy('capacity')
            ->get()
            ->mapWithKeys(fn($t) => [$t->tableID => $t->capacity]);

        // Predefined customers
        $customers = [
            ['name' => 'Alice Smith', 'email' => 'alice@example.com', 'phone' => '09123456780'],
            ['name' => 'Bob Jones', 'email' => 'bob@example.com', 'phone' => '09123456781'],
            ['name' => 'Carol White', 'email' => 'carol@example.com', 'phone' => '09123456782'],
            ['name' => 'David Brown', 'email' => 'david@example.com', 'phone' => '09123456783'],
            ['name' => 'Eva Green', 'email' => 'eva@example.com', 'phone' => '09123456784'],
            ['name' => 'Frank Black', 'email' => 'frank@example.com', 'phone' => '09123456785'],
            ['name' => 'Grace Lee', 'email' => 'grace@example.com', 'phone' => '09123456786'],
            ['name' => 'Henry Kim', 'email' => 'henry@example.com', 'phone' => '09123456787'],
            ['name' => 'Ivy Chen', 'email' => 'ivy@example.com', 'phone' => '09123456788'],
            ['name' => 'Jack Lim', 'email' => 'jack@example.com', 'phone' => '09123456789'],
            ['name' => 'Kate Tan', 'email' => 'kate@example.com', 'phone' => '09123456790'],
            ['name' => 'Leo Cruz', 'email' => 'leo@example.com', 'phone' => '09123456791'],
        ];

        $customerIDs = [];
        foreach ($customers as $c) {
            $customerIDs[] = DB::table('customer')->insertGetId([
                'name'       => $c['name'],
                'email'      => $c['email'],
                'phone'      => $c['phone'],
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        $paymentMethods = ['GCash', 'Mastercard', 'Visa', 'Paypal', 'Paymaya'];

        // Existing 6 completed reservations (unchanged)
        $completedTime = Carbon::create(2025, 6, 1, 15, 0, 0);
        $sizesCompleted = [2, 2, 4, 4, 6, 8];
        $usedTableIDs = [1, 2, 3, 4, 5, 6];

        for ($i = 0; $i < 6; $i++) {
            $reservationID = DB::table('reservation')->insertGetId([
                'customerID' => $customerIDs[$i],
                'tableID'    => $usedTableIDs[$i],
                'date_time'  => $completedTime,
                'size'       => $sizesCompleted[$i],
                'status'     => 'confirmed',
                'duration'   => 120,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::table('transaction')->insert([
                'reservationID'    => $reservationID,
                'status'           => 'completed',
                'amount'           => 20,
                'transaction_type' => 'reservation',
                'payment_method'   => $paymentMethods[$i % count($paymentMethods)],
                'created_at'       => $now,
                'updated_at'       => $now,
            ]);
        }

        // Confirmed reservations with 'confirmed' transaction status
        $confirmedTimes = [
            Carbon::create(2025, 6, 3, 17, 0, 0),
            Carbon::create(2025, 6, 3, 17, 0, 0),
            Carbon::create(2025, 6, 3, 9, 0, 0),
            Carbon::create(2025, 6, 3, 9, 0, 0),
        ];

        for ($i = 0; $i < 4; $i++) {
            $reservationID = DB::table('reservation')->insertGetId([
                'customerID' => $customerIDs[6 + $i],
                'tableID'    => $usedTableIDs[$i], // reuse some tables
                'date_time'  => $confirmedTimes[$i],
                'size'       => 2,
                'status'     => 'confirmed',
                'duration'   => 120,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::table('transaction')->insert([
                'reservationID'    => $reservationID,
                'status'           => 'confirmed',
                'amount'           => 20,
                'transaction_type' => 'reservation',
                'payment_method'   => $paymentMethods[$i % count($paymentMethods)],
                'created_at'       => $now,
                'updated_at'       => $now,
            ]);
        }

        // 2 cancelled reservations with cancelled transactions
        $cancelledTime = Carbon::create(2025, 6, 3, 19, 0, 0);

        for ($i = 0; $i < 2; $i++) {
            $reservationID = DB::table('reservation')->insertGetId([
                'customerID' => $customerIDs[10 + $i],
                'tableID'    => $usedTableIDs[$i],
                'date_time'  => $cancelledTime,
                'size'       => 2,
                'status'     => 'cancelled',
                'duration'   => 120,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::table('transaction')->insert([
                'reservationID'    => $reservationID,
                'status'           => 'cancelled',
                'amount'           => 20,
                'transaction_type' => 'reservation',
                'payment_method'   => $paymentMethods[$i % count($paymentMethods)],
                'created_at'       => $now,
                'updated_at'       => $now,
            ]);
        }

        // 2 pending reservations without transactions
        $pendingTime = Carbon::create(2025, 6, 3, 21, 0, 0);

        for ($i = 0; $i < 2; $i++) {
            DB::table('reservation')->insert([
                'customerID' => $customerIDs[$i],
                'tableID'    => $usedTableIDs[$i],
                'date_time'  => $pendingTime,
                'size'       => 2,
                'status'     => 'pending',
                'duration'   => 120,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // --- NEW: Add 6 new customers and confirmed reservations at 3:00 PM ---
        $newCustomers = [
            ['name' => 'Mila Reyes', 'email' => 'mila@example.com', 'phone' => '09123456792'],
            ['name' => 'Nico Santos', 'email' => 'nico@example.com', 'phone' => '09123456793'],
            ['name' => 'Olga Dela Cruz', 'email' => 'olga@example.com', 'phone' => '09123456794'],
            ['name' => 'Paul Navarro', 'email' => 'paul@example.com', 'phone' => '09123456795'],
            ['name' => 'Queenie Ramos', 'email' => 'queenie@example.com', 'phone' => '09123456796'],
            ['name' => 'Ralph Go', 'email' => 'ralph@example.com', 'phone' => '09123456797'],
        ];

        $guestSizes = [2, 2, 4, 5, 6, 8]; // guest group sizes for new reservations
        $newCustomerIDs = [];

        foreach ($newCustomers as $nc) {
            $newCustomerIDs[] = DB::table('customer')->insertGetId([
                'name'       => $nc['name'],
                'email'      => $nc['email'],
                'phone'      => $nc['phone'],
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        $takenTableIDs = [];

        foreach ($guestSizes as $index => $size) {
            // Find the smallest available table that fits the size and is not taken
            foreach ($tableCapacities as $tableID => $capacity) {
                if ($capacity >= $size && !in_array($tableID, $takenTableIDs)) {
                    $reservationID = DB::table('reservation')->insertGetId([
                        'customerID' => $newCustomerIDs[$index],
                        'tableID'    => $tableID,
                        'date_time'  => $completedTime, // June 3, 2025, 3:00 PM
                        'size'       => $size,
                        'status'     => 'confirmed',
                        'duration'   => 120,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]);

                    DB::table('transaction')->insert([
                        'reservationID'    => $reservationID,
                        'status'           => 'confirmed',
                        'amount'           => 20,
                        'transaction_type' => 'reservation',
                        'payment_method'   => $paymentMethods[$index % count($paymentMethods)],
                        'created_at'       => $now,
                        'updated_at'       => $now,
                    ]);

                    $takenTableIDs[] = $tableID;
                    break; // stop searching tables for this guest
                }
            }
        }
    }
}

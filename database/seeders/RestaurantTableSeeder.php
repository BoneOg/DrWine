<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RestaurantTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('restaurant_tables')->insert([
            [
                'table_number' => 1,
                'capacity' => 2,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'table_number' => 2,
                'capacity' => 2,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'table_number' => 3,
                'capacity' => 4,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'table_number' => 4,
                'capacity' => 6,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'table_number' => 5,
                'capacity' => 8,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'table_number' => 6,
                'capacity' => 10,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}

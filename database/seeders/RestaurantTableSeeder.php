<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RestaurantTable; // Import your Table model (or RestaurantTable if that's what you named it)

class RestaurantTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RestaurantTable::create([
            'table_number' => 1,
            'capacity' => 2,
        ]);

        RestaurantTable::create([
            'table_number' => 2,
            'capacity' => 4,
        ]);

        RestaurantTable::create([
            'table_number' => 3,
            'capacity' => 6,
        ]);

        // Add more tables as needed
    }
}
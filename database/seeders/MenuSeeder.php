<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu; // Import your Menu model

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Menu::create([
            'name' => 'Breakfast Menu',
            'description' => 'Delicious breakfast options to start your day.',
        ]);

        Menu::create([
            'name' => 'Lunch Menu',
            'description' => 'A selection of light and hearty lunch dishes.',
        ]);

        Menu::create([
            'name' => 'Dinner Menu',
            'description' => 'Exquisite dinner entrees and specials.',
        ]);

        // Add more menus if applicable
    }
}
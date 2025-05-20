<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu; // Import your Menu model
use App\Models\MenuItem; // Import your MenuItem model

class MenuItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get sample menu IDs, or create them if none exists yet
        $breakfastMenu = Menu::where('name', 'Breakfast Menu')->first();
        if (!$breakfastMenu) {
            $breakfastMenu = Menu::create(['name' => 'Breakfast Menu', 'description' => 'Daily breakfast delights.']);
        }

        $lunchMenu = Menu::where('name', 'Lunch Menu')->first();
        if (!$lunchMenu) {
            $lunchMenu = Menu::create(['name' => 'Lunch Menu', 'description' => 'Midday meals.']);
        }

        $dinnerMenu = Menu::where('name', 'Dinner Menu')->first();
        if (!$dinnerMenu) {
            $dinnerMenu = Menu::create(['name' => 'Dinner Menu', 'description' => 'Evening culinary experience.']);
        }

        // Add Menu Items for Breakfast
        MenuItem::create([
            'menuId' => $breakfastMenu->menuId,
            'name' => 'Pancakes',
            'description' => 'Fluffy pancakes with syrup.',
            'price' => 8.99,
        ]);
        MenuItem::create([
            'menuId' => $breakfastMenu->menuId,
            'name' => 'Omelette',
            'description' => 'Customizable omelette with your choice of fillings.',
            'price' => 9.50,
        ]);

        // Add Menu Items for Lunch
        MenuItem::create([
            'menuId' => $lunchMenu->menuId,
            'name' => 'Club Sandwich',
            'description' => 'Classic club sandwich with fries.',
            'price' => 12.00,
        ]);

        // Add Menu Items for Dinner
        MenuItem::create([
            'menuId' => $dinnerMenu->menuId,
            'name' => 'Grilled Salmon',
            'description' => 'Pan-seared salmon with roasted vegetables.',
            'price' => 24.99,
        ]);

        // Add more menu items as needed
    }
}
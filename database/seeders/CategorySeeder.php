<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the categories table with typical Malaysian warung categories.
     */
    public function run(): void
    {
        $categories = [
            // Fixed-price categories
            ['name' => 'Nasi',         'type' => 'fixed', 'availability_time' => 'all'],
            ['name' => 'Mee & Bihun',  'type' => 'fixed', 'availability_time' => 'all'],
            ['name' => 'Roti & Pastri', 'type' => 'fixed', 'availability_time' => 'morning'],
            ['name' => 'Goreng-Goreng', 'type' => 'fixed', 'availability_time' => 'all'],
            ['name' => 'Sup & Kuah',   'type' => 'fixed', 'availability_time' => 'all'],
            ['name' => 'Minuman Panas', 'type' => 'fixed', 'availability_time' => 'all'],
            ['name' => 'Minuman Sejuk', 'type' => 'fixed', 'availability_time' => 'all'],
            ['name' => 'Kuih & Pencuci Mulut', 'type' => 'fixed', 'availability_time' => 'all'],

            // Variable-price categories (weighed / custom)
            ['name' => 'Lauk Campur',  'type' => 'variable', 'availability_time' => 'afternoon'],
            ['name' => 'Ikan Bakar',   'type' => 'variable', 'availability_time' => 'afternoon'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}

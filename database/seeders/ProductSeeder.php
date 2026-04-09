<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the products table with typical Malaysian warung menu items.
     * Products are grouped by their parent category name.
     */
    public function run(): void
    {
        $products = [
            // ── Nasi ──────────────────────────────────────────
            'Nasi' => [
                ['name' => 'Nasi Putih',           'base_price' => 2.00],
                ['name' => 'Nasi Lemak Biasa',     'base_price' => 3.50],
                ['name' => 'Nasi Lemak Ayam',      'base_price' => 7.00],
                ['name' => 'Nasi Lemak Rendang',   'base_price' => 7.50],
                ['name' => 'Nasi Goreng Kampung',  'base_price' => 6.00],
                ['name' => 'Nasi Goreng Pattaya',  'base_price' => 7.00],
                ['name' => 'Nasi Goreng USA',      'base_price' => 7.50],
                ['name' => 'Nasi Ayam',            'base_price' => 8.00],
                ['name' => 'Nasi Kerabu',          'base_price' => 7.00],
            ],

            // ── Mee & Bihun ───────────────────────────────────
            'Mee & Bihun' => [
                ['name' => 'Mee Goreng Mamak',     'base_price' => 6.00],
                ['name' => 'Mee Goreng Basah',     'base_price' => 6.50],
                ['name' => 'Mee Rebus',            'base_price' => 6.00],
                ['name' => 'Mee Hailam',           'base_price' => 7.00],
                ['name' => 'Bihun Goreng',         'base_price' => 5.50],
                ['name' => 'Bihun Sup',            'base_price' => 5.50],
                ['name' => 'Kuey Teow Goreng',     'base_price' => 6.50],
                ['name' => 'Char Kuey Teow',       'base_price' => 7.00],
                ['name' => 'Laksa',                'base_price' => 6.50],
            ],

            // ── Roti & Pastri ─────────────────────────────────
            'Roti & Pastri' => [
                ['name' => 'Roti Canai Kosong',    'base_price' => 1.50],
                ['name' => 'Roti Canai Telur',     'base_price' => 2.50],
                ['name' => 'Roti Canai Sardine',   'base_price' => 3.00],
                ['name' => 'Roti Boom',            'base_price' => 2.50],
                ['name' => 'Roti Jala',            'base_price' => 3.00],
                ['name' => 'Roti John',            'base_price' => 5.00],
                ['name' => 'Naan Cheese',          'base_price' => 4.00],
                ['name' => 'Capati',               'base_price' => 2.00],
            ],

            // ── Goreng-Goreng ─────────────────────────────────
            'Goreng-Goreng' => [
                ['name' => 'Ayam Goreng Berempah', 'base_price' => 5.00],
                ['name' => 'Ayam Goreng Crispy',   'base_price' => 5.50],
                ['name' => 'Pisang Goreng (5 pcs)', 'base_price' => 3.00],
                ['name' => 'Keropok Lekor (5 pcs)', 'base_price' => 3.00],
                ['name' => 'Cucur Udang (5 pcs)',  'base_price' => 3.50],
                ['name' => 'Tempe Goreng',         'base_price' => 2.00],
                ['name' => 'Tauhu Goreng',         'base_price' => 2.50],
            ],

            // ── Sup & Kuah ────────────────────────────────────
            'Sup & Kuah' => [
                ['name' => 'Sup Ayam',             'base_price' => 6.00],
                ['name' => 'Sup Tulang Merah',     'base_price' => 10.00],
                ['name' => 'Sup Kambing',          'base_price' => 10.00],
                ['name' => 'Tom Yam Campur',       'base_price' => 8.00],
                ['name' => 'Soto Ayam',            'base_price' => 6.50],
            ],

            // ── Minuman Panas ─────────────────────────────────
            'Minuman Panas' => [
                ['name' => 'Teh O Panas',          'base_price' => 1.50],
                ['name' => 'Teh Tarik',            'base_price' => 2.00],
                ['name' => 'Kopi O',               'base_price' => 2.00],
                ['name' => 'Kopi Tarik',           'base_price' => 2.50],
                ['name' => 'Milo Panas',           'base_price' => 3.00],
                ['name' => 'Nescafe Panas',        'base_price' => 2.50],
                ['name' => 'Air Kosong Panas',     'base_price' => 0.00],
            ],

            // ── Minuman Sejuk ─────────────────────────────────
            'Minuman Sejuk' => [
                ['name' => 'Teh O Ais',            'base_price' => 2.00],
                ['name' => 'Teh Ais',              'base_price' => 2.50],
                ['name' => 'Kopi O Ais',           'base_price' => 2.50],
                ['name' => 'Milo Ais',             'base_price' => 3.50],
                ['name' => 'Milo Dinosaur',        'base_price' => 4.50],
                ['name' => 'Sirap Bandung',        'base_price' => 2.50],
                ['name' => 'Air Limau Ais',        'base_price' => 2.50],
                ['name' => 'Air Kelapa',           'base_price' => 4.00],
                ['name' => 'Air Kosong',           'base_price' => 0.00],
            ],

            // ── Kuih & Pencuci Mulut ──────────────────────────
            'Kuih & Pencuci Mulut' => [
                ['name' => 'Kuih Lapis',           'base_price' => 1.50],
                ['name' => 'Kuih Seri Muka',       'base_price' => 2.00],
                ['name' => 'Onde-Onde',            'base_price' => 1.00],
                ['name' => 'Cendol',               'base_price' => 3.50],
                ['name' => 'Ais Kacang',           'base_price' => 4.50],
                ['name' => 'Bubur Kacang',         'base_price' => 3.00],
            ],

            // ── Lauk Campur (variable price) ──────────────────
            'Lauk Campur' => [
                ['name' => 'Ayam Masak Merah',     'base_price' => 0.00],
                ['name' => 'Daging Masak Kicap',   'base_price' => 0.00],
                ['name' => 'Telur Dadar',          'base_price' => 0.00],
                ['name' => 'Sayur Campur',         'base_price' => 0.00],
                ['name' => 'Sambal Udang',         'base_price' => 0.00],
                ['name' => 'Rendang Ayam',         'base_price' => 0.00],
                ['name' => 'Kari Ayam',            'base_price' => 0.00],
                ['name' => 'Ikan Masak Sambal',    'base_price' => 0.00],
            ],

            // ── Ikan Bakar (variable price) ───────────────────
            'Ikan Bakar' => [
                ['name' => 'Ikan Kembung Bakar',   'base_price' => 0.00],
                ['name' => 'Ikan Pari Bakar',      'base_price' => 0.00],
                ['name' => 'Ikan Siakap Bakar',    'base_price' => 0.00],
                ['name' => 'Sotong Bakar',         'base_price' => 0.00],
                ['name' => 'Udang Bakar',          'base_price' => 0.00],
            ],
        ];

        foreach ($products as $categoryName => $items) {
            $category = Category::where('name', $categoryName)->first();

            if (!$category) {
                continue;
            }

            foreach ($items as $item) {
                Product::create([
                    'category_id' => $category->id,
                    'name'        => $item['name'],
                    'base_price'  => $item['base_price'],
                    'is_active'   => true,
                ]);
            }
        }
    }
}

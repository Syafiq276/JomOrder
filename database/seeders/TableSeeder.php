<?php

namespace Database\Seeders;

use App\Models\Table;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TableSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the tables with default Meja 1-10 + Takeaway.
     */
    public function run(): void
    {
        // Meja 1 through 10
        for ($i = 1; $i <= 10; $i++) {
            Table::create([
                'name'      => "Meja {$i}",
                'is_active' => true,
            ]);
        }

        // Takeaway option
        Table::create([
            'name'      => 'Takeaway',
            'is_active' => true,
        ]);
    }
}

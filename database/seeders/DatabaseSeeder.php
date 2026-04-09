<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ── Users ─────────────────────────────────────────
        User::factory()->create([
            'name'     => 'Admin JomOrder',
            'email'    => 'admin@jomorder.my',
            'password' => Hash::make('password'),
            'role'     => 'admin',
        ]);

        User::factory()->create([
            'name'  => 'Cashier',
            'email' => 'cashier@jomorder.my',
        ]);

        // ── Menu & Tables ─────────────────────────────────
        $this->call([
            TableSeeder::class,
            VendorSeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
        ]);
    }
}

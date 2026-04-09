<?php

namespace Database\Seeders;

use App\Models\Vendor;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
    public function run(): void
    {
        Vendor::create(['name' => 'Mak Leha Nasi Lemak', 'contact_person' => 'Mak Leha', 'phone' => '012-3456789']);
        Vendor::create(['name' => 'Pak Abu Ikan Bakar', 'contact_person' => 'Pak Abu', 'phone' => '013-9876543']);
        Vendor::create(['name' => 'Gerai Kuih Kak Siti', 'contact_person' => 'Kak Siti', 'phone' => '014-1112223']);
    }
}

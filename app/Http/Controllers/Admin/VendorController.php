<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController extends Controller
{
    /**
     * Display a listing of vendors.
     */
    public function index()
    {
        return Inertia::render('Admin/Vendors/Index', [
            'vendors' => Vendor::withCount('products')->get(),
        ]);
    }

    /**
     * Store a newly created vendor.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        Vendor::create($validated);

        return back()->with('success', 'Vendor baru berjaya ditambah!');
    }

    /**
     * Update the specified vendor.
     */
    public function update(Request $request, Vendor $vendor)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'is_active' => 'required|boolean',
        ]);

        $vendor->update($validated);

        return back()->with('success', 'Maklumat vendor dikemaskini!');
    }
}

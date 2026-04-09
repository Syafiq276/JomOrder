<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display the menu management interface.
     */
    public function index()
    {
        return Inertia::render('Admin/Menu/Index', [
            'categories' => Category::with(['products.vendor'])->get(),
            'vendors' => Vendor::where('is_active', true)->get(),
        ]);
    }

    /**
     * Toggle item/category availability.
     */
    public function toggleAvailability(Request $request)
    {
        $request->validate([
            'type' => 'required|in:category,product',
            'id' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        if ($request->type === 'category') {
            Category::where('id', $request->id)->update(['is_active' => $request->is_active]);
        } else {
            Product::where('id', $request->id)->update(['is_active' => $request->is_active]);
        }

        return back()->with('success', 'Status ketersediaan dikemaskini!');
    }

    /**
     * Update product costs/prices and vendor link.
     */
    public function updateProduct(Request $request, Product $product)
    {
        $validated = $request->validate([
            'base_price' => 'required|numeric|min:0',
            'cost_price' => 'required|numeric|min:0',
            'vendor_id'  => 'nullable|exists:vendors,id',
        ]);

        $product->update($validated);

        return back()->with('success', "Maklumat {$product->name} dikemaskini!");
    }
}

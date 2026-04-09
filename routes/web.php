<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\VendorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // ── POS Interface ────────────────────────────────
    Route::middleware(['role:staff'])->group(function () {
        Route::get('/pos', [OrderController::class, 'index'])->name('pos.index');
        Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
        Route::post('/orders/{order}/checkout', [OrderController::class, 'checkout'])->name('orders.checkout');
    });

    // ── Kitchen Display System (KDS) ──────────────────
    Route::middleware(['role:kitchen'])->group(function () {
        Route::get('/kds', [OrderController::class, 'kds'])->name('kds.index');
        Route::get('/api/orders/active', [OrderController::class, 'getActiveOrders'])->name('api.orders.active');
        Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('orders.update-status');
        Route::patch('/order-items/{item}/status', [OrderController::class, 'updateItemStatus'])->name('order-items.update-status');
    });

    // ── Admin Dashboard ──────────────────────────────
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');
        
        // Menu management
        Route::get('/menu', [MenuController::class, 'index'])->name('menu.index');
        Route::post('/menu/toggle', [MenuController::class, 'toggleAvailability'])->name('menu.toggle');
        Route::patch('/menu/products/{product}', [MenuController::class, 'updateProduct'])->name('menu.update-product');
        
        // Vendor management
        Route::get('/vendors', [VendorController::class, 'index'])->name('vendors.index');
        Route::post('/vendors', [VendorController::class, 'store'])->name('vendors.store');
        Route::patch('/vendors/{vendor}', [VendorController::class, 'update'])->name('vendors.update');
    });
});

require __DIR__.'/auth.php';

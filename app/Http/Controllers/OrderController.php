<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Services\WhatsApp\WhatsAppService;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    /**
     * Display the POS interface.
     * Loads categories and tables with their current occupancy state.
     */
    public function index()
    {
        $categories = Category::where('is_active', true)->with(['products' => function ($query) {
            $query->where('is_active', true)->orderBy('name');
        }])->orderBy('name')->get();

        // Load tables and check for active orders (pending, preparing, or served) in a single optimized query
        $tables = Table::where('is_active', true)
            ->with(['orders' => function ($query) {
                $query->whereIn('status', ['pending', 'preparing', 'served'])
                      ->with('items.product');
            }])
            ->get()
            ->map(function ($table) {
                // Attach the first active order to the table object for the frontend
                $activeOrder = $table->orders->first();
                $table->active_order = $activeOrder;
                $table->is_occupied = (bool)$activeOrder;
                unset($table->orders); // Remove the collection to keep the payload clean
                return $table;
            });

        return Inertia::render('POS/Index', [
            'categories' => $categories,
            'tables'     => $tables,
        ]);
    }

    /**
     * Store or Update an order (Merge if table already has active order).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'table_id'           => 'nullable|exists:tables,id',
            'items'              => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.qty'        => 'required|integer|min:1',
            'items.*.price'      => 'required|numeric|min:0',
            'items.*.notes'      => 'nullable|string|max:255',
            'source'             => 'required|in:staff,grab,foodpanda',
        ]);

        $order = DB::transaction(function () use ($validated) {
            $tableId = $validated['table_id'];
            $source = $validated['source'];

            // Find existing order for merging (only for table-based orders)
            $order = null;
            if ($tableId && $source === 'staff') {
                $order = Order::where('table_id', $tableId)
                    ->whereIn('status', ['pending', 'preparing', 'served'])
                    ->first();
            }

            // Calculate total for new items
            $newTotal = collect($validated['items'])->sum(function ($item) {
                return $item['qty'] * $item['price'];
            });

            // Auto-pickup customer info from table if available
            $customerPhone = null;
            $customerName = null;
            if ($tableId) {
                $table = Table::find($tableId);
                if ($table) {
                    $customerPhone = $table->current_customer_phone;
                    $customerName = $table->current_customer_name;
                }
            }

            if ($order) {
                // Merge into existing order
                $order->total_amount += $newTotal;
                $order->status = 'pending'; // Reset status so kitchen sees new items
                // Only update phone if not already set (keep first customer)
                if (!$order->customer_phone) {
                    $order->customer_phone = $customerPhone;
                    $order->customer_name = $customerName;
                }
                $order->save();
            } else {
                // Create new order
                $order = Order::create([
                    'table_id'       => $tableId,
                    'total_amount'   => $newTotal,
                    'status'         => 'pending',
                    'source'         => $source,
                    'customer_phone' => $customerPhone,
                    'customer_name'  => $customerName,
                ]);
            }

            // Create order items
            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                
                $order->items()->create([
                    'product_id'    => $item['product_id'],
                    'qty'           => $item['qty'],
                    'price_at_sale' => $item['price'],
                    'cost_at_sale'  => $product->cost_price ?? 0,
                    'notes'         => $item['notes'] ?? null,
                    'status'        => 'pending', // Tag as NEW for KDS
                ]);
            }

            return $order->load('items.product', 'table');
        });

        $message = $order->table 
            ? "Pesanan untuk {$order->table->name} telah dihantar!"
            : "Pesanan Delivery ({$order->source}) telah dihantar!";

        return back()->with('success', $message);
    }

    /**
     * Process payment and close the order.
     */
    public function checkout(Request $request, Order $order)
    {
        $validated = $request->validate([
            'payment_method' => 'required|in:cash,qr',
        ]);

        $order->update([
            'status' => 'paid',
            'payment_method' => $validated['payment_method'],
            // 'paid_at' => now(), // Assuming this field might exist or be needed
        ]);

        // Cleanup table session after payment
        if ($order->table_id) {
            $order->table->update([
                'current_customer_phone' => null,
                'current_customer_name'  => null,
            ]);
        }

        // Automatically trigger WhatsApp receipt if phone is present
        if ($order->customer_phone) {
            $this->sendWhatsAppReceipt($order);
        }

        return back()->with('success', "Bayaran untuk Order #{$order->id} telah direkodkan!" . ($order->customer_phone ? " Resit PDF dihantar ke WhatsApp." : ""));
    }

    /**
     * Generate PDF and send via WhatsApp API
     */
    protected function sendWhatsAppReceipt(Order $order)
    {
        try {
            // 1. Generate PDF content
            $pdf = Pdf::loadView('receipts.pdf', ['order' => $order->load('items.product', 'table')]);
            $pdf->setPaper([0, 0, 226.77, 600], 'portrait'); // 80mm width in points

            // 2. Save PDF to public storage
            $filename = "Receipt_{$order->id}_" . Str::random(5) . ".pdf";
            $path = "receipts/{$filename}";
            Storage::disk('public')->put($path, $pdf->output());

            // 3. Prepare Public URL (Note: In production/cPanel, use the actual domain)
            $pdfUrl = url(Storage::url($path));

            // 4. Send via WhatsApp Service
            $caption = "Terima kasih dari Café Kak Na! 🙏\nBerikut adalah resit digital anda untuk Order #{$order->id}.\n\nJumpa lagi!";
            
            WhatsAppService::driver()->sendPdf(
                $order->customer_phone,
                $pdfUrl,
                "Resit_{$order->id}.pdf",
                $caption
            );

            return true;
        } catch (\Exception $e) {
            \Log::error("Failed to send WhatsApp Receipt: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Update status of an individual item (for KDS).
     */
    public function updateItemStatus(Request $request, OrderItem $item)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,preparing,served',
        ]);

        $item->update(['status' => $validated['status']]);

        // If all items are served, we don't automatically mark order as served 
        // because they might add more items later. But we could auto-advance order status.

        return back()->with('success', 'Status item dikemaskini!');
    }

    /**
     * KDS Views
     */
    public function kds() { return Inertia::render('KDS/Index'); }
    
    public function getActiveOrders()
    {
        $orders = Order::with(['table', 'items.product'])
            ->whereIn('status', ['pending', 'preparing', 'served'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($orders);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,preparing,served,paid,cancelled',
        ]);

        $order->update(['status' => $validated['status']]);
        
        return back()->with('success', "Status pesanan #{$order->id} dikemaskini!");
    }

    // ── Customer Ordering Methods ─────────────────────

    /**
     * Show registration screen for customer
     */
    public function customerRegistration(Table $table)
    {
        return Inertia::render('Customer/Registration', [
            'table' => $table,
        ]);
    }

    /**
     * Start session with phone number
     */
    public function startCustomerSession(Request $request, Table $table)
    {
        $validated = $request->validate([
            'phone' => 'required|string|min:10',
            'name'  => 'nullable|string|max:50',
        ]);

        // Update table with current session info for POS auto-pickup
        $table->update([
            'current_customer_phone' => $validated['phone'],
            'current_customer_name'  => $validated['name'],
        ]);

        session([
            'customer_phone' => $validated['phone'],
            'customer_name'  => $validated['name'],
            'table_id'      => $table->id
        ]);

        return redirect()->route('customer.menu', $table->id);
    }

    /**
     * Public menu for customers
     */
    public function publicMenu(Table $table)
    {
        // Simple session check (optional: could redirect back if no phone)
        if (!session('customer_phone')) {
            return redirect()->route('customer.register', $table->id);
        }

        $categories = Category::where('is_active', true)->with(['products' => function ($query) {
            $query->where('is_active', true)->orderBy('name');
        }])->orderBy('name')->get();

        return Inertia::render('Customer/PublicMenu', [
            'table'      => $table,
            'categories' => $categories,
            'customer'   => [
                'name'  => session('customer_name'),
                'phone' => session('customer_phone')
            ]
        ]);
    }
}

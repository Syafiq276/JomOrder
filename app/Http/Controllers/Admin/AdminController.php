<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Display the Admin Dashboard with dynamic sales summary.
     */
    public function index(Request $request)
    {
        $period = $request->input('period', 'today'); // today, month, year, all
        
        // Define date range based on period
        $startDate = match ($period) {
            'today' => Carbon::today(),
            'month' => Carbon::now()->startOfMonth(),
            'year'  => Carbon::now()->startOfYear(),
            'all'   => Carbon::create(2000, 1, 1),
            default => Carbon::today(),
        };

        $endDate = Carbon::now();

        // 1. General Stats (Revenue, Cost, Profit)
        // We use Item-level aggregation to get accurate cost information
        $mainStats = OrderItem::join('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.status', 'paid') // Only count paid orders for financial reports
            ->whereBetween('orders.created_at', [$startDate, $endDate])
            ->select(
                DB::raw('SUM(price_at_sale * qty) as revenue'),
                DB::raw('SUM(cost_at_sale * qty) as cost'),
                DB::raw('COUNT(DISTINCT orders.id) as order_count')
            )
            ->first();

        // 2. Source Breakdown (Platform Performance)
        $sourceBreakdown = Order::where('status', 'paid')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->select('source', DB::raw('SUM(total_amount) as total'), DB::raw('COUNT(*) as count'))
            ->groupBy('source')
            ->get();

        // 3. Popular Items in this period
        $popularItems = DB::table('order_items')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.status', 'paid')
            ->whereBetween('orders.created_at', [$startDate, $endDate])
            ->select('products.name', DB::raw('SUM(order_items.qty) as total_qty'))
            ->groupBy('order_items.product_id', 'products.name')
            ->orderBy('total_qty', 'desc')
            ->limit(10)
            ->get();

        // 4. Daily Trend (for the last 30 days or current period)
        // This is a bonus for better visualization
        $trendData = Order::where('status', 'paid')
            ->where('created_at', '>=', Carbon::now()->subDays(30))
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(total_amount) as amount')
            )
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'period' => $period,
            'stats' => [
                'revenue' => (float)($mainStats->revenue ?? 0),
                'cost'    => (float)($mainStats->cost ?? 0),
                'profit'  => (float)(($mainStats->revenue ?? 0) - ($mainStats->cost ?? 0)),
                'orders'  => (int)($mainStats->order_count ?? 0),
            ],
            'source_breakdown' => $sourceBreakdown,
            'popular_items'    => $popularItems,
            'trend_data'      => $trendData,
        ]);
    }
}

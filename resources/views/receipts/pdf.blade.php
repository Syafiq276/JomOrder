<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Resit JomOrder #{{ $order->id }}</title>
    <style>
        @page { margin: 0; }
        body {
            font-family: 'Courier New', Courier, monospace;
            font-size: 12px;
            color: #333;
            margin: 0;
            padding: 30px;
            background-color: #fff;
        }
        .receipt-container {
            width: 100%;
            max-width: 300px; /* Thermal width approximation */
            margin: 0 auto;
        }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .font-bold { font-weight: bold; }
        
        .header { margin-bottom: 20px; }
        .brand { font-size: 20px; font-weight: 900; margin-bottom: 5px; text-transform: uppercase; }
        .address { font-size: 10px; line-height: 1.2; }
        
        .divider { border-top: 1px dashed #ccc; margin: 15px 0; }
        
        .meta { margin-bottom: 15px; font-size: 11px; }
        .meta-row { width: 100%; margin-bottom: 3px; }
        
        table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        th { text-align: left; font-size: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
        td { padding: 5px 0; vertical-align: top; font-size: 11px; }
        
        .item-row { margin-bottom: 8px; }
        .item-name { font-weight: bold; }
        .item-qty { font-size: 10px; color: #666; }
        .item-notes { font-size: 9px; font-style: italic; color: #888; }
        
        .totals { margin-top: 10px; }
        .total-row { margin-bottom: 5px; }
        .grand-total { font-size: 14px; font-weight: bold; border-top: 1px solid #aaa; padding-top: 5px; }
        
        .footer { margin-top: 30px; font-size: 10px; opacity: 0.8; }
    </style>
</head>
<body>
    <div class="receipt-container">
        <div class="header text-center">
            <div class="brand">Café Kak Na</div>
            <div class="address">
                28, Laluan Klebang Restu 18b,<br>
                31200 Chemor, Perak
            </div>
        </div>

        <div class="divider"></div>

        <div class="meta">
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td>No. Resit:</td>
                    <td class="text-right font-bold">#{{ $order->id }}</td>
                </tr>
                <tr>
                    <td>Tarikh:</td>
                    <td class="text-right">{{ $order->created_at->format('d/m/Y H:i') }}</td>
                </tr>
                <tr>
                    <td>Table:</td>
                    <td class="text-right">{{ $order->table ? $order->table->name : strtoupper($order->source) }}</td>
                </tr>
            </table>
        </div>

        <div class="divider"></div>

        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th class="text-right">RM</th>
                </tr>
            </thead>
            <tbody>
                @foreach($order->items as $item)
                <tr>
                    <td>
                        <div class="item-name">{{ $item->product->name }}</div>
                        <div class="item-qty">{{ $item->qty }} x {{ number_format($item->price_at_sale, 2) }}</div>
                        @if($item->notes)
                            <div class="item-notes">({{ $item->notes }})</div>
                        @endif
                    </td>
                    <td class="text-right">
                        {{ number_format($item->price_at_sale * $item->qty, 2) }}
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <div class="divider"></div>

        <div class="totals">
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td>Subtotal:</td>
                    <td class="text-right">{{ number_format($order->total_amount, 2) }}</td>
                </tr>
                <tr class="grand-total">
                    <td>JUMLAH:</td>
                    <td class="text-right">RM {{ number_format($order->total_amount, 2) }}</td>
                </tr>
                <tr>
                    <td>Bayaran:</td>
                    <td class="text-right">{{ $order->payment_method == 'qr' ? '📱 QR Pay' : '💵 Tunai' }}</td>
                </tr>
            </table>
        </div>

        <div class="footer text-center">
            <div class="divider"></div>
            <p>Terima Kasih! Sila Datang Lagi.</p>
            <p style="font-size: 8px;">Powered by JomOrder</p>
        </div>
    </div>
</body>
</html>

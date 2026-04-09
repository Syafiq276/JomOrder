import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import POSLayout from '@/Layouts/POSLayout';
import OrderTicket from '@/Components/KDS/OrderTicket';

/**
 * KDS/Index — Main Kitchen Display Station.
 * Implements real-time AJAX polling every 5 seconds.
 */
export default function Index() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lastRefresh, setLastRefresh] = useState(new Date());

    // ── Fetch Logic ───────────────────────────────────
    const fetchOrders = useCallback(async () => {
        try {
            const response = await axios.get(route('api.orders.active'));
            setOrders(response.data);
            setLastRefresh(new Date());
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    }, []);

    // ── Polling ───────────────────────────────────────
    useEffect(() => {
        fetchOrders(); // Initial fetch

        const interval = setInterval(fetchOrders, 5000); // 5s Polling
        return () => clearInterval(interval);
    }, [fetchOrders]);

    // ── Update Status ─────────────────────────────────
    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await axios.patch(route('orders.update-status', orderId), {
                status: newStatus
            });
            // Refresh logic handled by polling
            fetchOrders();
        } catch (error) {
            console.error('Failed to update order status:', error);
        }
    };

    const handleUpdateItemStatus = async (itemId, newStatus) => {
        try {
            await axios.patch(route('order-items.update-status', itemId), {
                status: newStatus
            });
            // Refresh logic handled by polling
            fetchOrders();
        } catch (error) {
            console.error('Failed to update item status:', error);
        }
    };

    return (
        <POSLayout title="Kitchen Display (KDS) - JomOrder">
            <div className="pos-container pos-container--kds">
                {/* ── KDS Header ────────────────────────── */}
                <header className="pos-header kds-header">
                    <div className="pos-header__brand">
                        <span className="pos-header__logo">DAPUR</span>
                        <span className="pos-header__tagline">JomOrder KDS</span>
                    </div>
                    <div className="pos-header__info">
                        <span className="pos-header__time">
                            Order dikemaskini: {lastRefresh.toLocaleTimeString('ms-MY')}
                        </span>
                        <a href={route('pos.index')} className="pos-header__back">
                            ← Ke POS
                        </a>
                    </div>
                </header>

                {/* ── Ticket Grid ────────────────────────── */}
                <main className="kds-main">
                    {isLoading && orders.length === 0 ? (
                        <div className="kds-loading">Memuatkan pesanan...</div>
                    ) : orders.length === 0 ? (
                        <div className="kds-empty">
                            <div className="kds-empty__icon">👨‍🍳</div>
                            <h3>Tiada pesanan aktif</h3>
                            <p>Pesanan baru akan muncul secara automatik.</p>
                        </div>
                    ) : (
                        <div className="kds-grid">
                            {orders.map((order) => (
                                <OrderTicket
                                    key={order.id}
                                    order={order}
                                    onUpdateStatus={handleUpdateStatus}
                                    onUpdateItemStatus={handleUpdateItemStatus}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </POSLayout>
    );
}

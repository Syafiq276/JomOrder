import { useState, useCallback } from 'react';
import { router, usePage } from '@inertiajs/react';
import POSLayout from '@/Layouts/POSLayout';
import CategoryTabs from '@/Components/POS/CategoryTabs';
import ProductGrid from '@/Components/POS/ProductGrid';
import CartPanel from '@/Components/POS/CartPanel';
import VariablePriceModal from '@/Components/POS/VariablePriceModal';
import BillModal from '@/Components/POS/BillModal';
import DigitalReceipt from '@/Components/POS/DigitalReceipt';

/**
 * POS/Index — Main Staff POS Interface.
 * Receives categories (with products) and tables from the controller.
 */
export default function Index({ categories, tables }) {
    const { flash } = usePage().props;

    // ── State ─────────────────────────────────────────
    const [activeCategory, setActiveCategory] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [orderSource, setOrderSource] = useState('staff'); // staff, grab, foodpanda
    const [variableProduct, setVariableProduct] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeBill, setActiveBill] = useState(null); // Consolidated bill for current table
    const [receiptOrder, setReceiptOrder] = useState(null); // Order to show receipt for
    const [toast, setToast] = useState(null);

    // ── Cart Helpers ──────────────────────────────────
    const generateCartId = () => {
        return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    };

    const addToCart = useCallback((product, price) => {
        setCartItems((prev) => {
            const existing = prev.find(
                (item) => item.product_id === product.id && item.price === price
            );

            if (existing) {
                return prev.map((item) =>
                    item.cartId === existing.cartId
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }

            return [
                ...prev,
                {
                    cartId: generateCartId(),
                    product_id: product.id,
                    name: product.name,
                    price: price,
                    qty: 1,
                    notes: '',
                },
            ];
        });
        showToast(`${product.name} ditambah ✓`);
    }, []);

    const updateQty = useCallback((cartId, newQty) => {
        if (newQty <= 0) {
            setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
        } else {
            setCartItems((prev) =>
                prev.map((item) =>
                    item.cartId === cartId ? { ...item, qty: newQty } : item
                )
            );
        }
    }, []);

    const removeItem = useCallback((cartId) => {
        setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
    }, []);

    const updateNotes = useCallback((cartId, notes) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.cartId === cartId ? { ...item, notes } : item
            )
        );
    }, []);

    const clearCart = useCallback(() => {
        if (cartItems.length > 0 && window.confirm('Kosongkan semua item?')) {
            setCartItems([]);
        }
    }, [cartItems]);

    // ── Variable Price Modal ──────────────────────────
    const handleVariablePrice = useCallback((product) => {
        setVariableProduct(product);
    }, []);

    const handleVariablePriceConfirm = useCallback((product, price) => {
        addToCart(product, price);
        setVariableProduct(null);
    }, [addToCart]);

    // ── Place Order ───────────────────────────────────
    const placeOrder = useCallback(() => {
        // Validation: Grab/Foodpanda don't need a table. Staff orders DO.
        if (orderSource === 'staff' && !selectedTable) {
            showToast('Sila pilih meja!', 'error');
            return;
        }

        if (cartItems.length === 0) {
            showToast('Tiada item dalam pesanan!', 'error');
            return;
        }

        setIsSubmitting(true);

        const orderData = {
            table_id: orderSource === 'staff' ? selectedTable : null,
            source: orderSource,
            items: cartItems.map((item) => ({
                product_id: item.product_id,
                qty: item.qty,
                price: item.price,
                notes: item.notes || null,
            })),
        };

        router.post(route('orders.store'), orderData, {
            onSuccess: () => {
                setCartItems([]);
                setSelectedTable(null);
                showToast('Pesanan berjaya dihantar! ✓', 'success');
                setIsSubmitting(false);
            },
            onError: (errors) => {
                console.error('Order failed:', errors);
                showToast('Gagal menghantar pesanan!', 'error');
                setIsSubmitting(false);
            },
        });
    }, [selectedTable, cartItems, orderSource]);

    // ── Payment ───────────────────────────────────────
    const processPayment = (orderId, method) => {
        router.post(route('orders.checkout', orderId), { payment_method: method }, {
            onSuccess: () => {
                const completedOrder = { ...activeBill, payment_method: method };
                setActiveBill(null);
                setReceiptOrder(completedOrder);
                setSelectedTable(null);
                showToast('Bayaran berjaya! ✓', 'success');
            }
        });
    };

    const handlePrint = () => {
        window.print();
    };

    const shareWhatsApp = (order, total) => {
        const phone = ""; // Customer phone can be added here if we had it
        const text = `Resit Café Kak Na\nOrder: #${order.id}\nTarikh: ${new Date(order.created_at).toLocaleString()}\nJumlah: RM ${total.toFixed(2)}\n\nTerima Kasih!`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    };

    // ── Toast ─────────────────────────────────────────
    const showToast = (message, type = 'info') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 2500);
    };

    // ── Get current time ──────────────────────────────
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ms-MY', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <POSLayout title="POS - JomOrder">
            <div className="pos-container">
                {/* ── Header Bar ──────────────────────── */}
                <header className="pos-header">
                    <div className="pos-header__brand">
                        <span className="pos-header__logo">JomOrder</span>
                        <div className="pos-source-selector">
                            <button 
                                className={`pos-source-btn ${orderSource === 'staff' ? 'active' : ''}`}
                                onClick={() => setOrderSource('staff')}
                            >🚶 Kedai</button>
                            <button 
                                className={`pos-source-btn ${orderSource === 'grab' ? 'active' : ''}`}
                                onClick={() => setOrderSource('grab')}
                            >💚 Grab</button>
                            <button 
                                className={`pos-source-btn ${orderSource === 'foodpanda' ? 'active' : ''}`}
                                onClick={() => setOrderSource('foodpanda')}
                            >💓 Panda</button>
                        </div>
                    </div>
                    <div className="pos-header__info">
                        <span className="pos-header__time">{timeStr}</span>
                        <div className="pos-header__actions">
                            {usePage().props.auth.user.role === 'admin' && (
                                <Link href={route('admin.dashboard')} className="pos-header__link">
                                    ← Dashboard
                                </Link>
                            )}
                            <Link 
                                href={route('logout')} 
                                method="post" 
                                as="button" 
                                className="pos-header__logout"
                            >
                                Log Keluar
                            </Link>
                        </div>
                    </div>
                </header>

                {/* ── Main Content ────────────────────── */}
                <div className="pos-main">
                    {/* Left Panel: Menu */}
                    <div className="pos-menu-panel">
                        <CategoryTabs
                            categories={categories}
                            activeCategory={activeCategory}
                            onSelect={setActiveCategory}
                        />
                        <ProductGrid
                            categories={categories}
                            activeCategory={activeCategory}
                            onAddToCart={addToCart}
                            onVariablePrice={handleVariablePrice}
                        />
                    </div>

                    {/* Right Panel: Cart */}
                    <CartPanel
                        tables={tables}
                        selectedTable={selectedTable}
                        onSelectTable={setSelectedTable}
                        orderSource={orderSource}
                        cartItems={cartItems}
                        onUpdateQty={updateQty}
                        onRemoveItem={removeItem}
                        onUpdateNotes={updateNotes}
                        onPlaceOrder={placeOrder}
                        onClearCart={clearCart}
                        onViewBill={setActiveBill}
                        isSubmitting={isSubmitting}
                    />
                </div>

                {/* ── Modals ─────────────────────────── */}
                {activeBill && (
                    <BillModal
                        order={activeBill}
                        table={tables.find(t => t.id === activeBill.table_id)}
                        onPay={processPayment}
                        onClose={() => setActiveBill(null)}
                    />
                )}

                {receiptOrder && (
                    <div className="pos-modal-overlay">
                        <div className="pos-modal pos-modal--receipt">
                            <DigitalReceipt
                                order={receiptOrder}
                                table={tables.find(t => t.id === receiptOrder.table_id)}
                                onPrint={handlePrint}
                                onShareWhatsApp={shareWhatsApp}
                                onClose={() => setReceiptOrder(null)}
                            />
                        </div>
                    </div>
                )}

                {/* ── Variable Price Modal ────────────── */}
                {variableProduct && (
                    <VariablePriceModal
                        product={variableProduct}
                        onConfirm={handleVariablePriceConfirm}
                        onClose={() => setVariableProduct(null)}
                    />
                )}

                {/* ── Toast Notification ──────────────── */}
                {toast && (
                    <div className={`pos-toast pos-toast--${toast.type}`}>
                        {toast.message}
                    </div>
                )}
            </div>
        </POSLayout>
    );
}

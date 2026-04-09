import CartItem from './CartItem';

/**
 * CartPanel — Updated for Phase 4 to handle table occupancy and active bills.
 */
export default function CartPanel({
    tables,
    selectedTable,
    onSelectTable,
    orderSource,
    cartItems,
    onUpdateQty,
    onRemoveItem,
    onUpdateNotes,
    onPlaceOrder,
    onClearCart,
    onViewBill,
    isSubmitting,
}) {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

    const activeTable = tables.find(t => t.id === selectedTable);
    const isOccupied = activeTable?.is_occupied;

    return (
        <div className="pos-cart-panel">
            {/* Header */}
            <div className="pos-cart-panel__header">
                <h2 className="pos-cart-panel__title">🛒 {orderSource === 'staff' ? 'Pesanan Kedai' : 'Delivery'}</h2>
                <span className="pos-cart-panel__count">
                    {itemCount} item
                </span>
            </div>

            {/* Table Selector (Only for staff orders) */}
            {orderSource === 'staff' && (
                <div className="pos-cart-panel__table-select">
                    <label>Meja:</label>
                    <div className="pos-table-grid-mini">
                        {tables.map((table) => (
                            <button
                                key={table.id}
                                className={`pos-table-btn-mini ${selectedTable === table.id ? 'active' : ''} ${table.is_occupied ? 'occupied' : ''}`}
                                onClick={() => onSelectTable(table.id)}
                            >
                                {table.name}
                                {table.is_occupied && <span className="occupied-dot">●</span>}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Cart Items */}
            <div className="pos-cart-panel__items">
                {cartItems.length === 0 ? (
                    <div className="pos-cart-panel__empty">
                        {isOccupied ? (
                            <div className="pos-active-bill-notice">
                                <p>Meja ini sedang makan.</p>
                                <button className="pos-btn pos-btn--gold" onClick={() => onViewBill(activeTable.active_order)}>
                                    📄 Lihat Bil / Bayar
                                </button>
                            </div>
                        ) : (
                            <>
                                <p>Tiada item baru</p>
                                <p className="pos-cart-panel__empty-hint">Pilih menu untuk mula</p>
                            </>
                        )}
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <CartItem
                            key={item.cartId}
                            item={item}
                            onUpdateQty={onUpdateQty}
                            onRemove={onRemoveItem}
                            onUpdateNotes={onUpdateNotes}
                        />
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="pos-cart-panel__footer">
                <div className="pos-cart-panel__total">
                    <span>{isOccupied ? 'Tambah:' : 'Jumlah:'}</span>
                    <span className="pos-cart-panel__total-amount">
                        RM {subtotal.toFixed(2)}
                    </span>
                </div>

                <div className="pos-cart-actions">
                    <button
                        className="pos-btn pos-btn--primary"
                        onClick={onPlaceOrder}
                        disabled={cartItems.length === 0 || (orderSource === 'staff' && !selectedTable) || isSubmitting}
                    >
                        {isSubmitting ? '...' : (isOccupied ? '➕ Tambah Order' : '🛒 Hantar Pesanan')}
                    </button>

                    {cartItems.length > 0 && (
                        <button className="pos-btn pos-btn--danger" onClick={onClearCart}>×</button>
                    )}
                </div>
            </div>
        </div>
    );
}

/**
 * BillModal — Shows the consolidated bill for a table/delivery and processes payment.
 */
export default function BillModal({ order, table, onPay, onClose }) {
    if (!order) return null;

    const subtotal = order.items.reduce((sum, item) => sum + item.price_at_sale * item.qty, 0);

    return (
        <div className="pos-modal-overlay">
            <div className="pos-modal pos-modal--large">
                <div className="pos-modal__header">
                    <h3 className="pos-modal__title">
                        Bil {table ? table.name : order.source.toUpperCase()}
                    </h3>
                    <button className="pos-modal__close" onClick={onClose}>×</button>
                </div>

                <div className="pos-modal__body">
                    <div className="admin-bill-view">
                        <div className="admin-bill-meta">
                            <span>No. Pesanan: <strong>#{order.id}</strong></span>
                            <span>Masa Mula: {new Date(order.created_at).toLocaleTimeString()}</span>
                        </div>

                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Kuantiti</th>
                                    <th className="text-right">Harga (RM)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            {item.product.name}
                                            {item.notes && <div className="text-xs opacity-60">({item.notes})</div>}
                                        </td>
                                        <td>{item.qty}x</td>
                                        <td className="text-right">{(item.price_at_sale * item.qty).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="admin-bill-footer">
                            <div className="admin-bill-total">
                                <span>Jumlah Keseluruhan:</span>
                                <strong>RM {subtotal.toFixed(2)}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pos-modal__footer admin-bill-actions">
                    <button className="pos-btn pos-btn--secondary" onClick={onClose}>Batal</button>
                    <div className="admin-payment-group">
                        <span className="admin-payment-label">Bayar guna:</span>
                        <button className="pos-btn pos-btn--primary" onClick={() => onPay(order.id, 'cash')}>💵 Tunai (Cash)</button>
                        <button className="pos-btn pos-btn--gold" onClick={() => onPay(order.id, 'qr')}>📱 QR Pay</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

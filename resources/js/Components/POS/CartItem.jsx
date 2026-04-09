/**
 * CartItem — Single item row in the cart panel with qty controls and notes.
 */
export default function CartItem({ item, onUpdateQty, onRemove, onUpdateNotes }) {
    return (
        <div className="pos-cart-item">
            <div className="pos-cart-item__top">
                <span className="pos-cart-item__name">{item.name}</span>
                <button
                    className="pos-cart-item__remove"
                    onClick={() => onRemove(item.cartId)}
                    title="Buang"
                >
                    ×
                </button>
            </div>

            <div className="pos-cart-item__middle">
                <div className="pos-cart-item__qty-controls">
                    <button
                        className="pos-qty-btn"
                        onClick={() => onUpdateQty(item.cartId, item.qty - 1)}
                    >
                        −
                    </button>
                    <span className="pos-cart-item__qty">{item.qty}</span>
                    <button
                        className="pos-qty-btn"
                        onClick={() => onUpdateQty(item.cartId, item.qty + 1)}
                    >
                        +
                    </button>
                </div>
                <span className="pos-cart-item__line-total">
                    RM {(item.price * item.qty).toFixed(2)}
                </span>
            </div>

            <input
                type="text"
                className="pos-cart-item__notes"
                placeholder="Nota (cth: tak pedas)"
                value={item.notes || ''}
                onChange={(e) => onUpdateNotes(item.cartId, e.target.value)}
            />
        </div>
    );
}

/**
 * ProductCard — Individual touch-friendly product card.
 * Tapping adds to cart (fixed price) or opens price modal (variable price).
 */
export default function ProductCard({ product, categoryType, onAddToCart, onVariablePrice }) {
    const isVariable = categoryType === 'variable';

    const handleClick = () => {
        if (isVariable) {
            onVariablePrice(product);
        } else {
            onAddToCart(product, product.base_price);
        }
    };

    return (
        <button
            className={`pos-product-card ${isVariable ? 'pos-product-card--variable' : ''}`}
            onClick={handleClick}
        >
            <span className="pos-product-card__name">{product.name}</span>
            <span className="pos-product-card__price">
                {isVariable ? 'Harga Ikut' : `RM ${parseFloat(product.base_price).toFixed(2)}`}
            </span>
            {isVariable && <span className="pos-product-card__badge">⚖️</span>}
        </button>
    );
}

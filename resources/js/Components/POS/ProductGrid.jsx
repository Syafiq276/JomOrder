import ProductCard from './ProductCard';

/**
 * ProductGrid — Responsive grid of product cards, filtered by active category.
 */
export default function ProductGrid({ categories, activeCategory, onAddToCart, onVariablePrice }) {
    // Filter categories based on active tab
    const filtered = activeCategory
        ? categories.filter((cat) => cat.id === activeCategory)
        : categories;

    return (
        <div className="pos-product-grid-container">
            {filtered.map((category) => (
                <div key={category.id} className="pos-category-section">
                    {/* Show category header when viewing "Semua" */}
                    {activeCategory === null && (
                        <h3 className="pos-category-header">
                            {category.name}
                            {category.type === 'variable' && (
                                <span className="pos-category-header__badge">Harga Ikut</span>
                            )}
                        </h3>
                    )}
                    <div className="pos-product-grid">
                        {category.products && category.products.length > 0 ? (
                            category.products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    categoryType={category.type}
                                    onAddToCart={onAddToCart}
                                    onVariablePrice={onVariablePrice}
                                />
                            ))
                        ) : (
                            <p className="pos-empty-message">Tiada produk</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

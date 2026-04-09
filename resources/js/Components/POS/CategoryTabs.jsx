/**
 * CategoryTabs — Horizontal scrollable pill tabs for menu categories.
 * Includes an "All" tab at the start.
 */
export default function CategoryTabs({ categories, activeCategory, onSelect }) {
    return (
        <div className="pos-category-tabs">
            <button
                className={`pos-tab ${activeCategory === null ? 'pos-tab--active' : ''}`}
                onClick={() => onSelect(null)}
            >
                Semua
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    className={`pos-tab ${activeCategory === cat.id ? 'pos-tab--active' : ''}`}
                    onClick={() => onSelect(cat.id)}
                >
                    {cat.availability_time === 'morning' && '☀️ '}
                    {cat.availability_time === 'afternoon' && '🌙 '}
                    {cat.name}
                    {cat.type === 'variable' && ' ⚖️'}
                </button>
            ))}
        </div>
    );
}

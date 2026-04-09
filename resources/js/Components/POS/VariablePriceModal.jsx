import { useState, useEffect, useRef } from 'react';

/**
 * VariablePriceModal — Quick-select buttons + custom price input for variable items.
 */
const QUICK_PRICES = [5, 8, 10, 12, 15, 20];

export default function VariablePriceModal({ product, onConfirm, onClose }) {
    const [price, setPrice] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        // Auto-focus the price input when modal opens
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleQuickSelect = (amount) => {
        setPrice(amount.toFixed(2));
    };

    const handleConfirm = () => {
        const numPrice = parseFloat(price);
        if (!numPrice || numPrice <= 0) return;
        onConfirm(product, numPrice);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleConfirm();
        }
        if (e.key === 'Escape') {
            onClose();
        }
    };

    if (!product) return null;

    return (
        <div className="pos-modal-overlay" onClick={onClose}>
            <div className="pos-modal" onClick={(e) => e.stopPropagation()}>
                <div className="pos-modal__header">
                    <h3 className="pos-modal__title">{product.name}</h3>
                    <button className="pos-modal__close" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="pos-modal__body">
                    <p className="pos-modal__label">Pilih Harga:</p>
                    <div className="pos-modal__quick-prices">
                        {QUICK_PRICES.map((amount) => (
                            <button
                                key={amount}
                                className={`pos-quick-price ${
                                    price === amount.toFixed(2) ? 'pos-quick-price--active' : ''
                                }`}
                                onClick={() => handleQuickSelect(amount)}
                            >
                                RM {amount}
                            </button>
                        ))}
                    </div>

                    <div className="pos-modal__custom-price">
                        <label className="pos-modal__label" htmlFor="custom-price">
                            Atau masukkan harga (RM):
                        </label>
                        <div className="pos-modal__input-wrapper">
                            <span className="pos-modal__currency">RM</span>
                            <input
                                ref={inputRef}
                                id="custom-price"
                                type="number"
                                step="0.10"
                                min="0"
                                className="pos-modal__input"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                </div>

                <div className="pos-modal__footer">
                    <button className="pos-btn pos-btn--secondary" onClick={onClose}>
                        Batal
                    </button>
                    <button
                        className="pos-btn pos-btn--primary"
                        onClick={handleConfirm}
                        disabled={!price || parseFloat(price) <= 0}
                    >
                        Tambah ke Pesanan
                    </button>
                </div>
            </div>
        </div>
    );
}

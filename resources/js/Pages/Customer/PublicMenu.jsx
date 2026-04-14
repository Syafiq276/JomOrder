import React, { useState } from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';

/**
 * PublicMenu — The customer-facing product menu.
 * Simplified for mobile usage, focuses on visual browsing.
 */
export default function PublicMenu({ table, categories, customer }) {
    const [activeCategory, setActiveCategory] = useState(categories[0]?.id);

    return (
        <CustomerLayout title="Menu" table={table}>
            <div className="menu-page">
                {/* User Welcome */}
                <div className="user-bar">
                    <p>Hai, <strong>{customer.name || 'Pelanggan'}</strong>! 👋</p>
                    <span className="user-phone">{customer.phone}</span>
                </div>

                {/* Categories Tab (Scrollable) */}
                <div className="customer-categories">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Product List */}
                <div className="product-list">
                    {categories.find(c => c.id === activeCategory)?.products.map(product => (
                        <div key={product.id} className="product-item">
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-desc">{product.description || 'Segar dan sedap.'}</p>
                                <span className="product-price">RM {parseFloat(product.price).toFixed(2)}</span>
                            </div>
                            <div className="product-action">
                                <button className="add-btn">
                                    <span>Pesan</span>
                                    <span>+</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Text */}
                <div className="menu-instructions text-center">
                    <p>Pilih menu kegemaran anda dan sampaikan kepada staff kami, atau tunggu staff kami mengambil pesanan anda. 😊</p>
                    <p className="highlight-text">Resit digital anda akan dihantar ke WhatsApp {customer.phone} selepas bayaran.</p>
                </div>
            </div>

            <style>{`
                .menu-page { padding-bottom: 2rem; }
                .user-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.8rem 1rem;
                    background: rgba(107, 79, 58, 0.05);
                    border-radius: 12px;
                    margin-bottom: 1.5rem;
                }
                .user-bar p { margin: 0; font-size: 0.9rem; }
                .user-phone { font-size: 0.75rem; color: #8B7355; font-weight: 600; }
                
                .customer-categories {
                    display: flex;
                    gap: 0.6rem;
                    overflow-x: auto;
                    padding-bottom: 1rem;
                    scrollbar-width: none;
                }
                .customer-categories::-webkit-scrollbar { display: none; }
                
                .cat-pill {
                    padding: 0.5rem 1.2rem;
                    background: #FFF;
                    border: 1px solid #E8D8C3;
                    border-radius: 50px;
                    white-space: nowrap;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #6B4F3A;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .cat-pill.active {
                    background: #6B4F3A;
                    color: #FFF;
                    border-color: #6B4F3A;
                    box-shadow: 0 4px 10px rgba(107, 79, 58, 0.2);
                }
                
                .product-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .product-item {
                    background: #FFF;
                    padding: 1rem;
                    border-radius: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
                }
                .product-name { font-size: 0.95rem; font-weight: 800; color: #6B4F3A; margin: 0 0 0.2rem; }
                .product-desc { font-size: 0.75rem; color: #8B7355; margin: 0 0 0.5rem; }
                .product-price { font-size: 0.9rem; font-weight: 900; color: #C9A15B; }
                
                .add-btn {
                    background: #FAF6F1;
                    border: 1px solid #E8D8C3;
                    color: #6B4F3A;
                    padding: 0.5rem 1rem;
                    border-radius: 12px;
                    display: flex;
                    gap: 0.5rem;
                    font-weight: 800;
                    font-size: 0.8rem;
                }
                
                .menu-instructions {
                    margin-top: 3rem;
                    padding: 1.5rem;
                    background: #FFF;
                    border-radius: 16px;
                    border: 2px dashed #E8D8C3;
                }
                .menu-instructions p {
                    font-size: 0.85rem;
                    color: #6B4F3A;
                    line-height: 1.5;
                }
                .highlight-text {
                    margin-top: 1rem !important;
                    font-weight: 700;
                    color: #C9A15B !important;
                }
                .text-center { text-align: center; }
            `}</style>
        </CustomerLayout>
    );
}

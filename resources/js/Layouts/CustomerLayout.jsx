import React from 'react';
import { Head, Link } from '@inertiajs/react';

/**
 * CustomerLayout — Mobile-optimized layout for public ordering.
 * Maintains the Café Kak Na "Warung Modern" aesthetic.
 */
export default function CustomerLayout({ children, title, table }) {
    return (
        <div className="customer-layout">
            <Head title={title ? `${title} - JomOrder` : 'JomOrder'} />
            
            <header className="customer-header">
                <div className="customer-header__content">
                    <div className="customer-brand">
                        <span className="customer-logo">JomOrder</span>
                        {table && (
                            <span className="customer-table-tag">Meja {table.name}</span>
                        )}
                    </div>
                </div>
            </header>

            <main className="customer-main">
                {children}
            </main>

            <footer className="customer-footer">
                <p>&copy; {new Date().getFullYear()} Café Kak Na. Dibangunkan oleh JomOrder.</p>
            </footer>

            <style>{`
                .customer-layout {
                    min-height: 100vh;
                    background: #FAF6F1;
                    display: flex;
                    flex-direction: column;
                    font-family: 'Inter', sans-serif;
                }
                .customer-header {
                    background: #6B4F3A;
                    color: #FAF6F1;
                    padding: 1rem;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    box-shadow: 0 2px 10px rgba(74, 55, 40, 0.2);
                }
                .customer-header__content {
                    max-width: 600px;
                    margin: 0 auto;
                }
                .customer-brand {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .customer-logo {
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: #C9A15B;
                    letter-spacing: -0.5px;
                }
                .customer-table-tag {
                    background: #C9A15B;
                    color: #FFF;
                    font-size: 0.75rem;
                    font-weight: 700;
                    padding: 0.3rem 0.8rem;
                    border-radius: 50px;
                    text-transform: uppercase;
                }
                .customer-main {
                    flex: 1;
                    max-width: 600px;
                    width: 100%;
                    margin: 0 auto;
                    padding: 1rem;
                }
                .customer-footer {
                    padding: 1.5rem;
                    text-align: center;
                    font-size: 0.75rem;
                    color: #8B7355;
                    opacity: 0.8;
                }
                
                /* Common Customer UI Components */
                .customer-card {
                    background: #FFF;
                    border-radius: 16px;
                    padding: 1.5rem;
                    box-shadow: 0 4px 15px rgba(74, 55, 40, 0.08);
                    border: 1px solid rgba(107, 79, 58, 0.05);
                }
                .customer-title {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #6B4F3A;
                    margin-bottom: 0.5rem;
                }
                .customer-subtitle {
                    font-size: 0.9rem;
                    color: #8B7355;
                    margin-bottom: 1.5rem;
                }
                .customer-input-group {
                    margin-bottom: 1.2rem;
                }
                .customer-label {
                    display: block;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: #6B4F3A;
                    margin-bottom: 0.4rem;
                }
                .customer-input {
                    width: 100%;
                    padding: 0.8rem 1rem;
                    border: 2px solid #E8D8C3;
                    border-radius: 12px;
                    font-family: inherit;
                    transition: all 0.2s;
                    box-sizing: border-box;
                }
                .customer-input:focus {
                    outline: none;
                    border-color: #C9A15B;
                    box-shadow: 0 0 0 4px rgba(201, 161, 91, 0.1);
                }
                .customer-btn {
                    width: 100%;
                    padding: 1rem;
                    border: none;
                    border-radius: 12px;
                    font-weight: 800;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .customer-btn--primary {
                    background: #6B4F3A;
                    color: #FFF;
                }
                .customer-btn--primary:hover {
                    background: #4A3728;
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    );
}

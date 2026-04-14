import React from 'react';
import { useForm } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';

/**
 * Registration Page — The entry point for customers scanning the QR table code.
 * Collects name and phone number to start the ordering session.
 */
export default function Registration({ table }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('customer.start', table.id));
    };

    return (
        <CustomerLayout title="Mula Pesanan" table={table}>
            <div className="registration-page">
                <div className="welcome-section text-center">
                    <div className="welcome-emoji">☕</div>
                    <h1 className="customer-title">Selamat Datang ke Café Kak Na</h1>
                    <p className="customer-subtitle">
                        Sila masukkan maklumat anda untuk mula memesan dari **Meja {table.name}**.
                    </p>
                </div>

                <div className="customer-card">
                    <form onSubmit={handleSubmit}>
                        <div className="customer-input-group">
                            <label className="customer-label">Nama Anda (Optional)</label>
                            <input
                                type="text"
                                className="customer-input"
                                placeholder="Cth: Syafiq"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                            />
                            {errors.name && <div className="error-text">{errors.name}</div>}
                        </div>

                        <div className="customer-input-group">
                            <label className="customer-label">No. Telefon WhatsApp</label>
                            <input
                                type="tel"
                                className="customer-input"
                                placeholder="Cth: 0123456789"
                                required
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                            />
                            <p className="input-hint">Resit digital akan dihantar ke nombor ini secara automatik.</p>
                            {errors.phone && <div className="error-text">{errors.phone}</div>}
                        </div>

                        <button 
                            type="submit" 
                            className="customer-btn customer-btn--primary"
                            disabled={processing}
                        >
                            {processing ? 'Memproses...' : 'Lihat Menu & Pesan'}
                        </button>
                    </form>
                </div>

                <div className="info-section">
                    <div className="info-item">
                        <span className="info-icon">📋</span>
                        <div>
                            <strong>Pesan & Bayar</strong>
                            <p>Sahkan pesanan anda di menu dan bayar di kaunter atau via QR.</p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .registration-page {
                    padding-top: 1rem;
                }
                .welcome-section {
                    margin-bottom: 2rem;
                }
                .welcome-emoji {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }
                .text-center { text-align: center; }
                .input-hint {
                    font-size: 0.7rem;
                    color: #8B7355;
                    margin-top: 0.4rem;
                }
                .error-text {
                    color: #C0392B;
                    font-size: 0.75rem;
                    font-weight: 600;
                    margin-top: 0.4rem;
                }
                .info-section {
                    margin-top: 2rem;
                }
                .info-item {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem;
                    background: rgba(107, 79, 58, 0.05);
                    border-radius: 12px;
                }
                .info-icon {
                    font-size: 1.5rem;
                }
                .info-item p {
                    margin: 0.2rem 0 0;
                    font-size: 0.8rem;
                    color: #8B7355;
                    line-height: 1.4;
                }
            `}</style>
        </CustomerLayout>
    );
}

import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

/**
 * Admin/Vendors — Manage food suppliers and stall owners.
 */
export default function Vendors({ vendors }) {
    const [isAdding, setIsAdding] = useState(false);
    const [data, setData] = useState({ name: '', contact_person: '', phone: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('admin.vendors.store'), data, {
            onSuccess: () => {
                setIsAdding(false);
                setData({ name: '', contact_person: '', phone: '' });
            }
        });
    };

    const handleToggle = (vendor) => {
        router.patch(route('admin.vendors.update', vendor.id), {
            ...vendor,
            is_active: !vendor.is_active
        });
    };

    return (
        <AdminLayout title="Pengurusan Vendor & Pembekal">
            <div className="admin-header-actions">
                <button className="pos-btn pos-btn--primary" onClick={() => setIsAdding(true)}>
                    + Tambah Vendor Baru
                </button>
            </div>

            <div className="admin-card">
                <div className="admin-card__body">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Nama Vendor</th>
                                <th>Orang Dihubungi</th>
                                <th>No. Telefon</th>
                                <th>Bil. Menu</th>
                                <th>Status</th>
                                <th>Tindakan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendors.map(vendor => (
                                <tr key={vendor.id}>
                                    <td className="font-bold">{vendor.name}</td>
                                    <td>{vendor.contact_person || '-'}</td>
                                    <td>{vendor.phone || '-'}</td>
                                    <td>{vendor.products_count} item</td>
                                    <td>
                                        <span className={`admin-badge ${vendor.is_active ? 'admin-badge--success' : 'admin-badge--danger'}`}>
                                            {vendor.is_active ? 'Aktif' : 'Nyahaktif'}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="admin-action-btn" onClick={() => handleToggle(vendor)}>
                                            {vendor.is_active ? 'Tutup' : 'Buka semula'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Vendor Modal */}
            {isAdding && (
                <div className="pos-modal-overlay">
                    <form className="pos-modal" onSubmit={handleSubmit}>
                        <div className="pos-modal__header">
                            <h3 className="pos-modal__title">Tambah Vendor Baru</h3>
                            <button type="button" className="pos-modal__close" onClick={() => setIsAdding(false)}>×</button>
                        </div>
                        <div className="pos-modal__body admin-form">
                            <div className="admin-form-group">
                                <label>Nama Vendor / Gerai</label>
                                <input 
                                    type="text" required
                                    value={data.name}
                                    onChange={e => setData({...data, name: e.target.value})}
                                    placeholder="Cth: Nasi Lemak Mak Leha"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Nama Hubungan (Opsional)</label>
                                <input 
                                    type="text"
                                    value={data.contact_person}
                                    onChange={e => setData({...data, contact_person: e.target.value})}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>No. Telefon</label>
                                <input 
                                    type="text"
                                    value={data.phone}
                                    onChange={e => setData({...data, phone: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="pos-modal__footer">
                            <button type="button" className="pos-btn pos-btn--secondary" onClick={() => setIsAdding(false)}>Batal</button>
                            <button type="submit" className="pos-btn pos-btn--primary">Simpan Vendor</button>
                        </div>
                    </form>
                </div>
            )}
        </AdminLayout>
    );
}

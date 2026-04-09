import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

/**
 * Admin/Menu — Toggle availability and edit costs/vendors for menu items.
 */
export default function Menu({ categories, vendors }) {
    const [editingProduct, setEditingProduct] = useState(null);
    const [editData, setEditData] = useState({ base_price: 0, cost_price: 0, vendor_id: '' });

    const handleToggle = (type, id, currentState) => {
        router.post(route('admin.menu.toggle'), {
            type,
            id,
            is_active: !currentState
        }, { preserveScroll: true });
    };

    const startEditing = (product) => {
        setEditingProduct(product);
        setEditData({
            base_price: product.base_price,
            cost_price: product.cost_price,
            vendor_id: product.vendor_id || ''
        });
    };

    const handleUpdate = () => {
        router.patch(route('admin.menu.update-product', editingProduct.id), editData, {
            onSuccess: () => setEditingProduct(null),
            preserveScroll: true
        });
    };

    return (
        <AdminLayout title="Urus Menu & Ketersediaan">
            <div className="admin-menu-list">
                {categories.map((category) => (
                    <div key={category.id} className="admin-card admin-menu-section">
                        <div className="admin-card__header admin-menu-header">
                            <div className="admin-menu-header__left">
                                <h3 className="admin-card__title">{category.name}</h3>
                                <span className={`admin-badge ${category.is_active ? 'admin-badge--success' : 'admin-badge--danger'}`}>
                                    {category.is_active ? 'Aktif' : 'Tutup'}
                                </span>
                            </div>
                            <button 
                                className={`pos-btn ${category.is_active ? 'pos-btn--danger' : 'pos-btn--primary'} admin-toggle-btn`}
                                onClick={() => handleToggle('category', category.id, category.is_active)}
                            >
                                {category.is_active ? 'Nyahaktif' : 'Aktifkan'}
                            </button>
                        </div>
                        
                        <div className="admin-card__body">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Menu</th>
                                        <th>Harga (RM)</th>
                                        <th>Kos (RM)</th>
                                        <th>Vendor</th>
                                        <th>Status</th>
                                        <th>Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="font-semibold">{product.name}</td>
                                            <td>{parseFloat(product.base_price).toFixed(2)}</td>
                                            <td>{parseFloat(product.cost_price).toFixed(2)}</td>
                                            <td className="opacity-70">{product.vendor?.name || 'Tiada Vendor'}</td>
                                            <td>
                                                <span className={`admin-dot ${product.is_active ? 'admin-dot--success' : 'admin-dot--danger'}`}></span>
                                                {product.is_active ? 'Aktif' : 'Tiada'}
                                            </td>
                                            <td className="admin-actions">
                                                <button className="admin-action-btn" onClick={() => startEditing(product)}>Edit</button>
                                                <button 
                                                    className="admin-action-btn admin-action-btn--toggle"
                                                    onClick={() => handleToggle('product', product.id, product.is_active)}
                                                >
                                                    {product.is_active ? 'Tutup' : 'Buka'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {editingProduct && (
                <div className="pos-modal-overlay">
                    <div className="pos-modal">
                        <div className="pos-modal__header">
                            <h3 className="pos-modal__title">Kemas Kini {editingProduct.name}</h3>
                            <button className="pos-modal__close" onClick={() => setEditingProduct(null)}>×</button>
                        </div>
                        <div className="pos-modal__body admin-form">
                            <div className="admin-form-group">
                                <label>Harga Jualan (RM)</label>
                                <input 
                                    type="number" step="0.10"
                                    value={editData.base_price}
                                    onChange={e => setEditData({...editData, base_price: e.target.value})}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Kos Bekalan / Vendor (RM)</label>
                                <input 
                                    type="number" step="0.10"
                                    value={editData.cost_price}
                                    onChange={e => setEditData({...editData, cost_price: e.target.value})}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Vendor</label>
                                <select 
                                    value={editData.vendor_id}
                                    onChange={e => setEditData({...editData, vendor_id: e.target.value})}
                                >
                                    <option value="">-- Pilih Vendor --</option>
                                    {vendors.map(v => (
                                        <option key={v.id} value={v.id}>{v.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="pos-modal__footer">
                            <button className="pos-btn pos-btn--secondary" onClick={() => setEditingProduct(null)}>Batal</button>
                            <button className="pos-btn pos-btn--primary" onClick={handleUpdate}>Simpan Perubahan</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

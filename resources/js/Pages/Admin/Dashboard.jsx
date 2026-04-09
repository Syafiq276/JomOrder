import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PlatformComparisonChart from '@/Components/Admin/PlatformComparisonChart';

/**
 * Admin/Dashboard — Updated Phase 5 with dynamic period filtering and platform breakdown.
 */
export default function Dashboard({ period, stats, source_breakdown, popular_items, trend_data }) {
    
    const handlePeriodChange = (e) => {
        router.get(route('admin.dashboard'), { period: e.target.value }, {
            preserveState: true,
            replace: true
        });
    };

    const getPeriodLabel = () => {
        switch (period) {
            case 'today': return 'Hari Ini';
            case 'month': return 'Bulan Ini';
            case 'year': return 'Tahun Ini';
            default: return 'Sepanjang Masa';
        }
    };

    const getSourceLabel = (src) => {
        switch (src) {
            case 'staff': return '🚶 Kedai';
            case 'grab': return '💚 Grab';
            case 'foodpanda': return '💓 Panda';
            default: return src;
        }
    };

    return (
        <AdminLayout title="Dashboard Prestasi">
            {/* Header with Filter */}
            <div className="admin-header-row">
                <h2 className="admin-page-title">Ringkasan Operasi ({getPeriodLabel()})</h2>
                <div className="admin-filter-group">
                    <label htmlFor="period-select">Tempoh:</label>
                    <select 
                        id="period-select" 
                        value={period} 
                        onChange={handlePeriodChange}
                        className="admin-select"
                    >
                        <option value="today">Hari Ini</option>
                        <option value="month">Bulan Ini</option>
                        <option value="year">Tahun Ini</option>
                        <option value="all">Sepanjang Masa</option>
                    </select>
                </div>
            </div>

            <div className="admin-stats-grid">
                <div className="admin-stat-card">
                    <div className="admin-stat-card__label">Hasil Jualan</div>
                    <div className="admin-stat-card__value">RM {stats.revenue.toFixed(2)}</div>
                    <div className="admin-stat-card__hint">{stats.orders} pesanan berbayar</div>
                </div>

                <div className="admin-stat-card admin-stat-card--brown">
                    <div className="admin-stat-card__label">Kos Bekalan</div>
                    <div className="admin-stat-card__value">RM {stats.cost.toFixed(2)}</div>
                    <div className="admin-stat-card__hint">Berdasarkan kos vendor</div>
                </div>

                <div className="admin-stat-card admin-stat-card--success">
                    <div className="admin-stat-card__label">Untung Kasar</div>
                    <div className="admin-stat-card__value">RM {stats.profit.toFixed(2)}</div>
                    <div className="admin-stat-card__hint">Revenue - Cost</div>
                </div>
            </div>

            <div className="admin-dashboard-row">
                {/* Popular Items */}
                <div className="admin-card">
                    <div className="admin-card__header">
                        <h3 className="admin-card__title">Menu Paling Popular</h3>
                    </div>
                    <div className="admin-card__body">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Menu</th>
                                    <th className="text-right">Kuantiti Terjual</th>
                                </tr>
                            </thead>
                            <tbody>
                                {popular_items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item.name}</td>
                                        <td className="text-right font-bold">{item.total_qty}</td>
                                    </tr>
                                ))}
                                {popular_items.length === 0 && (
                                    <tr>
                                        <td colSpan="2" className="text-center py-4 opacity-50">
                                            Tiada data jualan untuk tempoh ini.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Platform Breakdown */}
                <div className="admin-card">
                    <div className="admin-card__header">
                        <h3 className="admin-card__title">Jualan mengikut Platform</h3>
                    </div>
                    <div className="admin-card__body">
                        <PlatformComparisonChart data={source_breakdown} />
                        
                        <div className="admin-source-summary mt-6">
                            {source_breakdown.map((src, idx) => (
                                <div key={idx} className="admin-source-mini-item">
                                    <span className="admin-source-dot" style={{ backgroundColor: src.source === 'staff' ? '#6B4F3A' : (src.source === 'grab' ? '#00B14F' : '#D81B60') }}></span>
                                    <span className="admin-source-mini-name">{getSourceLabel(src.source)}:</span>
                                    <span className="admin-source-mini-value">{src.count} pesanan</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

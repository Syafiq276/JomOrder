import React, { useMemo } from 'react';

/**
 * PlatformComparisonChart — A custom premium SVG-based bar chart for platform comparison.
 */
export default function PlatformComparisonChart({ data }) {
    // Process data into a usable format
    const chartData = useMemo(() => {
        const sources = [
            { id: 'staff', label: '🚶 Kedai', color: '#6B4F3A', total: 0 },
            { id: 'grab', label: '💚 Grab', color: '#00B14F', total: 0 },
            { id: 'foodpanda', label: '💓 Panda', color: '#D81B60', total: 0 },
        ];

        let maxTotal = 0;
        
        sources.forEach(source => {
            const found = data.find(d => d.source === source.id);
            if (found) {
                source.total = parseFloat(found.total);
            }
            if (source.total > maxTotal) maxTotal = source.total;
        });

        // Add small buffer to maxTotal if it's 0 to avoid division by zero
        const scaleMax = maxTotal > 0 ? maxTotal * 1.2 : 100;

        return sources.map(s => ({
            ...s,
            percent: (s.total / scaleMax) * 100
        }));
    }, [data]);

    return (
        <div className="platform-chart">
            <div className="platform-chart__bars">
                {chartData.map((item, idx) => (
                    <div key={item.id} className="platform-chart__row" style={{'--index': idx}}>
                        <div className="platform-chart__label-container">
                            <span className="platform-chart__label">{item.label}</span>
                            <span className="platform-chart__amount">RM {item.total.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        </div>
                        <div className="platform-chart__bar-track">
                            <div 
                                className="platform-chart__bar-fill" 
                                style={{ 
                                    width: `${item.percent}%`, 
                                    backgroundColor: item.color 
                                }}
                            >
                                {item.percent > 15 && (
                                    <span className="platform-chart__bar-percent">
                                        {((item.total / chartData.reduce((sum, s) => sum + s.total, 0)) * 100 || 0).toFixed(0)}%
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Visual Legend / Empty State */}
            {chartData.every(s => s.total === 0) && (
                <div className="platform-chart__empty">
                    Sila buat pesanan untuk melihat perbandingan.
                </div>
            )}
        </div>
    );
}

import { formatDistanceToNow } from 'date-fns';
import { ms } from 'date-fns/locale';

/**
 * OrderTicket — Single order card in the KDS.
 * Updated for Phase 4: NEW tags for items, DELIVERY badges, and Item-level progress.
 */
export default function OrderTicket({ order, onUpdateStatus, onUpdateItemStatus }) {
    const isDelivery = order.source === 'grab' || order.source === 'foodpanda';
    const timeAgo = formatDistanceToNow(new Date(order.created_at), { addSuffix: true, locale: ms });

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'BELUM DISEDIA';
            case 'preparing': return 'SEDANG DISEDIA';
            case 'served': return 'TELAH DIHANTAR';
            default: return status.toUpperCase();
        }
    };

    return (
        <div className={`kds-ticket kds-ticket--${order.status} ${isDelivery ? 'kds-ticket--delivery' : ''}`}>
            <div className="kds-ticket__header">
                <div className="kds-ticket__meta">
                    <h3 className="kds-ticket__table">
                        {order.table ? order.table.name : (order.source === 'grab' ? '🛵 GRAB' : '🐼 PANDA')}
                    </h3>
                    <span className="kds-ticket__id">#{order.id}</span>
                </div>
                <div className="kds-ticket__time">{timeAgo}</div>
            </div>

            <div className="kds-ticket__body">
                <ul className="kds-ticket__items">
                    {order.items.map((item) => (
                        <li 
                            key={item.id} 
                            className={`kds-ticket-item kds-ticket-item--${item.status}`}
                            onClick={() => onUpdateItemStatus(item.id, item.status === 'pending' ? 'preparing' : 'served')}
                        >
                            <div className="kds-ticket-item__qty">{item.qty}x</div>
                            <div className="kds-ticket-item__info">
                                <div className="kds-ticket-item__name">
                                    {item.product.name}
                                    {item.status === 'pending' && <span className="kds-badge-new">NEW</span>}
                                </div>
                                {item.notes && <div className="kds-ticket-item__notes">{item.notes}</div>}
                            </div>
                            <div className="kds-ticket-item__status-dot"></div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="kds-ticket__footer">
                {order.status === 'pending' && (
                    <button 
                        className="pos-btn pos-btn--primary w-full"
                        onClick={() => onUpdateStatus(order.id, 'preparing')}
                    >
                        Mula Memasak
                    </button>
                )}
                {order.status === 'preparing' && (
                    <button 
                        className="pos-btn pos-btn--success w-full"
                        onClick={() => onUpdateStatus(order.id, 'served')}
                    >
                        Selesai / Hidang
                    </button>
                )}
                {order.status === 'served' && (
                    <div className="kds-ticket__served-msg">✓ Telah Dihantar</div>
                )}
            </div>
        </div>
    );
}

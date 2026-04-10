import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * DigitalReceipt — High-fidelity receipt view for Café Kak Na.
 * Designed for screen viewing, printable to 80mm/58mm.
 */
export default function DigitalReceipt({ order, table, onPrint, onShareWhatsApp, onClose }) {
    if (!order) return null;

    // Safety checks for items
    const items = order.items || [];
    const subtotal = items.reduce((sum, item) => {
        const price = parseFloat(item.price_at_sale) || 0;
        const qty = parseInt(item.qty) || 0;
        return sum + (price * qty);
    }, 0);

    // Safety check for date
    let dateStr = "N/A";
    try {
        if (order.created_at) {
            dateStr = new Date(order.created_at).toLocaleString('ms-MY', {
                dateStyle: 'medium',
                timeStyle: 'short'
            });
        }
    } catch (e) {
        console.error("Receipt Date Error:", e);
    }

    const receiptRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // ── PDF Engine ────────────────────────────────────
    const generatePDFBlob = async () => {
        if (!receiptRef.current) return null;
        
        setIsGenerating(true);
        try {
            const canvas = await html2canvas(receiptRef.current, {
                scale: 2, // Better crispness
                useCORS: true,
                backgroundColor: '#ffffff'
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [canvas.width * 0.264583 / 2, canvas.height * 0.264583 / 2] // Accurate size
            });
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
            return pdf.output('blob');
        } catch (err) {
            console.error("PDF Error:", err);
            return null;
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadPDF = async () => {
        const blob = await generatePDFBlob();
        if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Resit_JomOrder_${order.id}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
        }
    };

    const handleSharePDF = async () => {
        const blob = await generatePDFBlob();
        if (!blob) return;

        const file = new File([blob], `Resit_JomOrder_${order.id}.pdf`, { type: 'application/pdf' });
        
        // Native Share (Mobile)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: 'Resit Café Kak Na',
                    text: `Resit Digital untuk Order #${order.id}`
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error("Share error:", err);
                    onShareWhatsApp(order, subtotal); // Fallback to text
                }
            }
        } else {
            // Fallback for desktop: Download + Text share
            handleDownloadPDF();
            onShareWhatsApp(order, subtotal); 
        }
    };

    return (
        <div className="receipt-view">
            <div className="receipt-paper" ref={receiptRef}>
                {/* Header */}
                <div className="receipt-header">
                    <h1 className="receipt-brand">Café Kak Na</h1>
                    <p className="receipt-address">
                        28, Laluan Klebang Restu 18b,<br />
                        31200 Chemor, Perak
                    </p>
                    <div className="receipt-divider"></div>
                </div>

                {/* Meta */}
                <div className="receipt-meta">
                    <div className="receipt-meta-row">
                        <span>No. Resit:</span>
                        <strong>#{order.id}</strong>
                    </div>
                    <div className="receipt-meta-row">
                        <span>Tarikh:</span>
                        <span>{dateStr}</span>
                    </div>
                    {table ? (
                        <div className="receipt-meta-row">
                            <span>Meja:</span>
                            <span>{table.name}</span>
                        </div>
                    ) : (
                        <div className="receipt-meta-row">
                            <span>Platform:</span>
                            <span>{order.source.toUpperCase()}</span>
                        </div>
                    )}
                </div>

                <div className="receipt-divider"></div>

                {/* Items */}
                <div className="receipt-items">
                    <table className="receipt-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th className="text-right">Jumlah (RM)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <div className="receipt-item-name">{item.product?.name || 'Item'}</div>
                                        <div className="receipt-item-qty">{item.qty} x {(parseFloat(item.price_at_sale) || 0).toFixed(2)}</div>
                                        {item.notes && <div className="receipt-item-notes">({item.notes})</div>}
                                    </td>
                                    <td className="text-right valign-top">
                                        {((parseFloat(item.price_at_sale) || 0) * (parseInt(item.qty) || 0)).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="receipt-divider"></div>

                {/* Totals */}
                <div className="receipt-totals">
                    <div className="receipt-total-row">
                        <span>Subtotal:</span>
                        <span>{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="receipt-total-row receipt-total-row--grand">
                        <span>JUMLAH:</span>
                        <span>RM {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="receipt-total-row">
                        <span>Cara Bayaran:</span>
                        <span className="capitalize">{order.payment_method === 'qr' ? '📱 QR Pay' : '💵 Tunai'}</span>
                    </div>
                </div>

                <div className="receipt-footer">
                    <div className="receipt-divider"></div>
                    <p>Terima Kasih! Sila Datang Lagi.</p>
                    <p className="receipt-tagline">Powered by JomOrder</p>
                </div>
            </div>

            {/* Actions (Hidden during print) */}
            <div className="receipt-actions no-print">
                <button className="pos-btn pos-btn--gold" onClick={onPrint} disabled={isGenerating}>
                    🖨️ Cetak
                </button>
                <button className="pos-btn pos-btn--success" onClick={handleSharePDF} disabled={isGenerating}>
                    {isGenerating ? 'Generasi...' : '📱 Kongsi PDF'}
                </button>
                <button className="pos-btn pos-btn--info" onClick={handleDownloadPDF} disabled={isGenerating}>
                    💾 Simpan PDF
                </button>
                <button className="pos-btn pos-btn--secondary" onClick={onClose}>Tutup</button>
            </div>
        </div>
    );
}

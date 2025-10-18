import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import Button from '../../../../components/ui/Button';
import html2pdf from 'html2pdf.js';

const ReceiptModal = ({ isOpen, onClose, receiptData }) => {
    const receiptRef = React.useRef();

    if (!isOpen || !receiptData) return null;

    const downloadReceiptPDF = () => {
        const element = receiptRef.current;
        
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `receipt-${receiptData.receiptNumber}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: true
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait' 
            }
        };

        html2pdf().set(opt).from(element).save();
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            'pending': { color: 'bg-yellow-100 text-yellow-800', text: 'Pending Payout' },
            'processing': { color: 'bg-blue-100 text-blue-800', text: 'Processing' },
            'paid': { color: 'bg-green-100 text-green-800', text: 'Paid' },
            'on_hold': { color: 'bg-red-100 text-red-800', text: 'On Hold' }
        };

        const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', text: status };
        
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 bg-opacity-30 flex items-center justify-center z-50 p-4">
                <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: COLORS.stroke }}>
                        <div>
                            <h2 className="text-2xl font-normal" style={{ color: COLORS.mainTextColor }}>
                                Transaction Receipt
                            </h2>
                            <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                                {receiptData.receiptNumber}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-black text-3xl"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-h-0 overflow-y-auto p-6">
                        {/* Hidden content for PDF generation */}
                        <div ref={receiptRef} className="hidden">
                            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                                <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '15px' }}>
                                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }}>
                                        Evion Charging Platform
                                    </h1>
                                    <h2 style={{ fontSize: '18px', color: '#666', margin: '5px 0 0 0' }}>
                                        Transaction Receipt
                                    </h2>
                                </div>
                                
                                <div style={{ marginBottom: '20px' }}>
                                    <table style={{ width: '100%', fontSize: '12px', marginBottom: '15px' }}>
                                        <tr>
                                            <td style={{ width: '50%', verticalAlign: 'top' }}>
                                                <strong>Receipt Number:</strong><br/>
                                                {receiptData.receiptNumber}<br/><br/>
                                                
                                                <strong>Transaction Date:</strong><br/>
                                                {formatDate(receiptData.transactionDate)}<br/><br/>
                                                
                                                <strong>Status:</strong><br/>
                                                {receiptData.payoutStatus.toUpperCase()}
                                            </td>
                                            <td style={{ width: '50%', verticalAlign: 'top' }}>
                                                <strong>Station:</strong><br/>
                                                {receiptData.stationName}<br/>
                                                {receiptData.stationAddress}<br/><br/>
                                                
                                                <strong>Station Owner:</strong><br/>
                                                {receiptData.stationOwner}
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>
                                        Transaction Details
                                    </h3>
                                    <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                                        <tr>
                                            <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Transaction Type</td>
                                            <td style={{ padding: '8px', borderBottom: '1px solid #eee', textAlign: 'right' }}>{receiptData.transactionType}</td>
                                        </tr>
                                        {receiptData.bookingId !== 'N/A' && (
                                            <tr>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Booking ID</td>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #eee', textAlign: 'right' }}>#{receiptData.bookingId}</td>
                                            </tr>
                                        )}
                                        {receiptData.chargingSessionId !== 'N/A' && (
                                            <tr>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Charging Session ID</td>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #eee', textAlign: 'right' }}>#{receiptData.chargingSessionId}</td>
                                            </tr>
                                        )}
                                        {receiptData.energyDelivered > 0 && (
                                            <tr>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Energy Delivered</td>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #eee', textAlign: 'right' }}>{receiptData.energyDelivered} kWh</td>
                                            </tr>
                                        )}
                                    </table>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>
                                        Payment Breakdown
                                    </h3>
                                    <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                                        <tr>
                                            <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Gross Amount</td>
                                            <td style={{ padding: '8px', borderBottom: '1px solid #eee', textAlign: 'right' }}>LKR {receiptData.grossAmount.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Platform Commission ({receiptData.commissionRate}%)</td>
                                            <td style={{ padding: '8px', borderBottom: '1px solid #eee', textAlign: 'right', color: '#dc3545' }}>- LKR {receiptData.commissionAmount.toFixed(2)}</td>
                                        </tr>
                                        <tr style={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>
                                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Net Amount</td>
                                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'right', color: '#2563eb' }}>LKR {receiptData.netAmount.toFixed(2)}</td>
                                        </tr>
                                    </table>
                                </div>

                                {receiptData.payoutBatch !== 'N/A' && (
                                    <div style={{ marginBottom: '20px', fontSize: '11px', color: '#666' }}>
                                        <strong>Payout Batch:</strong> {receiptData.payoutBatch}
                                    </div>
                                )}

                                <div style={{ textAlign: 'center', fontSize: '10px', color: '#666', borderTop: '1px solid #ddd', paddingTop: '15px', marginTop: '20px' }}>
                                    <div>Generated on {new Date().toLocaleDateString()}</div>
                                    <div>Evion Charging Platform • Thank you for your business!</div>
                                </div>
                            </div>
                        </div>

                        {/* Visible receipt content */}
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="text-center border-b pb-4" style={{ borderColor: COLORS.stroke }}>
                                <h1 className="text-xl font-bold" style={{ color: COLORS.primary }}>
                                    EVion Charging Platform
                                </h1>
                                <h2 className="text-lg" style={{ color: COLORS.mainTextColor }}>
                                    Transaction Receipt
                                </h2>
                            </div>

                            {/* Receipt Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-medium mb-2" style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}>
                                        RECEIPT INFORMATION
                                    </h3>
                                    <div className="space-y-1 text-sm">
                                        <div><strong>Receipt Number:</strong> {receiptData.receiptNumber}</div>
                                        <div><strong>Transaction Date:</strong> {formatDate(receiptData.transactionDate)}</div>
                                        <div><strong>Status:</strong> {getStatusBadge(receiptData.payoutStatus)}</div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2" style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}>
                                        STATION INFORMATION
                                    </h3>
                                    <div className="space-y-1 text-sm">
                                        <div><strong>Station:</strong> {receiptData.stationName}</div>
                                        <div><strong>Address:</strong> {receiptData.stationAddress}</div>
                                        <div><strong>Owner:</strong> {receiptData.stationOwner}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Transaction Details */}
                            <div>
                                <h3 className="font-medium mb-3" style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}>
                                    TRANSACTION DETAILS
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Transaction Type:</span>
                                        <span style={{ color: COLORS.mainTextColor }}>{receiptData.transactionType}</span>
                                    </div>
                                    {receiptData.bookingId !== 'N/A' && (
                                        <div className="flex justify-between">
                                            <span>Booking ID:</span>
                                            <span style={{ color: COLORS.mainTextColor }}>#{receiptData.bookingId}</span>
                                        </div>
                                    )}
                                    {receiptData.chargingSessionId !== 'N/A' && (
                                        <div className="flex justify-between">
                                            <span>Charging Session ID:</span>
                                            <span style={{ color: COLORS.mainTextColor }}>#{receiptData.chargingSessionId}</span>
                                        </div>
                                    )}
                                    {receiptData.energyDelivered > 0 && (
                                        <div className="flex justify-between">
                                            <span>Energy Delivered:</span>
                                            <span style={{ color: COLORS.mainTextColor }}>{receiptData.energyDelivered} kWh</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Payment Breakdown */}
                            <div>
                                <h3 className="font-medium mb-3" style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.sm }}>
                                    PAYMENT BREAKDOWN
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Gross Amount:</span>
                                        <span style={{ color: COLORS.mainTextColor }}>LKR {receiptData.grossAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Platform Commission ({receiptData.commissionRate}%):</span>
                                        <span style={{ color: COLORS.danger }}>- LKR {receiptData.commissionAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t" style={{ borderColor: COLORS.stroke }}>
                                        <span className="font-bold">Net Amount:</span>
                                        <span className="font-bold text-lg" style={{ color: COLORS.primary }}>
                                            LKR {receiptData.netAmount.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {receiptData.payoutBatch !== 'N/A' && (
                                <div className="text-center text-sm" style={{ color: COLORS.secondaryText }}>
                                    <strong>Payout Batch:</strong> {receiptData.payoutBatch}
                                </div>
                            )}

                            <div className="text-center text-xs" style={{ color: COLORS.secondaryText, borderTop: `1px solid ${COLORS.stroke}`, paddingTop: '15px' }}>
                                <div>Generated on {new Date().toLocaleDateString()}</div>
                                <div>EVion Charging Platform • Thank you for your business!</div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 p-6 border-t bg-white" style={{ borderColor: COLORS.stroke }}>
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={downloadReceiptPDF}>
                            Download PDF
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceiptModal;
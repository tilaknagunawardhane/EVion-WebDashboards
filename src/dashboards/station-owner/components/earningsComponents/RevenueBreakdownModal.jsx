import React, { useRef } from 'react';
import { COLORS, FONTS } from '../../../../constants';
import Button from '../../../../components/ui/Button';
import html2pdf from 'html2pdf.js';

const RevenueBreakdownModal = ({ isOpen, onClose, data, getMonthName }) => {
    const reportRef = useRef();

    if (!isOpen || !data) return null;

    const { month, year, earnings } = data;

    // Group earnings by station
    const breakdownByStation = earnings.reduce((acc, earning) => {
        const stationId = earning.station_id?._id || 'unknown';
        if (!acc[stationId]) {
            acc[stationId] = {
                station_name: earning.station_id?.station_name || 'Unknown Station',
                total_revenue: 0,
                commission: 0,
                net_earnings: 0,
                transactions: []
            };
        }
        
        acc[stationId].total_revenue += earning.gross_amount;
        acc[stationId].commission += earning.platform_commission;
        acc[stationId].net_earnings += earning.net_amount;
        acc[stationId].transactions.push(earning);
        
        return acc;
    }, {});

    const totalNetEarnings = Object.values(breakdownByStation).reduce(
        (sum, station) => sum + station.net_earnings, 0
    );

    const totalCommission = Object.values(breakdownByStation).reduce(
        (sum, station) => sum + station.commission, 0
    );

    const totalGross = Object.values(breakdownByStation).reduce(
        (sum, station) => sum + station.total_revenue, 0
    );

    const downloadPDF = () => {
        // Create a temporary div for PDF generation
        const element = document.createElement('div');
        element.style.padding = '20px';
        element.style.fontFamily = 'Arial, sans-serif';
        element.style.width = '210mm'; // A4 width
        element.style.minHeight = '297mm'; // A4 height

        // Build the PDF content
        element.innerHTML = `
            <h1 style="text-align: center; margin-bottom: 10px; font-size: 24px; color: #333;">
                Revenue Breakdown Report
            </h1>
            <h2 style="text-align: center; margin-bottom: 20px; font-size: 18px; color: #666;">
                ${getMonthName(month)} ${year}
            </h2>
            
            ${Object.entries(breakdownByStation).map(([stationId, station]) => `
                <div style="margin-bottom: 25px; page-break-inside: avoid;">
                    <h3 style="
                        background-color: #f8f9fa; 
                        padding: 10px; 
                        border-bottom: 1px solid #ddd;
                        font-size: 16px;
                        font-weight: bold;
                        margin: 0;
                    ">
                        ${station.station_name}
                    </h3>
                    
                    <table style="
                        width: 100%; 
                        border-collapse: collapse;
                        font-size: 11px;
                        margin-bottom: 10px;
                    ">
                        <thead>
                            <tr style="background-color: #f1f1f1;">
                                <th style="border: 1px solid #ddd; padding: 6px; text-align: left;">Date</th>
                                <th style="border: 1px solid #ddd; padding: 6px; text-align: left;">Type</th>
                                <th style="border: 1px solid #ddd; padding: 6px; text-align: left;">Description</th>
                                <th style="border: 1px solid #ddd; padding: 6px; text-align: right;">Gross (LKR)</th>
                                <th style="border: 1px solid #ddd; padding: 6px; text-align: right;">Commission</th>
                                <th style="border: 1px solid #ddd; padding: 6px; text-align: right;">Net (LKR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${station.transactions.map((transaction, idx) => `
                                <tr>
                                    <td style="border: 1px solid #ddd; padding: 6px;">
                                        ${new Date(transaction.createdAt).toLocaleDateString()}
                                    </td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-transform: capitalize;">
                                        ${transaction.type.replace('_', ' ')}
                                    </td>
                                    <td style="border: 1px solid #ddd; padding: 6px;">
                                        ${transaction.type === 'booking_fee' 
                                            ? `Booking #${transaction.booking_id?._id?.slice(-6) || 'N/A'}` 
                                            : `Charging Session #${transaction.charging_session_id?._id?.slice(-6) || 'N/A'}`
                                        }
                                    </td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">
                                        ${transaction.gross_amount.toFixed(2)}
                                    </td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right; color: #dc3545;">
                                        -${transaction.platform_commission.toFixed(2)}
                                    </td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right; font-weight: bold;">
                                        ${transaction.net_amount.toFixed(2)}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot>
                            <tr style="background-color: #f8f9fa; font-weight: bold;">
                                <td colspan="3" style="border: 1px solid #ddd; padding: 6px; text-align: right;">
                                    Station Total:
                                </td>
                                <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">
                                    ${station.total_revenue.toFixed(2)}
                                </td>
                                <td style="border: 1px solid #ddd; padding: 6px; text-align: right; color: #dc3545;">
                                    -${station.commission.toFixed(2)}
                                </td>
                                <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">
                                    ${station.net_earnings.toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            `).join('')}
            
            <!-- Summary Section -->
            <div style="
                margin-top: 20px; 
                padding: 15px; 
                background-color: #f8f9fa;
                border: 1px solid #ddd;
                border-radius: 5px;
            ">
                <h4 style="margin-bottom: 10px; font-size: 16px; font-weight: bold;">
                    Total Summary
                </h4>
                <div style="display: flex; justify-content: space-between; font-size: 14px;">
                    <div>
                        <div>Total Transactions: ${earnings.length}</div>
                    </div>
                    <div style="text-align: right;">
                        <div>Gross Revenue: <strong>LKR ${totalGross.toFixed(2)}</strong></div>
                        <div style="color: #dc3545;">Platform Commission: <strong>LKR ${totalCommission.toFixed(2)}</strong></div>
                        <div style="font-size: 16px; font-weight: bold; margin-top: 5px;">
                            Net Payout: <strong>LKR ${totalNetEarnings.toFixed(2)}</strong>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="
                margin-top: 20px; 
                text-align: center; 
                font-size: 10px; 
                color: #666;
                border-top: 1px solid #ddd;
                padding-top: 10px;
            ">
                Generated on ${new Date().toLocaleDateString()} • Evion Charging Platform
            </div>
        `;

        // Append to body temporarily
        document.body.appendChild(element);

        const opt = {
            margin: [10, 10, 10, 10],
            filename: `revenue-breakdown-${getMonthName(month)}-${year}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: true,
                width: element.scrollWidth,
                height: element.scrollHeight
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait' 
            }
        };

        html2pdf()
            .set(opt)
            .from(element)
            .save()
            .then(() => {
                // Clean up: remove temporary element
                document.body.removeChild(element);
            })
            .catch((error) => {
                console.error('PDF generation failed:', error);
                document.body.removeChild(element);
            });
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 bg-opacity-30 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-xl shadow-xl overflow-hidden">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: COLORS.stroke }}>
                        <div>
                            <h2 className="text-2xl font-normal" style={{ color: COLORS.mainTextColor }}>
                                Revenue Breakdown
                            </h2>
                            <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                                {getMonthName(month)} {year}
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
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-6">
                            {Object.entries(breakdownByStation).map(([stationId, station]) => (
                                <div key={stationId} className="border rounded-lg" style={{ borderColor: COLORS.stroke }}>
                                    <div className="p-4 border-b" style={{ borderColor: COLORS.stroke, backgroundColor: COLORS.background }}>
                                        <h3 className="font-medium text-lg" style={{ color: COLORS.mainTextColor }}>
                                            {station.station_name}
                                        </h3>
                                    </div>
                                    
                                    <div className="p-4">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr style={{ color: COLORS.secondaryText }}>
                                                    <th className="text-left py-2">Date</th>
                                                    <th className="text-left py-2">Type</th>
                                                    <th className="text-left py-2">Description</th>
                                                    <th className="text-right py-2">Gross (LKR)</th>
                                                    <th className="text-right py-2">Commission</th>
                                                    <th className="text-right py-2">Net (LKR)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {station.transactions.map((transaction, idx) => (
                                                    <tr key={idx} style={{ color: COLORS.mainTextColor }}>
                                                        <td className="py-2">
                                                            {new Date(transaction.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="py-2 capitalize">
                                                            {transaction.type.replace('_', ' ')}
                                                        </td>
                                                        <td className="py-2">
                                                            {transaction.type === 'booking_fee' 
                                                                ? `Booking #${transaction.booking_id?._id?.slice(-6) || 'N/A'}`
                                                                : `Charging Session #${transaction.charging_session_id?._id?.slice(-6) || 'N/A'}`
                                                            }
                                                        </td>
                                                        <td className="py-2 text-right">
                                                            {transaction.gross_amount.toFixed(2)}
                                                        </td>
                                                        <td className="py-2 text-right" style={{ color: COLORS.danger }}>
                                                            -{transaction.platform_commission.toFixed(2)}
                                                        </td>
                                                        <td className="py-2 text-right font-medium" style={{ color: COLORS.primary }}>
                                                            {transaction.net_amount.toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr className="border-t" style={{ borderColor: COLORS.stroke }}>
                                                    <td colSpan="3" className="py-2 font-medium text-right">
                                                        Station Total:
                                                    </td>
                                                    <td className="py-2 text-right font-medium">
                                                        {station.total_revenue.toFixed(2)}
                                                    </td>
                                                    <td className="py-2 text-right font-medium" style={{ color: COLORS.danger }}>
                                                        -{station.commission.toFixed(2)}
                                                    </td>
                                                    <td className="py-2 text-right font-medium" style={{ color: COLORS.primary }}>
                                                        {station.net_earnings.toFixed(2)}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="mt-6 p-4 border rounded-lg" style={{ borderColor: COLORS.stroke, backgroundColor: COLORS.background }}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-medium" style={{ color: COLORS.mainTextColor }}>
                                        Total Summary
                                    </h4>
                                    <p className="text-sm" style={{ color: COLORS.secondaryText }}>
                                        {earnings.length} transactions
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm" style={{ color: COLORS.secondaryText }}>
                                        Gross Revenue: <span className="font-medium">LKR {totalGross.toFixed(2)}</span>
                                    </div>
                                    <div className="text-sm" style={{ color: COLORS.danger }}>
                                        Platform Commission: <span className="font-medium">LKR {totalCommission.toFixed(2)}</span>
                                    </div>
                                    <div className="text-lg font-bold mt-1" style={{ color: COLORS.primary }}>
                                        Net Payout: LKR {totalNetEarnings.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 p-6 border-t" style={{ borderColor: COLORS.stroke }}>
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={downloadPDF}>
                            Download Report
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueBreakdownModal;
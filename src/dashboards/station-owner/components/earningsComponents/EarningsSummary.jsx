import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import Button from '../../../../components/ui/Button';
import html2pdf from 'html2pdf.js';

const EarningsSummary = ({ data, onViewBreakdown }) => {
    const {
        total_net = 0,
        total_gross = 0,
        total_commission = 0,
        pending_earnings = 0,
        earnings_count = 0,
        breakdown_by_type = {},
        breakdown_by_station = {}
    } = data;

    const downloadSummaryPDF = () => {
        // Create a temporary div for PDF generation
        const element = document.createElement('div');
        element.style.padding = '20px';
        element.style.fontFamily = 'Arial, sans-serif';
        element.style.width = '210mm'; // A4 width
        element.style.minHeight = '297mm'; // A4 height

        // Get current month and year
        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
        const currentYear = currentDate.getFullYear();

        // Build the PDF content
        element.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="margin-bottom: 5px; font-size: 24px; color: #333;">
                    Monthly Earnings Summary
                </h1>
                <h2 style="margin: 0; font-size: 18px; color: #666;">
                    ${currentMonth} ${currentYear}
                </h2>
            </div>
            
            <!-- Summary Cards -->
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 25px;">
                <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #f0f9ff;">
                    <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">Net Earnings</h3>
                    <div style="font-size: 20px; font-weight: bold; color: #2563eb;">LKR ${total_net.toFixed(2)}</div>
                    <div style="font-size: 12px; color: #666;">${earnings_count} transactions</div>
                </div>
                
                <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #fff;">
                    <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">Pending Payout</h3>
                    <div style="font-size: 20px; font-weight: bold; color: #f59e0b;">LKR ${pending_earnings.toFixed(2)}</div>
                    <div style="font-size: 12px; color: #666;">Awaiting payment</div>
                </div>
                
                <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #fff;">
                    <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">Platform Commission</h3>
                    <div style="font-size: 20px; font-weight: bold; color: #dc2626;">LKR ${total_commission.toFixed(2)}</div>
                    <div style="font-size: 12px; color: #666;">10% of gross earnings</div>
                </div>
                
                <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #fff;">
                    <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">Gross Revenue</h3>
                    <div style="font-size: 20px; font-weight: bold; color: #059669;">LKR ${total_gross.toFixed(2)}</div>
                    <div style="font-size: 12px; color: #666;">Before commission</div>
                </div>
            </div>

            <!-- Breakdown Sections -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                <!-- By Service Type -->
                <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #fff;">
                    <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #333; border-bottom: 2px solid #f1f1f1; padding-bottom: 8px;">
                        Earnings by Service Type
                    </h3>
                    <div style="font-size: 13px;">
                        ${Object.entries(breakdown_by_type).map(([type, typeData]) => `
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #f5f5f5;">
                                <span style="text-transform: capitalize; color: #333;">${type.replace('_', ' ')}</span>
                                <div style="text-align: right;">
                                    <div style="font-weight: bold; color: #2563eb;">LKR ${typeData.amount.toFixed(2)}</div>
                                    <div style="font-size: 11px; color: #666;">
                                        ${typeData.count} ${typeData.count === 1 ? 'transaction' : 'transactions'}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- By Station -->
                <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #fff;">
                    <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #333; border-bottom: 2px solid #f1f1f1; padding-bottom: 8px;">
                        Earnings by Station
                    </h3>
                    <div style="font-size: 13px;">
                        ${Object.entries(breakdown_by_station).map(([stationId, stationData]) => `
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #f5f5f5;">
                                <span style="color: #333; max-width: 60%;">${stationData.station_name}</span>
                                <div style="text-align: right;">
                                    <div style="font-weight: bold; color: #2563eb;">LKR ${stationData.amount.toFixed(2)}</div>
                                    <div style="font-size: 11px; color: #666;">${stationData.count} transactions</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Overall Summary -->
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f8f9fa; margin-top: 20px;">
                <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #333; text-align: center;">
                    Overall Summary
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 14px;">
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Total Transactions:</span>
                            <span style="font-weight: bold;">${earnings_count}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Gross Revenue:</span>
                            <span style="font-weight: bold; color: #059669;">LKR ${total_gross.toFixed(2)}</span>
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Platform Commission:</span>
                            <span style="font-weight: bold; color: #dc2626;">LKR ${total_commission.toFixed(2)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Net Earnings:</span>
                            <span style="font-weight: bold; color: #2563eb;">LKR ${total_net.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 15px; padding-top: 15px; border-top: 2px solid #ddd;">
                    <div style="font-size: 16px; font-weight: bold; color: #333;">
                        Available for Payout: <span style="color: #f59e0b;">LKR ${pending_earnings.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div style="margin-top: 30px; text-align: center; font-size: 10px; color: #666; border-top: 1px solid #ddd; padding-top: 15px;">
                <div>Generated on ${new Date().toLocaleDateString()} • Evion Charging Platform</div>
                <div style="margin-top: 5px;">This is an automated earnings summary report</div>
            </div>
        `;

        // Append to body temporarily
        document.body.appendChild(element);

        const opt = {
            margin: [10, 10, 10, 10],
            filename: `earnings-summary-${currentMonth}-${currentYear}.pdf`,
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
        <div className="space-y-6">
            {/* Main Earnings Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div 
                    className="rounded-xl p-6 border"
                    style={{ 
                        backgroundColor: COLORS.bgGreen,
                        borderColor: COLORS.stroke 
                    }}
                >
                    <h3 className="text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>
                        Net Earnings (This Month)
                    </h3>
                    <div className="text-2xl font-bold mb-1" style={{ color: COLORS.primary }}>
                        LKR {total_net.toFixed(2)}
                    </div>
                    <div className="text-sm" style={{ color: COLORS.secondaryText }}>
                        {earnings_count} transactions
                    </div>
                </div>

                <div className="rounded-xl p-6 border" style={{ borderColor: COLORS.stroke, backgroundColor: 'white' }}>
                    <h3 className="text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>
                        Pending Payout
                    </h3>
                    <div className="text-2xl font-bold mb-1" style={{ color: COLORS.warning }}>
                        LKR {pending_earnings.toFixed(2)}
                    </div>
                    <div className="text-sm" style={{ color: COLORS.secondaryText }}>
                        Awaiting payment
                    </div>
                </div>

                <div className="rounded-xl p-6 border" style={{ borderColor: COLORS.stroke, backgroundColor: 'white' }}>
                    <h3 className="text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>
                        Platform Commission
                    </h3>
                    <div className="text-2xl font-bold mb-1" style={{ color: COLORS.danger }}>
                        LKR {total_commission.toFixed(2)}
                    </div>
                    <div className="text-sm" style={{ color: COLORS.secondaryText }}>
                        10% of gross earnings
                    </div>
                </div>

                <div className="rounded-xl p-6 border" style={{ borderColor: COLORS.stroke, backgroundColor: 'white' }}>
                    <h3 className="text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>
                        Gross Revenue
                    </h3>
                    <div className="text-2xl font-bold mb-1" style={{ color: COLORS.success }}>
                        LKR {total_gross.toFixed(2)}
                    </div>
                    <div className="text-sm" style={{ color: COLORS.secondaryText }}>
                        Before commission
                    </div>
                </div>
            </div>

            {/* Breakdown and Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Earnings by Type */}
                <div className="lg:col-span-2">
                    <div className="rounded-xl p-6 border" style={{ borderColor: COLORS.stroke, backgroundColor: 'white' }}>
                        <h3 className="text-lg font-medium mb-4" style={{ color: COLORS.mainTextColor }}>
                            Earnings Breakdown
                        </h3>
                        
                        <div className="space-y-4">
                            {/* By Type */}
                            <div>
                                <h4 className="text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>
                                    By Service Type
                                </h4>
                                <div className="space-y-2">
                                    {Object.entries(breakdown_by_type).map(([type, typeData]) => (
                                        <div key={type} className="flex justify-between items-center">
                                            <span className="capitalize" style={{ color: COLORS.mainTextColor }}>
                                                {type.replace('_', ' ')}
                                            </span>
                                            <div>
                                                <span className="font-medium" style={{ color: COLORS.primary }}>
                                                    LKR {typeData.amount.toFixed(2)}
                                                </span>
                                                <span className="text-sm ml-2" style={{ color: COLORS.secondaryText }}>
                                                    ({typeData.count} {typeData.count === 1 ? 'transaction' : 'transactions'})
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* By Station */}
                            <div>
                                <h4 className="text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>
                                    By Station
                                </h4>
                                <div className="space-y-2">
                                    {Object.entries(breakdown_by_station).map(([stationId, stationData]) => (
                                        <div key={stationId} className="flex justify-between items-center">
                                            <span style={{ color: COLORS.mainTextColor }}>
                                                {stationData.station_name}
                                            </span>
                                            <div>
                                                <span className="font-medium" style={{ color: COLORS.primary }}>
                                                    LKR {stationData.amount.toFixed(2)}
                                                </span>
                                                <span className="text-sm ml-2" style={{ color: COLORS.secondaryText }}>
                                                    ({stationData.count})
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                    <div className="rounded-xl p-6 border" style={{ borderColor: COLORS.stroke, backgroundColor: 'white' }}>
                        <h3 className="text-lg font-medium mb-4" style={{ color: COLORS.mainTextColor }}>
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <Button 
                                variant="primary" 
                                className="w-full"
                                onClick={onViewBreakdown}
                            >
                                View Detailed Breakdown
                            </Button>
                            <Button 
                                variant="outline" 
                                className="w-full"
                                onClick={downloadSummaryPDF}
                            >
                                Download Summary Report
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EarningsSummary;
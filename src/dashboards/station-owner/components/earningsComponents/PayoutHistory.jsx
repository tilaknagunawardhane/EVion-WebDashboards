import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import Button from '../../../../components/ui/Button';

const PayoutHistory = ({ payouts, onViewAll, showAll = false, loading }) => {
    const getStatusBadge = (status) => {
        const statusConfig = {
            'paid': { color: 'bg-green-100 text-green-800', text: 'Paid' },
            'pending': { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
            'failed': { color: 'bg-red-100 text-red-800', text: 'Failed' }
        };

        const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', text: status };
        
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const getMonthName = (month) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month - 1] || 'Unknown';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="text-lg">Loading payout history...</div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.stroke }}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium" style={{ color: COLORS.mainTextColor }}>
                    Payout History
                </h2>
                {!showAll && payouts.length > 0 && (
                    <Button variant="outline" onClick={onViewAll}>
                        View All
                    </Button>
                )}
            </div>

            {payouts.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-gray-500 mb-2">No payout history found</div>
                    <div className="text-sm text-gray-400">
                        Your payouts will appear here once they are processed.
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {(showAll ? payouts : payouts.slice(0, 3)).map((payout, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 border rounded-lg"
                            style={{ borderColor: COLORS.stroke }}
                        >
                            <div className="flex items-center space-x-4">
                                <div 
                                    className="w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: COLORS.bgGreen }}
                                >
                                    <span className="text-lg font-bold" style={{ color: COLORS.primary }}>
                                        {getMonthName(payout.month).charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <div className="font-medium" style={{ color: COLORS.mainTextColor }}>
                                        {getMonthName(payout.month)} {payout.year}
                                    </div>
                                    <div className="text-sm" style={{ color: COLORS.secondaryText }}>
                                        Batch: {payout.batch_number}
                                    </div>
                                    {payout.paid_at && (
                                        <div className="text-xs" style={{ color: COLORS.secondaryText }}>
                                            Paid on: {new Date(payout.paid_at).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="text-right">
                                <div className="text-lg font-bold mb-1" style={{ color: COLORS.primary }}>
                                    LKR {payout.amount.toFixed(2)}
                                </div>
                                <div className="mb-1">
                                    {getStatusBadge(payout.status)}
                                </div>
                                {payout.bank_reference && (
                                    <div className="text-xs" style={{ color: COLORS.secondaryText }}>
                                        Ref: {payout.bank_reference}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PayoutHistory;
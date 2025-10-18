import React from 'react';
import { FONTS, COLORS } from "../../../../constants";

const BatchDetailsModal = ({ isOpen, onClose, batchData }) => {
    if (!isOpen || !batchData) return null;

    const { batch, earnings } = batchData;
    
    const formatStatus = (status) => {
        const statusMap = {
            'draft': 'Draft',
            'approved': 'Approved',
            'processing': 'Processing',
            'completed': 'Completed',
            'failed': 'Failed'
        };
        return statusMap[status] || status;
    };

    const getMonthName = (month) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month - 1] || 'Unknown';
    };

    const getStatusBadge = (status) => {
        const statusText = formatStatus(status);
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === 'completed' ? 'bg-green-100 text-green-800' :
                status === 'approved' ? 'bg-blue-100 text-blue-800' :
                status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                status === 'failed' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
            }`}>
                {statusText}
            </span>
        );
    };

    const getPayoutStatusBadge = (status) => {
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === 'paid' ? 'bg-green-100 text-green-800' :
                status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
            }`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Payout Batch Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Batch Information */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500">Batch Number</h3>
                            <p className="text-lg font-semibold mt-1">{batch.batch_number}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500">Period</h3>
                            <p className="text-lg font-semibold mt-1">{getMonthName(batch.month)} {batch.year}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                            <p className="text-lg font-semibold mt-1">LKR {batch.total_amount?.toFixed(2)}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500">Status</h3>
                            <div className="mt-1">{getStatusBadge(batch.status)}</div>
                        </div>
                    </div>

                    {/* Payouts Section */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">Station Owner Payouts</h3>
                        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Station Owner
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Business
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Bank Details
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Payment Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {batch.payouts.map((payout, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {payout.station_owner_id?.name || 'N/A'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {payout.station_owner_id?.email || 'N/A'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {payout.station_owner_id?.contact || 'N/A'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {payout.station_owner_id?.businessName || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {payout.station_owner_id?.bank?.name || 'N/A'}
                                                    {payout.station_owner_id?.bank?.code && (
                                                        <span className="text-xs text-gray-500 ml-1">
                                                            ({payout.station_owner_id.bank.code})
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {payout.station_owner_id?.branch || 'N/A'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Acc: {payout.station_owner_id?.accountNumber || 'N/A'}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    Holder: {payout.station_owner_id?.accountHolderName || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                LKR {payout.amount?.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getPayoutStatusBadge(payout.status)}
                                                {payout.bank_reference && (
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        Ref: {payout.bank_reference}
                                                    </div>
                                                )}
                                                {payout.payment_proof_url && (
                                                    <div className="text-xs mt-1">
                                                        <a 
                                                            href={payout.payment_proof_url} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-800"
                                                        >
                                                            View Proof
                                                        </a>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {payout.paid_at ? new Date(payout.paid_at).toLocaleDateString() : '-'}
                                                {payout.paid_at && (
                                                    <div className="text-xs text-gray-500">
                                                        {new Date(payout.paid_at).toLocaleTimeString()}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Summary Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h3 className="text-sm font-medium text-blue-700">Total Payouts</h3>
                            <p className="text-2xl font-bold text-blue-800 mt-1">
                                {batch.payouts.length}
                            </p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h3 className="text-sm font-medium text-green-700">Paid Payouts</h3>
                            <p className="text-2xl font-bold text-green-800 mt-1">
                                {batch.payouts.filter(p => p.status === 'paid').length}
                            </p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                            <h3 className="text-sm font-medium text-yellow-700">Pending Payouts</h3>
                            <p className="text-2xl font-bold text-yellow-800 mt-1">
                                {batch.payouts.filter(p => p.status === 'pending').length}
                            </p>
                        </div>
                    </div>

                    {/* Earnings Breakdown */}
                    {earnings && earnings.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4">Earnings Breakdown</h3>
                            <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Station
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Gross Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Commission
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Net Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {earnings.map((earning, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {earning.station_id?.station_name || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                                                    {earning.type?.replace('_', ' ') || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    LKR {earning.gross_amount?.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    LKR {earning.platform_commission?.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    LKR {earning.net_amount?.toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Batch Metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Created Information</h3>
                            <p className="text-sm">
                                <strong>Created By:</strong> {batch.created_by?.email || 'N/A'}
                            </p>
                            <p className="text-sm">
                                <strong>Created Date:</strong> {new Date(batch.createdAt).toLocaleString()}
                            </p>
                        </div>
                        {batch.approved_by && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Approval Information</h3>
                                <p className="text-sm">
                                    <strong>Approved By:</strong> {batch.approved_by?.email || 'N/A'}
                                </p>
                                <p className="text-sm">
                                    <strong>Updated Date:</strong> {new Date(batch.updatedAt).toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>

                    {batch.notes && (
                        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
                            <p className="text-sm text-gray-900">{batch.notes}</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BatchDetailsModal;

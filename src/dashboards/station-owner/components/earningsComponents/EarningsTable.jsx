import React, { useState } from 'react';
import { COLORS } from '../../../../constants';
import DataTable from '../../../../components/ui/DataTable';
import DataTableTopBar from '../../../../components/ui/DataTableTopBar';

const EarningsTable = ({ earnings, onViewBreakdown, getMonthName, loading }) => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState(null);

    const columns = [
        'period',
        'total_earnings',
        'net_earnings',
        'commission',
        'transactions',
        'payout_status',
        'actions'
    ];

    const filterOptions = [
        { label: 'All Status', value: 'all' },
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Paid', value: 'paid' }
    ];

    const sortOptions = [
        { label: 'Month', value: 'month' },
        { label: 'Year', value: 'year' },
        { label: 'Earnings', value: 'total_earnings' },
        { label: 'Status', value: 'payout_status' }
    ];

    const getStatusBadge = (status) => {
        const statusConfig = {
            'pending': { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
            'processing': { color: 'bg-blue-100 text-blue-800', text: 'Processing' },
            'paid': { color: 'bg-green-100 text-green-800', text: 'Paid' },
            'on_hold': { color: 'bg-red-100 text-red-800', text: 'On Hold' }
        };

        const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', text: status };
        
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const tableData = earnings.map(period => ({
        id: `${period.year}-${period.month}`,
        period: `${getMonthName(period.month)} ${period.year}`,
        total_earnings: `LKR ${period.total_earnings.toFixed(2)}`,
        net_earnings: `LKR ${period.net_earnings.toFixed(2)}`,
        commission: `LKR ${period.total_commission.toFixed(2)}`,
        transactions: period.earnings_count.toString(),
        payout_status: getStatusBadge(period.payout_status),
        actions: (
            <button
                onClick={() => onViewBreakdown(period.month, period.year)}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors"
            >
                View Details
            </button>
        )
    }));

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading earnings history...</div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border" style={{ borderColor: COLORS.stroke }}>
            <DataTableTopBar
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                sort={sort}
                setSort={setSort}
                filterOptions={filterOptions}
                sortOptions={sortOptions}
                searchPlaceholder="Search earnings..."
            />
            
            {earnings.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-500 text-lg mb-2">No earnings history found</div>
                    <div className="text-sm text-gray-400">
                        Your earnings will appear here once you start receiving bookings and charging sessions.
                    </div>
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={tableData}
                    filter={filter}
                    sort={sort}
                    search={search}
                />
            )}
        </div>
    );
};

export default EarningsTable;
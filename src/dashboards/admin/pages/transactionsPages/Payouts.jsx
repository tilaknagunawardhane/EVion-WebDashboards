import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { FONTS, COLORS } from "../../../../constants";
import AdminPageHeader from '../../components/AdminPageHeader';
import DataTable from '../../../../components/ui/DataTable';
import DataTableTopBar from '../../../../components/ui/DataTableTopBar';
import TabBar from '../../../../components/ui/TabBar';
import PaymentProofModal from '../../components/transactions/PaymentProofModal';
import BatchDetailsModal from '../../components/transactions/BatchDetailsModal';
import axios from 'axios';
import OverviewCard from '../../components/OverviewCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const tabs = [
    { id: 'draft', label: 'Pending Payment' },
    { id: 'approved', label: 'Ready to Pay' },
    { id: 'completed', label: 'Completed' },
    { id: 'all', label: 'All Payouts' },
];

// Create axios instance with default config
const api = axios.create({ baseURL: API_BASE_URL });

// Attach auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

export default function AdminPayouts() {
    const { isAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState('pending');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState(null);
    const [payoutBatches, setPayoutBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isBatchDetailsModalOpen, setIsBatchDetailsModalOpen] = useState(false);
    const [selectedPayout, setSelectedPayout] = useState(null);
    const [selectedBatchDetails, setSelectedBatchDetails] = useState(null);
    const [stats, setStats] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Define table columns as array of strings
    const tableColumns = [
        'batch_number',
        'month_year',
        'total_amount',
        'total_station_owners',
        'status',
        'created_date',
        'actions'
    ];

    const filterOptions = [
        { label: 'All Status', value: 'all' },
        { label: 'Draft', value: 'draft' },
        { label: 'Approved', value: 'approved' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' }
    ];

    const sortOptions = [
        { label: 'Batch Number', value: 'batch_number' },
        { label: 'Month', value: 'month' },
        { label: 'Year', value: 'year' },
        { label: 'Total Amount', value: 'total_amount' },
        { label: 'Status', value: 'status' },
        { label: 'Created Date', value: 'createdAt' }
    ];

    useEffect(() => {
        if (!isAdmin) {
            toast.error('Access denied');
            return;
        }
        fetchPayoutBatches();
        fetchPayoutStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, isAdmin]);

    const fetchPayoutBatches = async () => {
        try {
            setLoading(true);
            const response = await api.get('/api/admin/payouts/batches', {
                params: {
                    status: activeTab === 'all' ? '' : activeTab,
                    search: search
                }
            });

            if (response.data.success) {
                setPayoutBatches(response.data.batches);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch payouts');
        } finally {
            setLoading(false);
        }
    };

    const fetchPayoutStats = async () => {
        try {
            const response = await api.get('/api/admin/payouts/stats');
            if (response.data.success) {
                setStats(response.data.stats);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
            toast.error('Failed to load payout statistics');
        }
    };

    const getMonthName = (month) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month - 1] || 'Unknown';
    };

    const formatStatus = (status) => {
        const statusMap = {
            'draft': 'Draft',
            'approved': 'Approved',
            'completed': 'Completed',
            'failed': 'Failed'
        };
        return statusMap[status] || status;
    };

    const getStatusBadge = (status) => {
        const statusText = formatStatus(status);
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === 'completed' ? 'bg-green-100 text-green-800' :
                    status === 'approved' ? 'bg-blue-100 text-blue-800' :
                        status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            status === 'failed' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                }`}>
                {statusText}
            </span>
        );
    };

    const handleProcessPayment = (batchId) => {
        const batch = payoutBatches.find(b => b._id === batchId);
        if (batch) {
            setSelectedPayout(batch);
            setIsPaymentModalOpen(true);
        }
    };

    const handleUploadProof = async (proofData) => {
        setIsSubmitting(true);
        try {
            const response = await api.post(
                `/api/admin/payouts/batches/${selectedPayout._id}/pay`,
                proofData
            );

            if (response.data.success) {
                toast.success('Payment proof uploaded successfully!');
                fetchPayoutBatches();
                fetchPayoutStats();
                setIsPaymentModalOpen(false);
                setSelectedPayout(null);
            }
        } catch (error) {
            console.error('Error uploading proof:', error);
            toast.error(error.response?.data?.message || 'Failed to upload payment proof');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Custom actions renderer for DataTable
    const renderActions = (row) => {
        const batch = payoutBatches.find(b => b._id === row.id);
        if (!batch) return <span className="text-gray-500 text-sm">No actions</span>;

        if (batch.status === 'approved') {
            return (
                <div className="flex gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); handleProcessPayment(batch._id); }}
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm transition-colors"
                    >
                        Process Payment
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleViewBatchDetails(batch._id); }}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors"
                    >
                        View Details
                    </button>
                </div>
            );
        } else if (batch.status === 'draft') {
            return (
                <div className="flex gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); handleApproveBatch(batch._id); }}
                        disabled={isSubmitting}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm transition-colors"
                    >
                        {isSubmitting ? 'Approving...' : 'Approve Batch'}
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleViewBatchDetails(batch._id); }}
                        className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm transition-colors"
                    >
                        View Details
                    </button>
                </div>
            );
        } else if (batch.status === 'completed') {
            return (
                <button
                    onClick={(e) => { e.stopPropagation(); handleViewBatchDetails(batch._id); }}
                    className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm transition-colors"
                >
                    View Details
                </button>
            );
        }
        return <span className="text-gray-500 text-sm">No actions</span>;
    };

    const handleApproveBatch = async (batchId) => {
        setIsSubmitting(true);
        try {
            const userId = localStorage.getItem('userID');
            const response = await api.post(`/api/admin/payouts/batch/${batchId}/approve/${userId}`);
            if (response.data.success) {
                toast.success('Batch approved successfully!');
                fetchPayoutBatches();
                fetchPayoutStats();
            }
        } catch (error) {
            console.error('Error approving batch:', error);
            toast.error(error.response?.data?.message || 'Failed to approve batch');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleViewBatchDetails = async (batchId) => {
        try {
            const response = await api.get(`/api/admin/payouts/batches/${batchId}`);
            if (response.data.success) {
                setSelectedBatchDetails(response.data);
                setIsBatchDetailsModalOpen(true);
            }
        } catch (error) {
            console.error('Error fetching batch details:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch batch details');
        }
    };

    const handleCreatePayoutBatch = async () => {
        setIsSubmitting(true);
        try {
            const currentDate = new Date();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();

            const userId = localStorage.getItem('userID');
            const response = await api.post(`/api/admin/payouts/batch/create/${userId}`, { month, year });
            if (response.data.success) {
                toast.success('Payout batch created successfully!');
                fetchPayoutBatches();
                fetchPayoutStats();
            }
        } catch (error) {
            console.error('Error creating payout batch:', error);
            toast.error(error.response?.data?.message || 'Failed to create payout batch');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSearch = (searchTerm) => setSearch(searchTerm);
    const handleRefresh = () => { fetchPayoutBatches(); fetchPayoutStats(); toast.info('Refreshing payout data...'); };
    const handleRowClick = (row) => handleViewBatchDetails(row.id);

    // Format data for the table - make sure each value is a string or React element
    const tableData = payoutBatches.map(batch => ({
        id: batch._id,
        batch_number: batch.batch_number,
        month_year: `${getMonthName(batch.month)} ${batch.year}`,
        total_amount: `LKR ${batch.total_amount?.toFixed(2) || '0.00'}`,
        total_station_owners: (batch.total_station_owners ?? 0).toString(),
        status: getStatusBadge(batch.status),
        created_date: new Date(batch.createdAt).toLocaleDateString(),
        actions: renderActions({ id: batch._id })
    }));

    if (loading) {
        return (
            <div style={{ fontFamily: FONTS.family.sans, padding: '24px', backgroundColor: COLORS.background, overflowX: 'hidden' }}>
                <AdminPageHeader title="Station Owner Payouts" />
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Loading payouts...</div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: FONTS.family.sans, padding: '24px', backgroundColor: COLORS.background, overflowX: 'hidden' }}>
            <AdminPageHeader title="Station Owner Payouts" />

            {/* Stats Overview */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <h3 className="text-sm font-medium" style={{ color: COLORS.secondaryText }}>Total Paid This Month</h3>
                        <p className="text-2xl font-bold mt-2" style={{ color: COLORS.primary }}>
                            LKR {stats.yearly?.total_paid?.toFixed(2) || '0.00'}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <h3 className="text-sm font-medium" style={{ color: COLORS.secondaryText }}>Pending Payouts</h3>
                        <p className="text-2xl font-bold mt-2" style={{ color: COLORS.warning }}>
                            LKR {stats.yearly?.total_pending?.toFixed(2) || '0.00'}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <h3 className="text-sm font-medium" style={{ color: COLORS.secondaryText }}>Station Owners Awaiting</h3>
                        <p className="text-2xl font-bold mt-2" style={{ color: COLORS.info }}>
                            {stats.pending_station_owners}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <h3 className="text-sm font-medium" style={{ color: COLORS.secondaryText }}>Batches This Month</h3>
                        <p className="text-2xl font-bold mt-2" style={{ color: COLORS.success }}>
                            {stats.yearly?.total_batches || 0}
                        </p>
                    </div>
                </div>
            )}

            {/* Action Buttons and Tabs */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                <TabBar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
                <div className="flex gap-3">
                    <button onClick={handleCreatePayoutBatch} disabled={isSubmitting} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors text-sm">
                        {isSubmitting ? 'Creating...' : 'Create New Payout Batch'}
                    </button>
                    <button onClick={handleRefresh} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm" style={{ color: COLORS.mainTextColor }}>
                        Refresh Data
                    </button>
                </div>
            </div>

            {/* Data Table Section */}
            <div className="rounded-lg overflow-hidden">
                <DataTableTopBar
                    search={search}
                    setSearch={handleSearch}
                    filter={filter}
                    setFilter={setFilter}
                    sort={sort}
                    setSort={setSort}
                    filterOptions={filterOptions}
                    sortOptions={sortOptions}
                    searchPlaceholder="Search batches by batch number..."
                    onRefresh={handleRefresh}
                />

                {payoutBatches.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-lg mb-2">No payout batches found</div>
                        <div className="text-sm text-gray-400">
                            {activeTab === 'all' ? 'No payout batches available in the system.' : `No ${activeTab.replace('-', ' ')} payout batches found.`}
                        </div>
                    </div>
                ) : (
                    <OverviewCard padding='p-0'>
                        {/* Table wrapper: fixed height so only this scrolls */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div style={{ maxHeight: '60vh', overflowY: 'auto' }} className="overflow-x-auto">
                                <DataTable
                                    columns={tableColumns}
                                    data={tableData}
                                    filter={filter}
                                    sort={sort}
                                    search={search}
                                    onRowClick={handleRowClick}
                                    customActions={renderActions}
                                />
                            </div>
                        </div>
                    </OverviewCard>
                )}
            </div>

            {/* Payment Proof Modal */}
            <PaymentProofModal isOpen={isPaymentModalOpen} onClose={() => { setIsPaymentModalOpen(false); setSelectedPayout(null); }} payoutBatch={selectedPayout} onUploadProof={handleUploadProof} isSubmitting={isSubmitting} />

            {/* Batch Details Modal */}
            <BatchDetailsModal isOpen={isBatchDetailsModalOpen} onClose={() => { setIsBatchDetailsModalOpen(false); setSelectedBatchDetails(null); }} batchData={selectedBatchDetails} />
        </div>
    );
}
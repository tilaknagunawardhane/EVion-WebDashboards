import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../../../../constants';
import DataTableTopBar from '../../../../components/ui/DataTableTopBar';
import DataTable from '../../../../components/ui/DataTable';
import StationOwnerPageHeader from '../../components/StationOwnerPageHeader';
import { useAuth } from '../../../../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OwnerViewStation = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState(null);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const filterOptions = [
        {
            group: 'Status',
            options: [
                { value: 'under-review', label: 'Under Review' },
                { value: 'resolved', label: 'Resolved' },
                { value: 'rejected', label: 'Rejected' }
            ]
        },
        {
            group: 'Report Type',
            options: [
                { value: 'station', label: 'Station' },
                { value: 'charger', label: 'Charger' },
                { value: 'booking', label: 'Booking' }
            ]
        }
    ];

    // Flatten the filter options for DataTableTopBar
    const flattenedFilterOptions = filterOptions.flatMap(group => 
        group.options.map(option => ({
            value: option.value,
            label: option.label,
            group: group.group
        }))
    );

    useEffect(() => {
        fetchReports();
    }, [filter, pagination.currentPage, search]);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userID');
            
            if (!userId) {
                toast.error('User ID not found');
                return;
            }

            // Determine user model from currentUser
            const userModel = currentUser?.constructor?.modelName 
                ? currentUser.constructor.modelName 
                : (currentUser?.role === 'stationowner' ? 'stationowner' :
                    currentUser?.role === 'admin' ? 'Admin' :
                    currentUser?.role === 'supportofficer' ? 'SupportOfficer' : 'EvOwner');

            // Build query parameters
            const params = new URLSearchParams({
                page: pagination.currentPage.toString(),
                limit: pagination.itemsPerPage.toString(),
                userId: userId,
                userModel: userModel
            });

            // Add filters to params
            if (filter) {
                if (filter.group === 'Status') {
                    params.append('status', filter.value);
                } else if (filter.group === 'Report Type') {
                    params.append('type', filter.value);
                }
            }

            // Add search to params
            if (search) {
                params.append('search', search);
            }

            const response = await axios.get(
                `${API_BASE_URL}/api/reports/get-stationowner-reports/${userId}?${params}`,
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                setReports(response.data.data);
                setPagination(prev => ({
                    ...prev,
                    totalPages: response.data.pagination.totalPages,
                    totalItems: response.data.pagination.totalItems
                }));
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
            if (error.response?.status === 401) {
                navigate('/auth?mode=login');
            } else {
                toast.error('Failed to load reports');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRowClick = (row) => {
        navigate(`/station-owner/report-details/${row['Report Type']}/${row['Report ID']}`);
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, currentPage: newPage }));
    };

    const tableColumns = [
        'Report ID',
        'Reported Date',
        'Reported Time',
        'Report Type',
        'Category',
        'Description',
        'Associated Station',
        'Status'
    ];

    // Format data for the table
    const formattedReports = reports.map(report => ({
        'Report ID': report._id,
        'Reported Date': new Date(report.createdAt).toLocaleDateString(),
        'Reported Time': new Date(report.createdAt).toLocaleTimeString(),
        'Report Type': report.modelName || (report.booking_id ? 'booking' : report.charger_id ? 'charger' : 'station'),
        'Category': report.category,
        'Description': report.description.length > 100
            ? `${report.description.substring(0, 100)}...`
            : report.description,
        'Associated Station': report.station_id?.station_name || report.booking_id?.charging_station_id?.station_name || 'N/A',
        'Status': report.status.charAt(0).toUpperCase() + report.status.slice(1).replace('-', ' ')
    }));

    // Table Tab Content
    const TableTab = ({ title, loading }) => (
        <div className="grid grid-cols-1 gap-0 bg-transparent rounded-lg p-0">
            <DataTableTopBar
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                sort={sort}
                setSort={setSort}
                filterOptions={flattenedFilterOptions}
                sortOptions={tableColumns.map(col => ({ value: col, label: col }))}
                searchPlaceholder={`Search ${title.toLowerCase()}...`}
                onSearchSubmit={fetchReports}
            />
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    <DataTable
                        columns={tableColumns}
                        data={formattedReports}
                        onRowClick={handleRowClick}
                    />
                    {/* Pagination Controls */}
                    {pagination.totalPages > 1 && (
                        <div className="flex justify-between items-center mt-4 px-4 py-3 bg-white border-t border-gray-200">
                            <div className="text-sm text-gray-700">
                                Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of {pagination.totalItems} results
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    disabled={pagination.currentPage === 1}
                                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    disabled={pagination.currentPage === pagination.totalPages}
                                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );

    if (loading && reports.length === 0) {
        return (
            <div style={{
                fontFamily: FONTS.family.sans,
                padding: '24px',
                backgroundColor: COLORS.background,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div 
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" 
                    style={{ borderColor: COLORS.primary }}
                ></div>
            </div>
        );
    }

    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
            minHeight: '100vh'
        }}>
            <StationOwnerPageHeader title={"Fault Reports"} />

            <TableTab
                title="Fault Reports"
                columns={tableColumns}
                data={formattedReports}
                onRowClick={handleRowClick}
                loading={loading}
            />
        </div>
    );
};

export default OwnerViewStation;
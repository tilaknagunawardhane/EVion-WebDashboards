import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FONTS, COLORS } from "../../../constants";
import DataTable from "../../../components/ui/DataTable";
import DataTableTopBar from "../../../components/ui/DataTableTopBar";
import OverviewCard from "../../admin/components/OverviewCard";
import UserPageHeader from '../components/UserPageHeader';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ChargingStationsOverviewPage(){
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({});
    const [sort, setSort] = useState('Date');
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });

    const ChargingStationFilterOptions = [
        { label: 'All Status', value: 'all' },
        { label: 'Open', value: 'open' },
        { label: 'Unavailable', value: 'unavailable' },
        { label: 'Disabled', value: 'disabled_by_SO' },
        { label: 'Deleted', value: 'deleted' },
        { label: 'CEB', value: 'CEB' },
        { label: 'LECO', value: 'LECO' },
        { label: 'Private', value: 'Private' },
        { label: 'Grid', value: 'Grid' },
        { label: 'Solar', value: 'Solar' },
        { label: 'Hybrid', value: 'Hybrid' }
    ];

    const ChargingStationSortOptions = [
        { label: 'Station Name', value: 'station_name' },
        { label: 'City', value: 'city' },
        { label: 'Status', value: 'station_status' },
        { label: 'Available Chargers', value: 'available_chargers' },
        { label: 'Created Date', value: 'createdAt' }
    ];

    useEffect(() => {
        fetchStations();
    }, [filter, pagination.currentPage, search, sort]);

    const fetchStations = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            
            // Build query parameters
            const params = new URLSearchParams({
                page: pagination.currentPage.toString(),
                limit: pagination.itemsPerPage.toString()
            });

            // Add filters to params
            if (filter.value) {
                if (['open', 'unavailable', 'disabled_by_SO', 'deleted'].includes(filter.value)) {
                    params.append('status', filter.value);
                } else if (['CEB', 'LECO', 'Private'].includes(filter.value)) {
                    params.append('electricity_provider', filter.value);
                } else if (['Grid', 'Solar', 'Hybrid'].includes(filter.value)) {
                    params.append('power_source', filter.value);
                }
            }

            // Add search to params
            if (search) {
                params.append('search', search);
            }

            // Add sort to params
            if (sort && sort !== 'Date') {
                params.append('sort', sort);
            }

            const response = await axios.get(
                `${API_BASE_URL}/api/stations/support-officer/stations?${params}`,
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                setStations(response.data.data);
                setPagination(prev => ({
                    ...prev,
                    totalPages: response.data.pagination.totalPages,
                    totalItems: response.data.pagination.totalItems
                }));
            }
        } catch (error) {
            console.error('Error fetching stations:', error);
            if (error.response?.status === 401) {
                navigate('/auth?mode=login');
            } else {
                toast.error('Failed to load stations');
            }
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, currentPage: newPage }));
    };

    const getStatusBadge = (status) => {
        const statusText = status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === 'open' ? 'bg-green-100 text-green-800' :
                status === 'unavailable' ? 'bg-yellow-100 text-yellow-800' :
                status === 'disabled_by_SO' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
            }`}>
                {statusText}
            </span>
        );
    };

    // Format data for the table
    const tableData = stations.map(station => ({
        id: station._id,
        'Station Name': station.station_name,
        'Owner Name': station.station_owner_id?.name || 'Unknown Owner',
        'District': station.district_name || station.district?.name || 'Unknown District',
        'Address': station.address || 'No address provided',
        'City': station.city,
        'Electricity Provider': station.electricity_provider || 'N/A',
        'Power Source': station.power_source || 'N/A',
        'Available Chargers': `${station.available_chargers || 0}/${station.total_chargers || 0}`,
        'Total Chargers': station.total_chargers || 0,
        'Status': station.station_status,
        'Created Date': new Date(station.createdAt).toLocaleDateString(),
        'Last Updated': new Date(station.updatedAt).toLocaleDateString()
    }));

    const tableColumns = [
        'Station Name',
        'Owner Name',
        'District',
        'City',
        'Address',
        'Electricity Provider',
        'Power Source',
        'Available Chargers',
        'Status',
        'Created Date'
    ];

    const handleRowClick = (row) => {
        // Navigate to station details page
        navigate(`/support-officer/station-details/${row.id}`);
    };

    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
        }}>
            {/* Header Section */}
            <UserPageHeader title={`Charging Stations Overview`} />

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {/* Left Side */}
                <div className="md:col-span-4">

                    {/* Search and Filter Bar */}
                    <div className="mb-6">
                        <DataTableTopBar
                            search={search}
                            setSearch={setSearch}
                            filter={filter}
                            setFilter={setFilter}
                            sort={sort}
                            setSort={setSort}
                            filterOptions={ChargingStationFilterOptions}
                            sortOptions={ChargingStationSortOptions}
                            searchPlaceholder={`Search stations by name, address, or city`}
                            showExportButton={true}
                            onExport={() => {
                                console.log(`Exporting Station data...`);
                                // Implement export functionality here
                            }}
                        />

                        <OverviewCard padding='p-6'>
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-sm shadow-sm overflow-hidden"
                                    style={{
                                    border: `1px solid ${COLORS.border}`,
                                    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.05)'
                                    }}>
                                    <DataTable
                                        columns={tableColumns}
                                        data={tableData}
                                        filter={filter}
                                        sort={sort}
                                        search={search}
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
                                </div>
                            )}
                        </OverviewCard>

                    </div>

                </div>

            </div>

        </div>
    );
}
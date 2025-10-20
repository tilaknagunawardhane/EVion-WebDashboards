import React, { useState, useEffect, useCallback } from 'react';
import DataTableTopBar from '../../../components/ui/DataTableTopBar';
import DataTable from '../../../components/ui/DataTable';
import ChargingStationsRightPanel from '../components/stationComponents/ChargingStationsRightPanel';
import { COLORS, FONTS } from '../../../constants';
import OverviewCard from '../components/OverviewCard';
import { useNavigate } from 'react-router-dom';
import AdminPageHeader from '../components/AdminPageHeader';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ChargingStations() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({});
    const [sort, setSort] = useState('Joined On');
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });

    const stationFilterOptions = [
        { label: 'All Status', value: 'all' },
        { label: 'Open', value: 'open' },
        { label: 'Unavailable', value: 'unavailable' },
        { label: 'Disabled', value: 'disabled_by_SO' },
        { label: 'Deleted', value: 'deleted' },
        { label: 'CEB', value: 'CEB' },
        { label: 'LECO', value: 'LECO' },
        { label: 'Private', value: 'Private' }
    ];

    const stationSortOptions = [
        { label: 'Station Name', value: 'station_name' },
        { label: 'City', value: 'city' },
        { label: 'Status', value: 'station_status' },
        { label: 'Created Date', value: 'createdAt' }
    ];

    const fetchStationsData = useCallback(async () => {
        setLoading(true);
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            // Build query parameters
            const params = new URLSearchParams({
                page: pagination.currentPage.toString(),
                limit: pagination.itemsPerPage.toString()
            });

            // Add filters
            if (filter.value && filter.value !== 'all') {
                if (['open', 'unavailable', 'disabled_by_SO', 'deleted'].includes(filter.value)) {
                    params.append('status', filter.value);
                } else if (['CEB', 'LECO', 'Private'].includes(filter.value)) {
                    params.append('electricity_provider', filter.value);
                }
            }

            // Add search
            if (search) {
                params.append('search', search);
            }

            // Add sort
            if (sort && sort !== 'Joined On') {
                params.append('sort', sort);
            }

            const response = await axios.get(
                `${API_BASE_URL}/api/admin/stations?${params}`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            if (response.data.success) {
                setStations(response.data.data || []);
                setPagination(prev => ({
                    ...prev,
                    totalPages: response.data.pagination?.totalPages || 1,
                    totalItems: response.data.pagination?.totalItems || 0
                }));
            }
        } catch (error) {
            console.error('Error fetching stations for admin:', error);
            toast.error('Failed to load charging stations list.');
            setStations([]);
        } finally {
            setLoading(false);
        }
    }, [search, filter, sort, pagination.currentPage]);

    useEffect(() => {
        fetchStationsData();
    }, [fetchStationsData]);

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

    // Format data for table with only necessary columns
    const tableData = stations.map(station => ({
        id: station._id,
        'Station Name': station.station_name,
        'Owner Name': station.station_owner_id?.name || 'Unknown',
        'District': station.district_name || station.district?.name || 'Unknown',
        'City': station.city,
        'Address': station.address || 'No address',
        'Electricity Provider': station.electricity_provider || 'N/A',
        'Available Chargers': `${station.available_chargers || 0}/${station.total_chargers || 0}`,
        'Status': station.station_status,
        'Joined On': new Date(station.createdAt).toLocaleDateString()
    }));

    const tableColumns = [
        'Station Name',
        'Owner Name',
        'District', 
        'City',
        'Available Chargers',
        'Status',
        'Joined On'
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
        }}>
            <AdminPageHeader title="Charging Stations Overview" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                    <div className="mb-6">
                        <DataTableTopBar
                            search={search}
                            setSearch={setSearch}
                            filter={filter}
                            setFilter={setFilter}
                            sort={sort}
                            setSort={setSort}
                            filterOptions={stationFilterOptions}
                            sortOptions={stationSortOptions}
                            searchPlaceholder="Search stations by name, city, or address..."
                            showExportButton={true}
                            onExport={() => {
                                console.log('Exporting stations data...');
                                // Implement export functionality
                            }}
                        />
                    </div>

                    <OverviewCard padding='p-0'>
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
                                onRowClick={(station) => {
        console.log('Row clicked - station object:', station);
        console.log('Station ID:', station.id);
        console.log('Full station data:', station);
        navigate(`/admin/stations/${station.id}`);
    }}
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
                    </OverviewCard>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-6 space-y-6">
                        <ChargingStationsRightPanel />
                    </div>
                </div>
            </div>
        </div>
    );
}
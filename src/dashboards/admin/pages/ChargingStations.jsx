import React, { useState, useEffect, useCallback } from 'react';
import ChargingStationsTopBar from '../../../components/ui/DataTableTopBar';
import DataTable from '../../../components/ui/DataTable'; // Changed import
import ChargingStationsRightPanel from '../components/stationComponents/ChargingStationsRightPanel';
import { COLORS, FONTS } from '../../../constants';
import NotificationsIcon from '../../../assets/notifications.svg';
import OverviewCard from '../components/OverviewCard';
import { useNavigate } from 'react-router-dom';
import AdminPageHeader from '../components/AdminPageHeader'

import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export default function ChargingStations() {
    const navigate = useNavigate();

    const [search, setSearch] = React.useState('');
    const [filter, setFilter] = React.useState({});
    const [sort, setSort] = React.useState('Joined On');
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStationsData = useCallback(async () => {

        setLoading(true);

        const token = localStorage.getItem('accessToken');
        const adminId = localStorage.getItem('userID');
        
        if (!token) {
            setLoading(false);
            return;
        }

        if (!adminId) {
            setLoading(false);
            toast.error('Admin ID not found. Please log in again.');
            return;
        }

        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/admin/stations`,
                { headers: { 'Authorization': `Bearer ${token}` }, params: { adminId: adminId } }
            );

            setStations(response.data.data || []);

        } catch (error) {
            console.error('Error fetching stations for admin:', error);
            toast.error('Failed to load charging stations list.');
            setStations([]);

        } finally {
            setLoading(false);

        }
    }, []);

    // Trigger fetch on mount
    useEffect(() => {
        fetchStationsData();
    }, [fetchStationsData]);


    const stationFilterOptions = [
        { label: 'District', value: 'district' },
        { label: 'City', value: 'city' },
        { label: 'Status', value: 'status' },
        { label: 'Connector Types', value: 'connectorTypes' },
    ];

    const stationSortOptions = [
        { label: 'Date Joined', value: 'dateJoined' },
        { label: 'Station Name', value: 'stationName' },
        { label: 'Revenue', value: 'revenue' },
        { label: 'Number of Chargers', value: 'noOfChargers' },
    ];

    // Define columns for stations table
    const stationColumns = [
        'Station Name',
        'Owner Name',
        'Joined On',
        'District',
        'City',
        'Address Line',
        'Revenue',
        'No of Chargers',
        'Type1',
        'Type2',
        'CCS1',
        'CCS2',
        'CHAdeMO',
        'Tesla',
        'No of Active Reports',
        'Station Status',
        // 'Quick Actions'
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
        }}>
            {/* Header Section */}
            <AdminPageHeader title="Stations Overview" />

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Side - 3/4 width */}
                <div className="lg:col-span-3">
                    {/* Search and Filter Bar */}
                    <div className="mb-6">
                        <ChargingStationsTopBar
                            search={search}
                            setSearch={setSearch}
                            filter={filter}
                            setFilter={setFilter}
                            sort={sort}
                            setSort={setSort}
                            filterOptions={stationFilterOptions}
                            sortOptions={stationSortOptions}
                            searchPlaceholder="Search stations..."
                            showExportButton={true}
                            onExport={() => {
                                // Export functionality would go here
                                console.log('Exporting stations data...');
                            }}
                        />
                    </div>

                    <OverviewCard padding='p-0'>
                        {/* Stations Table */}
                        <div className="bg-transparent overflow-hidden">
                            <DataTable
                                columns={stationColumns}
                                data={stations}
                                filter={filter}
                                sort={sort}
                                search={search}
                                onRowClick={(station) => {
                                    navigate(`/admin/stations/${station.id}`);
                                }}
                            />
                        </div>
                    </OverviewCard>
                </div>

                {/* Right Side - 1/4 width */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 space-y-6">
                        <ChargingStationsRightPanel/>
                    </div>
                </div>
            </div>
        </div>
    );
}
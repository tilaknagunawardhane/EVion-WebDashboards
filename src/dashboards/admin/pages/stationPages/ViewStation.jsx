import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../../../../constants';
import TabBar from '../../../../components/ui/TabBar';
import DataTableTopBar from '../../../../components/ui/DataTableTopBar';
import DataTable from '../../../../components/ui/DataTable';
import StatCard from '../../components/StatCard';
import OverviewCard from '../../components/OverviewCard';
import ViewStationRightPanel from '../../components/stationComponents/ViewStationRightPanel';
import AdminPageHeader from '../../components/AdminPageHeader';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ViewStation = () => {
    const { stationId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({});
    const [sort, setSort] = useState(null);
    const [stationData, setStationData] = useState(null);
    const [loading, setLoading] = useState(true);

     console.log('stationId from useParams:', stationId);

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'chargers', label: 'Chargers' },
        { id: 'reports', label: 'Reports' },
        { id: 'earnings', label: 'Earnings' }
    ];

    useEffect(() => {
        if (stationId) {
            fetchStationDetails();
        }
    }, [stationId]);

    const fetchStationDetails = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('accessToken');
            
            const response = await axios.get(
                `${API_BASE_URL}/api/admin/stations/${stationId}`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            if (response.data.success) {
                setStationData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching station details:', error);
            toast.error('Failed to load station details');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const statusText = status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
        const bgColor = status === 'open' ? 'bg-green-100 text-green-800' :
            status === 'unavailable' ? 'bg-yellow-100 text-yellow-800' :
                status === 'disabled_by_SO' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800';

        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${bgColor}`}>
                {statusText}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!stationData) {
        return (
            <div style={{ fontFamily: FONTS.family.sans, padding: '24px', backgroundColor: COLORS.background }}>
                <AdminPageHeader title="Station Not Found" />
                <div className="text-center py-12">
                    <p className="text-gray-600">Station not found or you don't have access to view it.</p>
                    <button
                        onClick={() => navigate('/admin/stations')}
                        className="mt-4 px-4 py-2 text-white rounded-md"
                        style={{ backgroundColor: COLORS.primary }}
                    >
                        Back to Stations
                    </button>
                </div>
            </div>
        );
    }

    const { station, statistics, chargers } = stationData;

    // Overview Tab Content
    const OverviewTab = () => (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
                {/* Station Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-xl font-bold" style={{ color: COLORS.mainTextColor }}>
                            {station.station_name}
                        </h1>
                        <p className="text-sm mt-1" style={{ color: COLORS.secondaryText }}>
                            {station.address || 'No address provided'}
                        </p>
                        <p className="text-sm" style={{ color: COLORS.secondaryText }}>
                            {station.city}, {station.district_name}
                        </p>
                    </div>
                    <div className="sm:self-start">
                        {getStatusBadge(station.station_status)}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard
                        title="Total Reports"
                        value={statistics.total_reports}
                        subValue="All time"
                        icon="reports"
                    />
                    <StatCard
                        title="Recent Bookings"
                        value={statistics.recent_bookings}
                        subValue="Last 30 days"
                        icon="sessions"
                    />
                    {/* <StatCard
                        title="Average Rating"
                        value={`${statistics.average_rating} ⭐`}
                        subValue={`${statistics.total_ratings} ratings`}
                        icon="rating"
                    /> */}
                    <StatCard
                        title="Available Chargers"
                        value={`${statistics.charger_stats.available}/${statistics.charger_stats.total}`}
                        subValue="Currently available"
                        icon="connectors"
                    />
                    <StatCard
                        title="AC Chargers"
                        value={statistics.charger_stats.byPowerType.AC}
                        subValue="AC Type"
                        icon="electricity"
                    />
                    <StatCard
                        title="DC Chargers"
                        value={statistics.charger_stats.byPowerType.DC}
                        subValue="DC Type"
                        icon="electricity"
                    />
                </div>

                {/* Station Details */}
                <OverviewCard padding="p-6">
                    <h2 className="text-lg font-semibold mb-4">Station Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: COLORS.secondaryText }}>Owner</label>
                            <p>{station.owner_name}</p>
                            <p className="text-sm text-gray-600">{station.owner_email}</p>
                            {station.owner_contact && (
                                <p className="text-sm text-gray-600">{station.owner_contact}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: COLORS.secondaryText }}>Electricity Provider</label>
                            <p>{station.electricity_provider || 'N/A'}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: COLORS.secondaryText }}>Power Source</label>
                            <p>{station.power_source || 'N/A'}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: COLORS.secondaryText }}>Created Date</label>
                            <p>{new Date(station.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </OverviewCard>
            </div>

            <div className="lg:col-span-1 space-y-4">
                <ViewStationRightPanel station={station} />
            </div>
        </div>
    );

    // Chargers Tab Content
    const ChargersTab = () => {
        const chargerColumns = [
            'Charger Name',
            'Power Type',
            'Max Output',
            'Price',
            'Status',
            'Available Connectors'
        ];

        const chargerData = chargers.map(charger => ({
            id: charger._id,
            'Charger Name': charger.charger_name,
            'Power Type': charger.power_type,
            'Max Output': `${charger.max_power_output} kW`,
            'Price': `Rs ${charger.price}`,
            'Status': charger.charger_status,
            'Available Connectors': `${charger.available_connectors}/${charger.total_connectors}`
        }));

        return (
            <div className="space-y-6">
                <DataTableTopBar
                    search={search}
                    setSearch={setSearch}
                    filter={filter}
                    setFilter={setFilter}
                    sort={sort}
                    setSort={setSort}
                    filterOptions={[
                        { label: 'All Status', value: 'all' },
                        { label: 'Open', value: 'open' },
                        { label: 'Unavailable', value: 'unavailable' },
                        { label: 'Disabled', value: 'disabled_by_SO' }
                    ]}
                    sortOptions={chargerColumns.map(col => ({ label: col, value: col }))}
                    searchPlaceholder="Search chargers..."
                />
                
                <OverviewCard padding='p-0'>
                    <DataTable
                        columns={chargerColumns}
                        data={chargerData}
                        filter={filter}
                        sort={sort}
                        search={search}
                        onRowClick={(charger) => console.log('Charger clicked:', charger)}
                    />
                </OverviewCard>
            </div>
        );
    };

    // Reports Tab Content
    const ReportsTab = () => {
        const reportColumns = [
            'Report Type',
            'Count',
            'Status'
        ];

        const reportData = [
            {
                'Report Type': 'Station Reports',
                'Count': statistics.station_reports,
                'Status': 'Overview'
            },
            {
                'Report Type': 'Charger Reports', 
                'Count': statistics.charger_reports,
                'Status': 'Overview'
            },
            {
                'Report Type': 'Booking Reports',
                'Count': statistics.booking_reports,
                'Status': 'Overview'
            }
        ];

        return (
            <div className="space-y-6">
                <OverviewCard padding="p-6">
                    <h2 className="text-lg font-semibold mb-4">Reports Summary</h2>
                    <DataTable
                        columns={reportColumns}
                        data={reportData}
                        filter={filter}
                        sort={sort}
                        search={search}
                    />
                </OverviewCard>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-red-50">
                        <h3 className="font-semibold text-red-800">Total Reports</h3>
                        <p className="text-2xl font-bold text-red-600">{statistics.total_reports}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-yellow-50">
                        <h3 className="font-semibold text-yellow-800">Under Review</h3>
                        <p className="text-2xl font-bold text-yellow-600">{statistics.station_reports + statistics.charger_reports}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50">
                        <h3 className="font-semibold text-green-800">Resolved</h3>
                        <p className="text-2xl font-bold text-green-600">{statistics.booking_reports}</p>
                    </div>
                </div>
            </div>
        );
    };

    // Earnings Tab Content
    const EarningsTab = () => {
        const earningsColumns = [
            'Type',
            'Gross Amount',
            'Commission',
            'Net Amount',
            'Status'
        ];

        // This would typically come from an API
        const sampleEarningsData = [
            {
                'Type': 'Booking Fee',
                'Gross Amount': 'Rs 1,000',
                'Commission': 'Rs 100',
                'Net Amount': 'Rs 900', 
                'Status': 'Paid'
            },
            {
                'Type': 'Charging Fee',
                'Gross Amount': 'Rs 2,500', 
                'Commission': 'Rs 250',
                'Net Amount': 'Rs 2,250',
                'Status': 'Pending'
            }
        ];

        return (
            <div className="space-y-6">
                <DataTableTopBar
                    search={search}
                    setSearch={setSearch}
                    filter={filter}
                    setFilter={setFilter}
                    sort={sort}
                    setSort={setSort}
                    filterOptions={[
                        { label: 'All Types', value: 'all' },
                        { label: 'Booking Fee', value: 'booking_fee' },
                        { label: 'Charging Fee', value: 'charging_fee' }
                    ]}
                    sortOptions={earningsColumns.map(col => ({ label: col, value: col }))}
                    searchPlaceholder="Search earnings..."
                />
                
                <OverviewCard padding='p-0'>
                    <DataTable
                        columns={earningsColumns}
                        data={sampleEarningsData}
                        filter={filter}
                        sort={sort}
                        search={search}
                    />
                </OverviewCard>
            </div>
        );
    };

    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
        }}>
            <AdminPageHeader title={`Station Details - ${station.station_name}`} />

            {/* Back Button */}
            <button
                onClick={() => navigate('/admin/stations')}
                className="mb-6 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center"
            >
                ← Back to Stations
            </button>

            {/* Tab Navigation */}
            <TabBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={tabs}
            />

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'overview' && <OverviewTab />}
                {activeTab === 'chargers' && <ChargersTab />}
                {activeTab === 'reports' && <ReportsTab />}
                {activeTab === 'earnings' && <EarningsTab />}
            </div>
        </div>
    );
};

export default ViewStation;
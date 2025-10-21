import { useState, useEffect } from 'react'
import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'
import StatCard from '../../admin/components/StatCard'
import StatusCard from '../../admin/components/StatusCard'
import OverviewCard from '../../admin/components/OverviewCard'
import RevenueTrendChart from '../../admin/components/RevenueTrendChart'
import ConnectorStatusChart from '../../admin/components/ConnectorStatusChart'
import ApprovalCard from '../../admin/components/ApprovalCard'
import MapImage from '../../../assets/map-placeholder.png'
import UserGrowthChart from '../components/UserGrowthChart'
import AdminPageHeader from '../components/AdminPageHeader'
import axios from 'axios'
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// Map configuration
const mapContainerStyle = {
    width: '100%',
    height: '300px'
};

const defaultCenter = {
    lat: 6.9271, // Colombo, Sri Lanka
    lng: 79.8612
};

// Stations Map Component
const StationsMap = ({ stations, onStationClick }) => {
    const [selectedStation, setSelectedStation] = useState(null);
    const [map, setMap] = useState(null);

    // Calculate bounds to fit all stations
    const calculateBounds = () => {
        if (!stations || stations.length === 0) return null;

        const bounds = new window.google.maps.LatLngBounds();
        stations.forEach(station => {
            if (station.location && station.location.latitude && station.location.longitude) {
                bounds.extend({
                    lat: station.location.latitude,
                    lng: station.location.longitude
                });
            }
        });
        return bounds;
    };

    // Fit map to bounds when stations change
    useEffect(() => {
        if (map && stations && stations.length > 0) {
            const bounds = calculateBounds();
            if (bounds) {
                map.fitBounds(bounds);
                
                // Add some padding
                const padding = 50;
                map.panToBounds(bounds, padding);
            }
        }
    }, [map, stations]);

    const handleMarkerClick = (station) => {
        setSelectedStation(station);
        if (onStationClick) {
            onStationClick(station);
        }
    };

    const getStationStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'open':
                return COLORS.primary;
            case 'closed':
                return COLORS.secondaryText;
            case 'reviewing':
                return COLORS.HighlightText;
            case 'disabled_by_so':
                return COLORS.danger;
            case 'deleted':
                return COLORS.mainTextColor;
            default:
                return COLORS.star;
        }
    };

    return (
        <div className="map-container rounded-lg overflow-hidden">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={defaultCenter}
                zoom={10}
                onLoad={map => setMap(map)}
                options={{
                    streetViewControl: false,
                    mapTypeControl: true,
                    fullscreenControl: true,
                }}
            >
                {stations && stations.map((station, index) => {
                    if (!station.location || !station.location.latitude || !station.location.longitude) {
                        return null;
                    }

                    const position = {
                        lat: station.location.latitude,
                        lng: station.location.longitude
                    };

                    return (
                        <Marker
                            key={station._id || index}
                            position={position}
                            title={station.station_name}
                            icon={{
                                path: window.google.maps.SymbolPath.CIRCLE,
                                fillColor: getStationStatusColor(station.status),
                                fillOpacity: 1,
                                strokeColor: '#FFFFFF',
                                strokeWeight: 2,
                                scale: 8,
                            }}
                            onClick={() => handleMarkerClick(station)}
                        />
                    );
                })}

                {selectedStation && (
                    <InfoWindow
                        position={{
                            lat: selectedStation.location.latitude,
                            lng: selectedStation.location.longitude
                        }}
                        onCloseClick={() => setSelectedStation(null)}
                    >
                        <div style={{ maxWidth: '200px' }}>
                            <h3 className="font-semibold text-sm" style={{ color: COLORS.mainTextColor }}>
                                {selectedStation.station_name}
                            </h3>
                            <p className="text-xs mt-1" style={{ color: COLORS.secondaryText }}>
                                {selectedStation.address}
                            </p>
                            <div className="flex items-center mt-2">
                                <span 
                                    className="px-2 py-1 rounded-full text-xs capitalize"
                                    style={{
                                        backgroundColor: getStationStatusColor(selectedStation.status) + '20',
                                        color: getStationStatusColor(selectedStation.status)
                                    }}
                                >
                                    {selectedStation.status}
                                </span>
                                <span className="text-xs ml-2" style={{ color: COLORS.secondaryText }}>
                                    {selectedStation.chargers?.length || 0} chargers
                                </span>
                            </div>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
};

export default function AdminDashboardPage() {
    const [dashboardData, setDashboardData] = useState(null)
    const [stations, setStations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchDashboardData()
        fetchAllStations()
    }, [])

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            const url = `${API_BASE_URL}/api/admin-dashboard/stats`
            console.log('🌐 API_BASE_URL:', API_BASE_URL)
            console.log('🔗 Fetching from:', url)
            
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            console.log('✅ Response received:', response)
            console.log('📊 Response data:', response.data)
            
            if (response.data.success) {
                setDashboardData(response.data.data)
                console.log('✅ Dashboard data set successfully')
            } else {
                throw new Error(response.data.message || 'Failed to load dashboard data')
            }
        } catch (err) {
            console.error('❌ Error fetching dashboard data:', err)
            console.error('❌ Error response:', err.response)
            setError(err.message || 'Failed to fetch dashboard data')
        } finally {
            setLoading(false)
        }
    }

    const fetchAllStations = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/stations/all-stations`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.success) {
                setStations(response.data.data);
                console.log('✅ Stations data loaded:', response.data.data.length, 'stations');
            } else {
                console.error('Failed to load stations data');
            }
        } catch (err) {
            console.error('❌ Error fetching stations:', err);
        }
    }

    const handleStationClick = (station) => {
        console.log('Station clicked:', station);
        // You can add navigation or modal opening logic here
        // Example: navigate(`/admin/stations/${station._id}`);
    }

    // Loading state
    if (loading) {
        return (
            <div style={{ 
                fontFamily: FONTS.family.sans, 
                padding: '24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="spinner" style={{
                        border: `4px solid ${COLORS.lightGray}`,
                        borderTop: `4px solid ${COLORS.primary}`,
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px'
                    }}></div>
                    <p style={{ color: COLORS.secondaryText }}>Loading dashboard...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div style={{ fontFamily: FONTS.family.sans, padding: '24px' }}>
                <AdminPageHeader title="Platform Overview" />
                <div style={{
                    backgroundColor: '#fee',
                    border: '1px solid #fcc',
                    borderRadius: '8px',
                    padding: '16px',
                    marginTop: '16px'
                }}>
                    <p style={{ color: '#c00', fontWeight: 'bold' }}>Error Loading Dashboard</p>
                    <p style={{ color: '#666' }}>{error}</p>
                    <button
                        onClick={fetchDashboardData}
                        style={{
                            marginTop: '12px',
                            padding: '8px 16px',
                            backgroundColor: COLORS.primary,
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    // No data state
    if (!dashboardData) {
        return (
            <div style={{ fontFamily: FONTS.family.sans, padding: '24px' }}>
                <AdminPageHeader title="Platform Overview" />
                <p style={{ color: COLORS.secondaryText, marginTop: '16px' }}>
                    No dashboard data available
                </p>
            </div>
        )
    }

    // Calculate latest user growth data for display
    const latestUserGrowth = dashboardData.userGrowth?.[dashboardData.userGrowth.length - 1] || {}
    const newUsers = latestUserGrowth.newUsers || 0
    const activeUsers = latestUserGrowth.activeUsers || 0

    // Format percentage values
    const formatPercentage = (value) => {
        const num = parseFloat(value)
        return num >= 0 ? `+${num}` : `${num}`
    }

    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <div style={{ fontFamily: FONTS.family.sans, padding: '24px' }}>
                {/* Header */}
                <AdminPageHeader title="Platform Overview" />

                {/* Platform Overview Section */}
                <section className="mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <StatCard
                            title="Stations"
                            value={dashboardData.stats.stations.total}
                            subValue={`${dashboardData.stats.stations.pending} Pending`}
                            icon="stations"
                        />

                        <StatCard
                            title="Chargers"
                            value={dashboardData.stats.chargers.total}
                            subValue={`${dashboardData.stats.chargers.faulted} Faulted`}
                            icon="connectors"
                        />

                        <StatCard
                            title="EV Users"
                            value={dashboardData.stats.users.total.toLocaleString()}
                            subValue={`${formatPercentage(dashboardData.stats.users.riskPercentage)}% vs last month`}
                            icon="users"
                            status={parseFloat(dashboardData.stats.users.riskPercentage) >= 0 ? 'positive' : 'negative'}
                        />

                        <StatCard
                            title="Revenue"
                            value={`LKR ${(-dashboardData.stats.revenue.total).toLocaleString()}`}
                            icon="revenue"
                            status={parseFloat(dashboardData.stats.revenue.bookingFees) >= 0 ? 'positive' : 'negative'}
                        />
                    </div>
                </section>

                {/* Main Charts Section */}
                <section className="mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* User Growth Chart */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                                User Growth
                            </h2>
                            <OverviewCard>
                                <StationsMap 
                                    stations={stations} 
                                    onStationClick={handleStationClick}
                                />
                                <div className="mt-3 text-center text-sm" style={{ color: COLORS.secondaryText }}>
                                    {stations.length} stations loaded • Click on markers for details
                                </div>
                                <div className="flex flex-wrap gap-4 mt-2 justify-center">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.primary }}></div>
                                        <span className="text-xs">Open</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.secondaryText }}></div>
                                        <span className="text-xs">Closed</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.HighlightText }}></div>
                                        <span className="text-xs">Reviewing</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.danger }}></div>
                                        <span className="text-xs">Disabled</span>
                                    </div>
                                </div>
                            </OverviewCard>
                        </div>

                        {/* Revenue Trend */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                                Revenue Trends
                            </h2>
                            <OverviewCard>
                                <div className="h-70">
                                    <RevenueTrendChart data={dashboardData.dailyRevenueTrends} />
                                </div>
                            
                            {/* Revenue Summary Cards */}
                           {dashboardData.revenueBreakdown && (() => {
        // Flip the signs for display
                                const total = -dashboardData.revenueBreakdown.total;
                                const charging = -dashboardData.revenueBreakdown.charging;
                                const booking = -dashboardData.revenueBreakdown.booking;
                                
                                // Calculate percentages
                                const chargingPercentage = total !== 0 ? ((charging / total) * 100).toFixed(1) : '0.0';
                                const bookingPercentage = total !== 0 ? ((booking / total) * 100).toFixed(1) : '0.0';
                                
                                return (
                                    <div className="grid grid-cols-3 gap-4 mt-3">
                                        <div style={{
                                            padding: '16px',
                                            backgroundColor: COLORS.primary,
                                            borderRadius: '8px',
                                            color: 'white'
                                        }}>
                                            <p style={{ fontSize: '12px', opacity: 0.9 }}>Total Revenue</p>
                                            <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>
                                                LKR {total.toLocaleString()}
                                            </p>
                                            <p style={{ fontSize: '10px', opacity: 0.8, marginTop: '4px' }}>
                                                100%
                                            </p>
                                        </div>
                                        <div style={{
                                            padding: '16px',
                                            backgroundColor: COLORS.star,
                                            borderRadius: '8px',
                                            color: 'white'
                                        }}>
                                            <p style={{ fontSize: '12px', opacity: 0.9 }}>Charging Sessions</p>
                                            <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>
                                                LKR {charging.toLocaleString()}
                                            </p>
                                            <p style={{ fontSize: '10px', opacity: 0.8, marginTop: '4px' }}>
                                                {chargingPercentage}% of total
                                            </p>
                                        </div>
                                        <div style={{
                                            padding: '16px',
                                            backgroundColor: COLORS.danger,
                                            borderRadius: '8px',
                                            color: 'white'
                                        }}>
                                            <p style={{ fontSize: '12px', opacity: 0.9 }}>Booking Fees</p>
                                            <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>
                                                LKR {booking.toLocaleString()}
                                            </p>
                                            <p style={{ fontSize: '10px', opacity: 0.8, marginTop: '4px' }}>
                                                {bookingPercentage}% of total
                                            </p>
                                        </div>
                                    </div>
                                );
                            })()}
                            </OverviewCard>
                        </div>
                    </div>
                </section>

                {/* Connector Status with Station Status and Quick Summary Section */}
                <section className="mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {/* Left Side - Charger Status (1 column) */}
                        <div className="lg:col-span-1">
                            <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                                Charger Status
                            </h2>
                            <StatusCard
                                value={dashboardData.stats.chargers.faulted}
                                total={dashboardData.stats.chargers.total}
                            >
                                <ConnectorStatusChart
                                    faulted={dashboardData.stats.chargers.faulted}
                                    operational={dashboardData.stats.chargers.total - dashboardData.stats.chargers.faulted}
                                />
                            </StatusCard>
                        </div>

                        {/* Middle - Station Status (1 column) */}
                        <div className="lg:col-span-1">
                            <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                                Station Status
                            </h2>
                            <OverviewCard>
                                <div className="space-y-3 p-4">
                                    {(() => {
                                        const statusCounts = stations.reduce((acc, station) => {
                                            const status = station.status?.toLowerCase() || 'unknown';
                                            acc[status] = (acc[status] || 0) + 1;
                                            return acc;
                                        }, {});

                                        const statusOrder = ['open', 'closed', 'reviewing', 'disabled_by_so', 'deleted'];
                                        
                                        return statusOrder.map(status => {
                                            if (statusCounts[status]) {
                                                return (
                                                    <div key={status} className="flex justify-between items-center">
                                                        <span className="text-sm capitalize" style={{ color: COLORS.mainTextColor }}>
                                                            {status.replace('_', ' ')}
                                                        </span>
                                                        <span className="font-semibold" style={{ color: getStationStatusColor(status) }}>
                                                            {statusCounts[status]}
                                                        </span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }).filter(Boolean);
                                    })()}
                                </div>
                            </OverviewCard>
                        </div>

                        {/* Right Side - Quick Summary (2 columns, 2x2 grid) */}
                        {dashboardData.summary && (
                            <div className="lg:col-span-2">
                                <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                                    Quick Summary
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <OverviewCard>
                                        <div style={{ padding: '16px' }}>
                                            <p style={{ color: COLORS.secondaryText, fontSize: '14px' }}>Active Sessions</p>
                                            <p style={{ color: COLORS.mainTextColor, fontSize: '24px', fontWeight: 'bold' }}>
                                                {dashboardData.summary.sessions.active}
                                            </p>
                                        </div>
                                    </OverviewCard>
                                    <OverviewCard>
                                        <div style={{ padding: '16px' }}>
                                            <p style={{ color: COLORS.secondaryText, fontSize: '14px' }}>Upcoming Bookings</p>
                                            <p style={{ color: COLORS.mainTextColor, fontSize: '24px', fontWeight: 'bold' }}>
                                                {dashboardData.summary.bookings.upcoming}
                                            </p>
                                        </div>
                                    </OverviewCard>
                                    <OverviewCard>
                                        <div style={{ padding: '16px' }}>
                                            <p style={{ color: COLORS.secondaryText, fontSize: '14px' }}>Completed Bookings</p>
                                            <p style={{ color: COLORS.mainTextColor, fontSize: '24px', fontWeight: 'bold' }}>
                                                {dashboardData.summary.bookings.completed}
                                            </p>
                                        </div>
                                    </OverviewCard>
                                    <OverviewCard>
                                        <div style={{ padding: '16px' }}>
                                            <p style={{ color: COLORS.secondaryText, fontSize: '14px' }}>Total Sessions</p>
                                            <p style={{ color: COLORS.mainTextColor, fontSize: '24px', fontWeight: 'bold' }}>
                                                {dashboardData.summary.sessions.total}
                                            </p>
                                        </div>
                                    </OverviewCard>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </LoadScript>
    )
}

// Helper function for status colors (needs to be outside the component)
const getStationStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'open':
            return COLORS.primary;
        case 'closed':
            return COLORS.secondaryText;
        case 'reviewing':
            return COLORS.HighlightText;
        case 'disabled_by_so':
            return COLORS.danger;
        case 'deleted':
            return COLORS.mainTextColor;
        default:
            return COLORS.star;
    }
};
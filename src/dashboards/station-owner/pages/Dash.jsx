import React, { useState, useEffect } from 'react';
import { COLORS } from '../../../constants/colors';
import { FONTS } from '../../../constants/fonts';
import StatCard from '../components/StatCard';
import StationsIcon from '../../../assets/stations.svg';
import ConnectorsIcon from '../../../assets/connectors.svg';
import SessionsIcon from '../../../assets/sessions.svg';
import ElectricityIcon from '../../../assets/electricity.svg';
import IncomeIcon from '../../../assets/earnings2.svg';
import StationOwnerPageHeader from '../components/StationOwnerPageHeader';
import OverviewChart from '../components/dashboardComponents/OverviewChart';
import ConnectorStatusChart from '../components/dashboardComponents/ConnectorStatusChart';
import StackedSessionsChart from '../components/dashboardComponents/StackedSessionCard';
import FaultReportsStatusCard from '../components/dashboardComponents/FaultReportsStatusChart';
import FourWeeksEarnings from '../components/dashboardComponents/FourWeeksEarnings';
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const STAT_TEMPLATES = [
    { title: 'Total Stations', key: 'totalStations', icon: StationsIcon, valueFormat: (v) => v?.padStart(2, '0'), showActive: true },
    { title: 'Total Chargers', key: 'totalChargers', icon: ConnectorsIcon, valueFormat: (v) => v?.padStart(2, '0'), showActive: false },
    { title: 'Sessions - Today', key: 'sessionsToday', icon: SessionsIcon, valueFormat: (v) => v?.padStart(2, '0'), showActive: true, activeKey: 'activeSessions' },
    { title: 'Electricity - Today', key: 'electricityToday', icon: ElectricityIcon, valueFormat: (v) => v, showActive: false },
    { title: 'Revenue - Today', key: 'revenueToday', icon: IncomeIcon, valueFormat: (v) => v, showActive: false, showTrend: true }
];

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
const StationsMap = ({ stations }) => {
    const [selectedStation, setSelectedStation] = useState(null);
    const [map, setMap] = useState(null);

    // Calculate bounds to fit all stations
    const calculateBounds = () => {
        if (!stations || stations.length === 0) return null;

        const bounds = new window.google.maps.LatLngBounds();
        stations.forEach(station => {
            if (station.location && (station.location.latitude || station.location.lat) && (station.location.longitude || station.location.lng)) {
                bounds.extend({
                    lat: station.location.latitude || station.location.lat,
                    lng: station.location.longitude || station.location.lng
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
                setTimeout(() => {
                    map.panToBounds(bounds, padding);
                }, 100);
            }
        }
    }, [map, stations]);

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
            default:
                return COLORS.star;
        }
    };

    if (!stations || stations.length === 0) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                <p style={{ color: COLORS.secondaryText }}>No stations available to display on map</p>
            </div>
        );
    }

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
                {stations.map((station, index) => {
                    const lat = station.location?.latitude || station.location?.lat;
                    const lng = station.location?.longitude || station.location?.lng;
                    
                    if (!lat || !lng) {
                        return null;
                    }

                    const position = { lat, lng };

                    return (
                        <Marker
                            key={station._id || station.id || index}
                            position={position}
                            title={station.station_name || station.name}
                            icon={{
                                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" fill="${getStationStatusColor(station.status)}" stroke="white" stroke-width="2"/>
                                    </svg>
                                `)}`,
                                scaledSize: new window.google.maps.Size(24, 24),
                                anchor: new window.google.maps.Point(12, 12)
                            }}
                            onClick={() => setSelectedStation(station)}
                        />
                    );
                })}

                {selectedStation && (
                    <InfoWindow
                        position={{
                            lat: selectedStation.location?.latitude || selectedStation.location?.lat,
                            lng: selectedStation.location?.longitude || selectedStation.location?.lng
                        }}
                        onCloseClick={() => setSelectedStation(null)}
                    >
                        <div style={{ maxWidth: '200px' }}>
                            <h3 className="font-semibold text-sm" style={{ color: COLORS.mainTextColor }}>
                                {selectedStation.station_name || selectedStation.name}
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

// Owner Stations Map Card Component
const OwnerStationsMapCard = ({ stations }) => {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm h-full" style={{ borderColor: COLORS.stroke }}>
            <h3 className="font-semibold mb-3" style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.base }}>
                My Stations Map
            </h3>
            <StationsMap stations={stations} />
            <div className="mt-3 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.primary }}></div>
                    <span className="text-xs" style={{ color: COLORS.secondaryText }}>Open</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.secondaryText }}></div>
                    <span className="text-xs" style={{ color: COLORS.secondaryText }}>Closed</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.HighlightText }}></div>
                    <span className="text-xs" style={{ color: COLORS.secondaryText }}>Reviewing</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.danger }}></div>
                    <span className="text-xs" style={{ color: COLORS.secondaryText }}>Disabled</span>
                </div>
            </div>
        </div>
    );
};

export default function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        const ownerId = localStorage.getItem('userID');
        const token = localStorage.getItem('accessToken');

        if (!ownerId || !token) {
            setLoading(false);
            return;
        }

        try {
            // Fetch dashboard stats and stations in parallel
            const [statsResponse, stationsResponse] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/station-owner-dashboard/stats`, { 
                    headers: { 'Authorization': `Bearer ${token}` },
                    params: { stationOwnerId: ownerId } 
                }),
                // Fetch owner's stations for the map
                axios.get(`${API_BASE_URL}/api/stations/owner-stations`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    params: { stationOwnerId: ownerId }
                })
            ]);

            setStats(statsResponse.data.data);
            setStations(stationsResponse.data.data || []);

        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const renderedStats = STAT_TEMPLATES.map(template => {
        const rawValue = stats?.[template.key] || '00';
        const formattedValue = template.valueFormat ? template.valueFormat(rawValue) : rawValue;
        
        return {
            title: template.title,
            value: formattedValue,
            activeSessions: template.showActive ? (stats?.[template.activeKey] || '00') : undefined,
            icon: (
                <img 
                    src={template.icon} 
                    alt={template.title} 
                    style={{ width: template.title === 'Revenue - Today' ? 16 : 20, height: template.title === 'Revenue - Today' ? 16 : 20, color: COLORS.mainTextColor }} 
                    className={template.title === 'Revenue - Today' ? "mr-1" : ""}
                />
            ),
        };
    });

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    
    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <div
                style={{
                    fontFamily: FONTS.family.sans,
                    padding: '24px',
                    backgroundColor: COLORS.background,
                }}
            >
                <StationOwnerPageHeader title="Stations Overview" />

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 space-x-4 mb-4">
                    {renderedStats.map((stat, index) => (
                        <StatCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            activeSessions={stat.activeSessions}
                            icon={stat.icon}
                        />
                    ))}
                </div>

                {/* Status Overview 1 */}
                <div className="flex flex-col lg:flex-row gap-4 w-full mb-4">
                    {/* Replace MapCard with OwnerStationsMapCard */}
                    <div className="w-full lg:w-2/5">
                        <OwnerStationsMapCard stations={stations} />
                    </div>
                    <div className="w-full lg:w-3/5">
                        <OverviewChart />
                    </div>
                </div>

                {/* Status Overview 2 */}
                <div className="flex flex-col lg:flex-row gap-4 w-full">
                    <div className="w-full lg:w-2/5">
                        <StackedSessionsChart />
                    </div>
                    <div className="w-full lg:w-1/5">
                        <ConnectorStatusChart />
                    </div>
                    <div className="w-full lg:w-1/5">
                        <FaultReportsStatusCard />
                    </div>
                    <div className="w-full lg:w-1/5">
                        <FourWeeksEarnings />
                    </div>
                </div>
            </div>
        </LoadScript>
    );
}
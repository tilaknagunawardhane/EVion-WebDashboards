import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../../../constants';
import UserPageHeader from '../components/UserPageHeader';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StationDetailsPage = () => {
    const { stationId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [stationData, setStationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (stationId) {
            fetchStationDetails();
        }
    }, [stationId]);

    const fetchStationDetails = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            const response = await axios.get(
                `${API_BASE_URL}/api/stations/support-officer/stations/${stationId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
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

    const getChargerStatusBadge = (status) => {
        const statusText = status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');

        const bgColor = status === 'open'
            ? { backgroundColor: COLORS.bgGreen, color: COLORS.primary }
            : status === 'unavailable'
                ? { backgroundColor: COLORS.bgYellow, color: COLORS.HighlightText }
                : status === 'disabled_by_SO'
                    ? { backgroundColor: COLORS.bgRed, color: COLORS.danger }
                    : { backgroundColor: COLORS.bgYellow, color: COLORS.HighlightText };

        return (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium`}
                style={bgColor}
            >
                {statusText}
            </span>
        );
    };


    if (loading) {
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!stationData) {
        return (
            <div style={{ fontFamily: FONTS.family.sans, padding: '24px', backgroundColor: COLORS.background }}>
                <UserPageHeader title="Station Not Found" />
                <div className="text-center py-12">
                    <p className="text-gray-600">Station not found or you don't have access to view it.</p>
                    <button
                        onClick={() => navigate('/support-officer/chargingStations')}
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

    return (
        <div style={{ fontFamily: FONTS.family.sans, padding: '24px', backgroundColor: COLORS.background }}>
            <UserPageHeader title={`Station Details - ${station.station_name}`} />

            {/* Back Button */}
            <button
                onClick={() => navigate('/support-officer/chargingStations')}
                className="mb-6 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center"
            >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Stations
            </button>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
                {['overview', 'chargers', 'reports', 'analytics'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 font-medium ${activeTab === tab
                            ? 'border-b-2 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                        style={{
                            borderBottomColor: activeTab === tab ? COLORS.primary : 'transparent',
                            color: activeTab === tab ? COLORS.primary : COLORS.secondaryText
                        }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Station Details Card */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Station Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Station Name</label>
                                <p>{station.station_name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Status</label>
                                {getStatusBadge(station.station_status)}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Owner</label>
                                <p className="text-gray-900">{station.owner_name}</p>
                                <p className="text-gray-600 text-sm">{station.owner_email}</p>
                                {station.owner_contact && (
                                    <p className="text-gray-600 text-sm">{station.owner_contact}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>District</label>
                                <p className="text-gray-900">{station.district_name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>City</label>
                                <p className="text-gray-900">{station.city}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Address</label>
                                <p className="text-gray-900">{station.address || 'No address provided'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Electricity Provider</label>
                                <p className="text-gray-900">{station.electricity_provider || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Power Source</label>
                                <p className="text-gray-900">{station.power_source || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Created Date</label>
                            <p className="text-gray-900">{new Date(station.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondaryText }}>Last Updated</label>
                            <p className="text-gray-900">{new Date(station.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Statistics Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Statistics</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span className="text-sm font-medium">Total Reports</span>
                                <span className="text-lg font-bold" style={{ color: COLORS.danger }}>{statistics.total_reports}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span className="text-sm font-medium">Station Reports</span>
                                <span className="text-lg font-bold" style={{ color: COLORS.HighlightText }}>{statistics.station_reports}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span className="text-sm font-medium">Charger Reports</span>
                                <span className="text-lg font-bold" style={{ color: COLORS.HighlightText }}>{statistics.charger_reports}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span className="text-sm font-medium">Booking Reports</span>
                                <span className="text-lg font-bold" style={{ color: COLORS.HighlightText }}>{statistics.booking_reports}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span className="text-sm font-medium">Recent Bookings (30 days)</span>
                                <span className="text-lg font-bold" style={{ color: COLORS.primary }}>{statistics.recent_bookings}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span className="text-sm font-medium">Average Rating</span>
                                <span className="text-lg font-bold" style={{ color: COLORS.HighlightText }}>
                                    {statistics.average_rating} ⭐ ({statistics.total_ratings} ratings)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Charger Summary Card */}
                    <div className="lg:col-span-3 bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Charger Summary</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 rounded" style={{ background: COLORS.bgGreen }}>
                                <div className="text-2xl font-bold " style={{ color: COLORS.primary }}>{statistics.charger_stats.available}</div>
                                <div className="text-sm " style={{ color: COLORS.primary, opacity: 0.8 }}>Available</div>
                            </div>

                            <div className="text-center p-4 rounded" style={{ background: COLORS.bgYellow }}>
                                <div className="text-2xl font-bold" style={{ color: COLORS.HighlightText }}>{statistics.charger_stats.unavailable}</div>
                                <div className="text-sm " style={{ color: COLORS.HighlightText, opacity: 0.8 }}>Unavailable</div>
                            </div>

                            <div className="text-center p-4 rounded" style={{ background: COLORS.bgRed }}>
                                <div className="text-2xl font-bold" style={{ color: COLORS.danger }}>{statistics.charger_stats.disabled}</div>
                                <div className="text-sm" style={{ color: COLORS.danger, opacity: 0.8 }}>Disabled</div>
                            </div>

                            <div className="text-center p-4 bg-blue-50 rounded">
                                <div className="text-2xl font-bold text-blue-800">{statistics.charger_stats.total}</div>
                                <div className="text-sm text-blue-600">Total Chargers</div>
                            </div>

                            <div className="text-center p-4 bg-gray-50 rounded">
                                <div className="text-2xl font-bold text-gray-800">{statistics.charger_stats.byPowerType.AC}</div>
                                <div className="text-sm text-gray-600">AC Chargers</div>
                            </div>

                            <div className="text-center p-4 bg-gray-50 rounded">
                                <div className="text-2xl font-bold text-gray-800">{statistics.charger_stats.byPowerType.DC}</div>
                                <div className="text-sm text-gray-600">DC Chargers</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Chargers Tab */}
            {activeTab === 'chargers' && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Chargers ({chargers.length})</h2>

                    {chargers.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No chargers found for this station.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {chargers.map((charger, index) => (
                                <div key={charger._id || index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-semibold text-lg">{charger.charger_name}</h3>
                                        {getChargerStatusBadge(charger.charger_status)}
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <p><strong>Power Type:</strong> {charger.power_type}</p>
                                        <p><strong>Max Output:</strong> {charger.max_power_output} kW</p>
                                        <p><strong>Price:</strong> Rs {charger.price}</p>
                                        <p><strong>Connectors:</strong> {charger.available_connectors}/{charger.total_connectors} available</p>

                                        {charger.connector_details.length > 0 && (
                                            <div className="mt-3">
                                                <strong>Connector Types:</strong>
                                                <div className="mt-1 space-y-1">
                                                    {charger.connector_details.map((connector, idx) => (
                                                        <div key={idx} className="flex justify-between items-center text-xs">
                                                            <span>{connector.connector_name} ({connector.current_type})</span>
                                                            <span
                                                                className="px-2 py-1 rounded"
                                                                style={{
                                                                    backgroundColor: connector.status === 'available' ? COLORS.bgGreen : COLORS.bgRed,
                                                                    color: connector.status === 'available' ? COLORS.primary : COLORS.danger
                                                                }}
                                                            >
                                                                {connector.status}
                                                            </span>
                                                        </div>

                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Reports Overview</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="p-4 rounded" style={{ background: COLORS.bgRed }}>
                            <h3 className="font-semibold mb-2" style={{ color: COLORS.danger }}>Total Reports</h3>
                            <p className="text-3xl font-bold" style={{ color: COLORS.danger, opacity: 0.8 }}>{statistics.total_reports}</p>
                        </div>

                        <div className="p-4 rounded" style={{ background: COLORS.bgYellow }}>
                            <h3 className="font-semibold mb-2" style={{ color: COLORS.HighlightText }}>Station Reports</h3>
                            <p className="text-3xl font-bold" style={{ color: COLORS.HighlightText, opacity: 0.8 }}>{statistics.station_reports}</p>
                        </div>

                        <div className="p-4 rounded" style={{ background: COLORS.bgYellow }}>
                            <h3 className="font-semibold mb-2" style={{ color: COLORS.HighlightText }}>Station Reports</h3>
                            <p className="text-3xl font-bold" style={{ color: COLORS.HighlightText, opacity: 0.8 }}>{statistics.charger_reports}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded">
                        <h3 className="font-semibold mb-3">Report Types</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span>Station Fault Reports</span>
                                <span className="font-semibold">{statistics.station_reports}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Charger Fault Reports</span>
                                <span className="font-semibold">{statistics.charger_reports}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Booking Related Reports</span>
                                <span className="font-semibold">{statistics.booking_reports}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Station Analytics</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 p-4 rounded">
                            <h3 className="font-semibold text-blue-800 mb-2">Recent Activity</h3>
                            <p className="text-lg font-bold text-blue-600">{statistics.recent_bookings} bookings in last 30 days</p>
                        </div>

                        <div className="p-4 rounded" style={{ background: COLORS.bgGreen }}>
                            <h3 className="font-semibold mb-2" style={{ color: COLORS.primary }}>Customer Satisfaction</h3>
                            <p className="text-lg font-bold" style={{ color: COLORS.primary, opacity: 0.8 }}>
                                {statistics.average_rating} ⭐ average rating
                            </p>
                            <p className="text-sm" style={{ color: COLORS.primary }}>({statistics.total_ratings} total ratings)</p>
                        </div>
                    </div>

                    <div className="mt-6 bg-gray-50 p-4 rounded">
                        <h3 className="font-semibold mb-3">Charger Availability</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span>Total Chargers</span>
                                <span className="font-semibold">{statistics.charger_stats.total}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Available Chargers</span>
                                <span className="font-semibold"  style={{ color: COLORS.primary }}>{statistics.charger_stats.available}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Unavailable Chargers</span>
                                <span className="font-semibold"  style={{ color: COLORS.HighlightText }}>{statistics.charger_stats.unavailable}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Disabled Chargers</span>
                                <span className="font-semibold"  style={{ color: COLORS.danger }}>{statistics.charger_stats.disabled}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StationDetailsPage;
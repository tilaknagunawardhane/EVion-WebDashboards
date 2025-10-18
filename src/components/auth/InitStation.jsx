// components/pages/InitStations.jsx (updated)
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/Layout';
import { COLORS, FONTS } from '../../constants';
import Button from '../ui/Button';
import StationCard from '../ui/InitStationCard';
import AddChargingStationForm from '../ui/AddStationForm';
import ChatPopup from '../../dashboards/station-owner/components/chats/ChatPopup';
import NotificationPopup from '../../dashboards/station-owner/components/notificationComponents/InitStationNotificationPopup';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function InitStations() {
    const [showForm, setShowForm] = useState(false);
    const [editingStation, setEditingStation] = useState(null);
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const navigate = useNavigate();

    const fetchStations = async () => {
        try {
            const stationOwnerID = localStorage.getItem('userID');
            const response = await axios.post(
                `${API_BASE_URL}/api/stations/get-request-stations`,
                { stationOwnerID },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );

            if (response.data.success) {
                setStations(response.data.data);
            } else {
                toast.error('Failed to fetch stations');
            }
        } catch (error) {
            console.error('Error fetching stations:', error);
            toast.error(error.response?.data?.message || 'Error fetching stations');

            if (error.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchUnreadCount = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const userId = localStorage.getItem('userID');
            const userModel = 'stationowner'; // Since this is the station owner dashboard

            const response = await axios.post(
                `${API_BASE_URL}/api/notifications/unread-count/${userId}`, { userModel },
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                setUnreadCount(response.data.count);
            }
        } catch (error) {
            console.error('Error fetching unread count:', error);
        }
    };

    useEffect(() => {
        fetchStations();
        fetchUnreadCount();

        // Set up polling for unread count (refresh every 30 seconds)
        const interval = setInterval(fetchUnreadCount, 30000);

        return () => clearInterval(interval);
    }, [navigate]);

    const handleAddStation = () => {
        fetchStations();
        setShowForm(false);
        toast.success('Station added successfully');
    };

    const handleRemoveStation = async (stationId) => {
        try {
            const stationOwnerID = localStorage.getItem('userID');
            const response = await axios.delete(
                `${API_BASE_URL}/api/stations/delete-station/${stationId}`,
                {
                    data: { stationOwnerID },
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );

            if (response.data.success) {
                toast.success('Station removed successfully');
                setStations(stations.filter(station => station._id !== stationId));
            } else {
                toast.error(response.data.message || 'Failed to remove station');
            }
        } catch (error) {
            console.error('Error removing station:', error);
            toast.error(error.response?.data?.message || 'Error removing station');
        }
    };

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
        // Refresh unread count when opening notifications
        if (!showNotifications) {
            fetchUnreadCount();
        }
    };

    return (
        <Layout>
            <div className="p-0 w-full max-w-6xl mx-auto space-y-6">
                {/* Header with title and buttons */}
                <div className="flex justify-between items-center">
                    <h2 className="mb-6" style={{
                        fontFamily: FONTS.family.sans,
                        fontSize: FONTS.sizes['2xl'],
                        fontWeight: FONTS.weights.normal,
                        color: COLORS.mainTextColor
                    }}>
                        Charging Stations
                    </h2>

                    <div className="flex items-center gap-4">
                        {/* Notification Button with Badge */}
                        <div className="relative">
                            <button
                                onClick={handleNotificationClick}
                                className="p-2 rounded-full relative transition-all hover:bg-[rgba(0,184,148,0.1)]"
                                title="Notifications"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    style={{
                                        color: showNotifications ? COLORS.primary : COLORS.secondaryText,
                                        transition: 'color 0.2s ease'
                                    }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>

                                {/* Unread Count Badge */}
                                {unreadCount > 0 && (
                                    <span
                                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                                        style={{
                                            backgroundColor: COLORS.primary,
                                            color: 'white',
                                            fontFamily: FONTS.family.sans,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Add Station Button */}
                        <Button variant="primary" type="button" onClick={() => setShowForm(true)}>
                            Add Charging Station
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
                            style={{ borderColor: COLORS.primary }}
                        ></div>
                    </div>
                ) : stations.length === 0 ? (
                    <p className="text-center" style={{ color: COLORS.secondaryText }}>
                        No stations found
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stations.map((station) => (
                            <StationCard
                                key={station._id}
                                station={station}
                                onEdit={setEditingStation}
                                onPay={() => navigate(`/payment/${station._id}`)}
                                onRemove={(station) => handleRemoveStation(station._id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Notification Popup */}
            <NotificationPopup
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
                onNotificationRead={() => {
                    // Decrement unread count when a notification is read
                    setUnreadCount(prev => Math.max(0, prev - 1));
                }}
                onAllNotificationsRead={() => {
                    // Reset unread count when all notifications are marked as read
                    setUnreadCount(0);
                }}
            />

            {/* Add ChatPopup component */}
            <ChatPopup />

            {/* Modal Form */}
            {showForm && (
                <AddChargingStationForm
                    onClose={() => setShowForm(false)}
                    onSubmit={handleAddStation}
                />
            )}

            {editingStation && (
                <AddChargingStationForm
                    isEdit={true}
                    stationToEdit={editingStation}
                    stationId={editingStation._id}
                    onClose={() => setEditingStation(null)}
                    onSubmit={(updatedStation) => {
                        setStations(stations.map(station =>
                            station._id === updatedStation._id ? updatedStation : station
                        ));
                        toast.success('Station updated successfully');
                    }}
                />
            )}
        </Layout>
    );
}
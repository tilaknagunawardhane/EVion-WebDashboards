// pages/NotificationsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { COLORS, FONTS } from '../../../constants';
import UserPageHeader from '../components/UserPageHeader';
import { useAuth } from '../../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({});
    const [filter, setFilter] = useState('all'); // 'all', 'unread'
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotifications();
    }, [filter]);

    const fetchNotifications = async (page = 1) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('accessToken');
            const userId = localStorage.getItem('userID');
            const userModel = currentUser.constructor.modelName ||
                (currentUser === 'stationowner' ? 'stationowner' :
                    currentUser === 'admin' ? 'Admin' :
                        currentUser === 'supportofficer' ? 'SupportOfficer' : 'EvOwner');

            const params = new URLSearchParams({
                page: page.toString(),
                limit: '20',
                unread: (filter === 'unread').toString(),
                userId: userId,
                userModel: userModel
            });

            const response = await axios.get(
                `${API_BASE_URL}/api/notifications?${params}`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                setNotifications(response.data.data);
                setPagination(response.data.pagination);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            if (error.response?.status === 401) {
                navigate('/auth?mode=login');
            } else {
                toast.error('Error loading notifications');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleNotificationClick = async (notification) => {
        try {
            const token = localStorage.getItem('accessToken');
            const userId = localStorage.getItem('userID');
            const userModel = currentUser.constructor.modelName ||
                (currentUser === 'stationowner' ? 'stationowner' :
                    currentUser === 'admin' ? 'Admin' :
                        currentUser === 'supportofficer' ? 'SupportOfficer' : 'EvOwner');

            // Mark as read if unread
            if (!notification.isRead) {
                await axios.put(
                    `${API_BASE_URL}/api/notifications/${notification._id}/read/${userId}`,
                    {},
                    {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }
                );

                // Update local state
                setNotifications(prev => prev.map(n =>
                    n._id === notification._id ? { ...n, isRead: true } : n
                ));
            }

            // Navigate based on notification type
            if (notification.relatedEntity && notification.relatedEntity.id) {
                switch (notification.type) {
                    case 'station_added':
                    case 'station_approved':
                    case 'station_rejected':
                        navigate(`/support-officer/chargingStations`);
                        break;
                    case 'new_report':
                        navigate(`/reports/${notification.relatedEntity.id}`);
                        break;
                    default:
                        // Stay on notifications page
                        break;
                }
            }
        } catch (error) {
            console.error('Error handling notification click:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            const token = localStorage.getItem('accessToken');

            const userId = localStorage.getItem('userID');
            const userModel = currentUser.constructor.modelName ||
                (currentUser === 'stationowner' ? 'stationowner' :
                    currentUser === 'admin' ? 'Admin' :
                        currentUser === 'supportofficer' ? 'SupportOfficer' : 'EvOwner');

            await axios.put(
                `${API_BASE_URL}/api/notifications/read-all/${userId}`, { userModel },
                {},
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            // Update local state
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            toast.success('All notifications marked as read');
        } catch (error) {
            console.error('Error marking all as read:', error);
            toast.error('Failed to mark all as read');
        }
    };

    const deleteNotification = async (notificationId, e) => {
        e.stopPropagation(); // Prevent triggering the click event

        try {
            const token = localStorage.getItem('accessToken');
            const userId = localStorage.getItem('userID');
            
            await axios.delete(
                `${API_BASE_URL}/api/notifications/${notificationId}/${userId}`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            // Remove from local state
            setNotifications(prev => prev.filter(n => n._id !== notificationId));
            toast.success('Notification deleted');
        } catch (error) {
            console.error('Error deleting notification:', error);
            toast.error('Failed to delete notification');
        }
    };

    if (loading && notifications.length === 0) {
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
            <UserPageHeader title="Notifications" />

            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-full text-sm ${filter === 'all' 
                                ? `text-white ${COLORS.primary}` 
                                : 'bg-gray-100 text-gray-700'}`}
                            style={{ 
                                fontFamily: FONTS.family.sans,
                                backgroundColor: filter === 'all' ? COLORS.primary : COLORS.border
                            }}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('unread')}
                            className={`px-4 py-2 rounded-full text-sm ${filter === 'unread' 
                                ? `text-white ${COLORS.primary}` 
                                : 'bg-gray-100 text-gray-700'}`}
                            style={{ 
                                fontFamily: FONTS.family.sans,
                                backgroundColor: filter === 'unread' ? COLORS.primary : COLORS.border
                            }}
                        >
                            Unread
                        </button>
                    </div>

                    {notifications.some(n => !n.isRead) && (
                        <button
                            onClick={markAllAsRead}
                            className="px-4 py-2 rounded text-sm"
                            style={{
                                color: COLORS.primary,
                                backgroundColor: `${COLORS.primary}10`,
                                fontFamily: FONTS.family.sans
                            }}
                        >
                            Mark all as read
                        </button>
                    )}
                </div>

                {notifications.length === 0 ? (
                    <div className="text-center py-12" style={{ color: COLORS.secondaryText, fontFamily: FONTS.family.sans }}>
                        <div className="text-2xl mb-2">No notifications</div>
                        <div className="text-sm">You're all caught up!</div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map(notification => (
                            <div
                                key={notification._id}
                                className={`p-4 rounded-lg border cursor-pointer transition-all relative ${!notification.isRead 
                                    ? `${COLORS.primary}50 border-${COLORS.primary}200` 
                                    : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                                onClick={() => handleNotificationClick(notification)}
                                style={{
                                    backgroundColor: !notification.isRead ? `${COLORS.primary}10` : 'white',
                                    borderColor: !notification.isRead ? `${COLORS.primary}30` : COLORS.border
                                }}
                            >
                                <button
                                    onClick={(e) => deleteNotification(notification._id, e)}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                                    title="Delete notification"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <div className="flex items-start">
                                    <div 
                                        className={`w-3 h-3 rounded-full mr-3 mt-1 ${!notification.isRead 
                                            ? COLORS.primary 
                                            : 'bg-transparent'}`}
                                        style={{ backgroundColor: !notification.isRead ? COLORS.primary : 'transparent' }}
                                    ></div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-sm mb-1" style={{ color: COLORS.mainTextColor, fontFamily: FONTS.family.sans }}>
                                            {notification.title}
                                        </h3>
                                        <p className="text-sm mb-2" style={{ color: COLORS.secondaryText, fontFamily: FONTS.family.sans }}>
                                            {notification.message}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <div className="text-xs" style={{ color: COLORS.secondaryText, fontFamily: FONTS.family.sans }}>
                                                {new Date(notification.createdAt).toLocaleDateString()} • {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                            <div className="text-xs px-2 py-1 rounded" style={{
                                                color: getPriorityColor(notification.priority),
                                                backgroundColor: `${getPriorityColor(notification.priority)}20`,
                                                fontFamily: FONTS.family.sans
                                            }}>
                                                {notification.priority}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {pagination.totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                        <div className="flex space-x-2">
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => fetchNotifications(page)}
                                    className={`w-8 h-8 rounded flex items-center justify-center ${pagination.currentPage === page 
                                        ? 'text-white' 
                                        : 'bg-gray-100 text-gray-700'}`}
                                    style={{ 
                                        fontFamily: FONTS.family.sans,
                                        backgroundColor: pagination.currentPage === page ? COLORS.primary : COLORS.border
                                    }}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper function to get color based on priority
const getPriorityColor = (priority) => {
    switch (priority) {
        case 'critical': return '#e53e3e'; // red
        case 'high': return '#dd6b20'; // orange
        case 'medium': return '#d69e2e'; // yellow
        case 'low': return '#38a169'; // green
        default: return '#718096'; // gray
    }
};

export default NotificationsPage;
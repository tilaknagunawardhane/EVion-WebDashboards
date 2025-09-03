// components/NotificationPopup.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { COLORS, FONTS } from '../../../../constants';
import { useAuth } from '../../../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NotificationPopup = ({ isOpen, onClose }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen]);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('accessToken');
            const userId = localStorage.getItem('userID');
            const userModel = currentUser.constructor.modelName ||
                (currentUser === 'stationowner' ? 'stationowner' :
                    currentUser === 'admin' ? 'Admin' :
                        currentUser === 'supportofficer' ? 'SupportOfficer' : 'EvOwner');

            // console.log("recipient details: ", userId, userModel)
            const params = new URLSearchParams({
                page: '1',
                limit: '5',
                unread: true,
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
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
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

            // Mark as read
            await axios.put(
                `${API_BASE_URL}/api/notifications/${notification._id}/read/${userId}`,
                {},
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            // Navigate based on notification type
            if (notification.relatedEntity && notification.relatedEntity.id) {
                switch (notification.type) {
                    case 'station_added':
                    case 'station_approved':
                    case 'station_rejected':
                        navigate(`/support-officer/chargingStations`);
                        break;
                    case 'new_report':
                        navigate(`/support-officer/faultReports`);
                        break;
                    default:
                        navigate('/notifications');
                }
            } else {
                navigate('/notifications');
            }

            onClose();
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
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end pt-16" onClick={onClose}>
            <div
                className="bg-white rounded-lg shadow-xl w-80 max-h-96 overflow-hidden mr-4 mt-2"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b" style={{ borderColor: COLORS.border }}>
                    <h3 className="font-medium" style={{ color: COLORS.mainTextColor, fontFamily: FONTS.family.sans }}>
                        Notifications
                    </h3>
                    {notifications.some(n => !n.isRead) && (
                        <button
                            onClick={markAllAsRead}
                            className="text-xs px-2 py-1 rounded"
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

                <div className="overflow-y-auto max-h-72">
                    {loading ? (
                        <div className="p-4 flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2" style={{ borderColor: COLORS.primary }}></div>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="p-4 text-center" style={{ color: COLORS.secondaryText, fontFamily: FONTS.family.sans }}>
                            No notifications
                        </div>
                    ) : (
                        notifications.map(notification => (
                            <div
                                key={notification._id}
                                className={`p-4 border-b cursor-pointer transition-colors ${!notification.isRead ? `${COLORS.primary}10` : 'hover:bg-gray-50'}`}
                                style={{ 
                                    borderColor: COLORS.border,
                                    backgroundColor: !notification.isRead ? `${COLORS.primary}10` : 'white'
                                }}
                                onClick={() => handleNotificationClick(notification)}
                            >
                                <div className="flex items-start">
                                    <div 
                                        className={`w-2 h-2 rounded-full mr-2 mt-2 ${!notification.isRead ? COLORS.primary : 'bg-transparent'}`}
                                        style={{ backgroundColor: !notification.isRead ? COLORS.primary : 'transparent' }}
                                    ></div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-sm mb-1" style={{ color: COLORS.mainTextColor, fontFamily: FONTS.family.sans }}>
                                            {notification.title}
                                        </h4>
                                        <p className="text-xs" style={{ color: COLORS.secondaryText, fontFamily: FONTS.family.sans }}>
                                            {notification.message}
                                        </p>
                                        <div className="text-xs mt-1" style={{ color: COLORS.lightText, fontFamily: FONTS.family.sans }}>
                                            {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div
                    className="p-3 text-center border-t cursor-pointer"
                    style={{ 
                        borderColor: COLORS.border, 
                        backgroundColor: `${COLORS.primary}05` 
                    }}
                    onClick={() => {
                        navigate('/support-officer/notifications');
                        onClose();
                    }}
                >
                    <span className="text-sm font-medium" style={{ color: COLORS.primary, fontFamily: FONTS.family.sans }}>
                        View All Notifications
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NotificationPopup;
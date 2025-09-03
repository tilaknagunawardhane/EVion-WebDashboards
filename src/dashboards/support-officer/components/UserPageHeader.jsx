import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { COLORS } from '../../../constants';
import NotificationsIcon from '../../../assets/notifications.svg';
import ChatIcon from '../../../assets/chat.svg';
import UserIcon from '../../../assets/user_icon.svg';
import NotificationPopup from './notificationComponents/NotificationPopup';
import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PageHeader = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { currentUser } = useAuth();
  
  // Determine active button based on current route
  const getActiveButton = () => {
    if (location.pathname.includes('/chat')) return 'chat';
    if (location.pathname.includes('/notifications')) return 'notifications';
    if (location.pathname.includes('/profile')) return 'profile';
    return null;
  };

  const activeButton = getActiveButton();

  useEffect(() => {
    fetchUnreadCount();
    
    // Set up polling for unread count (could be replaced with WebSockets)
    const interval = setInterval(fetchUnreadCount, 30000); // Poll every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userID');
      const userModel = currentUser.constructor.modelName || 
                        (currentUser === 'stationowner' ? 'stationowner' : 
                         currentUser === 'admin' ? 'Admin' : 
                         currentUser === 'supportofficer' ? 'SupportOfficer' : 'EvOwner');

      const response = await axios.post(
        `${API_BASE_URL}/api/notifications/unread-count/${userId}`,{ userModel },
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

  const handleButtonClick = (route) => {
    if (route === '/notifications') {
      setShowNotifications(prev => !prev);
    } else {
      setShowNotifications(false);
      navigate(route);
    }
  };

  // SVG filter for your exact primary color
  const primaryColorFilter = `
    brightness(0) saturate(100%)
    invert(67%) sepia(48%)
    saturate(718%) hue-rotate(123deg)
    brightness(95%) contrast(101%)
  `;

  return (
    <>
      <div className="flex justify-between items-center mb-8 w-full bg-white px-8 py-2 shadow-sm rounded-xl">
        <h1 className="text-sm sm:text-base font-medium" style={{ color: COLORS.mainTextColor }}>
          {title}
        </h1>
        
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Chat Button */}
          <button
            onClick={() => handleButtonClick('/support-officer/chat')}
            className={`p-2 rounded-full transition-all ${
              activeButton === 'chat' ? 'bg-[rgba(0,184,148,0.1)]' : 'hover:bg-[rgba(0,184,148,0.1)]'
            }`}
            title="Chat"
          >
            <img 
              src={ChatIcon} 
              alt="Chat"
              className="w-5 h-5"
              style={{ 
                filter: activeButton === 'chat' ? primaryColorFilter : 'brightness(0)',
                transition: 'filter 0.2s ease'
              }}
            />
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => handleButtonClick('/notifications')}
              className={`p-2 rounded-full relative transition-all ${
                activeButton === 'notifications' ? 'bg-[rgba(0,184,148,0.1)]' : 'hover:bg-[rgba(0,184,148,0.1)]'
              }`}
              title="Notifications"
            >
              <img 
                src={NotificationsIcon} 
                alt="Notifications" 
                className="w-5 h-5"
                style={{ 
                  filter: activeButton === 'notifications' || showNotifications ? primaryColorFilter : 'brightness(0)',
                  transition: 'filter 0.2s ease'
                }}
              />
              {unreadCount > 0 && (
                <span 
                  className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs"
                  style={{ 
                    backgroundColor: COLORS.primary, 
                    color: 'white',
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold'
                  }}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Profile Button */}
          <button
            onClick={() => handleButtonClick('/profile')}
            className={`p-2 rounded-full transition-all ${
              activeButton === 'profile' ? 'bg-[rgba(0,184,148,0.1)]' : 'hover:bg-[rgba(0,184,148,0.1)]'
            }`}
            title="Profile"
          >
            <img 
              src={UserIcon} 
              alt="Profile" 
              className="w-5 h-5"
              style={{ 
                filter: activeButton === 'profile' ? primaryColorFilter : 'brightness(0)',
                transition: 'filter 0.2s ease'
              }}
            />
          </button>
        </div>
      </div>

      <NotificationPopup 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
};

export default PageHeader;
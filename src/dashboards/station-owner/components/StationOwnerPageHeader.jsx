import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { COLORS } from '../../../constants';
import NotificationsIcon from '../../../assets/notifications.svg';
import ChatIcon from '../../../assets/chat.svg';
import UserIcon from '../../../assets/user_icon.svg';

const PageHeader = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active button based on current route
  const getActiveButton = () => {
    if (location.pathname.includes('/chat')) return 'chat';
    if (location.pathname.includes('/notifications')) return 'notifications';
    if (location.pathname.includes('/profile')) return 'profile';
    return null;
  };

  const activeButton = getActiveButton();

  const handleButtonClick = (route) => {
    navigate(route);
  };

  // SVG filter for your exact primary color
  const primaryColorFilter = `
    brightness(0) saturate(100%)
    invert(67%) sepia(48%)
    saturate(718%) hue-rotate(123deg)
    brightness(95%) contrast(101%)
  `;

  return (
    <div className="flex justify-between items-center mb-8 w-full bg-white px-8 py-2 shadow-sm rounded-xl">
      <h1 className="text-sm sm:text-base font-medium" style={{ color: COLORS.mainTextColor }}>
        {title}
      </h1>
      
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Chat Button */}
        <button
          onClick={() => handleButtonClick('/station-owner/chat')}
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
              filter: activeButton === 'notifications' ? primaryColorFilter : 'brightness(0)',
              transition: 'filter 0.2s ease'
            }}
          />
          {/* <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00b894]"></span> */}
        </button>

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
  );
};

export default PageHeader;
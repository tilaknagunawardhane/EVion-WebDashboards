import React, { useState } from 'react';
import TabBar from '../../components/TabBar';
import { COLORS, FONTS } from '../../../../constants';
import NotificationsIcon from '../../../../assets/notifications.svg';
import OverviewCard from '../../components/OverviewCard';
import { useNavigate, useParams } from 'react-router-dom';

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState('stations');
  const navigate = useNavigate();

  // Define your custom tabs
  const requestTabs = [
    { id: 'stations', label: 'Stations' },
    { id: 'connectors', label: 'Connectors' }
  ];

  // Optional: Define shortened labels for mobile
  const mobileTabLabels = {
    stations: 'Stations',
    connectors: 'Connectors'
  };

  return (
    <div style={{
      fontFamily: FONTS.family.sans,
      padding: '24px',
      backgroundColor: COLORS.background,
    }}>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold" style={{ color: COLORS.mainTextColor }}>
            Requests
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={NotificationsIcon}
              alt="Notifications"
              style={{
                width: '24px',
                height: '24px',
                cursor: 'pointer'
              }}
            />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS.primary }}></span>
          </div>
        </div>
      </div>

      {/* Tab Bar - Now with custom tabs */}
      <div className="mb-6">
        <TabBar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          tabs={requestTabs}
          mobileLabels={mobileTabLabels}
        />
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'stations' && (
          <div>Stations Content</div>
        )}
        {activeTab === 'connectors' && (
          <div>Connectors Content</div>
        )}
      </div>
    </div>
  );
}
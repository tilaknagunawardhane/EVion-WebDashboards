import React, { useState } from 'react';
import TabBar from '../../../components/ui/TabBar';
import { COLORS, FONTS } from '../../../constants';
import ProfileSettings from '../components/settingsComponents/ProfileSettings';
import StationOwnerPageHeader from '../components/StationOwnerPageHeader';
import AccountPreferences from '../components/settingsComponents/AccountPreferences';
import StationNotifications from '../components/settingsComponents/NotificationsSettings';
// import StationManagementDefaults from './StationManagementDefaults';
// import SecuritySettings from './SecuritySettings';
// import SupportHelp from './SupportHelp';
// import LegalPolicies from './LegalPolicies';
// import { useNavigate } from 'react-router-dom';

const OwnerSettings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    // const navigate = useNavigate();

    // Tab configuration
    const tabs = [
        { id: 'profile', label: 'Profile Settings' },
        { id: 'preferences', label: 'Account Preferences' },
        { id: 'notifications', label: 'Notifications'},
        { id: 'defaults', label: 'Station Management Defaults'},
        { id: 'security', label: 'Security Settings'},
        { id: 'support', label: 'Support & Help'},
        { id: 'legal', label: 'Legal & Policies' },
    ];

    const mobileLabels = {
      profile: 'Profile Settings',
      preferences: 'Account Preferences',
      notifications: 'Notifications',
      defaults: 'Station Management Default',
      security: 'Security Settings',
      support: 'Support & Help',
      legal: 'Legal & Policies',
    };

    return (
    <div
      style={{
        fontFamily: FONTS.family.sans,
        padding: '24px',
        backgroundColor: COLORS.background,
      }}
    >
      <StationOwnerPageHeader title="Settings" />

      <TabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        mobileLabels={mobileLabels}
      />

      <div className="mt-6">
        {activeTab === 'profile' && <ProfileSettings />}
        {activeTab === 'preferences' && <AccountPreferences />}
        {activeTab === 'notifications' && <StationNotifications />}
        {activeTab === 'defaults' && <ManagementDefaults />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'support' && <SupportHelp />}
        {activeTab === 'legal' && <LegalPolicies />}
      </div>
    </div>
  );
};

export default OwnerSettings;
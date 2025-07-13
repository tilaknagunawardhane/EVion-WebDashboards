// components/TabBar.js
import React from 'react';
import { COLORS, FONTS } from '../../../constants';

export default function TabBar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'sessions', label: 'Charging Sessions' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'payments', label: 'Payments' },
    { id: 'reports', label: 'Reports' }
  ];

  return (
    <div className="flex border-b" style={{ borderColor: COLORS.stroke }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`px-4 py-3 text-sm font-medium focus:outline-none relative ${activeTab === tab.id ? 'text-' + COLORS.primary : 'text-' + COLORS.secondaryText}`}
          style={{
            fontFamily: FONTS.family.sans,
            fontWeight: FONTS.weights.medium,
          }}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div 
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ backgroundColor: COLORS.primary }}
            ></div>
          )}
        </button>
      ))}
    </div>
  );
}
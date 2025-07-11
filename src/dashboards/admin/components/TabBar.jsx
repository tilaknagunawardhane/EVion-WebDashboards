import React from 'react';
import { COLORS, FONTS } from '../../../constants';

export default function TabBar({ 
  activeTab, 
  setActiveTab, 
  tabs = [], 
  mobileLabels = {} 
}) {
  return (
    <div className="relative">
      {/* Horizontal scroll container for mobile */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex border-b whitespace-nowrap" style={{ 
          borderColor: COLORS.stroke, 
          minWidth: 'fit-content' 
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`px-3 py-3 sm:px-4 text-sm font-medium focus:outline-none relative transition-colors duration-200 ${
                activeTab === tab.id 
                  ? `text-[${COLORS.primary}]` 
                  : `text-[${COLORS.secondaryText}] hover:text-[${COLORS.primary}]`
              }`}
              style={{
                fontFamily: FONTS.family.sans,
                fontWeight: FONTS.weights.medium,
                flexShrink: 0 // Prevent tabs from shrinking on small screens
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              {/* Show full label on larger screens, shortened label on mobile if provided */}
              <span className="hidden xs:inline">{tab.label}</span>
              <span className="xs:hidden">
                {mobileLabels[tab.id] || tab.label}
              </span>
              {activeTab === tab.id && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: COLORS.primary }}
                ></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
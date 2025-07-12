import React from 'react';
import { COLORS } from '../../../constants/colors';
import { FONTS } from '../../../constants/fonts';
import StationIcon from '../../../assets/stations.svg';
import ConnectorIcon from '../../../assets/connectors.svg';
import UserIcon from '../../../assets/user_icon.svg';
import RevenueIcon from '../../../assets/earnings_icon.svg';
import ElectricityIcon from '../../../assets/electricity.svg';
import SessionsIcon from '../../../assets/sessions.svg';
import UpArrowIcon from '../../../assets/up_arrow.svg';
import DownArrowIcon from '../../../assets/down_arrow.svg';
import ReportsIcon from '../../../assets/reports_icon.svg';

export default function StatCard({ title, value, subValue, icon, status }) {
  // Icon component mapping
  const iconComponents = {
    stations: <img src={StationIcon} alt="Stations" style={{ width: 20, height: 20 }} />,
    connectors: <img src={ConnectorIcon} alt="Connectors" style={{ width: 20, height: 20 }} />,
    users: <img src={UserIcon} alt="Users" style={{ width: 20, height: 20 }} />,
    revenue: <img src={RevenueIcon} alt="Revenue" style={{ width: 20, height: 20 }} />,
    electricity: <img src={ElectricityIcon} alt="Electricity" style={{ width: 20, height: 20 }} />,
    sessions: <img src={SessionsIcon} alt="Sessions" style={{ width: 20, height: 20 }} />,
    reports: <img src={ReportsIcon} alt="Reports" style={{ width: 20, height: 20 }} />,
  };

  // Determine arrow direction and colors
  const showArrow = status !== undefined;
  const isPositive = status === 'positive';
  const arrowColor = isPositive ? COLORS.primary : COLORS.danger;
  const textColor = isPositive ? COLORS.primary : COLORS.danger;

  return (
    <div className="p-4 rounded-lg shadow-sm" style={{ 
      backgroundColor: 'white',
      border: `1px solid ${COLORS.border}`
    }}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className='flex items-center'>
            <div className="p-2 rounded-md" style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {iconComponents[icon]}
            </div>
            <p className="text-sm" style={{ color: COLORS.mainTextColor }}>{title}</p>
          </div>
          <div className="flex items-baseline mt-1">
            <h3 
              className="text-2xl font-bold" 
              style={{ color: COLORS.mainTextColor }}
            >
              {value}
            </h3>
          </div>
          {subValue && (
            <div className="flex items-center mt-2">
              {showArrow && (
                <img 
                  src={isPositive ? UpArrowIcon : DownArrowIcon} 
                  alt={isPositive ? "Increase" : "Decrease"} 
                  className="mr-1"
                  style={{ 
                    width: 24, 
                    height: 24, 
                    color: arrowColor,
                    backgroundColor: isPositive ? COLORS.bgGreen : COLORS.bgRed,
                    borderRadius: '20%',
                    padding: '2px'
                  }}
                />
              )}
              <p 
                className="text-xs" 
                style={{ color: showArrow ? textColor : COLORS.accent }}
              >
                {subValue}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
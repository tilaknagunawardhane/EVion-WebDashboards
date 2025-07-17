import React from 'react';
import { COLORS } from '../../../constants/colors';
import { FONTS } from '../../../constants/fonts';
import StationIcon from '../../../assets/stations.svg';
import ConnectorIcon from '../../../assets/connectors.svg';
import AlertIcon from '../../../assets/alert_black_icon.svg';
import CommentIcon from '../../../assets/comment_icon.svg';

export default function StatCard({ title, value, subValue, icon, subValueColor }) {
  // Icon component mapping
  const iconComponents = {
    stations: <img src={StationIcon} alt="Stations" style={{ width: 20, height: 20 }} />,
    connectors: <img src={ConnectorIcon} alt="Connectors" style={{ width: 20, height: 20 }} />,
    faultReports: <img src={AlertIcon} alt="Fault Reports" style={{ width: 20, height: 20 }} />,
    communityPosts: <img src={CommentIcon} alt="Community Posts" style={{ width: 20, height: 20 }} />
  };

  return (
    <div className="p-4 rounded-lg shadow-sm" style={{ 
      backgroundColor: 'white',
      border: `1px solid ${COLORS.border}`
    }}>
      <div className="flex justify-between items-start">
        <div>
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
          <h3 className="text-2xl font-bold mt-1" style={{ color: COLORS.mainTextColor }}>
            {value}
          </h3>
          {subValue && (
            <p className="text-xs font-medium mt-1" style={{ color: subValueColor }}>
              {subValue}
            </p>
          )}
        </div>
        
      </div>
    </div>
  );
}
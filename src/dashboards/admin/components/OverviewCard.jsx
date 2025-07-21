import React from 'react';
import { COLORS } from '../../../constants/colors';
import { FONTS } from '../../../constants/fonts';

export default function OverviewCard({ title, children, padding = 'p-4' }) {
  return (
    <div className={`${padding} rounded-lg`} style={{ 
      backgroundColor: 'white',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)'
    }}>
      {title && (
        <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
          {title}
        </h3>
      )}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
import React from 'react';
import { COLORS } from '../../../constants/colors';
import { FONTS } from '../../../constants/fonts';

export default function OverviewCard({ title, children }) {
  return (
    <div className="p-6 rounded-lg" style={{ 
      backgroundColor: 'white',
      border: `1px solid ${COLORS.border}`,
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
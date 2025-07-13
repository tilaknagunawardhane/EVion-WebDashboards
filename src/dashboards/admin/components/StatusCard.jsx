import React from 'react';
import { COLORS } from '../../../constants/colors';
import { FONTS } from '../../../constants/fonts';

export default function StatusCard({ title, value, total, children }) {
  return (
    <div className="p-6 rounded-lg" style={{ 
      backgroundColor: 'white',
      border: `1px solid ${COLORS.border}`,
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)'
    }}>
      <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
        {title}
      </h3>
      
      {value !== undefined && total !== undefined && (
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm" style={{ color: COLORS.secondaryText }}>Faulted</p>
            <p className="text-xl font-bold" style={{ color: COLORS.error }}>{value}</p>
          </div>
          <div className="text-right">
            <p className="text-sm" style={{ color: COLORS.secondaryText }}>Total</p>
            <p className="text-xl font-bold" style={{ color: COLORS.mainTextColor }}>{total}</p>
          </div>
        </div>
      )}
      
      <div style={{ height: '200px' }}>
        {children}
      </div>
    </div>
  );
}
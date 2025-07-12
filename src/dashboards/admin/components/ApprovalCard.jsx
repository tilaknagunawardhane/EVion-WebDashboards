import React from 'react';
import { COLORS } from '../../../constants/colors';
import { FONTS } from '../../../constants/fonts';
import ArrowRightIcon from '../../../assets/arrow_right.svg';

export default function ApprovalCard({ 
  count, 
  title, 
  bgColor = 'white', 
  textColor = COLORS.primary, 
  borderColor = COLORS.border,
  fullWidth = false 
}) {
  return (
    <div 
      className={`p-4 rounded-lg mb-4 cursor-pointer hover:shadow-md transition-shadow ${fullWidth ? 'col-span-full' : ''}`}
      style={{ 
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="flex justify-between items-center">
        <div>
          {count && (
            <p 
              className="text-2xl font-bold mb-1" 
              style={{ color: textColor }}
            >
              {count}
            </p>
          )}
          <p 
            className={`${count ? 'text-sm' : 'text-base font-medium'}`} 
            style={{ 
              color: textColor,
              fontFamily: FONTS.family.sans 
            }}
          >
            {title}
          </p>
        </div>
        <div style={{ color: textColor }}>
          <img 
            src={ArrowRightIcon} 
            alt="" 
            style={{ width: '18px', height: '18px' }} 
          />
        </div>
      </div>
    </div>
  );
}
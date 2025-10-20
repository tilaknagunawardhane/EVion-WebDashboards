import React from 'react';
import { COLORS } from '../../../constants/colors';
import { FONTS } from '../../../constants/fonts';
import ArrowRightIcon from '../../../assets/arrow_right.svg';

export default function ActiveUserCard({ 
  name, 
  posts, 
  rejected,
  bgColor = 'white', 
  textColor = COLORS.primary, 
  borderColor = COLORS.border 
}) {
  return (
    <div 
      className="p-3 rounded-lg mb-3 cursor-pointer hover:shadow-md transition-shadow"  // Changed p-4 to p-3, mb-4 to mb-3
      style={{ 
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="flex justify-between items-center">
        <div>
          <p 
            className="text-lg font-bold mb-0.5"  // Changed text-2xl to text-lg, mb-1 to mb-0.5
            style={{ color: textColor }}
          >
            {name}
          </p>
          <p 
            className="text-xs"  // Changed text-sm to text-xs
            style={{ 
              color: textColor,
              fontFamily: FONTS.family.sans,
              lineHeight: '1.4'  // Added for tighter line spacing
            }}
          >
            Posts: {posts} <br />
            Rejected: {rejected}
          </p>
        </div>
        <div style={{ color: textColor }}>
          <img 
            src={ArrowRightIcon} 
            alt="" 
            style={{ width: '16px', height: '16px' }}  // Changed from 18px to 16px
          />
        </div>
      </div>
    </div>
  );
}
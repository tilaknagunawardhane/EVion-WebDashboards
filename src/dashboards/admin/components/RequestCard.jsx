import React from 'react';
import { COLORS, FONTS } from '../../../constants';
import Button from '../../../components/ui/Button';

export default function RequestCard({ request }) {
  return (
    <div className="p-3 rounded-lg border" style={{ 
      borderColor: COLORS.stroke,
      backgroundColor: COLORS.background
    }}>
      <div style={{ 
        fontSize: FONTS.sizes.sm,
        fontWeight: FONTS.weights.medium,
        color: COLORS.mainTextColor,
        marginBottom: '4px'
      }}>
        {request.title}
      </div>
      <div className="flex justify-between items-center">
        <span style={{ 
          fontSize: FONTS.sizes.xs,
          color: COLORS.secondaryText
        }}>
          {request.date}
        </span>
        <Button 
          variant="outline" 
          size="sm"
          style={{ 
            borderColor: COLORS.stroke,
            padding: '2px 8px'
          }}
        >
          View
        </Button>
      </div>
    </div>
  );
}
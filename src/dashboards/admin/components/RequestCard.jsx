import React from 'react';
import { COLORS, FONTS } from '../../../constants';
import Button from '../../../components/ui/Button';
import OverviewCard from './OverviewCard';
import { Link } from 'react-router-dom'; // Import Link from your routing library

export default function RequestCard({ request }) {
  return (
    <OverviewCard padding='p-3'>
      <div>
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
          {/* Replace Button with Link */}
          <Link 
            to={`/admin/stations/requests/station/${request.id}`} // Update this path as needed
            className="text-xs font-medium rounded-md transition-all flex items-center gap-1"
            style={{ 
              color: COLORS.secondaryText,
              padding: '2px 8px',
              textDecoration: 'underline',
              fontFamily: FONTS.family.sans,
              fontWeight: FONTS.weights.medium,
              fontSize: FONTS.sizes.xs,
              
            }}
          >
            View
          </Link>
        </div>
      </div>
    </OverviewCard>
  );
}
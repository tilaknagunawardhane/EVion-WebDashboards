import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import Button from '../../../../components/ui/Button';
import RequestCard from '../../components/RequestCard';
import UserProfileCard from './UserProfileCard';
import UserStatsCard from './UserStatsCard';

export default function UserAccountRightPanel({ user, stats, requests = [] }) {
  // Request data
  const newRequests = requests.filter(r => r.status === 'new') || [];

  return (
    <div
      className="rounded-xl border bg-white min-h-[300px] p-3 flex flex-col gap-6 shadow-sm"
      style={{
        borderColor: COLORS.stroke,
        background: COLORS.background,
        fontFamily: FONTS.family.sans,
      }}
    >
      {/* User Profile Card */}
      <UserProfileCard user={user} />

      {/* User Stats Card */}
      <UserStatsCard stats={stats} />

      <Button
        variant="primary"
        type="button"
        size="base"
        style={{
          backgroundColor: COLORS.primary,
          color: 'white',
          padding: '10px 16px'
        }}
        className='w-full'
      >
        View all requests
      </Button>

      {/* Requests Section */}
      <div>
        <div style={{ 
          width: '100%', 
          height: '1px', 
          backgroundColor: COLORS.stroke, 
          margin: '0px 0 20px' 
        }}></div>

        <h4 style={{
          fontSize: FONTS.sizes.base,
          fontWeight: FONTS.weights.semibold,
          color: COLORS.mainTextColor,
          marginBottom: '18px'
        }}>
          New Requests
        </h4>

        <div className="space-y-3">
          {newRequests.slice(0, 3).map((request, index) => (
            <RequestCard key={index} request={request} />
          ))}
        </div>
      </div>
    </div>
  );
}
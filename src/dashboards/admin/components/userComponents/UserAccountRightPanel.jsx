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

       <div style={{ marginTop: '0px', textAlign: 'center' }} >
                    <h4 style={{
                        fontSize: FONTS.sizes.base,
                        fontWeight: FONTS.weights.medium,
                        color: COLORS.mainTextColor,
                        marginBottom: '0px'
                    }}>
                        Account Status History
                    </h4>
                </div>

      {/* User Stats Card */}
      <UserStatsCard stats={stats} />

      
    </div>
  );
}
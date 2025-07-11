import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import Button from '../../../../components/ui/Button';
import RequestCard from '../../components/RequestCard';
import UserProfileCard from './UserProfileCard';
import UserStatsCard from './UserStatsCard';

export default function UserAccountRightPanel({ user, stats }) {

    return (
        <div
            className="rounded-lg md:rounded-xl border bg-white w-full p-3 md:p-4 flex flex-col gap-4 md:gap-6 shadow-sm"
            style={{
                borderColor: COLORS.stroke,
                background: COLORS.background,
                fontFamily: FONTS.family.sans,
            }}
        >
            {/* User Profile Card */}
            <UserProfileCard user={user} />

            {/* Account Status History Header */}
            <div className="mt-0 text-center">
                <h4 className="text-base md:text-lg font-medium" style={{
                    color: COLORS.mainTextColor,
                    marginBottom: '0',
                    fontSize: FONTS.sizes.base,
                    fontWeight: FONTS.weights.medium,
                }}>
                    Account Status History
                </h4>
            </div>

            {/* User Stats Card */}
            <UserStatsCard stats={stats} />

            
        </div>
    );
}
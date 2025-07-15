import React from 'react';
import { COLORS, FONTS } from '../../../constants';
import CommunityUserProfileCard from './CommunityUserProfileCard';
import CommunityUserStatsCard from './CommunityUserStatsCard';

export default function CommunityRightPanel({ user, stats }) {

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
            <CommunityUserProfileCard user={user} />

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
            <CommunityUserStatsCard stats={stats} />

            
        </div>
    );
}
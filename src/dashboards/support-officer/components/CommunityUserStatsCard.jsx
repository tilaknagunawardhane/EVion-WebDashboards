import React from 'react';
import { COLORS, FONTS } from '../../../constants';
import OverviewCard from '../../admin/components/OverviewCard';

export default function CommunityUserStatsCard({ stats }) {
    return (
        <div className="space-y-3 sm:space-y-4">

            <OverviewCard padding="p-3 sm:p-4">
                <div className="flex flex-col gap-3 sm:gap-4">

                    <div className="space-y-2 sm:space-y-3">
                        <StatItem label="Total Posts" value={stats.totalPosts} />
                        <StatItem label="Rejected Posts" value={stats.rejectedPosts} />
                        <StatItem label="Flags Received" value={stats.flagsReceived} />
                    </div>

                    <div className="border-t" style={{ borderColor: COLORS.stroke }}></div>

                    <div>
                        <StatItem
                            label="Last Post On"
                            value={stats.lastPostOn}
                        />
                    </div>
                </div>
            </OverviewCard>

        </div>
    );
}

function StatItem({ label, value, highlight = false }) {
  const isCurrency = typeof value === 'string' && value.startsWith('LKR ');
  const isDate = typeof value === 'string' && /\d{1,2} \w{3}, \d{1,2}:\d{2} (AM|PM)/.test(value);

  // Extract parts of the date if it matches
  let datePart = '', timePart = '';
  if (isDate) {
    [datePart, timePart] = value.split(', ');
  }

  return (
    <div className="flex justify-between items-baseline">
      {/* Label */}
      <div
        className="text-xs sm:text-sm"
        style={{
          color: COLORS.secondaryText,
          fontWeight: FONTS.weights.medium,
          fontFamily: FONTS.family.sans,
        }}
      >
        {label}
      </div>

      {/* Value */}
      <div
        className={`text-right ${highlight ? 'font-bold' : 'font-medium'}`}
        style={{
          fontSize: '0.875rem', // sm
          color: highlight ? COLORS.primary : COLORS.mainTextColor,
          fontFamily: FONTS.family.sans,
        }}
      >
        {isCurrency ? (
          <>
            <span className="text-xs">LKR </span>
            <span>{value.substring(4)}</span>
          </>
        ) : isDate ? (
          <>
            <span className='text-gray-500'>{datePart}, </span>
            <span className="text-xs text-gray-500">{timePart}</span>
          </>
        ) : (
          value
        )}
      </div>
    </div>
  );
}

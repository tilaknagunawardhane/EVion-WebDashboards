import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import OverviewCard from '../../components/OverviewCard';

export default function UserStatsCard({ stats }) {
  return (
    <OverviewCard padding="p-4">
      <div className="flex flex-col gap-4">
        {/* Charging Sessions */}
        <div className="mb-4">
          <h4 style={{
            fontSize: FONTS.sizes.sm,
            fontWeight: FONTS.weights.semibold,
            color: COLORS.mainTextColor,
            marginBottom: '8px'
          }}>
            Charging Sessions
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <StatItem label="Charging Sessions" value={stats.chargingSessions} />
            <StatItem label="kWh Charged" value={stats.kwhCharged} />
            <StatItem label="Total Fees Paid" value={`LKR ${stats.totalFeesPaid.toLocaleString()}`} />
          </div>
        </div>

        {/* Bookings */}
        <div className="mb-4">
          <h4 style={{
            fontSize: FONTS.sizes.sm,
            fontWeight: FONTS.weights.semibold,
            color: COLORS.mainTextColor,
            marginBottom: '8px'
          }}>
            Bookings
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <StatItem label="Completed Bookings" value={stats.completedBookings} />
            <StatItem label="Cancelled Bookings" value={stats.cancelledBookings} />
            <StatItem label="No-Show Incidents" value={stats.noShowIncidents} />
            <StatItem label="Late Arrivals" value={stats.lateArrivals} />
            <StatItem label="Penalties Charged" value={`LKR ${stats.penaltiesCharged.toLocaleString()}`} />
            <StatItem label="Total Booking Fees" value={`LKR ${stats.totalBookingFees.toLocaleString()}`} />
          </div>
        </div>

        {/* Totals */}
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2">
            <StatItem 
              label="Total Spent" 
              value={`LKR ${stats.totalSpent.toLocaleString()}`} 
              highlight={true}
            />
          </div>
        </div>

        {/* Community */}
        <div className="mb-4">
          <h4 style={{
            fontSize: FONTS.sizes.sm,
            fontWeight: FONTS.weights.semibold,
            color: COLORS.mainTextColor,
            marginBottom: '8px'
          }}>
            Community
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <StatItem label="Approved Posts" value={stats.approvedPosts} />
            <StatItem label="Rejected Posts" value={stats.rejectedPosts} />
            <StatItem label="Flags Received" value={stats.flagsReceived} />
          </div>
        </div>

        {/* Reports */}
        <div>
          <h4 style={{
            fontSize: FONTS.sizes.sm,
            fontWeight: FONTS.weights.semibold,
            color: COLORS.mainTextColor,
            marginBottom: '8px'
          }}>
            Reports
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <StatItem label="Reports Filed" value={stats.reportsFiled} />
            <StatItem label="Rejected Reports" value={stats.rejectedReports} />
          </div>
        </div>
      </div>
    </OverviewCard>
  );
}

function StatItem({ label, value, highlight = false }) {
  return (
    <div>
      <div style={{ fontSize: FONTS.sizes.xs, color: COLORS.secondaryText }}>{label}</div>
      <div style={{ 
        fontSize: FONTS.sizes.sm, 
        fontWeight: highlight ? FONTS.weights.bold : FONTS.weights.medium,
        color: highlight ? COLORS.primary : COLORS.mainTextColor
      }}>
        {value}
      </div>
    </div>
  );
}
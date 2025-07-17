import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import OverviewCard from '../../components/OverviewCard';

export default function UserStatsCard({ stats }) {
    return (
        <div className="space-y-3 sm:space-y-4">
            {/* First Stats Card */}
            <OverviewCard padding="p-3 sm:p-4">
                <div className="flex flex-col gap-3 sm:gap-4">
                    {/* Charging Sessions */}
                    <div className="space-y-2 sm:space-y-3">
                        <StatItem label="Charging Sessions" value={stats.chargingSessions} />
                        <StatItem label="kWh Charged" value={stats.kwhCharged} />
                        <StatItem label="Total Fees Paid" value={`LKR ${stats.totalFeesPaid.toLocaleString()}`} />
                    </div>

                    <div className="border-t" style={{ borderColor: COLORS.stroke }}></div>

                    {/* Bookings */}
                    <div className="space-y-2 sm:space-y-3">
                        <StatItem label="Completed Bookings" value={stats.completedBookings} />
                        <StatItem label="Cancelled Bookings" value={stats.cancelledBookings} />
                        <StatItem label="No-Show Incidents" value={stats.noShowIncidents} />
                        <StatItem label="Late Arrivals" value={stats.lateArrivals} />
                        <StatItem label="Penalties Charged" value={`LKR ${stats.penaltiesCharged.toLocaleString()}`} />
                        <StatItem label="Total Booking Fees" value={`LKR ${stats.totalBookingFees.toLocaleString()}`} />
                    </div>

                    <div className="border-t" style={{ borderColor: COLORS.stroke }}></div>

                    {/* Totals */}
                    <div>
                        <StatItem
                            label="Total Spent"
                            value={`LKR ${stats.totalSpent.toLocaleString()}`}
                            highlight={true}
                        />
                    </div>
                </div>
            </OverviewCard>

            {/* Second Stats Card */}
            <OverviewCard padding="p-3 sm:p-4">
                <div className="flex flex-col gap-3 sm:gap-4">
                    {/* Community */}
                    <div className="space-y-2 sm:space-y-3">
                        <StatItem label="Approved Posts" value={stats.approvedPosts} />
                        <StatItem label="Rejected Posts" value={stats.rejectedPosts} />
                        <StatItem label="Flags Received" value={stats.flagsReceived} />
                    </div>

                    <div className="border-t" style={{ borderColor: COLORS.stroke }}></div>

                    {/* Reports */}
                    <div className="space-y-2 sm:space-y-3">
                        <StatItem label="Reports Filed" value={stats.reportsFiled} />
                        <StatItem label="Rejected Reports" value={stats.rejectedReports} />
                    </div>
                </div>
            </OverviewCard>
        </div>
    );
}

function StatItem({ label, value, highlight = false }) {
    const isCurrency = typeof value === 'string' && value.startsWith('LKR ');
    
    return (
        <div className='flex justify-between items-baseline'>
            <div className="text-xs sm:text-sm" style={{ 
                color: COLORS.secondaryText, 
                fontWeight: FONTS.weights.medium 
            }}>
                {label}
            </div>
            <div className={`text-right ${highlight ? 'font-bold' : 'font-medium'}`} style={{
                fontSize: '0.875rem', // sm
                color: highlight ? COLORS.primary : COLORS.mainTextColor
            }}>
                {isCurrency ? (
                    <>
                        <span className="text-xs">LKR </span>
                        <span>{value.substring(4)}</span>
                    </>
                ) : (
                    value
                )}
            </div>
        </div>
    );
}
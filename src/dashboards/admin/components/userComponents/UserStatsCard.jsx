import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import OverviewCard from '../../components/OverviewCard';

export default function UserStatsCard({ stats }) {
    return (
        <div>
            <div className='mb-3'>
                <OverviewCard padding="p-4">
                    <div className="flex flex-col gap-4">
                        {/* Charging Sessions */}
                        <div className="mb-0">
                            <div>
                                <StatItem label="Charging Sessions" value={stats.chargingSessions} />
                                <StatItem label="kWh Charged" value={stats.kwhCharged} />
                                <StatItem label="Total Fees Paid" value={`LKR ${stats.totalFeesPaid.toLocaleString()}`} />
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '1px', backgroundColor: COLORS.stroke, margin: '0px 0' }}></div>

                        <div className="mb-0">
                            <div>
                                <StatItem label="Completed Bookings" value={stats.completedBookings} />
                                <StatItem label="Cancelled Bookings" value={stats.cancelledBookings} />
                                <StatItem label="No-Show Incidents" value={stats.noShowIncidents} />
                                <StatItem label="Late Arrivals" value={stats.lateArrivals} />
                                <StatItem label="Penalties Charged" value={`LKR ${stats.penaltiesCharged.toLocaleString()}`} />
                                <StatItem label="Total Booking Fees" value={`LKR ${stats.totalBookingFees.toLocaleString()}`} />
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '1px', backgroundColor: COLORS.stroke, margin: '0px 0' }}></div>

                        {/* Totals */}
                        <div className="mb-0">
                            <div>
                                <StatItem
                                    label="Total Spent"
                                    value={`LKR ${stats.totalSpent.toLocaleString()}`}
                                    highlight={true}
                                />
                            </div>
                        </div>
                    </div>
                </OverviewCard>
            </div>

            <div>
                <OverviewCard>
                    {/* Community */}
                    <div className="mb-0">
                        <div>
                            <StatItem label="Approved Posts" value={stats.approvedPosts} />
                            <StatItem label="Rejected Posts" value={stats.rejectedPosts} />
                            <StatItem label="Flags Received" value={stats.flagsReceived} />
                        </div>
                    </div>

                    <div style={{ width: '100%', height: '1px', backgroundColor: COLORS.stroke, margin: '16px 0' }}></div>

                    {/* Reports */}
                    <div>
                        <div>
                            <StatItem label="Reports Filed" value={stats.reportsFiled} />
                            <StatItem label="Rejected Reports" value={stats.rejectedReports} />
                        </div>
                    </div>
                </OverviewCard>
            </div>
        </div>
    );
}

function StatItem({ label, value, highlight = false }) {
    // Check if the value is a string that starts with "LKR "
    const isCurrency = typeof value === 'string' && value.startsWith('LKR ');
    
    return (
        <div className='flex justify-between mb-1'>
            <div style={{ fontSize: FONTS.sizes.xs, color: COLORS.secondaryText, fontWeight: FONTS.weights.medium }}>
                {label}
            </div>
            <div style={{
                fontSize: FONTS.sizes.sm,
                fontWeight: highlight ? FONTS.weights.bold : FONTS.weights.medium,
                color: highlight ? COLORS.primary : COLORS.mainTextColor
            }}>
                {isCurrency ? (
                    <>
                        <span style={{ fontSize: FONTS.sizes.xs }}>LKR </span>
                        <span>{value.substring(4)}</span>
                    </>
                ) : (
                    value
                )}
            </div>
        </div>
    );
}
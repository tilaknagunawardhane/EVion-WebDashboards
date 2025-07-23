import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../../../constants';
import OverviewCard from '../../admin/components/OverviewCard';
import UserIcon from '../../../assets/user_icon.svg';

export default function FaultReportDetailRightPanel({ user = {}, stats = {} }) {
    const navigate = useNavigate();
    
    // User data with defaults
    const safeUser = {
        Name: 'John Doe',
        'Account Status': 'Active',
        'Date Joined': '12 Dec 2024',
        ...user
    };

    // Stats data with defaults
    const safeStats = {
        chargingSessions: 25,
        kWhCharged: 3240,
        totalFeesPaid: 'LKR 63,590.00',
        completedBookings: 5,
        cancelledBookings: 1,
        noshowIncidents: 1,
        lateArrivals: 1,
        penaltiesCharged: 'LKR 300.00',
        totalBookingFees: 'LKR 11,800.00',
        totalSpent: 'LKR 75,990.00',
        approvedPosts: 12,
        rejectedPosts: 1,
        flagsReceived: 9,
        reportsFiled: 2,
        rejectedReports: 1,
        ...stats
    };

    return (
        <div
            className="rounded-lg md:rounded-xl border bg-white w-full p-3 md:p-4 flex flex-col gap-4 md:gap-6 shadow-sm"
            style={{
                borderColor: COLORS.stroke,
                background: COLORS.background,
                fontFamily: FONTS.family.sans,
            }}
        >
            {/* User Profile Section */}
            <OverviewCard padding="p-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg" 
                         style={{ backgroundColor: COLORS.bgGreen }}>
                        <img src={UserIcon} alt="User" className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 style={{
                            fontSize: FONTS.sizes.base,
                            fontWeight: FONTS.weights.semibold,
                            color: COLORS.mainTextColor
                        }}>
                            {safeUser.Name}
                        </h3>
                        <span style={{
                            fontSize: FONTS.sizes.sm,
                            color: safeUser['Account Status'] === 'Active' ? COLORS.success : COLORS.error
                        }}>
                            {safeUser['Account Status']}
                        </span>
                    </div>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                    <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                        Date Joined
                    </span>
                    <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                        {safeUser['Date Joined']}
                    </span>
                </div>
            </OverviewCard>

            {/* Account Status History */}
            <div className="text-center">
                <h4 style={{
                    fontSize: FONTS.sizes.base,
                    fontWeight: FONTS.weights.medium,
                    color: COLORS.primary,
                    marginBottom: '1px'
                }}>
                    Account Status History
                </h4>
            </div>

            {/* Charging Statistics */}
            <OverviewCard padding="p-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Charging Sessions</p>
                        <p style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.medium }}>
                            {safeStats.chargingSessions}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>kWh Charged</p>
                        <p style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.medium }}>
                            {safeStats.kWhCharged.toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Total Fees Paid</p>
                        <p style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.medium }}>
                            {safeStats.totalFeesPaid}
                        </p>
                    </div>
                </div>
            </OverviewCard>

            {/* Booking Statistics */}
            <OverviewCard padding="p-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Completed Bookings</p>
                        <p style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.medium }}>
                            {safeStats.completedBookings}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Cancelled Bookings</p>
                        <p style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.medium }}>
                            {safeStats.cancelledBookings}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>No-Show Incidents</p>
                        <p style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.medium }}>
                            {safeStats.noshowIncidents}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Late Arrivals</p>
                        <p style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.medium }}>
                            {safeStats.lateArrivals}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Penalties Charged</p>
                        <p style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.medium }}>
                            {safeStats.penaltiesCharged}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Total Booking Fees</p>
                        <p style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.medium }}>
                            {safeStats.totalBookingFees}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Total Spent</p>
                        <p style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.medium }}>
                            {safeStats.totalSpent}
                        </p>
                    </div>
                </div>
            </OverviewCard>

            {/* Community Activity */}
            <OverviewCard padding="p-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Approved Posts</p>
                        <p style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.medium }}>
                            {safeStats.approvedPosts}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Rejected Posts</p>
                        <p style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.medium }}>
                            {safeStats.rejectedPosts}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Flags Received</p>
                        <p style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.medium }}>
                            {safeStats.flagsReceived}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Reports Filed by User</p>
                        <p style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.medium }}>
                            {safeStats.reportsFiled}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Rejected Reports</p>
                        <p style={{ fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.medium }}>
                            {safeStats.rejectedReports}
                        </p>
                    </div>
                </div>
            </OverviewCard>

            {/* Chat Button */}
            <button 
                className="w-full py-3 rounded-lg text-white font-medium mt-2 hover:opacity-90 transition-opacity"
                style={{
                    backgroundColor: COLORS.primary,
                    fontSize: FONTS.sizes.base
                }}
                onClick={() => navigate('/support-officer/UserChat')}
            >
                Chat with Station Owner
            </button>
        </div>
    );
}
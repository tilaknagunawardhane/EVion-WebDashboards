import React from 'react';
import { COLORS, FONTS } from '../../../constants';
import Button from '../../../components/ui/Button';
import RequestCard from '../components/RequestCard';
import OverviewCard from '../components/OverviewCard';
import UserIcon from '../../../assets/user_icon.svg';

export default function UsersRightPanel({ users = [], requests = [] }) {
    // User statistics data - these should be passed from the main page or calculated
    const totalRegistered = users.length || 5;
    const activeUsers = users.filter(u => u.status === 'Active').length || 2;
    const blockedUsers = users.filter(u => u.status === 'Blocked').length || 1;
    const flaggedUsers = users.filter(u => u.flagged).length || 32;

    // Request data
    const newRequests = requests.filter(r => r.status === 'new') || [];

    const renderStatCard = () => (
        <OverviewCard padding="p-4">
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ backgroundColor: COLORS.bgGreen }}>
                        <img src={UserIcon} alt="Users" className="w-5 h-5" />
                    </div>
                    <h3 style={{
                        fontSize: FONTS.sizes.base,
                        fontWeight: FONTS.weights.semibold,
                        color: COLORS.mainTextColor
                    }}>
                        Users
                    </h3>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-rows-2 mt-0">
                    {/* Total Registered */}
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                            Total Registered
                        </span>
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            {totalRegistered.toLocaleString()}
                        </span>
                    </div>

                    {/* Active Users */}
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                            Active Users
                        </span>
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            {activeUsers.toLocaleString()}
                        </span>
                    </div>

                    {/* Blocked */}
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                            Blocked Users
                        </span>
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            {blockedUsers.toLocaleString()}
                        </span>
                    </div>

                    {/* Flagged */}
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                            Flagged
                        </span>
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            {flaggedUsers.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </OverviewCard>
    );

    return (
        <div
            className="rounded-xl border bg-white min-h-[300px] p-3 flex flex-col gap-6 shadow-sm"
            style={{
                borderColor: COLORS.stroke,
                background: COLORS.background,
                fontFamily: FONTS.family.sans,
            }}
        >
            {/* User Statistics Card */}
            {renderStatCard()}

            <Button
                variant="primary"
                type="button"
                size="base"
                style={{
                    backgroundColor: COLORS.primary,
                    color: 'white',
                    padding: '2px 8px',
                    // marginTop: '16px'
                }}
                className='w-full'
            >
                View all requests
            </Button>

            {/* Requests Section */}
            <div>
                <div style={{ width: '100%', height: '1px', backgroundColor: COLORS.stroke, margin: '0px 0 20px' }}></div>

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
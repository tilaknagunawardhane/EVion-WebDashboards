import React from 'react';
import { COLORS, FONTS } from '../../../constants';
import RequestCard from '../../admin/components/RequestCard';
import OverviewCard from '../../admin/components/OverviewCard';
import UserIcon from '../../../assets/user_icon.svg';
import StationIcon from '../../../assets/stations.svg';
import { Colors } from 'chart.js';
import RenderColoredIcon from './RenderColoredIcon';

export default function FaultReportRightPanel({ users = [], requests = [] }) {
    // User statistics data - these should be passed from the main page or calculated
    // const totalRegistered = users.length || 5;
    // const activeUsers = users.filter(u => u.status === 'Active').length || 2;
    // const blockedUsers = users.filter(u => u.status === 'Blocked').length || 1;
    // const flaggedUsers = users.filter(u => u.flagged).length || 32;

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
                        Fault Reports
                    </h3>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-rows-2 mt-0">
                    {/* Total Reports Resolved */}
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                            Total Reports Resolved
                        </span>
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            {'45'.toLocaleString()}
                        </span>
                    </div>

                    {/* Total Reports Unresolved */}
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                            Total Reports Unresolved
                        </span>
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            {'45'.toLocaleString()}
                        </span>
                    </div>

                    {/* Pending */}
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                            Pending
                        </span>
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            {'45'.toLocaleString()}
                        </span>
                    </div>

                    {/* In Progress */}
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                            In Progress
                        </span>
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            {'45'.toLocaleString()}
                        </span>
                    </div>

                    {/* Resolved this Week */}
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                            Resolved this Week
                        </span>
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            {'45'.toLocaleString()}
                        </span>
                    </div>

                    {/* Average Resolution Time */}
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                            Average Resolution Time
                        </span>
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            {'45'.toLocaleString()}
                        </span>
                    </div>

                </div>
            </div>
        </OverviewCard>
    );

    const newReportsCard = ( iconBackground = COLORS.bgGreen, iconColor = COLORS.bgGreen) => (
        <OverviewCard padding="p-4">
            <div className="self-stretch inline-flex justify-start items-start gap-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ backgroundColor: iconBackground, }}>
                        {RenderColoredIcon(StationIcon, iconColor)}
                </div>
                <div className="flex-1 inline-flex flex-col justify-center items-start gap-2">
                    <div className="self-stretch justify-start">
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            Booking
                        </span>
                    </div>
                    <div className="self-stretch justify-start">
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            A broken connector was reported!
                        </span>
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-center mb-2">
                <div class="justify-start text-neutral-400">
                    <span style={{fontSize: FONTS.sizes.xs, color: COLORS.secondaryText}}>
                        5 Sat, 08:11 AM
                    </span>
                </div>
                <div class="justify-start underline">
                    <span style={{fontSize: FONTS.sizes.sm, color: COLORS.secondaryText}}>
                        View
                    </span>
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


            {/* Requests Section */}
            <div>
                <div style={{ width: '100%', height: '1px', backgroundColor: COLORS.stroke, margin: '0px 0 20px' }}></div>

                <h4 style={{
                    fontSize: FONTS.sizes.base,
                    fontWeight: FONTS.weights.semibold,
                    color: COLORS.mainTextColor,
                    marginBottom: '18px'
                }}>
                    New Reports & Complaints
                </h4>

                <div className="space-y-3">
                    {newRequests.slice(0, 3).map((request, index) => (
                        <RequestCard key={index} request={request} />
                    ))}
                </div>

                {newReportsCard(COLORS.bgGreen, 'green')}
                {newReportsCard(COLORS.lightYellow, 'yellow')}
                {newReportsCard(COLORS.stroke, 'black')}

            </div>
        </div>
    );
}
import React from "react";
import { FONTS, COLORS } from "../../../constants";
import PageHeader from "../../admin/components/AdminPageHeader";
import OverviewCard from "../../admin/components/OverviewCard";
import FaultReportDetailRightPanel from "../components/FaultReportDetailRightPanel";
import UserPageHeader from '../components/UserPageHeader';

export default function AfterAccepted() {
    const reportData = {
        reportId: "FR-1023",
        complaintId: "FR-1023",
        submittedBy: "John Doe",
        dateTime: "12 Jul 2025, 03:45 PM",
        stationName: "STN-045 - Colombo Central",
        complaintCategory: "Station Issue",
        stationId: "STN-045",
        chargerId: "CHG-789",
        bookingId: "BKG-123",
        description: "User reported that the charger at Station STN-045 is not functioning. The display screen is blank and there is no response when connecting the EV. User tried restarting but issue persists.",
        attachment: "charger_issue_photo.png",
        dateJoined: "12 Dec 2024",
        chargingSessions: 25,
        kWhCharged: 3240,
        totalFeesPaid: 63890,
        completedBookings: 5,
        cancelledBookings: 1,
        noShowIncidents: 1,
        lateArrivals: 1,
        penaltiesCharged: 300,
        totalBookingFees: 11800,
        totalSpent: 75990,
        approvedPosts: 12,
        rejectedPosts: 1,
        flagsReceived: 12,
        reportsFiled: 2,
        rejectedReports: 0
    };

    const reportStats = {
        status: 'Active',
        dateReported: '12 Dec 2024',
        chargingSessions: 25,
        kWhCharged: 3240,
        totalFees: 63890,
        resolvedReports: 45,
        unresolvedReports: 45,
        pending: 45,
        inProgress: 45,
        resolvedThisWeek: 45,
        avgResolutionTime: '2 days'
    };

    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
        }}>
            {/* Header Section */}
            <UserPageHeader title="Station Reports & User Complaints – Charging Stations" />

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {/* Left Side - Main Content */}
                <div className="md:col-span-3 space-y-6">
                    {/* REVIEWING Section */}
                    <OverviewCard padding="p-6">
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold" style={{ color: COLORS.HighlightText }}>
                                REVIEWING
                            </h2>
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr style={{ borderBottom: `1px solid ${COLORS.stroke}` }}>
                                            <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: COLORS.secondaryText }}>Complaint ID</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: COLORS.secondaryText }}>Submitted BY</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: COLORS.secondaryText }}>Date & Time</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: COLORS.secondaryText }}>Station Name</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: COLORS.secondaryText }}>Complaint Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ borderBottom: `1px solid ${COLORS.stroke}` }}>
                                            <td className="py-3 px-4">{reportData.complaintId}</td>
                                            <td className="py-3 px-4">{reportData.submittedBy}</td>
                                            <td className="py-3 px-4">{reportData.dateTime}</td>
                                            <td className="py-3 px-4">{reportData.stationName}</td>
                                            <td className="py-3 px-4">{reportData.complaintCategory}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </OverviewCard>

                    {/* Task Section */}
                    <OverviewCard padding="p-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold" style={{ color: COLORS.mainTextColor }}>Task:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm font-medium" style={{ color: COLORS.secondaryText }}>Report ID</p>
                                    <p>{reportData.reportId}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium" style={{ color: COLORS.secondaryText }}>Category</p>
                                    <p>{reportData.complaintCategory}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium" style={{ color: COLORS.secondaryText }}>Station ID</p>
                                    <p>{reportData.stationId}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium" style={{ color: COLORS.secondaryText }}>Charger ID</p>
                                    <p>{reportData.chargerId}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium" style={{ color: COLORS.secondaryText }}>Booking ID</p>
                                    <p>{reportData.bookingId}</p>
                                </div>
                            </div>
                        </div>
                    </OverviewCard>

                    {/* Description Attachment Section */}
                    <OverviewCard padding="p-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold" style={{ color: COLORS.mainTextColor }}>Description Attachment:</h3>
                            <p style={{ color: COLORS.secondaryText }}>{reportData.description}</p>
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span style={{ color: COLORS.secondaryText }}>{reportData.attachment}</span>
                            </div>
                        </div>
                    </OverviewCard>

                        

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 w-full md:grid-cols-1 gap-4">
                                {/* <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: COLORS.primary }}>
                                Close Station
                                </button>
                                <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: COLORS.primary }}>
                                Disable Charger
                                </button> */}
                                <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: COLORS.primary }}>
                                Issue Refund
                                </button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                <button className="px-4 py-2 rounded-lg border" style={{ borderColor: COLORS.danger, color: COLORS.danger }}>
                                    Discard
                                </button>
                            </div>
                        </div>
                </div>

                {/* Right Side - Stats Panel (same as FaultReportDetail) */}
                <div className="md:col-span-1">
                    <div className="sticky top-6 space-y-6">
                        <FaultReportDetailRightPanel reportDetails={reportStats} />
                    </div>
                </div>
            </div>
        </div>
    );
}
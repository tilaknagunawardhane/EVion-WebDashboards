import React, { useState } from "react";
import { FONTS, COLORS } from "../../../constants";
import PageHeader from "../../admin/components/AdminPageHeader";
import OverviewCard from "../../admin/components/OverviewCard";
import FaultReportDetailRightPanel from "../components/FaultReportDetailRightPanel";
import { useNavigate } from "react-router-dom";

export default function FaultReportDetail() {
    const navigate = useNavigate();
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [discardReason, setDiscardReason] = useState("");

    const reportData = {
        reportId: "FR-1023",
        category: "Station",
        stationId: "STN-045",
        chargerId: "CHG-789",
        bookingId: "BKG-123",
        reportedOn: "12 Jul 2025, 03:45 PM",
        description: `User reported that the charger at Station STN-045 is not functioning. The display screen is blank and there is no response when connecting the EV. User tried restarting but issue persists.`,
        attachment: "charger_issue_photo.png",
        status: "In Progress",
        resolutionTime: "2 days"
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

    const handleDiscard = () => {
        // Here you would handle the discard logic, probably sending to an API
        console.log("Discarding report with reason:", discardReason);
        setShowDiscardModal(false);
        setDiscardReason("");
    };

    return (
        <div style={{
            fontFamily: FONTS.family.sans,
            padding: '24px',
            backgroundColor: COLORS.background,
            position: 'relative',
        }}>
            {/* Header Section */}
            <PageHeader title={`Fault Report #${reportData.reportId}`} />

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {/* Left Side - Report Details */}
                <div className="md:col-span-3 space-y-6">
                    <OverviewCard padding="p-6">
                        <div className="space-y-6">
                            {/* Report Header */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-semibold" style={{ color: COLORS.mainTextColor }}>
                                        Fault Report Details
                                    </h2>
                                    <p className="text-sm" style={{ color: COLORS.secondaryText }}>
                                        Last updated: {reportData.reportedOn}
                                    </p>
                                </div>
                                <span 
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        reportData.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                        reportData.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}
                                >
                                    {reportData.status}
                                </span>
                            </div>

                            {/* Report Metadata */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: COLORS.secondaryText }}>Report ID</p>
                                        <p>{reportData.reportId}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: COLORS.secondaryText }}>Category</p>
                                        <p>{reportData.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: COLORS.secondaryText }}>Station ID</p>
                                        <p>{reportData.stationId}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: COLORS.secondaryText }}>Charger ID</p>
                                        <p>{reportData.chargerId}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: COLORS.secondaryText }}>Booking ID</p>
                                        <p>{reportData.bookingId}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: COLORS.secondaryText }}>Estimated Resolution Time</p>
                                        <p>{reportData.resolutionTime}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div style={{ width: '100%', height: '1px', backgroundColor: COLORS.stroke }}></div>

                            {/* Description */}
                            <div>
                                <h3 className="font-medium mb-2" style={{ color: COLORS.mainTextColor }}>Description</h3>
                                <p style={{ color: COLORS.secondaryText }}>{reportData.description}</p>
                            </div>

                            {/* Attachment */}
                            <div>
                                <h3 className="font-medium mb-2" style={{ color: COLORS.mainTextColor }}>Attachment</h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span style={{ color: COLORS.secondaryText }}>{reportData.attachment}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-4 pt-4">
                                <button 
                                    className="px-6 py-2 rounded-lg border" 
                                    style={{
                                        borderColor: COLORS.stroke,
                                        color: COLORS.mainTextColor
                                    }}
                                    onClick={() => setShowDiscardModal(true)}
                                >
                                    Discard
                                </button>
                                <button 
                                    className="px-6 py-2 rounded-lg text-white" 
                                    style={{
                                        backgroundColor: COLORS.primary
                                    }}
                                    onClick={() => navigate('/support-officer/AfterAccepted')}
                                >
                                    {reportData.status === 'Resolved' ? 'Close Report' : 'Accept'}
                                </button>
                            </div>
                        </div>
                    </OverviewCard>
                </div>

                {/* Right Side - Stats and Related Reports */}
                <div className="md:col-span-1">
                    <div className="sticky top-6 space-y-6">
                        <FaultReportDetailRightPanel reportDetails={reportStats} />
                    </div>
                </div>
            </div>

            {/* Discard Confirmation Modal */}
            {showDiscardModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        width: '100%',
                        maxWidth: '400px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '16px',
                            color: COLORS.mainTextColor,
                        }}>
                            Discard Report
                        </h3>
                        <p style={{
                            marginBottom: '24px',
                            color: COLORS.secondaryText,
                        }}>
                            Do you really want to discard this report?
                        </p>
                        
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '14px',
                                color: COLORS.secondaryText,
                            }}>
                                Enter the reason to discard
                            </label>
                            <textarea
                                value={discardReason}
                                onChange={(e) => setDiscardReason(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: `1px solid ${COLORS.stroke}`,
                                    borderRadius: '8px',
                                    minHeight: '80px',
                                }}
                                placeholder="Enter reason..."
                            />
                        </div>
                        
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '12px',
                        }}>
                            <button
                                onClick={() => setShowDiscardModal(false)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    border: `1px solid ${COLORS.stroke}`,
                                    backgroundColor: 'transparent',
                                    color: COLORS.mainTextColor,
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDiscard}
                                disabled={!discardReason.trim()}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    backgroundColor: COLORS.primary,
                                    color: 'white',
                                    opacity: discardReason.trim() ? 1 : 0.5,
                                    cursor: discardReason.trim() ? 'pointer' : 'not-allowed',
                                }}
                            >
                                Confirm Discard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
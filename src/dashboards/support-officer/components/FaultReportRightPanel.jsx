import React, { useState, useEffect } from 'react';
import { COLORS, FONTS } from '../../../constants';
import OverviewCard from '../../admin/components/OverviewCard';
import UserIcon from '../../../assets/user_icon.svg';
import StationIcon from '../../../assets/stations.svg';
import BookingsIcon from '../../../assets/bookings_icon.svg'
import ChargerIcon from '../../../assets/electricity.svg'
import { useNavigate, useParams } from 'react-router-dom';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function FaultReportRightPanel({ activeTab, totalReports }) {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newReports, setNewReports] = useState([]);

    const navigate = useNavigate();


    // Fetch support officer stats
    const fetchStats = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_BASE_URL}/api/reports/stats`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch stats');
            }

            const data = await response.json();

            if (data.success) {
                setStats(data.data);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch recent reports for "New Reports" section
    const fetchNewReports = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_BASE_URL}/api/reports/all-reports?type=${activeTab}&limit=3&page=1`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Failed to fetch new reports');

            const data = await response.json();
            if (data.success) {
                setNewReports(data.data.slice(0, 3)); // Get only first 3 reports
            }
        } catch (error) {
            console.error('Error fetching new reports:', error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        fetchNewReports();
    }, [activeTab]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'under-review': return COLORS.bgYellow;
            case 'resolved': return COLORS.bgGreen;
            case 'rejected': return COLORS.bgRed;
            default: return COLORS.stroke;
        }
    };

    const getStatusIconColor = (status) => {
        switch (status) {
            case 'under-review': return COLORS.HighlightText;
            case 'resolved': return COLORS.primary;
            case 'rejected': return COLORS.danger;
            default: return 'black';
        }
    };

    const renderStatCard = () => (
        <OverviewCard padding="p-4">
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ backgroundColor: COLORS.bgGreen }}>
                        <img src={UserIcon} alt="Reports" className="w-5 h-5" />
                    </div>
                    <h3 style={{
                        fontSize: FONTS.sizes.base,
                        fontWeight: FONTS.weights.semibold,
                        color: COLORS.mainTextColor
                    }}>
                        Report Statistics
                    </h3>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-rows-2 mt-0">
                    {/* Total Reports */}
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                            Total Reports
                        </span>
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            {loading ? '...' : stats?.overview?.totalReports?.toLocaleString()}
                        </span>
                    </div>

                    {/* Total Unresolved */}
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                            Total Unresolved
                        </span>
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            {loading ? '...' : stats?.overview?.totalUnresolved?.toLocaleString()}
                        </span>
                    </div>

                    {/* Total Resolved */}
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                            Total Resolved
                        </span>
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            {loading ? '...' : stats?.overview?.totalResolved?.toLocaleString()}
                        </span>
                    </div>

                    {/* Total Rejected */}
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                            Total Rejected
                        </span>
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            {loading ? '...' : stats?.overview?.totalRejected?.toLocaleString()}
                        </span>
                    </div>

                    {/* Reports This Week */}
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                            Reports This Week
                        </span>
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            {loading ? '...' : stats?.weekly?.total?.toLocaleString()}
                        </span>
                    </div>

                    {/* Resolved This Month */}
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                            Resolved This Month
                        </span>
                        <span style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>
                            {loading ? '...' : stats?.monthly?.totalResolved?.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Weekly Breakdown */}
                {stats?.weekly?.breakdown && (
                    <div className="mt-4 pt-4 border-t" style={{ borderColor: COLORS.stroke }}>
                        <h4 style={{
                            fontSize: FONTS.sizes.sm,
                            fontWeight: FONTS.weights.semibold,
                            color: COLORS.mainTextColor,
                            marginBottom: '12px'
                        }}>
                            This Week's Breakdown
                        </h4>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span style={{ fontSize: FONTS.sizes.xs, color: COLORS.secondaryText }}>
                                    Station Reports
                                </span>
                                <span style={{ fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.medium }}>
                                    {stats.weekly.breakdown.stationReports}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span style={{ fontSize: FONTS.sizes.xs, color: COLORS.secondaryText }}>
                                    Charger Reports
                                </span>
                                <span style={{ fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.medium }}>
                                    {stats.weekly.breakdown.chargerReports}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span style={{ fontSize: FONTS.sizes.xs, color: COLORS.secondaryText }}>
                                    Booking Reports
                                </span>
                                <span style={{ fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.medium }}>
                                    {stats.weekly.breakdown.bookingReports}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </OverviewCard>
    );

    const newReportCard = (report, index) => {
        const statusColor = getStatusColor(report.status);
        // Get icon color based on status
        const getIconColor = () => {
            switch (report.status) {
                case 'under-review': return COLORS.HighlightText;
                case 'resolved': return COLORS.primary;
                case 'rejected': return COLORS.danger;
                default:
                    return COLORS.mainTextColor;
            }
        };
        // Get icon based on active tab
        const getReportIcon = () => {
            switch (activeTab) {
                case 'stations':
                    return <img src={StationIcon} alt="Station" className="w-5 h-5" />;
                case 'chargers':
                    return <img src={ChargerIcon} alt="Charger" className="w-5 h-5" />;
                case 'bookings':
                    return <img src={BookingsIcon} alt="Booking" className="w-5 h-5" />;
                default:
                    return <img src={StationIcon} alt="Report" className="w-5 h-5" />;
            }
        };



        const handleViewClick = (e) => {
            e.stopPropagation(); // Prevent row click event
            const userId = localStorage.getItem('userID');
            navigate(`/support-officer/fault-reports/${activeTab}/${report.id}`, {
                state: {
                    reportData: report,
                    reportType: activeTab,
                    userId: userId
                }
            });
        };

        return (
            <OverviewCard key={index} padding="p-4">
                <div className="self-stretch inline-flex justify-start items-start gap-2">
                    <div
                        className="w-10 h-10 flex items-center justify-center rounded-lg"
                        style={{
                            backgroundColor: statusColor,
                            color: getIconColor() // Apply color directly to the icon
                        }}
                    >
                        {getReportIcon()}
                    </div>
                    <div className="flex-1 inline-flex flex-col justify-center items-start gap-2">
                        <div className="self-stretch justify-start">
                            <span style={{
                                fontSize: FONTS.sizes.sm,
                                fontWeight: FONTS.weights.medium,
                                textTransform: 'capitalize'
                            }}>
                                {report.reportCategory?.toLowerCase() || 'Report'}
                            </span>
                        </div>
                        <div className="self-stretch justify-start">
                            <span style={{
                                fontSize: FONTS.sizes.sm,
                                fontWeight: FONTS.weights.medium,
                                color: COLORS.secondaryText
                            }}>
                                {report.description?.length > 50
                                    ? `${report.description.substring(0, 50)}...`
                                    : report.description}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-2 mt-2">
                    <div className="justify-start">
                        <span style={{
                            fontSize: FONTS.sizes.xs,
                            color: COLORS.secondaryText
                        }}>
                            {new Date(report.reportedOn).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                    <div className="justify-start">
                        <span
                            style={{
                                fontSize: FONTS.sizes.sm,
                                color: COLORS.primary,
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                            onClick={handleViewClick}
                        >
                            View
                        </span>
                    </div>
                </div>
            </OverviewCard>
        );
    };

    return (
        <div
            className="rounded-xl border bg-white min-h-[300px] p-3 flex flex-col gap-6 shadow-sm"
            style={{
                borderColor: COLORS.stroke,
                background: COLORS.background,
                fontFamily: FONTS.family.sans,
            }}
        >
            {/* Statistics Card */}
            {renderStatCard()}

            {/* New Reports Section */}
            <div>
                <div style={{ width: '100%', height: '1px', backgroundColor: COLORS.stroke, margin: '0px 0 20px' }}></div>

                <h4 style={{
                    fontSize: FONTS.sizes.base,
                    fontWeight: FONTS.weights.semibold,
                    color: COLORS.mainTextColor,
                    marginBottom: '18px'
                }}>
                    Recent Reports
                </h4>

                <div className="space-y-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-20">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        </div>
                    ) : newReports.length > 0 ? (
                        newReports.map((report, index) => newReportCard(report, index))
                    ) : (
                        <div className="text-center py-4">
                            <span style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>
                                No recent reports
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
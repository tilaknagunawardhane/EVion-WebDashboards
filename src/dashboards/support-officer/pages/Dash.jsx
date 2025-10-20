import { useState, useEffect } from 'react';
import axios from 'axios';
import { COLORS } from '../../../constants/colors';
import { FONTS } from '../../../constants/fonts';
import StatCard from '../components/StatCard';
import StatusCard from '../components/StatusCard';
import OverviewCard from '../../admin/components/OverviewCard';
import ReportTrendChart from '../components/ReportTrendChart';
import FaultStatusChart from '../components/FaultStatusChart';
import ActiveUserCard from '../components/ActiveUserCard';
import ChargingStationComplaintsChart from '../components/ChargingStationComplaintsChart';
import CommunityPostsChart from '../components/CommunityPostsChart';
import UserPageHeader from '../components/UserPageHeader';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export default function SupportOfficerDashboardPage() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.get(`${API_BASE_URL}/api/support-officer-dashboard/stats`);
            
            if (response.data.success) {
                console.log('Dashboard data received:', response.data.data);
                console.log('Reports by charger:', response.data.data.trends?.reportsByCharger);
                console.log('Top active users:', response.data.data.topUsers);
                setDashboardData(response.data.data);
            } else {
                setError('Failed to fetch dashboard data');
            }
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError(err.response?.data?.message || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    // Calculate percentage for fault status
    const getFaultPercentage = () => {
        if (!dashboardData) return 0;
        const { chargers } = dashboardData.stats;
        const total = chargers.open + chargers.unavailable + chargers.disabled;
        return total > 0 ? ((chargers.faulted / total) * 100).toFixed(1) : 0;
    };

    if (loading) {
        return (
            <div style={{ 
                fontFamily: FONTS.family.sans, 
                padding: '24px', 
                backgroundColor: COLORS.background,
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="spinner" style={{
                        border: `4px solid ${COLORS.border}`,
                        borderTop: `4px solid ${COLORS.primary}`,
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px'
                    }} />
                    <p style={{ color: COLORS.mainTextColor }}>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                fontFamily: FONTS.family.sans, 
                padding: '24px', 
                backgroundColor: COLORS.background,
                minHeight: '100vh'
            }}>
                <UserPageHeader title="Platform Overview" />
                <div style={{
                    backgroundColor: COLORS.lightRed,
                    padding: '20px',
                    borderRadius: '8px',
                    marginTop: '20px'
                }}>
                    <p style={{ color: COLORS.mainTextColor, marginBottom: '12px' }}>
                        {error}
                    </p>
                    <button
                        onClick={fetchDashboardData}
                        style={{
                            backgroundColor: COLORS.primary,
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!dashboardData) return null;

    // Get top active users from the API response
    const topUsers = dashboardData.topUsers || [];

    return (
        <div style={{ 
            fontFamily: FONTS.family.sans, 
            padding: '24px', 
            backgroundColor: COLORS.background
        }}>
            {/* Header */}
            <UserPageHeader title="Platform Overview" />

            {/* Platform Overview Section */}
            <section className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatCard
                        title="Stations"
                        value={dashboardData.stats.stations.open + 
                               dashboardData.stats.stations.unavailable + 
                               dashboardData.stats.stations.disabled}
                        subValue={`${dashboardData.stats.stations.unavailable} Unavailable`}
                        icon="stations"
                        subValueColor={COLORS.primary}
                    />

                    <StatCard
                        title="Connectors"
                        value={dashboardData.stats.chargers.totalConnectors}
                        subValue={`${dashboardData.stats.chargers.unavailableConnectors} Unavailable`}
                        icon="connectors"
                        subValueColor={COLORS.lightRed}
                    />

                    <StatCard
                        title="Fault Reports"
                        value={dashboardData.stats.reports.underReview}
                        subValue={`${dashboardData.stats.reports.total} Total`}
                        icon="faultReports"
                        subValueColor={COLORS.lightRed}
                    />

                    <StatCard
                        title="Community Posts"
                        value={dashboardData.stats.discussions.total}
                        subValue={`${dashboardData.stats.discussions.flagged} Flagged`}
                        icon="communityPosts"
                        subValueColor={COLORS.lightRed}
                    />
                </div>
            </section>

            {/* Main Charts Section */}
            <section className="mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                    {/* Report Trends */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                            Report Trends
                        </h2>
                        <OverviewCard>
                            <ReportTrendChart data={dashboardData.reportsTrends} />
                        </OverviewCard>
                    </div>
                    
                    {/* Fault Status */}
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                            Fault Status
                        </h2>
                        <StatusCard
                            value={dashboardData.stats.reports.resolved}
                            total={dashboardData.stats.reports.underReview}
                            percentage={getFaultPercentage()}
                        >
                            <FaultStatusChart 
                                underReview={dashboardData.stats.reports.underReview}
                                resolved={dashboardData.stats.reports.resolved}
                            />
                        </StatusCard>
                    </div>

                    {/* Charging Station Complaints */}
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                            Complaints
                        </h2>
                        <OverviewCard>
                            <ChargingStationComplaintsChart 
                                data={dashboardData.trends?.reportsByCharger || []}
                            />
                        </OverviewCard>
                    </div>

                </div>
            </section>

            {/* Row 3 */}
            <section className="mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                    {/* Community Post Section */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                            Community Posts
                        </h2>
                        <OverviewCard>
                            <CommunityPostsChart data={dashboardData.discussionTrends} />
                        </OverviewCard>
                    </div>

                    {/* Most Active Users */}
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                            Most Active Users
                        </h2>
                        {topUsers.length > 0 ? (
                            topUsers.map((user, index) => (
                                <ActiveUserCard
                                    key={index}
                                    name={user.name}
                                    posts={user.posts.toString()}
                                    rejected={user.rejected.toString()}
                                    bgColor={
                                        user.rank === 1 ? COLORS.primary :
                                        user.rank === 2 ? COLORS.bgGreen :
                                        COLORS.border
                                    }
                                    textColor={
                                        user.rank === 1 ? COLORS.background :
                                        COLORS.mainTextColor
                                    }
                                />
                            ))
                        ) : (
                            <OverviewCard>
                                <div style={{ 
                                    padding: '20px', 
                                    textAlign: 'center',
                                    color: COLORS.secondaryText 
                                }}>
                                    No active users yet
                                </div>
                            </OverviewCard>
                        )}
                    </div>

                    {/* Response Time & Stats */}
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                            Response Metrics
                        </h2>
                        <OverviewCard>
                            <div style={{ padding: '16px' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <p style={{ 
                                        color: COLORS.secondaryText, 
                                        fontSize: '14px',
                                        marginBottom: '8px'
                                    }}>
                                        Avg Response Time
                                    </p>
                                    <p style={{ 
                                        color: COLORS.mainTextColor, 
                                        fontSize: '24px',
                                        fontWeight: 'bold'
                                    }}>
                                        {dashboardData.metrics.responseTime.averageHours}h
                                    </p>
                                </div>
                                
                                <div style={{ marginBottom: '20px' }}>
                                    <p style={{ 
                                        color: COLORS.secondaryText, 
                                        fontSize: '14px',
                                        marginBottom: '8px'
                                    }}>
                                        Resolved Reports
                                    </p>
                                    <p style={{ 
                                        color: COLORS.mainTextColor, 
                                        fontSize: '24px',
                                        fontWeight: 'bold'
                                    }}>
                                        {dashboardData.stats.reports.resolved}
                                    </p>
                                </div>

                                <div>
                                    <p style={{ 
                                        color: COLORS.secondaryText, 
                                        fontSize: '14px',
                                        marginBottom: '8px'
                                    }}>
                                        Active Sessions
                                    </p>
                                    <p style={{ 
                                        color: COLORS.mainTextColor, 
                                        fontSize: '24px',
                                        fontWeight: 'bold'
                                    }}>
                                        {dashboardData.metrics.sessions.active}
                                    </p>
                                </div>
                            </div>
                        </OverviewCard>
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'
import StatCard from '../components/StatCard'
import StatusCard from '../components/StatusCard'
import OverviewCard from '../../admin/components/OverviewCard'
import NotificationsIcon from '../../../assets/notifications.svg'
import RevenueTrendChart from '../components/RevenueTrendChart'
import ConnectorStatusChart from '../components/ConnectorStatusChart'
import ApprovalCard from '../components/ApprovalCard'
import MapImage from '../../../assets/map-placeholder.png' // Import your map image
import { Colors } from 'chart.js'
import ChargingStationComplaintsChart from '../components/ChargingStationComplaintsChart'
import CommunityPostsChart from '../components/CommunityPostsChart'
// import UserGrowthChart from '../components/UserGrowthChart'


export default function SupportOfficerDashboardPage() {
    // Dynamic data that will later come from backend
    const dashboardData = {
        stats: {
            stations: { total: 448, pending: 3 },
            connectors: { total: 2302, faulted: 15 },
            faultReports: { total: 24 },
            communityPosts: { total: 3 }
        }
    }

    return (
        <div style={{ fontFamily: FONTS.family.sans, padding: '24px' }}>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold" style={{ color: COLORS.mainTextColor }}>
                    Platform Overview
                </h1>
                <div className="notification-icon">
                    <img
                        src={NotificationsIcon}
                        alt="Notifications"
                        style={{
                            width: '20px',
                            height: '20px',
                            filter: `brightness(0) saturate(100%) invert(48%) sepia(99%) saturate(1230%) hue-rotate(130deg) brightness(95%) contrast(101%)`
                        }}
                    />
                </div>
            </div>

            {/* Platform Overview Section */}
            <section className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatCard
                        title="Stations"
                        value={dashboardData.stats.stations.total}
                        subValue={`${dashboardData.stats.stations.pending} Pending`}
                        icon="stations"
                        subValueColor={COLORS.primary}
                    />

                    <StatCard
                        title="Connectors"
                        value={dashboardData.stats.connectors.total}
                        subValue={`${dashboardData.stats.connectors.faulted} Faulted`}
                        icon="connectors"
                        subValueColor={COLORS.lightRed}
                    />

                    <StatCard
                        title="Fault Reports"
                        value={dashboardData.stats.faultReports.total}
                        icon="faultReports"
                        subValueColor={COLORS.lightRed}
                    />

                    <StatCard
                        title="Community Posts"
                        value={dashboardData.stats.communityPosts.total}
                        icon="communityPosts"
                    />
                </div>
            </section>

            {/* Main Charts Section */}
            <section className="mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                    {/* Revenue Trend */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                            Report Trends
                        </h2>
                        <OverviewCard>
                            <RevenueTrendChart />
                        </OverviewCard>
                    </div>
                    
                    {/* Fault Status */}
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                            Fault Status
                        </h2>
                        <StatusCard
                            value={dashboardData.stats.faultReports.total}
                            total={dashboardData.stats.connectors.total}
                        >
                            <ConnectorStatusChart />
                        </StatusCard>
                    </div>

                    {/* Charging Station Complains */}
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                            Complains
                        </h2>
                        <OverviewCard>
                        <ChargingStationComplaintsChart />
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
                        <CommunityPostsChart />
                        </OverviewCard>
                    </div>


                    {/* Right Side Section - takes 2/5 width */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Connector Status Section - top left */}
                            <div className="lg:col-span-1">
                                <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                                    Charging Session Trend
                                </h2>
                                <StatusCard
                                    value={dashboardData.stats.connectors.faulted}
                                    total={dashboardData.stats.connectors.total}
                                >
                                    <ConnectorStatusChart
                                        faulted={dashboardData.stats.connectors.faulted}
                                        operational={dashboardData.stats.connectors.total - dashboardData.stats.connectors.faulted}
                                    />
                                </StatusCard>
                            </div>

                            {/* Approval Cards Section - top right */}
                            <div className="lg:col-span-1">
                                <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                                    Most Active Users
                                </h2>
                                <ApprovalCard
                                    name="John Doe"
                                    posts="5"
                                    rejected="1"
                                    bgColor="#FFFFFF"
                                    textColor={COLORS.mainTextColor}
                                // borderColor="#B3E0FF"
                                />
                                <ApprovalCard
                                    name="John Doe"
                                    posts="8"
                                    rejected="1"
                                    bgColor={COLORS.bgGreen}
                                    textColor={COLORS.mainTextColor}
                                // borderColor="#B3E6B3"
                                />
                                <ApprovalCard
                                    name="John Doe"
                                    posts="9"
                                    rejected="2"
                                    bgColor={COLORS.primary}
                                    textColor={COLORS.background}
                                // borderColor="#FFD9B3"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
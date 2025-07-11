import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'
import StatCard from '../../admin/components/StatCard'
import StatusCard from '../../admin/components/StatusCard'
import OverviewCard from '../../admin/components/OverviewCard'
import NotificationsIcon from '../../../assets/notifications.svg'
import RevenueTrendChart from '../../admin/components/RevenueTrendChart'
import ConnectorStatusChart from '../../admin/components/ConnectorStatusChart'
import ApprovalCard from '../../admin/components/ApprovalCard'
import MapImage from '../../../assets/map-placeholder.png' // Import your map image
import UserGrowthChart from '../components/UserGrowthChart'


export default function AdminDashboardPage() {
    // Dynamic data that will later come from backend
    const dashboardData = {
        stats: {
            stations: { total: 448, pending: 3 },
            connectors: { total: 2302, faulted: 15 },
            users: { total: 12501, riskPercentage: '-3.87' },
            revenue: { total: 52311, sessions: 45200, bookingFees: '+7111' }
        },
        trends: {
            chargingSessions: { approved: 52311, bookings: 45200, walkIns: 7111 },
            revenue: { total: 52311, sessions: 45200, bookingFees: 7111 },
            managedChargers: [
                {
                    name: 'Premasiri Khemadasa Marek',
                    locations: [
                        'Bloomfield, Cact and Athlone Club',
                        'Seleney Mazurant & Cafe',
                        'Sri Lanka Rupayahini (TV) Corporation'
                    ]
                },
                // Add more managed chargers as needed
            ]
        }
    }

    return (
        <div style={{ fontFamily: FONTS.family.sans, padding: '4px' }}>
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

                    />

                    <StatCard
                        title="Connectors"
                        value={dashboardData.stats.connectors.total}
                        subValue={`${dashboardData.stats.connectors.faulted} Faulted`}
                        icon="connectors"
                    />

                    <StatCard
                        title="EV Users"
                        value={dashboardData.stats.users.total}
                        subValue={`${dashboardData.stats.users.riskPercentage}% risk controls`}
                        icon="users"
                        status={dashboardData.stats.users.riskPercentage.startsWith('+') ? 'positive' : 'negative'}

                    />

                    <StatCard
                        title="Revenue"
                        value={`LKR ${dashboardData.stats.revenue.total.toLocaleString()}`}
                        subValue={`${dashboardData.stats.revenue.bookingFees}% vs last month`}
                        icon="revenue"
                        status={dashboardData.stats.revenue.bookingFees.startsWith('+') ? 'positive' : 'negative'}
                    />
                    
                </div>
            </section>

            {/* Main Charts Section */}
            <section className="mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Charging Session Trend */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                            User Growth
                        </h2>
                        <OverviewCard>
                            <div className="flex flex-col">
                                <div className="flex space-x-4 mb-4">
                                    <span style={{ color: COLORS.secondaryText }}>New Users: 4,500</span>
                                    <span style={{ color: COLORS.secondaryText }}>Active Users: 3,500</span>
                                </div>
                                <UserGrowthChart data={dashboardData.userGrowth} />
                            </div>
                        </OverviewCard>
                    </div>

                    {/* Revenue Trend */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                            Revenue Trends
                        </h2>
                        <OverviewCard>
                            <RevenueTrendChart data={dashboardData.trends.revenue} />
                        </OverviewCard>
                    </div>
                </div>
            </section>

            {/* Connector Status with Map Section */}
            <section className="mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Map Section - takes 3/5 width */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                            Managed Chargers
                        </h2>
                        <OverviewCard>
                            <img
                                src={MapImage}
                                alt="Charging Stations Map"
                                className="w-full h-full object-cover rounded-lg"
                                style={{ height: '300px', width: '100%' }}
                            />
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
                                    Approvals
                                </h2>
                                <ApprovalCard
                                    count="03"
                                    title="Charging Station Approvals"
                                    bgColor="#FFFFFF"
                                    textColor={COLORS.mainTextColor}
                                // borderColor="#B3E0FF"
                                />
                                <ApprovalCard
                                    count="15"
                                    title="New Charger Approvals"
                                    bgColor={COLORS.bgGreen}
                                    textColor={COLORS.mainTextColor}
                                // borderColor="#B3E6B3"
                                />
                                <ApprovalCard
                                    count="12"
                                    title="Account Reactivations"
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
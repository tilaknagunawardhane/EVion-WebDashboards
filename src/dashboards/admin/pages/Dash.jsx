import { useState, useEffect } from 'react'
import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'
import StatCard from '../../admin/components/StatCard'
import StatusCard from '../../admin/components/StatusCard'
import OverviewCard from '../../admin/components/OverviewCard'
import RevenueTrendChart from '../../admin/components/RevenueTrendChart'
import ConnectorStatusChart from '../../admin/components/ConnectorStatusChart'
import ApprovalCard from '../../admin/components/ApprovalCard'
import MapImage from '../../../assets/map-placeholder.png'
import UserGrowthChart from '../components/UserGrowthChart'
import AdminPageHeader from '../components/AdminPageHeader'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export default function AdminDashboardPage() {
    const [dashboardData, setDashboardData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            const url = `${API_BASE_URL}/api/admin-dashboard/stats`
            console.log('🌐 API_BASE_URL:', API_BASE_URL)
            console.log('🔗 Fetching from:', url)
            
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            console.log('✅ Response received:', response)
            console.log('📊 Response data:', response.data)
            
            if (response.data.success) {
                setDashboardData(response.data.data)
                console.log('✅ Dashboard data set successfully')
            } else {
                throw new Error(response.data.message || 'Failed to load dashboard data')
            }
        } catch (err) {
            console.error('❌ Error fetching dashboard data:', err)
            console.error('❌ Error response:', err.response)
            setError(err.message || 'Failed to fetch dashboard data')
        } finally {
            setLoading(false)
        }
    }

    // Loading state
    if (loading) {
        return (
            <div style={{ 
                fontFamily: FONTS.family.sans, 
                padding: '24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="spinner" style={{
                        border: `4px solid ${COLORS.lightGray}`,
                        borderTop: `4px solid ${COLORS.primary}`,
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px'
                    }}></div>
                    <p style={{ color: COLORS.secondaryText }}>Loading dashboard...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div style={{ fontFamily: FONTS.family.sans, padding: '24px' }}>
                <AdminPageHeader title="Platform Overview" />
                <div style={{
                    backgroundColor: '#fee',
                    border: '1px solid #fcc',
                    borderRadius: '8px',
                    padding: '16px',
                    marginTop: '16px'
                }}>
                    <p style={{ color: '#c00', fontWeight: 'bold' }}>Error Loading Dashboard</p>
                    <p style={{ color: '#666' }}>{error}</p>
                    <button
                        onClick={fetchDashboardData}
                        style={{
                            marginTop: '12px',
                            padding: '8px 16px',
                            backgroundColor: COLORS.primary,
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    // No data state
    if (!dashboardData) {
        return (
            <div style={{ fontFamily: FONTS.family.sans, padding: '24px' }}>
                <AdminPageHeader title="Platform Overview" />
                <p style={{ color: COLORS.secondaryText, marginTop: '16px' }}>
                    No dashboard data available
                </p>
            </div>
        )
    }

    // Calculate latest user growth data for display
    const latestUserGrowth = dashboardData.userGrowth?.[dashboardData.userGrowth.length - 1] || {}
    const newUsers = latestUserGrowth.newUsers || 0
    const activeUsers = latestUserGrowth.activeUsers || 0

    // Format percentage values
    const formatPercentage = (value) => {
        const num = parseFloat(value)
        return num >= 0 ? `+${num}` : `${num}`
    }

    return (
        <div style={{ fontFamily: FONTS.family.sans, padding: '24px' }}>
            {/* Header */}
            <AdminPageHeader title="Platform Overview" />

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
                        title="Chargers"
                        value={dashboardData.stats.chargers.total}
                        subValue={`${dashboardData.stats.chargers.faulted} Faulted`}
                        icon="connectors"
                    />

                    <StatCard
                        title="EV Users"
                        value={dashboardData.stats.users.total.toLocaleString()}
                        subValue={`${formatPercentage(dashboardData.stats.users.riskPercentage)}% vs last month`}
                        icon="users"
                        status={parseFloat(dashboardData.stats.users.riskPercentage) >= 0 ? 'positive' : 'negative'}
                    />

                    <StatCard
                        title="Revenue"
                        value={`LKR ${(-dashboardData.stats.revenue.total).toLocaleString()}`}
                        //subValue={`${formatPercentage(dashboardData.stats.revenue.bookingFees)}% vs last month`}
                        icon="revenue"
                        status={parseFloat(dashboardData.stats.revenue.bookingFees) >= 0 ? 'positive' : 'negative'}
                    />
                </div>
            </section>

            {/* Main Charts Section */}
            <section className="mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* User Growth Chart */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                            User Growth
                        </h2>
                        <OverviewCard>
                            <div className="flex flex-col">
                                <div className="flex space-x-4 mb-4">
                                    <span style={{ color: COLORS.secondaryText }}>
                                        New Users: {newUsers.toLocaleString()}
                                    </span>
                                    <span style={{ color: COLORS.secondaryText }}>
                                        Active Users: {activeUsers.toLocaleString()}
                                    </span>
                                </div>
                                <div className="h-80">
                                    <UserGrowthChart data={dashboardData.userGrowth} />
                                </div>
                            </div>
                        </OverviewCard>
                    </div>

                    {/* Revenue Trend */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                            Revenue Trends
                        </h2>
                        <OverviewCard>
                            <div className="h-70">
                                <RevenueTrendChart data={dashboardData.dailyRevenueTrends} />
                            </div>
                        
                        {/* Revenue Summary Cards */}
                       {dashboardData.revenueBreakdown && (() => {
    // Flip the signs for display
                            const total = -dashboardData.revenueBreakdown.total;
                            const charging = -dashboardData.revenueBreakdown.charging;
                            const booking = -dashboardData.revenueBreakdown.booking;
                            
                            // Calculate percentages
                            const chargingPercentage = total !== 0 ? ((charging / total) * 100).toFixed(1) : '0.0';
                            const bookingPercentage = total !== 0 ? ((booking / total) * 100).toFixed(1) : '0.0';
                            
                            return (
                                <div className="grid grid-cols-3 gap-4 mt-3">
                                    <div style={{
                                        padding: '16px',
                                        backgroundColor: COLORS.primary,
                                        borderRadius: '8px',
                                        color: 'white'
                                    }}>
                                        <p style={{ fontSize: '12px', opacity: 0.9 }}>Total Revenue</p>
                                        <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>
                                            LKR {total.toLocaleString()}
                                        </p>
                                        <p style={{ fontSize: '10px', opacity: 0.8, marginTop: '4px' }}>
                                            100%
                                        </p>
                                    </div>
                                    <div style={{
                                        padding: '16px',
                                        backgroundColor: COLORS.star,
                                        borderRadius: '8px',
                                        color: 'white'
                                    }}>
                                        <p style={{ fontSize: '12px', opacity: 0.9 }}>Charging Sessions</p>
                                        <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>
                                            LKR {charging.toLocaleString()}
                                        </p>
                                        <p style={{ fontSize: '10px', opacity: 0.8, marginTop: '4px' }}>
                                            {chargingPercentage}% of total
                                        </p>
                                    </div>
                                    <div style={{
                                        padding: '16px',
                                        backgroundColor: COLORS.danger,
                                        borderRadius: '8px',
                                        color: 'white'
                                    }}>
                                        <p style={{ fontSize: '12px', opacity: 0.9 }}>Booking Fees</p>
                                        <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>
                                            LKR {booking.toLocaleString()}
                                        </p>
                                        <p style={{ fontSize: '10px', opacity: 0.8, marginTop: '4px' }}>
                                            {bookingPercentage}% of total
                                        </p>
                                    </div>
                                </div>
                            );
                        })()}
                        </OverviewCard>
                    </div>
                </div>
            </section>

            {/* Connector Status with Map Section */}
            <section className="mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Map Section - takes 2 columns */}
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

                    {/* Right Side Section - takes 2 columns */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Connector Status Section */}
                            <div className="lg:col-span-1">
                                <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                                    Charger Status
                                </h2>
                                <StatusCard
                                    value={dashboardData.stats.chargers.faulted}
                                    total={dashboardData.stats.chargers.total}
                                >
                                    <ConnectorStatusChart
                                        faulted={dashboardData.stats.chargers.faulted}
                                        operational={dashboardData.stats.chargers.total - dashboardData.stats.chargers.faulted}
                                    />
                                </StatusCard>
                            </div>

                            {/* Approval Cards Section */}
                            <div className="lg:col-span-1">
                                <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                                    Approvals
                                </h2>
                                <ApprovalCard
                                    count={String(dashboardData.approvals.stationApprovals).padStart(2, '0')}
                                    title="Charging Station Approvals"
                                    bgColor="#FFFFFF"
                                    textColor={COLORS.mainTextColor}
                                />
                                <ApprovalCard
                                    count={String(dashboardData.approvals.chargerApprovals).padStart(2, '0')}
                                    title="New Charger Approvals"
                                    bgColor={COLORS.bgGreen}
                                    textColor={COLORS.mainTextColor}
                                />
                                <ApprovalCard
                                    count={String(dashboardData.approvals.accountReactivations).padStart(2, '0')}
                                    title="Account Reactivations"
                                    bgColor={COLORS.primary}
                                    textColor={COLORS.background}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Optional: Session Summary Section */}
            {dashboardData.summary && (
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.mainTextColor }}>
                        Quick Summary
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <OverviewCard>
                            <div style={{ padding: '16px' }}>
                                <p style={{ color: COLORS.secondaryText, fontSize: '14px' }}>Active Sessions</p>
                                <p style={{ color: COLORS.mainTextColor, fontSize: '24px', fontWeight: 'bold' }}>
                                    {dashboardData.summary.sessions.active}
                                </p>
                            </div>
                        </OverviewCard>
                        <OverviewCard>
                            <div style={{ padding: '16px' }}>
                                <p style={{ color: COLORS.secondaryText, fontSize: '14px' }}>Upcoming Bookings</p>
                                <p style={{ color: COLORS.mainTextColor, fontSize: '24px', fontWeight: 'bold' }}>
                                    {dashboardData.summary.bookings.upcoming}
                                </p>
                            </div>
                        </OverviewCard>
                        <OverviewCard>
                            <div style={{ padding: '16px' }}>
                                <p style={{ color: COLORS.secondaryText, fontSize: '14px' }}>Completed Bookings</p>
                                <p style={{ color: COLORS.mainTextColor, fontSize: '24px', fontWeight: 'bold' }}>
                                    {dashboardData.summary.bookings.completed}
                                </p>
                            </div>
                        </OverviewCard>
                        <OverviewCard>
                            <div style={{ padding: '16px' }}>
                                <p style={{ color: COLORS.secondaryText, fontSize: '14px' }}>Total Sessions</p>
                                <p style={{ color: COLORS.mainTextColor, fontSize: '24px', fontWeight: 'bold' }}>
                                    {dashboardData.summary.sessions.total}
                                </p>
                            </div>
                        </OverviewCard>
                    </div>
                </section>
            )}
        </div>
    )
}
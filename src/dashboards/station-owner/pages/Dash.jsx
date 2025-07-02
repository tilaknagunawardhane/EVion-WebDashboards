import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'
import StatCard from '../components/StatCard'
import StatusCard from '../components/StatusCard'
import { FiZap, FiCreditCard, FiActivity, FiTrendingUp } from 'react-icons/fi'

export default function DashboardPage() {
  const stats = [
    { title: 'Stations', value: '03', icon: <FiZap style={{ color: COLORS.primary }} /> },
    { title: 'Connectors', value: '08', icon: <FiZap style={{ color: COLORS.primary }} /> },
    { title: 'Sessions', value: '147', icon: <FiActivity style={{ color: COLORS.primary }} /> },
    { title: 'Electricity', value: '2560 kW', icon: <FiZap style={{ color: COLORS.primary }} /> },
    { title: 'Income', value: 'LKR 238.45K', icon: <FiCreditCard style={{ color: COLORS.primary }} />,
      trend: { value: 8.3, label: 'vs last week' } }
  ]

  const statusItems = [
    { label: 'Active Sessions', status: 'Active', value: '04' },
    { label: 'Faulted', status: 'Faulted', value: '01' },
    { label: 'Occupied', status: 'Occupied', value: '04' },
    { label: 'Available', status: 'Available', value: '03' }
  ]

  return (
    <div style={{ fontFamily: FONTS.family.sans }}>
      {/* Welcome Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 
            className="text-2xl font-bold"
            style={{ color: COLORS.mainTextColor }}
          >
            Welcome Back!
          </h1>
          <p style={{ color: COLORS.secondaryText }}>Here's what's happening with your stations today</p>
        </div>
        <div className="text-right">
          <p style={{ color: COLORS.secondaryText }}>August 08</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-3">
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: `1px solid ${COLORS.border}` }}>
            <h3 style={{ color: COLORS.mainTextColor }} className="text-lg font-semibold mb-4">Overview</h3>
            {/* Chart would go here */}
            <div className="h-64 flex items-center justify-center" style={{ backgroundColor: COLORS.background }}>
              <p style={{ color: COLORS.secondaryText }}>Energy Usage Chart</p>
            </div>
          </div>
        </div>
        <StatusCard 
          title="Connector Status" 
          items={statusItems}
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ color: COLORS.mainTextColor }} className="text-lg font-semibold mb-2">Fault Alerts</h3>
          <p style={{ color: COLORS.secondaryText }}>No active alerts</p>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ color: COLORS.mainTextColor }} className="text-lg font-semibold mb-2">Settings</h3>
          <p style={{ color: COLORS.secondaryText }}>Account configuration</p>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ color: COLORS.mainTextColor }} className="text-lg font-semibold mb-2">Help Center</h3>
          <p style={{ color: COLORS.secondaryText }}>Contact support</p>
        </div>
      </div>
    </div>
  )
}
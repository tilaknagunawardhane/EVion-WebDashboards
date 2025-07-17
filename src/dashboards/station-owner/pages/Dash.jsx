import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'
import StatCard from '../components/StatCard'
import StatusCard from '../components/StatusCard'
import NotificationsIcon from '../../../assets/notifications.svg'
import StationsIcon from '../../../assets/stations.svg'
import ConnectorsIcon from '../../../assets/connectors.svg'
import SessionsIcon from '../../../assets/sessions.svg'
import ElectricityIcon from '../../../assets/electricity.svg'
import IncomeIcon from '../../../assets/electricity.svg'
import EnergyUsageChart from '../components/EnergyUsageChart'
import StationOwnerPageHeader from '../components/StationOwnerPageHeader'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Stations',
      value: '03',
      activeSessions: '04',
      icon: <img src={StationsIcon} alt="Stations" style={{ width: 20, height: 20, color: COLORS.mainTextColor }} />
    },
    {
      title: 'Connectors',
      value: '08',
      icon: <img src={ConnectorsIcon} alt="Connectors" style={{ width: 20, height: 20, color: COLORS.mainTextColor }} />
    },
    {
      title: 'Sessions',
      value: '147',
      activeSessions: '04',
      icon: <img src={SessionsIcon} alt="Sessions" style={{ width: 20, height: 20, color: COLORS.mainTextColor }} />
    },
    {
      title: 'Electricity',
      value: '2560 kW',
      icon: <img src={ElectricityIcon} alt="Electricity" style={{ width: 20, height: 20, color: COLORS.mainTextColor }} />
    },
    {
      title: 'Income',
      value: 'LKR 238.45K',
      icon: <img src={IncomeIcon} alt="Income" style={{ width: 20, height: 20, color: COLORS.mainTextColor }} />,
      trend: { value: 8.3, label: 'vs last week' }
    }
  ]

  return (
    <div
      style={{
        fontFamily: FONTS.family.sans,
        padding: '24px',
        backgroundColor: COLORS.background,
      }}
    >
      <StationOwnerPageHeader title="Stations Overview" />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            activeSessions={stat.activeSessions}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-3">
          <div
            className="p-6 rounded-xl"
            style={{
              backgroundColor: 'white',
              border: `1px solid ${COLORS.border}`,
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)'
            }}
          >
            <h3
              style={{
                color: COLORS.mainTextColor,
                fontSize: FONTS.sizes.lg,
                fontWeight: FONTS.weights.semibold,
                marginBottom: '16px'
              }}
            >
              Overview
            </h3>
            <div className="h-64 rounded-lg" style={{
              backgroundColor: COLORS.background,
              border: `1px dashed ${COLORS.border}`,
              padding: '16px'
            }}>
              <EnergyUsageChart />
            </div>
          </div>
        </div>

        <StatusCard
          title="Connector Status"
          style={{
            backgroundColor: 'white',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)'
          }}
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Fault Alerts', content: 'No active alerts' },
          { title: 'Settings', content: 'Account configuration' },
          { title: 'Help Center', content: 'Contact support' }
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl"
            style={{
              backgroundColor: 'white',
              border: `1px solid ${COLORS.border}`,
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)'
            }}
          >
            <h3
              style={{
                color: COLORS.mainTextColor,
                fontSize: FONTS.sizes.lg,
                fontWeight: FONTS.weights.semibold,
                marginBottom: '8px'
              }}
            >
              {item.title}
            </h3>
            <p style={{ color: COLORS.secondaryText }}>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
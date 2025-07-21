import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'
import StatCard from '../components/StatCard'
import StationsIcon from '../../../assets/stations.svg'
import ConnectorsIcon from '../../../assets/connectors.svg'
import SessionsIcon from '../../../assets/sessions.svg'
import ElectricityIcon from '../../../assets/electricity.svg'
import IncomeIcon from '../../../assets/earnings2.svg'
import StationOwnerPageHeader from '../components/StationOwnerPageHeader'
import OverviewChart from '../components/dashboardComponents/OverviewChart'
import ConnectorStatusChart from '../components/dashboardComponents/ConnectorStatusChart'
import StackedSessionsChart from '../components/dashboardComponents/StackedSessionCard'
import MapCard from '../components/dashboardComponents/MapWithPopup'
import FaultReportsStatusCard from '../components/dashboardComponents/FaultReportsStatusChart'
import FourWeeksEarnings from '../components/dashboardComponents/FourWeeksEarnings'

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
      title: 'Revenue',
      value: 'LKR 238.45K',
      icon: <img src={IncomeIcon} alt="Income" className="mr-1" style={{ width: 16, height: 16, color: COLORS.mainTextColor }} />,
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
      <div className="grid grid-cols-2 md:grid-cols-5 space-x-4 mb-4">
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

      {/* Status Overview 1 */}
      <div className="flex flex-col lg:flex-row gap-4 w-full mb-4">
        <div className="w-full lg:w-2/5">
          <MapCard />
        </div>
        <div className="w-full lg:w-3/5">
          <OverviewChart />
        </div>

      </div>

      {/* Status Overview 2 */}
      <div className="flex flex-col lg:flex-row gap-4 w-full">

        <div className="w-full lg:w-2/5">
          <StackedSessionsChart />
        </div>

        <div className="w-full lg:w-1/5">
          <ConnectorStatusChart />
        </div>

        <div className="w-full lg:w-1/5">
          <FaultReportsStatusCard />
        </div>

        <div className="w-full lg:w-1/5">
          <FourWeeksEarnings />
        </div>

      </div>
    </div>
  )

}
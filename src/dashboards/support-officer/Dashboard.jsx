import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import DashboardIcon from '../../assets/dashboard_black_icon.svg'
import StationIcon from '../../assets/stations.svg'
import AlertIcon from '../../assets/alert_black_icon.svg'
import CommentIcon from '../../assets/comment_icon.svg'

const dashboardIcon = <img src={DashboardIcon} alt="Stations" style={{ width: 20, height: 20, marginRight: '12px' }} />
const stationIcon = <img src={StationIcon} alt="Stations" style={{ width: 20, height: 20, marginRight: '12px' }} />
const alertIcon = <img src={AlertIcon} alt="Stations" style={{ width: 20, height: 20, marginRight: '12px' }} />
const communityIcon = <img src={CommentIcon} alt="Stations" style={{ width: 20, height: 20, marginRight: '12px' }} />


export default function SupportOfficerDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9f9f9' }}>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-4 border-b" style={{ borderColor: '#dedede' }}>
            <h2 className="text-xl font-semibold" style={{ color: '#2d3436' }}>Support Dashboard</h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/support-officer/dashboard"
                  className="flex items-center px-4 py-2 rounded-md"
                  style={{ color: '#2d3436' }}
                >
                  {dashboardIcon}
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/support-officer/chargingStations"
                  className="flex items-center px-4 py-2 rounded-md"
                  style={{ color: '#2d3436' }}
                >
                  {stationIcon}
                  Charging Stations
                </Link>
              </li>
              <li>
                <Link
                  to="/support-officer/faultReports"
                  className="flex items-center px-4 py-2 rounded-md"
                  style={{ color: '#2d3436' }}
                >
                  {alertIcon}
                  Fault Reports
                </Link>
              </li>
              <li>
                <Link
                  to="/support-officer/charging-staions"
                  className="flex items-center px-4 py-2 rounded-md"
                  style={{ color: '#2d3436' }}
                >
                  {communityIcon}
                  Community
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout()
                    navigate('/')
                  }}
                  className="w-full text-left px-4 py-2 rounded-md"
                  style={{ color: '#959595' }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
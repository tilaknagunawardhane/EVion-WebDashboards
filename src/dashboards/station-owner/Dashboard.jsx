import { COLORS, FONTS } from '../../constants'
import { NavLink, Outlet } from 'react-router-dom'
import logo from '../../assets/Logo 2.svg'
import DashboardIcon from '../../assets/dashboard_icon.svg'
import StationsIcon from '../../assets/stations_icon.svg'
import BookingsIcon from '../../assets/bookings_icon.svg'
import EarningsIcon from '../../assets/earnings_icon.svg'
import ReportsIcon from '../../assets/reports_icon.svg'
import AlertsIcon from '../../assets/alerts_icon.svg'
import SettingsIcon from '../../assets/settings_icon.svg'
import HelpIcon from '../../assets/help_icon.svg'

export default function StationOwnerDashboard() {
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/station-owner/dashboards', 
      icon: DashboardIcon
    },
    { 
      name: 'Charging Stations', 
      path: '/station-owner/stations', 
      icon: StationsIcon
    },
    { 
      name: 'Earnings', 
      path: '/station-owner/earnings', 
      icon: EarningsIcon
    },
    { 
      name: 'Fault Alerts', 
      path: '/station-owner/alerts', 
      icon: AlertsIcon,
      count: 0 
    },
    // { 
    //   name: 'Reports', 
    //   path: '/station-owner/reports', 
    //   icon: ReportsIcon
    // },
  ]

  const bottomNavItems = [
    { 
      name: 'Settings', 
      path: '/station-owner/settings', 
      icon: SettingsIcon
    },
    { 
      name: 'Help Center', 
      path: '/station-owner/help', 
      icon: HelpIcon
    }
  ]

  const renderIcon = (IconComponent, isActive) => (
    <img 
      src={IconComponent} 
      alt="" 
      className="w-4 h-4 mr-3" 
      style={{ 
        filter: isActive 
          ? 'brightness(0) invert(1)'  // White for active state
          : `brightness(0) saturate(100%) invert(22%) sepia(9%) saturate(1204%) hue-rotate(152deg) brightness(93%) contrast(87%)` // Gray for inactive
      }} 
    />
  )

  return (
    <div className="min-h-screen flex" style={{ fontFamily: FONTS.family.sans }}>
      {/* Sidebar */}
      <div 
        className="h-full w-64 flex flex-col fixed shadow-xl"
        style={{ 
          backgroundColor: 'white', 
          // boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)' 
        }}
      >
        {/* Logo Section */}
        <div 
          className="p-6 mt-2 border-b flex items-center justify-center"
          style={{ borderColor: COLORS.border }}
        >
          <img src={logo} alt="Logo" style={{ height: 28, width: 'auto' }} />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'font-medium' : ''}`
                  }
                  style={({ isActive }) => ({ 
                    backgroundColor: isActive ? COLORS.primary : 'transparent',
                    color: isActive ? COLORS.background : COLORS.mainTextColor,
                    fontSize: FONTS.sizes.sm
                  })}
                >
                  {({ isActive }) => (
                    <>
                      {renderIcon(item.icon, isActive)}
                      {item.name}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 border-t" style={{ borderColor: COLORS.border }}>
          <ul className="space-y-2">
            {bottomNavItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'font-medium' : ''}`
                  }
                  style={({ isActive }) => ({ 
                    backgroundColor: isActive ? COLORS.primary : 'transparent',
                    color: isActive ? COLORS.background : COLORS.mainTextColor,
                    fontSize: FONTS.sizes.sm
                  })}
                >
                  {({ isActive }) => (
                    <>
                      {renderIcon(item.icon, isActive)}
                      {item.name}
                      {item.count > 0 && (
                        <span 
                          className="ml-auto text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                          style={{ backgroundColor: COLORS.danger }}
                        >
                          {item.count}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-0" style={{ backgroundColor: COLORS.background }}>
        <Outlet />
      </div>
    </div>
  )
}
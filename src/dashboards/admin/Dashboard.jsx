import { COLORS, FONTS } from '../../constants'
import { NavLink, Outlet } from 'react-router-dom'
import logo from '../../assets/Logo 2.png'
import DashboardIcon from '../../assets/dashboard_icon.svg'
import StationsIcon from '../../assets/stations_icon.svg'
import BookingsIcon from '../../assets/bookings_icon.svg'
import EarningsIcon from '../../assets/earnings_icon.svg'
import ReportsIcon from '../../assets/reports_icon.svg'
import AlertsIcon from '../../assets/alerts_icon.svg'
import SettingsIcon from '../../assets/settings_icon.svg'
import UserIcon from '../../assets/user_icon.svg'

import HelpIcon from '../../assets/help_icon.svg'

export default function AdminDashboard() {
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: DashboardIcon
    },
    { 
      name: 'Charging Stations', 
      path: '/admin/stations', 
      icon: StationsIcon
    },
    { 
      name: 'Users', 
      path: '/admin/users', 
      icon: UserIcon
    },
    { 
      name: 'Transactions', 
      path: '/admin/transactions', 
      icon: EarningsIcon
    },
    { 
      name: 'Reports', 
      path: '/admin/reports', 
      icon: ReportsIcon
    },
  ]

  const bottomNavItems = [
    
    { 
      name: 'Settings', 
      path: '/station-owner/settings', 
      icon: SettingsIcon
    },
    
  ]

  const renderIcon = (IconComponent, isActive) => (
    <img 
      src={IconComponent} 
      alt="" 
      className="w-4 h-4 mr-3" 
      style={{ 
        filter: isActive 
          ? 'brightness(0) invert(1)'  // White for active state
          : `brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(90%) contrast(90%)` // Gray for inactive
      }} 
    />
  )

  return (
    <div className="min-h-screen flex" style={{ fontFamily: FONTS.family.sans }}>
      {/* Sidebar */}
      <div 
        className="h-full w-64 flex flex-col border-r fixed"
        style={{ backgroundColor: 'white', borderRight: `1px solid ${COLORS.border}` }}
      >
        {/* Logo Section */}
        <div 
          className="p-6 border-b flex items-center justify-center"
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
                    color: isActive ? COLORS.background : COLORS.secondaryText,
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
                    color: isActive ? COLORS.background : COLORS.secondaryText,
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
      <div className="flex-1 ml-64 p-6" style={{ backgroundColor: COLORS.background }}>
        <Outlet />
      </div>
    </div>
  )
}
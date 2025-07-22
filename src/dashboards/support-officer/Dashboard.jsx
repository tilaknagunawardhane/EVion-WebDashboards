import { NavLink, Outlet } from 'react-router-dom'
// import { useAuth } from '../../contexts/AuthContext'
import DashboardIcon from '../../assets/dashboard_black_icon.svg'
import StationIcon from '../../assets/stations.svg'
import AlertIcon from '../../assets/alert_black_icon.svg'
import CommentIcon from '../../assets/comment_icon.svg'
import SettingsIcon from '../../assets/settings_icon.svg'
import logo from '../../assets/Logo 2.svg'
import { COLORS, FONTS } from '../../constants'


export default function SupportOfficerDashboard() {
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/support-officer/dashboard', 
      icon: DashboardIcon
    },
    { 
      name: 'Charging Stations', 
      path: '/support-officer/chargingStations', 
      icon: StationIcon
    },
    { 
      name: 'Fault Reports', 
      path: '/support-officer/faultReports', 
      icon: AlertIcon
    },
    { 
      name: 'Community', 
      path: '/support-officer/community', 
      icon: CommentIcon
    },
  ]

  const bottomNavItems = [
    
    { 
      name: 'Settings', 
      path: '/support-officer/settings', 
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
          : `brightness(0) saturate(100%) invert(22%) sepia(9%) saturate(1204%) hue-rotate(152deg) brightness(93%) contrast(87%)` // Gray for inactive
      }} 
    />
  )

  return (
    <div className="min-h-screen flex" style={{ fontFamily: FONTS.family.sans }}>
      {/* Sidebar */}
      <div 
        className="h-full w-64 flex flex-col fixed shadow-xl"
        style={{ backgroundColor: 'white' }}
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
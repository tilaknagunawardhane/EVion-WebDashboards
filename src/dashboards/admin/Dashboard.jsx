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
import UserIcon from '../../assets/user_icon.svg'
import { useAuth } from '../../contexts/AuthContext'
import HelpIcon from '../../assets/help_icon.svg'
import LogoutIcon from '../../assets/logout_icon.svg' // You'll need to add this icon

export default function AdminDashboard() {
  const { currentUser, logout } = useAuth()
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
      name: 'EV Users', 
      path: '/admin/users', 
      icon: UserIcon
    },
    { 
      name: 'Payments', 
      path: '/admin/payouts', 
      icon: EarningsIcon
    },
  ]

  const bottomNavItems = [
    { 
      name: 'Settings', 
      path: '/station-owner/settings', 
      icon: SettingsIcon
    },
    { 
      name: 'Logout', 
      path: '#', // Use '#' since this is a button, not a navigation link
      icon: LogoutIcon,
      isLogout: true // Flag to identify logout button
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

  const handleLogout = async () => {
    try {
      await logout();
      // Optional: You can add a toast notification here
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: FONTS.family.sans }}>
      {/* Sidebar */}
      <div 
        className="h-full w-64 flex flex-col fixed shadow-xl"
        style={{ 
          backgroundColor: 'white'
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
          {/* User Info (Optional) */}
          {currentUser && (
            <div className="px-4 py-3 mb-4 rounded-lg" style={{ backgroundColor: COLORS.background }}>
              <p className="text-sm font-medium" style={{ color: COLORS.mainTextColor }}>
                {currentUser.name}
              </p>
              <p className="text-xs" style={{ color: COLORS.secondaryText }}>
                {currentUser.email}
              </p>
            </div>
          )}

          <ul className="space-y-2">
            {bottomNavItems.map((item) => (
              <li key={item.name}>
                {item.isLogout ? (
                  // Logout Button
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 rounded-lg transition-colors text-left hover:bg-gray-100"
                    style={{ 
                      color: COLORS.mainTextColor,
                      fontSize: FONTS.sizes.sm
                    }}
                  >
                    {renderIcon(item.icon, false)}
                    {item.name}
                  </button>
                ) : (
                  // Regular Navigation Link
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
                )}
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
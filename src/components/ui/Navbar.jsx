import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { COLORS, FONTS } from '../../constants'
import evionLogo from '../../assets/Logo 2.svg';

export default function Navbar() {
  const { currentUser, logout } = useAuth()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src={evionLogo} 
                  alt="EVION Logo" 
                  className="h-6 w-auto"
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium" style={{ color: COLORS.mainTextColor }}>
                  {currentUser.name}
                </span>
                <button
                  onClick={logout}
                  className="text-sm"
                  style={{ color: COLORS.secondaryText, font : FONTS.weights.normal }}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="text-sm"
                style={{ color: COLORS.mainTextColor, font: FONTS.weights.normal }}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
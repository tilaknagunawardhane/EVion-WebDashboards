import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import evionLogo from '../../assets/Logo 2.svg';
import { COLORS } from '../../constants';

export default function Navbar() {
  const { currentUser, logout } = useAuth()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold">
                <div className="flex">
                  <img 
                    src={evionLogo} 
                    alt="EVion Logo" 
                    className="h-6 w-auto"
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium" style={{ color: '#2d3436' }}>
                  {currentUser.name}
                </span>
                <button
                  onClick={logout}
                  className="text-sm font-medium"
                  style={{ color: COLORS.secondaryText }}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="text-sm font-medium"
                style={{ color: COLORS.secondaryText }}
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
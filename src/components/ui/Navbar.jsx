import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Navbar() {
  const { currentUser, logout } = useAuth()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold" style={{ color: '#00b894' }}>
                EVION
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
                  style={{ color: '#959595' }}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="text-sm font-medium"
                style={{ color: '#959595' }}
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
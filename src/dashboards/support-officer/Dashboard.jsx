import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

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
                  to="/support-officer/tasks"
                  className="block px-4 py-2 rounded-md"
                  style={{ color: '#2d3436' }}
                >
                  Support Tasks
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
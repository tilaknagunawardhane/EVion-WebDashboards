import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function SupportOfficerDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Support Dashboard</h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/support-officer/tasks"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
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
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
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
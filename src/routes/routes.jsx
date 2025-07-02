import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import LandingPage from '../pages/LandingPage/LandingPage'
import AuthPage from '../pages/AuthPage/AuthPage'
import AdminDashboard from '../dashboards/admin/Dashboard'
import UsersPage from '../dashboards/admin/pages/Users'
import StationOwnerDashboard from '../dashboards/station-owner/Dashboard'
import StationsPage from '../dashboards/station-owner/pages/Stations'
import DashboardPage from '../dashboards/station-owner/pages/Dash'
import SettingsPage from '../dashboards/station-owner/pages/Settings'
import SupportOfficerDashboard from '../dashboards/support-officer/Dashboard'
import TasksPage from '../dashboards/support-officer/pages/Tasks'
import AdminRoute from './AdminRoute'
import PrivateRoute from './PrivateRoute'
import { AuthProvider } from '../contexts/AuthContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'auth', element: <AuthPage /> },
      {
        path: 'admin',
        element: <PrivateRoute><AdminRoute><AdminDashboard /></AdminRoute></PrivateRoute>,
        children: [
          { path: 'users', element: <UsersPage /> }
        ]
      },
      {
        path: 'station-owner',
        element: <PrivateRoute><StationOwnerDashboard /></PrivateRoute>,
        children: [
          { path: 'dashboards', element: <DashboardPage /> },
          { path: 'stations', element: <StationsPage /> },
          { path: 'settings', element: <SettingsPage /> }
        ]
      },
      {
        path: 'support-officer',
        element: <PrivateRoute><SupportOfficerDashboard /></PrivateRoute>,
        children: [
          { path: 'tasks', element: <TasksPage /> }
        ]
      }
    ]
  }
])

export default router
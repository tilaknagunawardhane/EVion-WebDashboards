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
import ProfileSetup from '../components/auth/ProfileSetup'
import InitAddStation from '../components/auth/InitAddStation'
import InitStation from '../components/auth/InitStation'
import { AuthProvider } from '../contexts/AuthContext'

import AdminDash from '../dashboards/admin/pages/Dash'
import AdminStaionsPage from '../dashboards/admin/pages/ChargingStations'
import UserAccountPage from '../dashboards/admin/pages/userPages/userAccount'
import RequestsPage from '../dashboards/admin/pages/stationPages/Requests'
import ViewRequest from '../dashboards/admin/pages/stationPages/ViewRequest'
import ViewStation from '../dashboards/admin/pages/stationPages/ViewStation'

import OwnerViewStation from '../dashboards/station-owner/pages/stationPages/StationProfile'
import OwnerViewCharger from '../dashboards/station-owner/pages/chargerPages/ChargerProfile'
import FaultAlerts from '../dashboards/station-owner/pages/faultsPages/FaultReports'

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
      { path: 'profilesetup', element: <ProfileSetup />},
      { path: 'initaddstation', element: <InitAddStation />},
      { path: 'initstation', element: <InitStation /> },
      {
        path: 'admin',
        element: <PrivateRoute><AdminRoute><AdminDashboard /></AdminRoute></PrivateRoute>,
        children: [
          { path: 'users', element: <UsersPage /> },
          { path: 'dashboard', element: <AdminDash /> },
          { path: 'stations', element: <AdminStaionsPage/>},
          { path: 'users/:id', element: <UserAccountPage/>},
          { path: 'stations/requests', element: <RequestsPage/>},
          { path: 'stations/requests/:type/:id', element: <ViewRequest/>},
          { path: 'stations/:id', element: <ViewStation/>},

        ]
      },
      {
        path: 'station-owner',
        element: <PrivateRoute><StationOwnerDashboard /></PrivateRoute>,
        children: [
          { path: 'dashboards', element: <DashboardPage /> },
          { path: 'stations', element: <StationsPage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: 'stations/stationprofile/:id', element: <OwnerViewStation />},
          { path: 'stations/chargerprofile/:id', element: <OwnerViewCharger />},
          { path: 'alerts', element: <FaultAlerts /> },

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
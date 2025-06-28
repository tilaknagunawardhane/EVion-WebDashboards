import { Outlet } from 'react-router-dom'
// import { AuthProvider } from './contexts/AuthContext'

export default function App() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
    // <AuthProvider>
  )
}
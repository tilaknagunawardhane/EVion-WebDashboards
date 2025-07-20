import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function AdminRoute({ children }) {
  const { currentUser } = useAuth()

  console.log("Admin user:", currentUser);
  if (!currentUser) {
    return <Navigate to="/auth?mode=adminlogin" replace />
  }

  if (currentUser !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}
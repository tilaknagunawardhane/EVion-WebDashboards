import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function SupportOfficerRoute({ children }) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/auth?mode=supportofficerlogin" replace />
  }

  if (currentUser.role !== 'support-officer') {
    return <Navigate to="/" replace />
  }

  return children
}
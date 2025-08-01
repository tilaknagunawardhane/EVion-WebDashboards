import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();
  // console.log("user2:", currentUser);

  if (loading) {
    // You can show a spinner or nothing
    return null;
  }

  if (!currentUser) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  return children;
}
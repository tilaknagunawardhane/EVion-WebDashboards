import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  const login = (userData) => {
    setCurrentUser(userData)
    if (userData.role === 'admin') navigate('/admin/dashboard')
    else if (userData.role === 'station-owner') navigate('/station-owner')
    else if (userData.role === 'support-officer') navigate('/support-officer/dashboard')
  }

  const logout = () => {
    setCurrentUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
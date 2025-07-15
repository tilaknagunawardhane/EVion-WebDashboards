import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const login = (userData) => {
    setCurrentUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    
    // Navigation logic moved to components that use login
    // if (userData.role === 'admin') navigate('/admin/dashboard')
    // else if (userData.role === 'station-owner') navigate('/station-owner')
    // else if (userData.role === 'support-officer') navigate('/support-officer')
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('user')
  }

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const value = {
    currentUser,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
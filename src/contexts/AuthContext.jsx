import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken')
      if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
      return config
    })

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest?._retry) {
          originalRequest._retry = true
          try {
            const refreshToken = localStorage.getItem('refreshToken')
            const res = await axios.post(`${API_BASE_URL}/api/auth/refresh-token`, { refreshToken })
            localStorage.setItem('accessToken', res.data.accessToken)
            if (res.data.refreshToken) localStorage.setItem('refreshToken', res.data.refreshToken)
            originalRequest.headers = { ...originalRequest.headers, Authorization: `Bearer ${res.data.accessToken}` }
            return axios(originalRequest)
          } catch (err) {
            // If refresh failed, perform logout flow
            await doLogoutLocal()
            return Promise.reject(err)
          }
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axios.interceptors.request.eject(requestInterceptor)
      axios.interceptors.response.eject(responseInterceptor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (token) {
        const res = await axios.get(`${API_BASE_URL}/api/auth/me`)
        // Expecting response shape: { data: { user: {...}, roles: 'roleString' } } or similar
        if (!res.data?.data?.user) throw new Error('Invalid user data in response')
        const userRole = res.data.data.roles ?? res.data.data.user?.userType ?? res.data.data.user?.role
        setCurrentUser(userRole)
      }
    } catch (err) {
      console.log('verify token error: ', err)
      await doLogoutLocal()
    } finally {
      setLoading(false)
    }
  }

  const loginA = async (email, password, userType) => {
    try {
      let endpoint
      switch (userType) {
        case 'admin':
          endpoint = '/api/auth/admin/login'
          break
        case 'supportofficer':
          endpoint = '/api/auth/support-officer/login'
          break
        case 'stationowner':
          endpoint = '/api/auth/station-owner/login'
          break
        case 'ev-owner':
          endpoint = '/api/auth/evOwner/login'
          break
        default:
          throw new Error('Invalid user type')
      }

      const res = await axios.post(`${API_BASE_URL}${endpoint}`, { email, password })

      localStorage.setItem('accessToken', res.data.accessToken)
      localStorage.setItem('refreshToken', res.data.refreshToken)
      if (res.data.user?._id) localStorage.setItem('userID', res.data.user._id)

      // Determine role reliably
      const roleFromResponse = res.data.userType ?? res.data.user?.userType ?? userType
      setCurrentUser(roleFromResponse)

      toast.success(`Welcome back, ${res.data.user?.name || res.data.user?.email || 'User'}!`, { position: 'top-right', autoClose: 3000 })

      // Redirects based on role (use roleFromResponse)
      if (roleFromResponse === 'admin') navigate('/admin/dashboard')
      else if (roleFromResponse === 'supportofficer') navigate('/support-officer/dashboard')
      else if (roleFromResponse === 'stationowner') {
        try {
          const stationCheck = await axios.post(
            `${API_BASE_URL}/api/stations/check-stations`,
            { userId: res.data.user?._id },
            { headers: { Authorization: `Bearer ${res.data.accessToken}`, 'Content-Type': 'application/json' } }
          )

          if (!stationCheck.data.hasStations) {
            navigate('/initaddstation')
            toast.info('Please add your first charging station', { position: 'top-right', autoClose: 3000 })
          } else if (stationCheck.data.hasApprovedStation) {
            navigate('/station-owner/dashboards')
            toast.success('Accessing your station dashboard', { position: 'top-right', autoClose: 3000 })
          } else {
            navigate('/initstation')
            toast.warning('Your stations are pending approval', { position: 'top-right', autoClose: 4000 })
          }
        } catch (error) {
          console.error('Station check failed:', error)
          if (!error?.config?._retry) toast.error(error.response?.data?.message || 'Failed to verify station status', { position: 'top-right', autoClose: 5000 })
          navigate('/initaddstation')
        }
      }

      return res.data.user
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      toast.error(errorMessage, { position: 'top-right', autoClose: 5000 })
      throw new Error(errorMessage)
    }
  }

  const login = (userData) => {
    setCurrentUser(userData)
    if (userData.role === 'admin') navigate('/admin/dashboard')
    else if (userData.role === 'station-owner') navigate('/station-owner')
    else if (userData.role === 'support-officer') navigate('/support-officer/dashboard')
  }

  const doLogoutLocal = async () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userID')
    setCurrentUser(null)
    navigate('/auth?mode=login')
  }

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`)
      toast.info('You have been logged out', { position: 'top-right', autoClose: 3000 })
    } catch (error) {
      // still clear local session even if server logout failed
      toast.error('Failed to logout properly', { position: 'top-right', autoClose: 5000 })
    } finally {
      await doLogoutLocal()
    }
  }

  useEffect(() => {
    verifyToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log('Current user updated:', currentUser)
  }, [currentUser])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        loading,
        loginA,
        isAdmin: currentUser === 'admin',
        isSupportOfficer: currentUser === 'supportofficer',
        isStationOwner: currentUser === 'stationowner',
      }}
    >
      {children}
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
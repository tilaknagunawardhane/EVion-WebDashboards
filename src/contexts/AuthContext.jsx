import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { configs } from '@eslint/js';
import { toast } from 'react-toastify';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(config => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refreshToken');
            const res = await axios.post(`${API_BASE_URL}/api/auth/refresh-token`, { refreshToken });

            localStorage.setItem('accessToken', res.data.accessToken);
            if (res.data.refreshToken) {
              localStorage.setItem('refreshToken', res.data.refreshToken);
            }

            originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
            return axios(originalRequest);

          } catch (err) {
            logout();
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const res = await axios.get(`${API_BASE_URL}/api/auth/me`);
        // setCurrentUser(res.data.user.userType);
        console.log('Current user is ', res.data.user.userType);

      }
    } catch (err) {
      console.log('verify token error: ', err);
      logout();
    } finally {
      setLoading(false);
    }
  }

  const loginA = async (email, password, userType) => {
    try {
      let endpoint;
      switch (userType) {
        case 'admin':
        case 'support-officer':
          endpoint = '/api/auth/admin/login';
          break;
        case 'station-owner':
          endpoint = '/api/auth/station-owner/login';
          break;
        case 'ev-owner':
          endpoint = '/api/auth/evOwner/login';
          break;
        default:
          throw new Error('Invalid user type');
      }

      const res = await axios.post(`${API_BASE_URL}${endpoint}`, { email, password });

      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      localStorage.setItem('userID', res.data.user._id);
      setCurrentUser(userType);
      console.log('res: ', res);
      console.log('current user:', userType);

      // Show success toast
      toast.success(`Welcome back, ${res.data.user.name || res.data.user.email}!`, {
        position: "top-right",
        autoClose: 3000,
      });

      // Redirect based on role
      if (userType === 'admin') {
        // console.log('.... Is it here??', currentUser);
        // const currentUser = 'admin'

        navigate('/admin/dashboard');
      } else if (res.data.userType === 'support-officer') {
        navigate('/support-officer/dashboard');
      } else if (userType === 'station-owner') {
        try {
          const stationCheck = await axios.post(
            `${API_BASE_URL}/api/stations/check-stations`,
            { userId: res.data.user._id },
            {
              headers: {
                'Authorization': `Bearer ${res.data.accessToken}`,
                'Content-Type': 'application/json'
              }
            }
          );

          console.log('Station check response:', stationCheck.data);

          if (!stationCheck.data.hasStations) {
            // Case 1: No stations at all
            navigate('/initaddstation');
            toast.info('Please add your first charging station', {
              position: "top-right",
              autoClose: 3000
            });
          } else if (stationCheck.data.hasApprovedStation) {
            // Case 2: Has at least one approved station
            navigate('/station-owner/dashboards');
            toast.success('Accessing your station dashboard', {
              position: "top-right",
              autoClose: 3000
            });
          } else {
            // Case 3: Has stations but none approved
            navigate('/initstation');
            toast.warning('Your stations are pending approval', {
              position: "top-right",
              autoClose: 4000
            });
          }

        } catch (error) {
          console.error('Station check failed:', error);

          if (!error.config._retry) {
            toast.error(
              error.response?.data?.message || 'Failed to verify station status',
              { position: "top-right", autoClose: 5000 }
            );
          }

          // Default navigation when check fails
          navigate('/initaddstation');
          throw error;
        }
      } else {
        // console.log('.... Came here');
        // navigate('/');
      }

      return res.data.user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      toast.error(
        error.response?.data?.message || 'Failed to check station status',
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
      throw errorMessage;
    }
  };

  const login = (userData) => {
    setCurrentUser(userData)
    if (userData.role === 'admin') navigate('/admin/dashboard')
    else if (userData.role === 'station-owner') navigate('/station-owner')
    else if (userData.role === 'support-officer') navigate('/support-officer/dashboard')
  }

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`);
      toast.info('You have been logged out', {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Failed to logout properly', {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userID');
      setCurrentUser(null);
      navigate('/auth?mode=login');
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{
      currentUser, login, logout, loading, loginA,
      isAdmin: currentUser?.userType === 'admin',
      isSupportOfficer: currentUser?.role === 'support-officer',
      isStationOwner: currentUser?.userType === 'stationowner'
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
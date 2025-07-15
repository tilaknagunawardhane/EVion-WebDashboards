import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';
import logo4 from '../../assets/Logo4.png';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Mock login - replace with actual authentication
      const mockUser = {
        id: 1,
        name: formData.email.split('@')[0],
        email: formData.email,
        role: 'user' // Add role if needed
      };
      login(mockUser);
      navigate('/'); // Navigate after login
    } else {
      // Mock registration - replace with actual registration
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      const mockUser = {
        id: 1,
        name: formData.name,
        email: formData.email,
        role: 'user'
      };
      login(mockUser);
      navigate('/');
    }
  };

  // ... rest of your AuthPage component remains the same
  return (
    <div className="min-h-screen flex">
      {/* Your existing AuthPage content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6">
            {isLogin ? 'Login' : 'Sign Up'}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-4 text-blue-600 hover:underline"
          >
            {isLogin ? 'Need an account? Sign up' : 'Have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
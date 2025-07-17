import React, { useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import { COLORS, FONTS } from '../../constants'
import stationImage from '../../assets/electric-car.svg';
import evionLogo from '../../assets/Logo 2.svg';
import Google from '../../assets/Google.svg';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });


  const handleSignin = (e) => {
    e.preventDefault();
    
    // const newErrors = { email: '', password: '' };

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    let valid = true;
    
    // if (!email.trim()) {
    //   newErrors.email = 'Please enter your email';
    //   valid = false;
    // } else if (!emailRegex.test(email)) {
    //   newErrors.email = 'Please enter a valid email address';
    //   valid = false;
    // }

    // if (!password) {
    //   newErrors.password = 'Please enter your password';
    //   valid = false;
    // } else if (!passwordRegex.test(password)) {
    //   newErrors.password = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
    //   valid = false;
    // }

    // setErrors(newErrors);

    if (!valid) return;

    const userData = { email, role: 'admin' }; // Adjust role based on your logic
    login(userData);
  };

//   const handleForgotPassword = () => {
//     navigate('/forgot-password');
//   };

//   const handleSignUp = () => {
//     navigate('/auth?mode=signup');
//   };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-6xl p-6 md:p-8 gap-8">

        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center items-start text-left">
          <div className="flex mb-4">
                <img 
                  src={evionLogo} 
                  alt="EVion Logo" 
                  className="h-10 w-auto"
                />
              </div>
          <h1 style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes['3xl'], fontFamily: FONTS.family.sans, fontWeight: FONTS.weights['500'] }}>
            Power Your Station, Smarter
          </h1>
          <p style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes['base'], fontFamily: FONTS.family.sans, fontWeight: FONTS.weights['500'], marginTop: '1rem' }}>
            Access your dashboard to manage chargers & grow your EV business.
          </p>
          <img src={stationImage} alt="Dashboard" className="mt-6 w-full h-auto object-cover rounded-lg" />
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md p-12 bg-white rounded-lg shadow-md h-[600px] overflow-hidden">
            <div className="h-full overflow-y-auto">
            <div className="mb-6">
              <h2 style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes['2xl'], fontFamily: FONTS.family.sans, fontWeight: FONTS.weights['500'] }}>
                Admin Login
              </h2>
            </div>
            <form onSubmit={handleSignin} className="space-y-4">
              <InputField
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // required
                error={!!errors.email}
                errorMessage={errors.email}
              />
              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
                error={!!errors.password}
                errorMessage={errors.password}
              />
              {/* <div className="text-right">
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  style={{ color: COLORS.primary, fontSize: FONTS.sizes.xs, fontFamily: FONTS.family.sans, fontWeight: FONTS.weights.normal, textDecoration: 'underline' }}
                  className="hover:text-opacity-80"
                >
                  Forgot Password?
                </a>
              </div> */}
              <Button variant="primary" type="submit" className="w-full">
                Sign In
              </Button>
              {/* <div className="text-center mt-0 mb-2" style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.xs, fontFamily: FONTS.family.sans, fontWeight: FONTS.weights.normal }}>
                or
              </div>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <img src={Google} alt="Google" className="w-6 h-auto object-cover rounded-lg" />
                Sign in with Google
              </Button> */}
              {/* <div className="text-center mt-4">
                <span style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.xs, fontFamily: FONTS.family.sans, fontWeight: FONTS.weights.normal }}>
                  Don’t have an account?
                </span>{' '}
                <a
                  href="#"
                  onClick={handleSignUp}
                  style={{ color: COLORS.primary, fontSize: FONTS.sizes.xs, fontFamily: FONTS.family.sans, fontWeight: FONTS.weights.medium }}
                  className="hover:text-opacity-80"
                >
                  Sign Up
                </a>
              </div> */}
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


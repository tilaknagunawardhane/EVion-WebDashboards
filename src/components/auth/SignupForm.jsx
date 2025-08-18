import React, { useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import { COLORS, FONTS } from '../../constants'
import evStationImage from '../../assets/station2.svg';
import evionLogo from '../../assets/Logo 2.svg';
import Google from '../../assets/Google.svg';
import { useAuth } from '../../contexts/AuthContext';

export default function SignupForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });


  const handleSignup = (e) => {
    e.preventDefault();

    const newErrors = { name: '', email: '', phone: '', password: '', confirmPassword: '' };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    let valid = true;

    if (!name.trim()) {
      newErrors.name = 'Please enter your name';
      valid = false;
    }
    if (!email.trim()) {
      newErrors.email = 'Please enter your email';
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }
    if (!phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
      valid = false;
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Phone number must be 10-15 digits';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Please enter your password';
      valid = false;
    } else if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
      valid = false;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please enter your confirm password';
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    navigate('/profilesetup', {
    state: {
      userData: {
        name,
        email,
        phone,
        password
      }
    }
  });
  };

  const handleSignin = () => {
    navigate('/auth?mode=login');
  };

  const handlePrivacyPolicy = () => {
    navigate('/privacypolicy');
  };

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
            Join the Evion Network
          </h1>
          <p style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes['base'], fontFamily: FONTS.family.sans, fontWeight: FONTS.weights['500'], marginTop: '1rem' }}>
            Register now and connect with thousands of EV users.
          </p>
          <img src={evStationImage} alt="EV Station" className="mt-6 w-full h-auto object-cover rounded-lg" />
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md p-12 bg-white rounded-lg shadow-md h-[600px] overflow-hidden">
            <div className="h-full overflow-y-auto">
              <div className="mb-6">
                <h2 style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes['2xl'], fontFamily: FONTS.family.sans, fontWeight: FONTS.weights['500'] }}>
                  Sign Up
                </h2>
              </div>
              <form onSubmit={handleSignup} className="space-y-4">
                <InputField
                  label="Name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  error={!!errors.name}
                  errorMessage={errors.name}
                />
                <InputField
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  error={!!errors.email}
                  errorMessage={errors.email}
                />
                <InputField
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  error={!!errors.phone}
                  errorMessage={errors.phone}
                />
                <InputField
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  error={!!errors.password}
                  errorMessage={errors.password}
                />
                <InputField
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  error={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword}
                />

                <Button variant="primary" type="submit" className="w-full">
                  Sign Up
                </Button>

                <div className="text-center mt-4">
                  <span style={{ color: COLORS.secondaryText, fontSize: FONTS.sizes.xs, fontFamily: FONTS.family.sans, fontWeight: FONTS.weights.normal }}>
                    By signing up, you agree to our
                  </span>{' '}
                  <a
                    href="#"
                    onClick={handlePrivacyPolicy}
                    style={{
                      color: COLORS.secondaryText,
                      fontSize: FONTS.sizes.xs,
                      fontFamily: FONTS.family.sans,
                      fontWeight: FONTS.weights.medium,
                      textDecoration: 'underline'
                    }}
                    className="hover:text-opacity-80"
                  >
                    Terms & Privacy Policy
                  </a>
                </div>

                <div className="text-center mt-4">
                  <span style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.xs, fontFamily: FONTS.family.sans, fontWeight: FONTS.weights.normal }}>
                    Already have an account?
                  </span>{' '}
                  <a
                    href="#"
                    onClick={handleSignin}
                    style={{ color: COLORS.primary, fontSize: FONTS.sizes.xs, fontFamily: FONTS.family.sans, fontWeight: FONTS.weights.medium }}
                    className="hover:text-opacity-80"
                  >
                    Sign In
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
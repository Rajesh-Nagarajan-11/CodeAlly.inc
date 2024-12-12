import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import axios from 'axios'; // Using axios for API calls
import CopyrightFooter from '../components/CopyrightFooter';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'email' | 'otp' | 'password'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [newPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
  
    try {
      // First, check if the email exists in the database
      const emailCheckResponse = await axios.post('http://localhost:3000/api/user/check-email', { email });
  
      if (emailCheckResponse.status === 200 && emailCheckResponse.data.exists) {
        // If the email exists, send OTP to the email
        const response = await axios.post('http://localhost:3000/resetpassword/send-otp', { email });
  
        if (response.status === 200) {
          setSuccessMessage('OTP has been sent to your email.');
          setStep('otp');
        } else {
          setError('Failed to send OTP. Please try again.');
        }
      } else {
        setError('No user found with this email.');
      }
    } catch (err) {
      setError('No user found with this email.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Send OTP to verify it
      const response = await axios.post('http://localhost:3000/resetpassword/verify-otp', { email, otp: otp.join('') });

      if (response.status === 200) {
        setSuccessMessage('OTP verified successfully!');
        setStep('password');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Invalid OTP. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
  
    setLoading(true);
    setError('');
    setSuccessMessage('');
  
    try {
      // Send the POST request to update the password
      const response = await axios.put(
        'http://localhost:3000/api/auth/updatepassword',
        {
          email,
          newPassword
        },
        {
          headers: {
            'Content-Type': 'application/json' // Ensure the content type is set to JSON
          }
        }
      );
  
      if (response.status === 200) {
        setSuccessMessage('Password reset successfully!');
        // Show success message for 2000ms before navigating
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/login'); // Navigate to login page after success
        }, 2000);
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (err) {
      setError('Failed to reset password. Please try again. ' + err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1516116216624-53e697fedbea"
          alt="Background"
          className="w-full h-full object-cover opacity-5"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        <div>
          <div className="flex justify-center">
            <Trophy className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Remember your password?{' '}
            <Link to="/login" className="font-medium text-red-500 hover:text-red-400">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 bg-white/10 backdrop-blur-lg p-8 rounded-xl">
          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
              {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Code'}
              </button>
            </form>
          ) : step === 'otp' ? (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to email
                </button>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Enter the 6-digit code sent to {email}
                </label>
                <div className="flex gap-2 justify-between">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-white bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ))}
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
              {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                disabled={loading || otp.some(digit => !digit)}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          ) : step === 'password' ? (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-300">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
              {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                disabled={loading || newPassword !== confirmPassword}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          ) : null}
           <CopyrightFooter />
        </div>
      </motion.div>
    </div>
  );
}

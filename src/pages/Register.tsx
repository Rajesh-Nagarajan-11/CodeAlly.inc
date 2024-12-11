import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/Navbar';

interface FormData {
  fullName: string;
  email: string;
  leetcodeUsername: string;
  gfgUsername: string;
  codeforceUsername: string;
  password: string;
  confirmPassword: string; // Added confirmPassword
}

interface LeetcodeUserInfo {
  gitHub: string;
  linkedIN: string;
  country: string;
  school: string;
  about: string;
}

const API_BASE_URL = 'http://localhost:3000';

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    leetcodeUsername: '',
    gfgUsername: '',
    codeforceUsername: '',
    password: '',
    confirmPassword: '', // Initialize confirmPassword state
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const navigate = useNavigate();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  const createUserProfile = useCallback(async (leetcodeData: LeetcodeUserInfo) => {
    const profileData = {
      username: formData.fullName,
      email: formData.email,
      country: leetcodeData.country || '',
      college: leetcodeData.school || '',
      githubUrl: leetcodeData.gitHub || '',
      linkedinUrl: leetcodeData.linkedIN || '',
      aboutUs: leetcodeData.about || '',
    };

    const response = await fetch(`${API_BASE_URL}/userprofile/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error('Failed to create user profile');
    }

    return response.json();
  }, [formData.fullName, formData.email]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Step 1: Register user
      const registerResponse = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!registerResponse.ok) {
        throw new Error('Registration failed');
      }

      const registerData = await registerResponse.json();
      setSuccessMessage(registerData.message);

      // Step 2: Fetch LeetCode info
      const leetcodeResponse = await fetch(`${API_BASE_URL}/leetcode/${formData.leetcodeUsername}`);
      if (!leetcodeResponse.ok) {
        throw new Error('Failed to fetch LeetCode information');
      }

      const leetcodeData = await leetcodeResponse.json();
      
      // Step 3: Create user profile
      await createUserProfile(leetcodeData);
      
      // Step 4: Navigate to login page on success
      navigate('/login');
    } catch (err) {
      console.error('Error during registration:', err);
      setError(err instanceof Error ? err.message : 'Failed to register. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [formData, createUserProfile, navigate]);

  return (
    <>
      <Navbar />
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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create your account</h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-red-500 hover:text-red-400">
                Sign in
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6 bg-white/10 backdrop-blur-lg p-8 rounded-xl" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="leetcodeUsername" className="block text-sm font-medium text-gray-300">
                  LeetCode Username
                </label>
                <input
                  id="leetcodeUsername"
                  type="text"
                  required
                  value={formData.leetcodeUsername}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your LeetCode username"
                />
              </div>

              <div>
                <label htmlFor="gfgUsername" className="block text-sm font-medium text-gray-300">
                  GFG Username
                </label>
                <input
                  id="gfgUsername"
                  type="text"
                  required
                  value={formData.gfgUsername}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your GFG username"
                />
              </div>

              <div>
                <label htmlFor="codeforceUsername" className="block text-sm font-medium text-gray-300">
                  Codeforces Username
                </label>
                <input
                  id="codeforceUsername"
                  type="text"
                  required
                  value={formData.codeforceUsername}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your Codeforces username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-red-600 text-white rounded-md py-2 px-4 text-lg font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}

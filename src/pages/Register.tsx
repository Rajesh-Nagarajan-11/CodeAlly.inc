import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, Github, Eye, EyeOff } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  leetcodeUsername: string;
  gfgUsername: string;
  password: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    leetcodeUsername: '',
    gfgUsername: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const navigate = useNavigate(); // For navigation

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Make a POST request using fetch API
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      if (data.message === 'User registered successfully') {
        setSuccessMessage('Registration successful! You can now log in.');
        setLoading(false);
        setFormData({
          fullName: '',
          email: '',
          leetcodeUsername: '',
          gfgUsername: '',
          password: '',
        }); // Reset the form after successful registration
        
        // Navigate to login page
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Delay navigation to allow success message display
      } else {
        setError('Failed to register. Please try again later.');
      }
    } catch (err) {
      console.error('Error registering user:', err);
      setError('Failed to register. Please try again later.');
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-red-500 hover:text-red-400">
              Sign in
            </Link>
          </p>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors">
          <Github className="h-5 w-5" />
          Continue with GitHub
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
          </div>
        </div>

        <form
          className="mt-8 space-y-6 bg-white/10 backdrop-blur-lg p-8 rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            {/* Form Fields */}
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
                  placeholder="Create a password"
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
                </div>
              </div>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic placeholder logic - no backend
    if (!formData.email || !formData.password) {
      setLoginError('Please enter email and password.');
      return;
    }

    setLoginError('');
    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12" style={{ backgroundColor: '#F8EEDF' }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-8 text-center" style={{ backgroundColor: '#585454' }}>
            <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
            <p className="mt-2 text-sm text-white">Please sign in to your account</p>
          </div>

          <div className="p-6">
            {loginError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {loginError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Enter your email"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Enter your password"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ backgroundColor: '#8B5C5C' }}
              >
                Sign in
              </button>
            </form>
          </div>

          {/* Register Option */}
          <div className="px-6 py-4 text-center" style={{ backgroundColor: '#585454' }}>
            <p className="text-sm text-white">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-[#B95A5A] hover:text-[#9b4040] transition-colors duration-200">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

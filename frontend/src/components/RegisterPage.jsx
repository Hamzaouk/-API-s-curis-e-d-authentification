import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    terms: false
  });
  const [registerError, setRegisterError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setRegisterError('Please fill in all required fields.');
      return;
    }
    
    if (!formData.terms) {
      setRegisterError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setRegisterError('');
    // In a real app, you would register the user here
    // Redirect to login page after successful registration
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12" style={{ backgroundColor: '#F8EEDF' }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 text-center" style={{ backgroundColor: '#585454' }}>
            <h1 className="text-2xl font-semibold text-white">Create an account</h1>
            <p className="mt-2 text-sm text-white">Join us today and get started</p>
          </div>

          {/* Form */}
          <div className="p-6">
            {registerError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {registerError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Choose a username"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Create a password"
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ backgroundColor: '#8B5C5C' }}
              >
                Create account
              </button>
            </form>
          </div>

          {/* Bottom */}
          <div className="px-6 py-4 text-center" style={{ backgroundColor: '#585454' }}>
            <p className="text-sm text-white">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-[#B95A5A] hover:text-[#9b4040] transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
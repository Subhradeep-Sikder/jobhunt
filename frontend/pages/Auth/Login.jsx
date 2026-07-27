import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import API from '../../src/services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [formState, setFormState] = useState({
    loading: false,
    error: {},
    showPassword: false,
    success: false,
  });

  // Validators
  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  // Handle input change (handles text inputs and checkboxes)
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: val,
    }));

    // Clear validation error dynamically as the user types
    if (formState.error[name]) {
      setFormState((prev) => ({
        ...prev,
        error: { ...prev.error, [name]: '' },
      }));
    }
  };

  // Run all form validations
  const validateForm = () => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    const errors = {};
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    setFormState((prev) => ({ ...prev, error: errors }));
    return Object.keys(errors).length === 0;
  };

  // Handle form submission with backend API integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState((prev) => ({ ...prev, loading: true, error: {} }));

    try {
      const response = await API.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const { token, role, fullName, user } = response.data;

      // Save session credentials
      localStorage.setItem('token', token);
      localStorage.setItem('role', role || user?.role);
      localStorage.setItem('fullName', fullName || user?.fullName || 'User');

      setFormState((prev) => ({ ...prev, loading: false, success: true }));

      // Redirect user based on role after short delay
      setTimeout(() => {
        const userRole = role || user?.role;
        window.location.href = userRole === 'employer' ? '/employer-dashboard' : '/find-jobs';
      }, 1200);
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        error: {
          general:
            error.response?.data?.error ||
            error.response?.data?.message ||
            'Invalid email or password. Please try again.',
        },
      }));
    }
  };

  // 1. Success State View
  if (formState.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center border border-gray-100"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
          <p className="text-gray-600 mb-4">
            You have been successfully logged in.
          </p>
          <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-gray-500 mt-2">Redirecting to your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  // 2. Default Login Form View
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-lg max-w-md w-full space-y-8"
      >
        {/* Header Section */}
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-slate-500 text-sm">Sign in to your JobHunt account</p>
        </div>

        {/* Global Error Banner */}
        {formState.error.general && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm font-medium">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{formState.error.general}</span>
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={`w-full pl-12 pr-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all shadow-sm ${
                  formState.error.email
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-slate-200 focus:border-blue-600'
                }`}
              />
            </div>
            {formState.error.email && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {formState.error.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type={formState.showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={`w-full pl-12 pr-12 py-3 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all shadow-sm ${
                  formState.error.password
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-slate-200 focus:border-blue-600'
                }`}
              />
              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors p-1"
              >
                {formState.showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {formState.error.password && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {formState.error.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formState.loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed mt-2"
          >
            {formState.loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-center pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Don't have an account?{' '}
              <a
                href="/signup"
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Create one here
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
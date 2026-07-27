import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader,
  AlertCircle,
  CheckCircle,
  UserCheck,
  Building2,
} from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'job_seeker', // Default selected role
  });

  const [formState, setFormState] = useState({
    loading: false,
    error: {},
    showPassword: false,
    success: false,
  });

  // Validators
  const validateFullName = (name) => {
    if (!name.trim()) return 'Full name is required';
    return '';
  };

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

  // Handle standard input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear validation error dynamically as the user types
    if (formState.error[name]) {
      setFormState((prev) => ({
        ...prev,
        error: { ...prev.error, [name]: '' },
      }));
    }
  };

  // Handle role selection card click
  const handleRoleSelect = (selectedRole) => {
    setFormData((prevData) => ({
      ...prevData,
      role: selectedRole,
    }));
  };

  // Run all form validations
  const validateForm = () => {
    const nameError = validateFullName(formData.fullName);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    const errors = {};
    if (nameError) errors.fullName = nameError;
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    setFormState((prev) => ({ ...prev, error: errors }));
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState((prev) => ({ ...prev, loading: true, error: {} }));

    try {
      // Simulate an asynchronous API signup call
    





      
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        error: { general: 'Something went wrong. Please try again.' },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h2>
          <p className="text-gray-600 mb-4">
            Welcome aboard, {formData.fullName}.
          </p>
          <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-gray-500 mt-2">Setting up your workspace...</p>
        </motion.div>
      </div>
    );
  }

  // 2. Signup Form View
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
            Create Account
          </h2>
          <p className="text-slate-500 text-sm">
            Join thousands of professionals finding their dream jobs
          </p>
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
          {/* Full Name Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Full Name *
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={`w-full pl-12 pr-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all shadow-sm ${
                  formState.error.fullName
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-slate-200 focus:border-blue-600'
                }`}
              />
            </div>
            {formState.error.fullName && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {formState.error.fullName}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Email Address *
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
              Password *
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type={formState.showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a strong password"
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

          {/* Role Selection ("I am a *") */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              I am a *
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* Job Seeker Card */}
              <button
                type="button"
                onClick={() => handleRoleSelect('job_seeker')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all cursor-pointer text-center ${
                  formData.role === 'job_seeker'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-600 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <UserCheck className={`w-7 h-7 mb-2 ${formData.role === 'job_seeker' ? 'text-blue-600' : 'text-slate-800'}`} />
                <span className={`text-sm font-bold ${formData.role === 'job_seeker' ? 'text-blue-900' : 'text-slate-900'}`}>
                  Job Seeker
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  Looking for opportunities
                </span>
              </button>

              {/* Employer Card */}
              <button
                type="button"
                onClick={() => handleRoleSelect('employer')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all cursor-pointer text-center ${
                  formData.role === 'employer'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-600 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <Building2 className={`w-7 h-7 mb-2 ${formData.role === 'employer' ? 'text-blue-600' : 'text-slate-800'}`} />
                <span className={`text-sm font-bold ${formData.role === 'employer' ? 'text-blue-900' : 'text-slate-900'}`}>
                  Employer
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  Hiring talent
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formState.loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed mt-4"
          >
            {formState.loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>

          {/* Sign In Link */}
          <div className="text-center pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <a
                href="/login"
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign in here
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
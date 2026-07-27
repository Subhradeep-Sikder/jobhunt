import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiredRole, allowedRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const targetRole = requiredRole || allowedRole;

  // 1. Check if the user is authenticated (has a token)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if a specific role is required and if the user matches it
  if (targetRole && userRole !== targetRole) {
    // Redirect unauthorized users to their respective default dashboard
    const fallbackPath = userRole === 'employer' ? '/employer-dashboard' : '/find-jobs';
    return <Navigate to={fallbackPath} replace />;
  }

  // 3. User is authenticated and authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
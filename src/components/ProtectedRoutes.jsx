import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Custom hook to access authentication state
const useAuth = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth.auth);
  console.log(isAuthenticated, user);
  
  return { isAuthenticated, user };
};

export default function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.role !== 'instructor') {
    return <Navigate to="/" replace />;
  }
  return children;
};

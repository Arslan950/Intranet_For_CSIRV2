// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../src/hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { authenticated } = useAuth();

  return authenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

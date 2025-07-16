import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); 
  console.log('%cProtectedRoute Check: isAuthenticated is', 'color: red;', isAuthenticated); 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtectedRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';


const isAuthenticated = () => {
  return !!localStorage.getItem('authToken'); 
};

function ProtectedRoute({ element }) {
  return isAuthenticated() ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;
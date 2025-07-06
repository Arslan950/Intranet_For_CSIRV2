// hooks/useAuth.js
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('AdminName');
    localStorage.removeItem('role');
    setToken('');
    setAuthenticated(false);
  };
  

  return {
    token,
    login,
    logout,
    authenticated: !!token, // This will change reactively
  };
};

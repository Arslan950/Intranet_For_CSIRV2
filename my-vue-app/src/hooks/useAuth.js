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
    setToken('');
  };
  

  return {
    token,
    login,
    logout,
    authenticated: !!token, // This will change reactively
  };
};

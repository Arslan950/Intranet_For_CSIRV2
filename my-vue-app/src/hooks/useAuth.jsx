// // hooks/useAuth.js


// hooks/useAuth.js or context/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(false);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('AdminName');
    localStorage.removeItem('role');
    setToken('');
  };

  const loadingSet = (bool) => {
    setLoading(bool);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        loading,
        loadingSet,
        authenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access the context
export const useAuth = () => useContext(AuthContext);


// import { useState, useEffect } from 'react';

// export const useAuth = () => {
//   const [token, setToken] = useState(() => localStorage.getItem('token') || '');
//  const [loading, setLoading] = useState(false)
//   const login = (newToken) => {
//     localStorage.setItem('token', newToken);
//     setToken(newToken);
//   };


//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('AdminName');
//     localStorage.removeItem('role');
//     setToken('');
//     setAuthenticated(false);
//   };
//   const  loadingSet=(bool)=>{
//     setLoading(bool)
   

//   }
  

//   return {
//     token,
//     login,
//     logout,
//     loadingSet,
//     loading,
//     authenticated: !!token, // This will change reactively
//   };
// };

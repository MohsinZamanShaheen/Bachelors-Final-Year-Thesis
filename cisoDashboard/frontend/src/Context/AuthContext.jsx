import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
      setUser(jwtDecode(token));
    }
  }, []);

  const handleLogin = (token) => {
    Cookies.set('token', token, { expires: 1 });
    setIsLoggedIn(true);
    setUser(jwtDecode(token));
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

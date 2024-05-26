import React, { createContext, useState, useEffect } from 'react';
import apiClient  from "../apiClient";
import {useNavigate} from "react-router-dom";

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await apiClient.get('/auth/verify-token');
        setIsLoggedIn(true);
        setUser(response.data);

      } catch (error) {
        console.log("Token verification failed");
        setIsLoggedIn(false);
      }
    };

    verifyToken();
  }, []);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    navigate("/dashboard");
    window.location.reload();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};

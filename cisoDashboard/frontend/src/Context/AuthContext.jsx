import React, { createContext, useState, useEffect } from 'react';
import apiClient, { logout } from "../apiClient";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../utils";

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = getCookie('token');
      if (!token) {
        setIsLoggedIn(false);
        return;
      }
      try {
        const response = await apiClient.get('/auth/verify-token');
        setIsLoggedIn(true);
        setUser(response.data);
      } catch (error) {
        console.error('Token verification failed:', error);
        setIsLoggedIn(false);
      }
    };
    verifyToken();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/dashboard");
    //window.location.reload();
  };

  const handleLogout =  async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};

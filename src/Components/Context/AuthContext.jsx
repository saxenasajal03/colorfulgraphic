import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check localStorage for token and user when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("userDetails");

    // Only set user if both token and user are available
    if (token && storedUser) {
      setUser({ ...JSON.parse(storedUser), token });
    }
  }, []);
  useEffect(() => {
    console.log("AuthContext user:", user);
  }, [user]);

  const handleLogin = useCallback((token, userDetails) => {
    if (token && userDetails) {
      setUser({ ...userDetails, token });
      localStorage.setItem("token", token);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    } else {
      console.warn("Invalid login details: missing token or userDetails");
    }
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    navigate("/");
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

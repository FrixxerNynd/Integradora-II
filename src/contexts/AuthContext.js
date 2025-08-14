import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginApi } from "../service/ConectionFunctions";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authStatus = await AsyncStorage.getItem("isAuthenticated");
      const userData = await AsyncStorage.getItem("userData");

      if (authStatus === "true") {
        setIsAuthenticated(true);
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const { token, user } = await loginApi(username, password);
  
      await AsyncStorage.multiSet([
        ["token", token],
        ["isAuthenticated", "true"],
        ["userData", JSON.stringify(user)]
      ]);
  
      
      setIsAuthenticated(true);
      setUser(user);
      setToken(token);
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error?.message || "Error al iniciar sesión");
    }
  };
  

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("isAuthenticated");
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

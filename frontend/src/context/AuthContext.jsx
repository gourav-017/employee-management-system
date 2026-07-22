import { createContext, useContext, useEffect, useState } from "react";
import { login as loginApi,register as registerApi, getProfile } from "../api/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const userData = await getProfile();

      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData) => {
    const data = await loginApi(formData);

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    const userData = await getProfile();

    setUser(userData);
    setIsAuthenticated(true);

    return userData;
  };

  const register = async (formData) => {
  const response = await registerApi(formData);
  return response;
};

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
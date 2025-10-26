import { createContext, useContext, useState, useEffect } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const { data } = await customFetch.get("/users/current-user");
      if (data && data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    } catch (error) {
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  };

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // Force a re-check after a short delay
    setTimeout(() => {
      checkAuth();
    }, 500);
  };

  const logout = async () => {
    try {
      await customFetch.get("/auth/logout");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error during logout");
    } finally {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isLoading,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

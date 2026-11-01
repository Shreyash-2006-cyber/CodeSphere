import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("cs_token"));
  const [loading, setLoading] = useState(true); // resolves after initial check
  const [authError, setAuthError] = useState(null);

  // On mount: if token exists, restore user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cs_user");
    if (stored && token) {
      try {
        setUser(JSON.parse(stored));
      } catch (_) {
        setUser(null);
      }
    }
    setLoading(false);
  }, [token]);

  const _saveSession = (tokenValue, userData) => {
    localStorage.setItem("cs_token", tokenValue);
    localStorage.setItem("cs_user", JSON.stringify(userData));
    setToken(tokenValue);
    setUser(userData);
    setAuthError(null);
  };

  const register = useCallback(async ({ name, email, password, githubUsername, leetcodeUsername, neetcodeUsername }) => {
    setAuthError(null);
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, {
        name,
        email,
        password,
        githubUsername: githubUsername || "",
        leetcodeUsername: leetcodeUsername || "",
        neetcodeUsername: neetcodeUsername || "",
      });
      _saveSession(res.data.token, res.data.user);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setAuthError(msg);
      return { success: false, error: msg };
    }
  }, []);

  const login = useCallback(async ({ email, password }) => {
    setAuthError(null);
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      _saveSession(res.data.token, res.data.user);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setAuthError(msg);
      return { success: false, error: msg };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("cs_token");
    localStorage.removeItem("cs_user");
    setToken(null);
    setUser(null);
  }, []);

  // Update usernames (e.g. from settings page)
  const updateUsernames = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem("cs_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, loading, authError, isAuthenticated, register, login, logout, updateUsernames }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

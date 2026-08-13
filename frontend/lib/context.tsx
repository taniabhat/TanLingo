"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { api, AuthError } from "@/lib/api";
import type { UserStats } from "@/lib/types";

interface AppContextType {
  user: UserStats | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<string>;
  logout: () => void;
  toggleDarkMode: () => Promise<void>;
  darkMode: boolean;
}

const AppContext = createContext<AppContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  refreshUser: async () => {},
  login: async () => {},
  register: async () => "",
  logout: () => {},
  toggleDarkMode: async () => {},
  darkMode: false,
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const refreshUser = useCallback(async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const data = await api.getMe();
      setUser(data);
      setDarkMode(data.dark_mode);
      if (data.dark_mode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (err) {
      if (err instanceof AuthError) {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const res = await api.login(username, password);
    localStorage.setItem("token", res.access_token);
    await refreshUser();
  }, [refreshUser]);

  const register = useCallback(async (username: string, email: string, password: string) => {
    const res = await api.register(username, email, password);
    localStorage.setItem("token", res.access_token);
    await refreshUser();
    return res.message;
  }, [refreshUser]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const toggleDarkMode = useCallback(async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      const updated = await api.updateSettings({ dark_mode: newMode });
      setUser(updated);
    } catch {
      /* revert on failure */
    }
  }, [darkMode]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        refreshUser,
        login,
        register,
        logout,
        toggleDarkMode,
        darkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

export interface AuthContextType {
  loggedIn: boolean;
  userId: string | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${baseUrl}/auth/check-auth`, {
        withCredentials: true
      });
      setLoggedIn(response.data.loggedIn);
      if (response.data.loggedIn) setUserId(response.data.user.userId);
    } catch (error) {
      console.error('Auth check failed:', error);
      setLoggedIn(false);
      setUserId(null);
    }
  };

  useEffect(() => {
    checkAuth(); // Check authentication status on load
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean) => {
    await axios.post(
      `${baseUrl}/auth/login`,
      {
        email: email,
        password: password,
        rememberMe: rememberMe
      },
      {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        }
      }
    );
    await checkAuth(); // Refresh auth state
  };

  const logout = async () => {
    await axios.post(`${baseUrl}/auth/logout`, {}, {
      withCredentials: true
    });
    await checkAuth(); // Refresh auth state
  };

  return (
    <AuthContext.Provider value={{ loggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

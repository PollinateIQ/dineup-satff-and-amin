// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api, { login, getProfile, logoutUser } from '../utils/api';
import { UserProfile } from '../types/User';

interface AuthContextType {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  loginUser: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}             

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const profile = await getProfile();
          setUser(profile);
        } catch (error) {
          console.error(error);
          await logout();
        }
      }
    };
    initializeUser();
  }, []);

  const loginUser = async (email: string, password: string) => {
    try {
      const data = await login(email, password);
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      api.defaults.headers.Authorization = `Bearer ${data.access}`;
      const profile = await getProfile();
      setUser(profile);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

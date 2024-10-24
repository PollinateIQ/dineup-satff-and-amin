// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  api, 
  login, 
  register, 
  getProfile, 
  logoutUser,
  socialAuthGoogle, 
  socialAuthApple,
} from '../utils/api';
import { 
  UserProfile, 
  LoginCredentials, 
  RegistrationData, 
  TokenPair 
} from '../types/User';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  loginUser: (credentials: LoginCredentials) => Promise<void>;
  registerUser: (data: RegistrationData) => Promise<void>;
  logout: () => Promise<void>;
  socialLogin: (provider: string, token: string) => Promise<void>;
  clearError: () => void;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          api.defaults.headers.Authorization = `Bearer ${token}`;
          const profile = await getProfile();
          setUser(profile);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error initializing auth:', error);
          await handleLogout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const handleLogout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete api.defaults.headers.Authorization;
  };

  const loginUser = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await login(credentials);
      api.defaults.headers.Authorization = `Bearer ${response.access}`;
      const profile = await getProfile();
      setUser(profile);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (data: RegistrationData) => {
    try {
      setLoading(true);
      await register(data);
      await loginUser({
        email: data.email,
        password: data.password
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (provider: string, token: string) => {
    try {
      setLoading(true);
      let response: TokenPair;

      if (provider === 'google') {
        response = await socialAuthGoogle(token);
      } else if (provider === 'apple') {
        response = await socialAuthApple(token);
      } else {
        throw new Error(`Unsupported provider: ${provider}`);
      }

      api.defaults.headers.Authorization = `Bearer ${response.access}`;
      const profile = await getProfile();
      setUser(profile);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Social login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      await handleLogout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    loginUser,
    registerUser,
    logout,
    socialLogin,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
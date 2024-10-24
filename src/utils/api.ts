// src/utils/api.ts

import axios, { AxiosInstance} from 'axios';
import {
  UserProfile,
  Restaurant,
  MenuItem,
  Order,
  CartItem,
  Review,
  Favorite,
  PromoCode,
  RegistrationData,
  TokenPair,
  LoginCredentials,
  PasswordResetRequest,
  PasswordResetConfirmation
} from '../types/index';

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public code?: string,
    public field?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// API configuration
const API_URL = 'https://backenddineup.up.railway.app';

// Create axios instance with default config
export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler helper
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    // Log error details for debugging
    console.error('API Error:', {
      status,
      data,
      url: error.config?.url,
      method: error.config?.method
    });

    // Handle Django REST framework specific error formats
    if (data) {
      if (data.detail) {
        throw new ApiError(data.detail, status);
      }
      if (data.non_field_errors) {
        throw new ApiError(data.non_field_errors[0], status);
      }
      if (typeof data === 'object') {
        // Handle field-specific errors
        for (const [field, errors] of Object.entries(data)) {
          if (Array.isArray(errors) && errors.length > 0) {
            throw new ApiError(errors[0], status, 'VALIDATION_ERROR', field);
          } else if (typeof errors === 'string') {
            throw new ApiError(errors, status, 'VALIDATION_ERROR', field);
          }
        }
      }
    }

    switch (status) {
      case 400:
        throw new ApiError(
          data?.message || 'Invalid request',
          status,
          'BAD_REQUEST'
        );
      case 401:
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        throw new ApiError('Authentication required', status, 'UNAUTHORIZED');
      case 403:
        throw new ApiError('Permission denied', status, 'FORBIDDEN');
      case 404:
        throw new ApiError('Resource not found', status, 'NOT_FOUND');
      case 429:
        throw new ApiError('Too many requests', status, 'RATE_LIMIT');
      default:
        throw new ApiError(
          data?.message || 'An unexpected error occurred',
          status,
          'UNKNOWN_ERROR'
        );
    }
  }
  throw new ApiError('Network error occurred', undefined, 'NETWORK_ERROR');
};

// Request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new ApiError('No refresh token available', 401, 'REFRESH_TOKEN_MISSING');
        }

        const response = await axios.post<TokenPair>(`${API_URL}/api/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem('access_token', access);
        
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axios(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        throw new ApiError('Session expired', 401, 'SESSION_EXPIRED');
      }
    }
    
    return Promise.reject(error);
  }
);

// Authentication API calls
export const login = async (credentials: LoginCredentials): Promise<TokenPair> => {
  try {
    // Django expects username/password
    const loginData = {
      username: credentials.email, // Using email as username
      password: credentials.password
    };

    console.log('Login request payload:', loginData);

    const response = await api.post<TokenPair>('/api/token/', loginData);
    const { access, refresh } = response.data;
    
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    
    api.defaults.headers.Authorization = `Bearer ${access}`;
    
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const register = async (data: RegistrationData): Promise<UserProfile> => {
  try {
    // Format registration data for Django
    const registrationData = {
      username: data.email, // Using email as username
      email: data.email,
      password: data.password,
      password2: data.password2,
      first_name: data.name.split(' ')[0],
      last_name: data.name.split(' ').slice(1).join(' ') || '',
      role: 'customer'  // Default role
    };

    console.log('Registration request payload:', registrationData);

    const response = await api.post<UserProfile>('/api/register/', registrationData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const forgotPassword = async (data: PasswordResetRequest): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>('/api/forgot-password/', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const resetPassword = async (data: PasswordResetConfirmation): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>('/api/reset-password/', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Social Authentication
export const socialAuthGoogle = async (token: string): Promise<TokenPair> => {
  try {
    const response = await api.post<TokenPair>('/api/social-auth/google/', { token });
    const { access, refresh } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const socialAuthApple = async (token: string): Promise<TokenPair> => {
  try {
    const response = await api.post<TokenPair>('/api/social-auth/apple/', { token });
    const { access, refresh } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Profile API calls
export const getProfile = async (): Promise<UserProfile> => {
  try {
    const response = await api.get<UserProfile>('/api/user-profile/');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    const response = await api.put<UserProfile>('/api/user-profile/', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Restaurant API calls
export const getRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const response = await api.get<Restaurant[]>('/restaurants/');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getRestaurantDetails = async (restaurantId: number): Promise<Restaurant> => {
  try {
    const response = await api.get<Restaurant>(`/restaurants/${restaurantId}/`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Order API calls
export const createOrder = async (order: Partial<Order>): Promise<Order> => {
  try {
    const response = await api.post<Order>('/orders/', order);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getOrderHistory = async (limit?: number): Promise<Order[]> => {
  try {
    const response = await api.get<Order[]>('/orders/', {
      params: limit ? { limit } : undefined
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getOrderStatus = async (orderId: number): Promise<Order> => {
  try {
    const response = await api.get<Order>(`/orders/${orderId}/`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Cart API calls
export const getCart = async (): Promise<CartItem[]> => {
  try {
    const response = await api.get<CartItem[]>('/cart/');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const addToCart = async (item: Partial<CartItem>): Promise<CartItem> => {
  try {
    const response = await api.post<CartItem>('/cart/', item);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateCartItem = async (itemId: number, quantity: number): Promise<CartItem> => {
  try {
    const response = await api.patch<CartItem>(`/cart/${itemId}/`, { quantity });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const removeFromCart = async (itemId: number): Promise<void> => {
  try {
    await api.delete(`/cart/${itemId}/`);
  } catch (error) {
    throw handleApiError(error);
  }
};

// Menu Item API calls
export const getMenuItems = async (restaurantId: number): Promise<MenuItem[]> => {
  try {
    const response = await api.get<MenuItem[]>(`/restaurants/${restaurantId}/menu-items/`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Review API calls
export const getReviews = async (restaurantId: number): Promise<Review[]> => {
  try {
    const response = await api.get<Review[]>(`/restaurants/${restaurantId}/reviews/`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Favorite API calls
export const getFavorites = async (): Promise<Favorite[]> => {
  try {
    const response = await api.get<Favorite[]>('/favorites/');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// PromoCode API calls
export const getPromoCodes = async (): Promise<PromoCode[]> => {
  try {
    const response = await api.get<PromoCode[]>('/promo-codes/');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Logout
export const logoutUser = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      await api.post('/api/token/blacklist/', { refresh: refreshToken });
    }
  } catch (error) {
    console.error('Error during logout:', error);
  } finally {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete api.defaults.headers.Authorization;
  }
};

// Utility functions
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('access_token');
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('access_token');
};

export const clearAuthTokens = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  delete api.defaults.headers.Authorization;
};

// Request cancellation utility
export const createCancelToken = () => {
  const source = axios.CancelToken.source();
  return source;
};
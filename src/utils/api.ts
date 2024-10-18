// src/services/api.ts

import axios, { AxiosInstance } from 'axios';
import { UserProfile, Restaurant, MenuItem, Order, CartItem, Review, Favorite, PromoCode } from '../types';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://backenddineup.up.railway.app/api',
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Authentication API calls

export const login = async (email: string, password: string) => {
  const response = await api.post('/token/', { email, password });
  return response.data; // Contains access and refresh tokens
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
  password2: string;
}) => {
  const response = await api.post('/register/', data);
  return response.data;
};

// Profile API calls

export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get('/profile/');
  return response.data;
};

export const updateProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
  const response = await api.put('/profile/', data);
  return response.data;
};

export const changePassword = async (data: {
  old_password: string;
  new_password: string;
  new_password2: string;
}) => {
  const response = await api.post('/change-password/', data);
  return response.data;
};

// Restaurant API calls

export const getRestaurants = async (): Promise<Restaurant[]> => {
  const response = await api.get('/restaurants/');
  return response.data;
};

export const getRestaurantDetails = async (restaurantId: number): Promise<Restaurant> => {
  const response = await api.get(`/restaurants/${restaurantId}/`);
  return response.data;
};

// Menu Item API calls

export const getMenuItemDetails = async (itemId: number): Promise<MenuItem> => {
  const response = await api.get(`/items/${itemId}/`);
  return response.data;
};

// Cart API calls

export const getCartItems = async (): Promise<CartItem[]> => {
  const response = await api.get('/cart/');
  return response.data;
};

export const addToCart = async (data: {
  item_id: number;
  quantity: number;
  customizations?: any;
}): Promise<CartItem> => {
  const response = await api.post('/cart/items/', data);
  return response.data;
};

export const updateCartItem = async (cartItemId: number, data: Partial<CartItem>): Promise<CartItem> => {
  const response = await api.put(`/cart/items/${cartItemId}/`, data);
  return response.data;
};

export const removeCartItem = async (cartItemId: number) => {
  const response = await api.delete(`/cart/items/${cartItemId}/`);
  return response.data;
};

// Order API calls

export const placeOrder = async (data: {
  payment_method: string;
  delivery_address?: any;
  special_requests?: string;
}): Promise<Order> => {
  const response = await api.post('/orders/', data);
  return response.data;
};

export const getOrderHistory = async (): Promise<Order[]> => {
  const response = await api.get('/orders/');
  return response.data;
};

export const getOrderStatus = async (orderId: number): Promise<Order> => {
  const response = await api.get(`/orders/${orderId}/status/`);
  return response.data;
};

// Review API calls

export const submitReview = async (data: {
  restaurant_id: number;
  rating: number;
  comment?: string;
  images?: File[];
}): Promise<Review> => {
  const formData = new FormData();
  formData.append('restaurant_id', data.restaurant_id.toString());
  formData.append('rating', data.rating.toString());
  if (data.comment) formData.append('comment', data.comment);
  if (data.images) {
    data.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
  }
  const response = await api.post('/reviews/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getRestaurantReviews = async (restaurantId: number): Promise<Review[]> => {
  const response = await api.get(`/restaurants/${restaurantId}/reviews/`);
  return response.data;
};

// Favorites API calls

export const getFavorites = async (): Promise<Favorite[]> => {
  const response = await api.get('/favorites/');
  return response.data;
};

export const addFavorite = async (data: {
  restaurant_id?: number;
  item_id?: number;
}): Promise<Favorite> => {
  const response = await api.post('/favorites/', data);
  return response.data;
};

export const removeFavorite = async (favoriteId: number) => {
  const response = await api.delete(`/favorites/${favoriteId}/`);
  return response.data;
};

// Recommendations API calls

export const getRecommendations = async (): Promise<any[]> => {
  const response = await api.get('/recommendations/');
  return response.data;
};

// Apply Promo Code API call

export const applyPromoCode = async (promoCode: string): Promise<PromoCode> => {
  const response = await api.post('/cart/apply-promo/', { promo_code: promoCode });
  return response.data;
};

// Logout API call

export const logoutUser = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) {
    await api.post('/token/blacklist/', { refresh: refreshToken });
  }
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  api.defaults.headers.Authorization = '';
};

export default api;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../types/menu';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: MenuItem[];
  addFavorite: (item: MenuItem) => void;
  removeFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<MenuItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }
  }, [user]);

  const addFavorite = (item: MenuItem) => {
    setFavorites((prev) => {
      const newFavorites = [...prev, item];
      if (user) {
        localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
      }
      return newFavorites;
    });
  };

  const removeFavorite = (itemId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((item) => item.id !== itemId);
      if (user) {
        localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
      }
      return newFavorites;
    });
  };

  const isFavorite = (itemId: string) => favorites.some((item) => item.id === itemId);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
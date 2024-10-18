// src/types/MenuItem.ts

export interface MenuItem {
    id: number;
    restaurant: number; // Restaurant ID
    name: string;
    description?: string;
    price: number;
    available: boolean;
    category?: number; // Category ID
    image?: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  }
  
  export interface MenuCategory {
    id: number;
    name: string;
    description?: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  }
  
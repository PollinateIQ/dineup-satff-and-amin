// src/types/Favorite.ts

export interface Favorite {
    id: number;
    user: number; // User ID
    restaurant?: number; // Restaurant ID (nullable)
    item?: number; // MenuItem ID (nullable)
    added_at: string; // ISO date string
  }
  
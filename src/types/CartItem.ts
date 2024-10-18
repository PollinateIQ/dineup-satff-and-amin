// src/types/CartItem.ts
import { MenuItem } from './MenuItem';

export interface CartItem {
  id: number;
  user: number; // User ID
  item: MenuItem;
  quantity: number;
  customizations?: any; // Adjust type as needed
  added_at: string; // ISO date string
}

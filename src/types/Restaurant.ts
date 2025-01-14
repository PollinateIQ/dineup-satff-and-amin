// src/types/Restaurant.ts
import { MenuItem, MenuCategory } from './MenuItem';

export interface Restaurant {
    id: number;
    name: string;
    description?: string;
    address: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    phone_number?: string;
    email?: string;
    image?: string;
    is_active: boolean;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    menu_items?: MenuItem[];
    menu_categories?: MenuCategory[];
}

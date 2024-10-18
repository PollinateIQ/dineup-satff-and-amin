// src/types/Order.ts

export interface Order {
    id: number;
    customer: number; // User ID
    restaurant: number; // Restaurant ID
    total_price: number;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    payment_method?: string;
    delivery_address?: Address;
    special_requests?: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    items: OrderItem[];
  }
  
  export interface OrderItem {
    id: number;
    order: number; // Order ID
    item: number; // MenuItem ID
    quantity: number;
    price: number;
    customizations?: any; // Adjust type as needed
  }
  
  export interface Address {
    address_line1: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  }
  
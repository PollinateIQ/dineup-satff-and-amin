// src/types/Reservation.ts

export interface Reservation {
    id: number;
    customer: number; // User ID
    restaurant: number; // Restaurant ID
    table?: number; // Table ID (nullable)
    reservation_time: string; // ISO date string
    number_of_people: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    special_requests?: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  }
  
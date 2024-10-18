// src/types/Notification.ts

export interface Notification {
    id: number;
    title: string;
    message: string;
    target: 'all_users' | 'staff' | 'user';
    user?: number; // User ID (nullable)
    created_at: string; // ISO date string
  }
  
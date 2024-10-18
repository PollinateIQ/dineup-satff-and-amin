// src/types/User.ts

export interface User {
    id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    profile_picture?: string;
    role: 'customer' | 'staff' | 'admin';
    is_active: boolean;
    date_joined: string; // ISO date string
    last_login?: string; // ISO date string
  }
  
  export interface StaffProfile {
    id: number;
    user: number; // User ID
    restaurant: number; // Restaurant ID
    position?: string;
  }
  
  export interface UserProfile extends User {
    staff_profile?: StaffProfile;
  }
  
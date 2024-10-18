// src/types/PromoCode.ts

export interface PromoCode {
    id: number;
    code: string;
    description?: string;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    start_date?: string; // ISO date string
    end_date?: string; // ISO date string
    max_uses?: number;
    uses: number;
    is_active: boolean;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  }
  
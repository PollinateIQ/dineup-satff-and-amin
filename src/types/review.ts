// src/types/Review.ts

export interface Review {
  id: number;
  user: number; // User ID
  restaurant: number; // Restaurant ID
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  images?: ReviewImage[];
  created_at: string; // ISO date string
}

export interface ReviewImage {
  id: number;
  review: number; // Review ID
  image: string; // URL of the image
  uploaded_at: string; // ISO date string
}

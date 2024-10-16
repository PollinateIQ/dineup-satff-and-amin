export interface Review {
  id: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface RestaurantRating {
  averageRating: number;
  totalReviews: number;
}
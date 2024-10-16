import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Review, RestaurantRating } from '../types/review';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

// Mock data (replace with actual API calls in a real application)
const mockReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'John Doe',
    rating: 4,
    comment: 'Great food and atmosphere!',
    createdAt: '2023-05-15T12:00:00Z',
  },
  {
    id: '2',
    userId: 'user2',
    username: 'Jane Smith',
    rating: 5,
    comment: 'Excellent service and delicious dishes.',
    createdAt: '2023-05-14T14:30:00Z',
  },
];

const mockRating: RestaurantRating = {
  averageRating: 4.5,
  totalReviews: 2,
};

const RestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [rating, setRating] = useState<RestaurantRating>(mockRating);

  const handleReviewSubmit = (newRating: number, comment: string) => {
    const newReview: Review = {
      id: Date.now().toString(),
      userId: 'currentUser', // Replace with actual user ID
      username: 'Current User', // Replace with actual username
      rating: newRating,
      comment,
      createdAt: new Date().toISOString(),
    };

    setReviews([newReview, ...reviews]);

    // Update the overall rating
    const newTotalReviews = rating.totalReviews + 1;
    const newAverageRating =
      (rating.averageRating * rating.totalReviews + newRating) / newTotalReviews;

    setRating({
      averageRating: Number(newAverageRating.toFixed(1)),
      totalReviews: newTotalReviews,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Restaurant Name</h1>
      <div className="mb-4">
        <span className="text-2xl font-semibold">{rating.averageRating}</span>
        <span className="text-gray-600"> ({rating.totalReviews} reviews)</span>
      </div>
      <ReviewForm onSubmit={handleReviewSubmit} />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default RestaurantPage;
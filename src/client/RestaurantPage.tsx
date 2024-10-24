import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Review, RestaurantRating } from '../types/review';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

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
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Restaurant Name</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-2xl font-semibold">{rating.averageRating}</span>
            <span className="text-gray-600"> ({rating.totalReviews} reviews)</span>
          </div>
          <hr className="my-4 border-t border-gray-200" />
          <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
          <ReviewForm onSubmit={handleReviewSubmit} />
          <hr className="my-4 border-t border-gray-200" />
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          <ReviewList reviews={reviews} />
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantPage;

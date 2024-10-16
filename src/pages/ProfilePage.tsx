import React from 'react';
import { useAuth } from '../context/AuthContext';
import OrderHistory from '../components/OrderHistory';
import LoyaltyProgram from '../components/LoyaltyProgram';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  // Mock loyalty data (replace with actual data from backend)
  const loyaltyPoints = 750;
  const loyaltyTier = 'Silver';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <strong>Username:</strong> {user?.username}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {user?.email}
        </div>
        {/* Add more user details here */}
      </div>
      <LoyaltyProgram points={loyaltyPoints} tier={loyaltyTier} />
      <OrderHistory />
    </div>
  );
};

export default ProfilePage;
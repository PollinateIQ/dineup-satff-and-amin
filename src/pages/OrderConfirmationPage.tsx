import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmationPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Order Confirmed!</h1>
      <p className="text-xl mb-6">Thank you for your order. It will be ready shortly.</p>
      <Link
        to="/menu"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Back to Menu
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;
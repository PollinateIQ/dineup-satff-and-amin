import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { placeOrder } from '../utils/api';
import { Order } from '../types';

const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const orderData = {
        payment_method: 'credit_card', // This should be dynamic based on user selection
        special_requests: '', // This could be added as an input field in the UI
      };
      const order: Order = await placeOrder(orderData);
      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (err) {
      setError('Failed to place order. Please try again.');
      console.error('Error placing order:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span className="text-sm">{item.name} x {item.quantity}</span>
              <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr className="my-4 border-t border-gray-200" />
          <div className="flex justify-between items-center font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <Button
            onClick={handlePlaceOrder}
            className="w-full mt-6"
            disabled={isLoading}
          >
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;

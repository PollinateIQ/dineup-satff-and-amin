import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    // Here you would typically send the order to a backend API
    console.log('Order placed:', cartItems);
    clearCart();
    navigate('/order-confirmation');
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
          <Button
            onClick={handlePlaceOrder}
            className="w-full mt-6"
          >
            Place Order
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;

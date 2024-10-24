import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { getOrderStatus } from '../utils/api';
import { Order } from '../types';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setError('No order ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const orderDetails = await getOrderStatus(parseInt(orderId));
        setOrder(orderDetails);
      } catch (err) {
        setError('Failed to fetch order details');
        console.error('Error fetching order details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (isLoading) {
    return <div>Loading order details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>No order found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-xl mb-4">Thank you for your order. It will be ready shortly.</p>
          <p className="mb-2">Order ID: {order.id}</p>
          <p className="mb-2">Status: {order.status}</p>
          <p className="mb-4">Total: ${order.total_price.toFixed(2)}</p>
          <Button asChild>
            <Link to="/menu">
              Back to Menu
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmationPage;

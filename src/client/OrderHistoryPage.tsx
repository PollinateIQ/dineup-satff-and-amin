import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { getOrderHistory } from '../utils/api';
import { Order } from '../types';

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const orderHistory = await getOrderHistory();
        setOrders(orderHistory);
      } catch (err) {
        setError('Failed to fetch order history');
        console.error('Error fetching order history:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleNewOrder = (orderId: number) => {
    navigate(`/menu?reorder=${orderId}`);
  };

  if (isLoading) {
    return <div>Loading order history...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found in your history.</p>
      ) : (
        orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="mb-4"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Order #{order.id}</CardTitle>
                <Badge 
                  variant={order.status === 'completed' ? 'default' : 'secondary'}
                  className={order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                >
                  {order.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">
                  <Clock className="inline mr-2" />
                  {new Date(order.created_at).toLocaleString()}
                </p>
                <p className="text-lg font-bold mb-2">Total: ${order.total_price.toFixed(2)}</p>
                <Button onClick={() => handleNewOrder(order.id)}>
                  <ShoppingBag className="mr-2" />
                  Reorder
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default OrderHistoryPage;

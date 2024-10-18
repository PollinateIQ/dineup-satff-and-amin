import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

// Mock order history data
const mockOrderHistory = [
  { id: '1', date: '2023-05-01', total: 25.99, status: 'Completed' },
  { id: '2', date: '2023-05-05', total: 32.50, status: 'Completed' },
  { id: '3', date: '2023-05-10', total: 18.75, status: 'In Progress' },
];

const OrderHistoryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNewOrder = (orderId: string) => {
    navigate(`/menu?reorder=${orderId}`);
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      {mockOrderHistory.map((order, index) => (
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
                variant={order.status === 'Completed' ? 'default' : 'secondary'}
                className={order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
              >
                {order.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">
                <Clock className="inline mr-2" />{order.date}
              </p>
              <p className="text-lg font-bold mb-2">Total: ${order.total.toFixed(2)}</p>
              <Button onClick={() => handleNewOrder(order.id)}>
                <ShoppingBag className="mr-2" />
                Reorder
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default OrderHistoryPage;

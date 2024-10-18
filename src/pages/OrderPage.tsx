import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Utensils, Package, ShoppingBag } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

interface Order {
  id: string;
  tableNumber: number;
  items: { name: string; quantity: number; price: number }[];
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  total: number;
  createdAt: string;
}

const OrderPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (!orderId) {
          throw new Error("No order ID provided");
        }

        // Mock order data
        const mockOrder: Order = {
          id: orderId,
          tableNumber: 5,
          items: [
            { name: 'Burger', quantity: 2, price: 10.99 },
            { name: 'Fries', quantity: 1, price: 3.99 },
            { name: 'Soda', quantity: 2, price: 1.99 },
          ],
          status: 'preparing',
          total: 29.95,
          createdAt: new Date().toISOString(),
        };
        setOrder(mockOrder);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleNewOrder = () => {
    navigate('/menu');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-2/3 mb-4" />
        <Card>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => navigate('/menu')} className="mt-4">
          Go to Menu
        </Button>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const statusSteps = [
    { status: 'pending', icon: Clock, label: 'Order Received' },
    { status: 'preparing', icon: Utensils, label: 'Preparing' },
    { status: 'ready', icon: Package, label: 'Ready for Pickup' },
    { status: 'completed', icon: CheckCircle, label: 'Completed' },
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.status === order.status);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order #{order.id}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg"><strong>Table Number:</strong> {order.tableNumber}</p>
            <p className="text-lg"><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Order Status</h2>
            <div className="flex justify-between items-center">
              {statusSteps.map((step, index) => (
                <div key={step.status} className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: index <= currentStepIndex ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className={`rounded-full p-2 ${index <= currentStepIndex ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <step.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <p className="text-sm mt-1">{step.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-2">Order Items</h2>
          <ul className="mb-4">
            {order.items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex justify-between border-b py-2"
              >
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </motion.li>
            ))}
          </ul>
          
          <div className="text-xl font-bold mb-4">
            Total: ${order.total.toFixed(2)}
          </div>

          <Button onClick={handleNewOrder}>
            <ShoppingBag className="mr-2" />
            Create New Order
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderPage;

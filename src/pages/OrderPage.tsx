import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

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
          createdAt: '2024-10-16T08:51:09.000Z',
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
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!order) {
    return null;
  }

  const statusSteps = ['Order Received', 'Preparing', 'Ready for Pickup', 'Completed'];
  const currentStepIndex = statusSteps.findIndex(step => step.toLowerCase() === order.status);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order #{order.id}</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg"><strong>Table Number:</strong> {order.tableNumber}</p>
          <p className="text-lg"><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Order Status</h2>
          <div className="flex justify-between items-center">
            {statusSteps.map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`rounded-full p-2 ${index <= currentStepIndex ? 'bg-green-500' : 'bg-gray-300'}`}>
                  <div className="h-6 w-6 text-white flex items-center justify-center">
                    {index <= currentStepIndex ? '✓' : ''}
                  </div>
                </div>
                <p className="text-sm mt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-2">Order Items</h2>
        <ul className="mb-4">
          {order.items.map((item, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        
        <div className="text-xl font-bold mb-4">
          Total: ${order.total.toFixed(2)}
        </div>

        <button
          onClick={handleNewOrder}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full"
        >
          <ShoppingBag className="mr-2" />
          Create New Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
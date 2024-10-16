import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock } from 'lucide-react';

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
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {mockOrderHistory.map((order, index) => (
          <motion.div
            key={order.id}
            className="border-b last:border-b-0 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Order #{order.id}</h2>
              <span className={`px-2 py-1 rounded ${
                order.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
              }`}>
                {order.status}
              </span>
            </div>
            <p className="text-gray-600 mb-2"><Clock className="inline mr-2" />{order.date}</p>
            <p className="text-lg font-bold mb-2">Total: ${order.total.toFixed(2)}</p>
            <motion.button
              onClick={() => handleNewOrder(order.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="mr-2" />
              Reorder
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OrderHistoryPage;
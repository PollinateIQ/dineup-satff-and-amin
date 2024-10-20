import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X } from 'lucide-react';
import { Order } from '../../types/staff';

interface OrderViewProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: string) => void;
}

const OrderView: React.FC<OrderViewProps> = ({ orders, onUpdateStatus }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            className={`p-6 rounded-lg shadow-md ${
              order.status === 'preparing' ? 'bg-yellow-600' : 'bg-green-600'
            } cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => handleOrderClick(order)}
          >
            <h3 className="text-xl font-bold mb-2">Order #{order.id}</h3>
            <p className="mb-2">Table {order.tableNumber}</p>
            <p className="mb-2">Status: {order.status}</p>
            <p className="flex items-center mb-2">
              <Clock className="mr-2" /> {order.time}
            </p>
            <p className="font-bold">${order.total.toFixed(2)}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Order #{selectedOrder.id}</h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <p className="mb-2">Table: {selectedOrder.tableNumber}</p>
              <p className="mb-2">Time: {selectedOrder.time}</p>
              <p className="mb-4">Status: {selectedOrder.status}</p>
              <h3 className="text-xl font-semibold mb-2">Items:</h3>
              <ul className="mb-4">
                {selectedOrder.items.map((item, index) => (
                  <li key={index} className="flex justify-between mb-2">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xl font-bold mb-6">Total: ${selectedOrder.total.toFixed(2)}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    onUpdateStatus(selectedOrder.id, selectedOrder.status === 'preparing' ? 'ready' : 'completed');
                    handleCloseModal();
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                  {selectedOrder.status === 'preparing' ? 'Mark as Ready' : 'Complete Order'}
                </button>
                <button
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderView;
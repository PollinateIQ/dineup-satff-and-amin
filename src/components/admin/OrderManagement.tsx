import React, { useState } from 'react';

interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  createdAt: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    customerName: 'John Doe',
    items: [
      { name: 'Burger', quantity: 2 },
      { name: 'Fries', quantity: 1 },
    ],
    total: 25.98,
    status: 'pending',
    createdAt: '2023-05-15T14:30:00Z',
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    items: [
      { name: 'Pizza', quantity: 1 },
      { name: 'Salad', quantity: 1 },
    ],
    total: 22.99,
    status: 'preparing',
    createdAt: '2023-05-15T15:00:00Z',
  },
];

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Order Management</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="bg-white p-4 rounded shadow-md mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Order #{order.id}</h3>
              <span className="text-gray-600">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
            <p>
              <strong>Customer:</strong> {order.customerName}
            </p>
            <ul className="list-disc list-inside mb-2">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} x {item.quantity}
                </li>
              ))}
            </ul>
            <p>
              <strong>Total:</strong> ${order.total.toFixed(2)}
            </p>
            <div className="mt-2">
              <strong>Status:</strong>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                className="ml-2 p-1 border rounded"
              >
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderManagement;
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Mock order history data
const mockOrderHistory = [
  { id: '1', date: '2023-05-01', total: 25.99, status: 'Completed' },
  { id: '2', date: '2023-05-05', total: 32.50, status: 'Completed' },
  { id: '3', date: '2023-05-10', total: 18.75, status: 'In Progress' },
];

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();

  const handleNewOrder = (orderId: string) => {
    // In a real application, you would create a new order based on the previous one
    // For this example, we'll just navigate to a new order page
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockOrderHistory.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleNewOrder(order.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    New Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
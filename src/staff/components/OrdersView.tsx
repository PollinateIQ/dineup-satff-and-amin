import React from 'react';
import { Clock, ChevronRight, Check, DollarSign, X } from 'lucide-react';

interface OrdersViewProps {
  data: any;
  setSelectedOrder: (order: any) => void;
  updateOrderStatus: (orderId: number, newStatus: string) => void;
}

const OrdersView: React.FC<OrdersViewProps> = ({
  data,
  setSelectedOrder,
  updateOrderStatus,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {data.orders.map((order: any) => (
          <div
            key={order.id}
            className={`p-4 rounded-lg cursor-pointer ${
              order.status === 'Preparing' ? 'bg-yellow-700' :
              order.status === 'Ready' ? 'bg-green-700' :
              'bg-blue-700'
            }`}
            onClick={() => setSelectedOrder(order)}
          >
            <h2 className="text-xl font-bold mb-2">Order #{order.id}</h2>
            <p className="text-sm">Table {order.tableNumber}</p>
            <p className="text-sm">Status: {order.status}</p>
            <div className="flex items-center mt-2">
              <Clock className="w-4 h-4 mr-2" />
              <span>{order.timeOrdered}</span>
            </div>
            <p className="mt-2 font-semibold">
              ${order.items.reduce((total: number, item: any) => total + item.price * item.quantity, 0).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Selected Order View */}
      {/* ... (Keep the existing selected order view code here) */}
    </>
  );
};

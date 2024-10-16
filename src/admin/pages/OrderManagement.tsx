import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, ChevronUp, Clock, CheckCircle, XCircle, AlertTriangle, Printer, Download } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
  tableNumber?: number;
  specialInstructions?: string;
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Order; direction: 'asc' | 'desc' }>({ key: 'createdAt', direction: 'desc' });
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    // In a real application, you would fetch orders from an API
    const mockOrders: Order[] = [
      {
        id: '1',
        customerName: 'John Doe',
        items: [
          { name: 'Burger', quantity: 2, price: 10.99 },
          { name: 'Fries', quantity: 1, price: 3.99 },
        ],
        total: 25.97,
        status: 'pending',
        createdAt: '2023-05-15T14:30:00Z',
        tableNumber: 5,
      },
      {
        id: '2',
        customerName: 'Jane Smith',
        items: [
          { name: 'Pizza', quantity: 1, price: 12.99 },
          { name: 'Salad', quantity: 1, price: 7.99 },
        ],
        total: 20.98,
        status: 'preparing',
        createdAt: '2023-05-15T15:00:00Z',
        tableNumber: 3,
        specialInstructions: 'No onions on the pizza',
      },
      // Add more mock orders here
    ];
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  useEffect(() => {
    let result = orders;
    if (searchTerm) {
      result = result.filter(order => 
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.includes(searchTerm)
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    setFilteredOrders(result);
  }, [orders, searchTerm, statusFilter]);

  const handleSort = (key: keyof Order) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredOrders(sortedOrders);
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const handlePrintOrder = (order: Order) => {
    // Implement print functionality
    console.log('Printing order:', order);
  };

  const handleExportOrders = () => {
    // Implement export functionality (e.g., to CSV)
    console.log('Exporting orders');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Order Management</h2>
      
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-md pr-10"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExportOrders}
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Download className="mr-2" /> Export
          </motion.button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Order ID', 'Customer', 'Total', 'Status', 'Created At', 'Actions'].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(header.toLowerCase().replace(' ', '') as keyof Order)}
                >
                  <div className="flex items-center">
                    {header}
                    {sortConfig.key === header.toLowerCase().replace(' ', '') && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handlePrintOrder(order)}
                    className="text-green-600 hover:text-green-900"
                  >
                    Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

const StatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    preparing: { color: 'bg-blue-100 text-blue-800', icon: AlertTriangle },
    ready: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    completed: { color: 'bg-purple-100 text-purple-800', icon: CheckCircle },
    cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle },
  };

  const { color, icon: Icon } = statusConfig[status];

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}>
      <Icon className="mr-1 h-4 w-4" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
  onStatusChange: (orderId: string, newStatus: Order['status']) => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose, onStatusChange }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Order Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Table Number:</strong> {order.tableNumber || 'N/A'}</p>
          <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
          <p><strong>Status:</strong> <StatusBadge status={order.status} /></p>
          <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <div>
            <strong>Items:</strong>
            <ul className="list-disc list-inside">
              {order.items.map((item, index) => (
                <li key={index}>{item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}</li>
              ))}
            </ul>
          </div>
          {order.specialInstructions && (
            <p><strong>Special Instructions:</strong> {order.specialInstructions}</p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Update Status</label>
            <select
              value={order.status}
              onChange={(e) => onStatusChange(order.id, e.target.value as Order['status'])}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              // Implement print functionality
              console.log('Printing order:', order);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center mr-2"
          >
            <Printer className="mr-2" /> Print Order
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
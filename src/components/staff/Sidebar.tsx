import React from 'react';
import { motion } from 'framer-motion';
import { X, DollarSign, Printer, Users } from 'lucide-react';
import { Table } from '../../types/staff';

interface SidebarProps {
  table: Table;
  onClose: () => void;
  onUpdatePaymentStatus: (tableId: string, customerId: string, isPaid: boolean) => void;
  onCloseTable: (tableId: string) => void;
  onPrintReceipt: (tableId: string, customerId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  table,
  onClose,
  onUpdatePaymentStatus,
  onCloseTable,
  onPrintReceipt,
}) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full w-80 bg-gray-800 shadow-lg p-6 overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Table {table.number}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={24} />
        </button>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold mb-2">Status: {table.status}</p>
        <p className="text-lg font-semibold mb-4">Capacity: {table.capacity}</p>
        <button
          onClick={() => onCloseTable(table.id)}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          Close Table
        </button>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Customers</h3>
        {table.customers.map((customer) => (
          <div key={customer.id} className="bg-gray-700 rounded-lg p-4 mb-4">
            <p className="font-semibold mb-2">{customer.name}</p>
            <ul className="mb-2">
              {customer.order.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="font-bold mb-2">Total: ${customer.order.total.toFixed(2)}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => onUpdatePaymentStatus(table.id, customer.id, !customer.isPaid)}
                className={`flex items-center ${
                  customer.isPaid ? 'bg-green-500' : 'bg-yellow-500'
                } text-white py-1 px-2 rounded hover:opacity-80 transition duration-300`}
              >
                <DollarSign size={16} className="mr-1" />
                {customer.isPaid ? 'Paid' : 'Mark as Paid'}
              </button>
              <button
                onClick={() => onPrintReceipt(table.id, customer.id)}
                className="flex items-center bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-300"
              >
                <Printer size={16} className="mr-1" />
                Print Receipt
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
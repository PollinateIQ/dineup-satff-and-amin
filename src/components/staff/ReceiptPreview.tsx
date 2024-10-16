import React from 'react';
import { motion } from 'framer-motion';
import { Table } from '../../types/staff';

interface ReceiptPreviewProps {
  table: Table;
  receiptType: 'shared' | 'split';
  onClose: () => void;
  onConfirm: () => void;
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ table, receiptType, onClose, onConfirm }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-full max-w-md"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <h2 className="text-2xl font-bold mb-4">Receipt Preview</h2>
        <p className="mb-2">Table {table.number}</p>
        <p className="mb-4">Type: {receiptType === 'shared' ? 'Shared Bill' : 'Split Bill'}</p>

        {receiptType === 'shared' ? (
          <div>
            <h3 className="font-semibold mb-2">Items:</h3>
            <ul className="mb-4">
              {table.customers.flatMap(customer =>
                customer.order.items.map((item, index) => (
                  <li key={`${customer.id}-${index}`} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))
              )}
            </ul>
            <p className="font-bold">Total: ${table.customers.reduce((sum, customer) => sum + customer.order.total, 0).toFixed(2)}</p>
          </div>
        ) : (
          <div>
            {table.customers.map(customer => (
              <div key={customer.id} className="mb-4">
                <h3 className="font-semibold">{customer.name}</h3>
                <ul className="mb-2">
                  {customer.order.items.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-bold">Subtotal: ${customer.order.total.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Confirm Print
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReceiptPreview;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, Scissors } from 'lucide-react';
import { Table } from '../../types/staff';
import ReceiptPreview from './ReceiptPreview';

interface BillsViewProps {
  tables: Table[];
  onPrintSharedReceipt: (tableId: string) => void;
  onSplitBill: (tableId: string) => void;
}

const BillsView: React.FC<BillsViewProps> = ({ tables, onPrintSharedReceipt, onSplitBill }) => {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [receiptType, setReceiptType] = useState<'shared' | 'split' | null>(null);

  const handlePrintSharedReceipt = (table: Table) => {
    setSelectedTable(table);
    setReceiptType('shared');
  };

  const handleSplitBill = (table: Table) => {
    setSelectedTable(table);
    setReceiptType('split');
  };

  const handleCloseReceiptPreview = () => {
    setSelectedTable(null);
    setReceiptType(null);
  };

  const handleConfirmPrint = () => {
    if (selectedTable && receiptType) {
      if (receiptType === 'shared') {
        onPrintSharedReceipt(selectedTable.id);
      } else {
        onSplitBill(selectedTable.id);
      }
    }
    handleCloseReceiptPreview();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tables.map((table) => (
        <motion.div
          key={table.id}
          className="bg-gray-800 p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <h3 className="text-xl font-bold mb-2">Table {table.number}</h3>
          <p className="mb-2">{table.customers.length} customers</p>
          <p className="mb-4">Total: ${table.customers.reduce((sum, customer) => sum + customer.order.total, 0).toFixed(2)}</p>
          <div className="flex justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-500 text-white px-4 py-2 rounded flex items-center"
              onClick={() => handlePrintSharedReceipt(table)}
            >
              <Printer className="mr-2" /> Print Shared Receipt
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center"
              onClick={() => handleSplitBill(table)}
            >
              <Scissors className="mr-2" /> Split Bill
            </motion.button>
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedTable && receiptType && (
          <ReceiptPreview
            table={selectedTable}
            receiptType={receiptType}
            onClose={handleCloseReceiptPreview}
            onConfirm={handleConfirmPrint}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BillsView;
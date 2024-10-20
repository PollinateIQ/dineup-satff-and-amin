import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { Table } from '../../types/staff';

interface TableViewProps {
  tables: Table[];
  onViewOrders: (tableId: string) => void;
}

const TableView: React.FC<TableViewProps> = ({ tables, onViewOrders }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tables.map((table) => (
        <motion.div
          key={table.id}
          className={`p-6 rounded-lg shadow-md ${
            table.status === 'occupied' ? 'bg-blue-600' : 'bg-purple-600'
          } cursor-pointer`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => onViewOrders(table.id)}
        >
          <h3 className="text-xl font-bold mb-2">Table {table.number}</h3>
          <p className="mb-2">Status: {table.status}</p>
          <p className="flex items-center mb-2">
            <Users className="mr-2" /> {table.capacity}
          </p>
          <p className="font-semibold">
            {table.customers.length} customer{table.customers.length !== 1 ? 's' : ''}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default TableView;
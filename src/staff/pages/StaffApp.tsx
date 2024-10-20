import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/staff/Header';
import TableView from '../components/staff/TableView';
import OrderView from '../components/staff/OrderView';
import Footer from '../components/staff/Footer';
import Sidebar from '../components/staff/Sidebar';
import { Table, Order } from '../types/staff';

const StaffApp: React.FC = () => {
  const [activeView, setActiveView] = useState<'tables' | 'orders'>('tables');
  const [tables, setTables] = useState<Table[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  useEffect(() => {
    // Fetch initial data
    fetchTables();
    fetchOrders();
  }, []);

  const fetchTables = () => {
    // Mock data for tables
    const mockTables: Table[] = [
      {
        id: '1',
        number: 1,
        status: 'occupied',
        capacity: 4,
        customers: [
          {
            id: 'c1',
            name: 'John Doe',
            order: {
              id: 'o1',
              items: [{ name: 'Burger', quantity: 1, price: 10.99 }],
              total: 10.99
            },
            isPaid: false
          }
        ]
      },
      {
        id: '2',
        number: 2,
        status: 'available',
        capacity: 2,
        customers: []
      },
      // Add more mock tables as needed
    ];
    setTables(mockTables);
  };

  const fetchOrders = () => {
    // Mock data for orders
    const mockOrders: Order[] = [
      {
        id: 'o1',
        tableNumber: 1,
        items: [{ name: 'Burger', quantity: 1, price: 10.99 }],
        status: 'preparing',
        total: 10.99,
        time: '14:30'
      },
      // Add more mock orders as needed
    ];
    setOrders(mockOrders);
  };

  const handleUpdatePaymentStatus = (tableId: string, customerId: string, isPaid: boolean) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        return {
          ...table,
          customers: table.customers.map(customer => 
            customer.id === customerId ? { ...customer, isPaid } : customer
          )
        };
      }
      return table;
    }));
  };

  const handleCloseTable = (tableId: string) => {
    setTables(tables.map(table => 
      table.id === tableId ? { ...table, status: 'available', customers: [] } : table
    ));
    setSelectedTable(null);
  };

  const handlePrintReceipt = (tableId: string, customerId: string) => {
    console.log(`Printing receipt for customer ${customerId} at table ${tableId}`);
  };

  const handleViewOrders = (tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    setSelectedTable(table || null);
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="container mx-auto px-4 py-8 flex-grow flex">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-grow"
        >
          {activeView === 'tables' && (
            <TableView
              tables={tables}
              onViewOrders={handleViewOrders}
            />
          )}
          {activeView === 'orders' && (
            <OrderView orders={orders} onUpdateStatus={handleUpdateStatus} />
          )}
        </motion.div>
        <AnimatePresence>
          {selectedTable && (
            <Sidebar
              table={selectedTable}
              onClose={() => setSelectedTable(null)}
              onUpdatePaymentStatus={handleUpdatePaymentStatus}
              onCloseTable={handleCloseTable}
              onPrintReceipt={handlePrintReceipt}
            />
          )}
        </AnimatePresence>
      </main>
      <Footer activeTables={tables.filter(t => t.status === 'occupied').length} activeOrders={orders.length} />
    </div>
  );
};

export default StaffApp;
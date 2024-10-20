import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, ClipboardList, User } from 'lucide-react';

interface HeaderProps {
  activeView: 'tables' | 'orders';
  setActiveView: (view: 'tables' | 'orders') => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Utensils className="h-8 w-8 mr-2 text-blue-500" />
          <h1 className="text-2xl font-bold">Restaurant Management</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView('tables')}
                className={`px-4 py-2 rounded-md ${
                  activeView === 'tables' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                Tables
              </motion.button>
            </li>
            <li>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView('orders')}
                className={`px-4 py-2 rounded-md ${
                  activeView === 'orders' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                Orders
              </motion.button>
            </li>
            <li>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-md"
              >
                <User className="h-5 w-5" />
              </motion.button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
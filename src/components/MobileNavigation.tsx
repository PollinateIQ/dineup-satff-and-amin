import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, User, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

interface MobileNavigationProps {
  currentOrderId: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ currentOrderId }) => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/menu', icon: Menu, label: 'Menu' },
    { path: `/order/${currentOrderId}`, icon: FileText, label: 'Current Order' },
    { path: user ? '/profile' : '/auth', icon: User, label: user ? 'Profile' : 'Login' },
  ];

  return (
    <motion.nav 
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex flex-col items-center ${
                location.pathname === item.path ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <item.icon className="h-6 w-6" />
              </motion.div>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default MobileNavigation;
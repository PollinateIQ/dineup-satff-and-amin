import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Clock, ShoppingBag, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FloatingActionButtonProps {
  currentOrderId: string;
  lastOrderId: string;
  onTakeOut: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  currentOrderId,
  lastOrderId,
  onTakeOut,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleAction = (action: string) => {
    setSelectedIcon(action);
    setTimeout(() => {
      switch (action) {
        case 'checkout':
          navigate('/payment');
          break;
        case 'currentOrder':
          navigate(`/order/${currentOrderId}`);
          break;
        case 'takeOut':
          onTakeOut();
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
          break;
      }
      setIsOpen(false);
      setSelectedIcon(null);
    }, 500);
  };

  const buttonVariants = {
    open: { rotate: 45 },
    closed: { rotate: 0 },
  };

  const menuVariants = {
    open: { opacity: 1, scale: 1, y: 0 },
    closed: { opacity: 0, scale: 0.95, y: 20 },
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 md:hidden">
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 right-0 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            Takeout request sent!
          </motion.div>
        )}
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute bottom-16 right-0 mb-2 space-y-2 w-48"
          >
            <motion.button
              onClick={() => handleAction('checkout')}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={20} className="mr-2" />
              <span className="text-sm">Checkout</span>
            </motion.button>
            <motion.button
              onClick={() => handleAction('currentOrder')}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Clock size={20} className="mr-2" />
              <span className="text-sm">Current Order</span>
            </motion.button>
            <motion.button
              onClick={() => handleAction('takeOut')}
              className="w-full bg-yellow-500 text-white py-2 px-4 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag size={20} className="mr-2" />
              <span className="text-sm">Take Out</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className="bg-red-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        onClick={toggleMenu}
        animate={isOpen ? "open" : "closed"}
        variants={buttonVariants}
      >
        {selectedIcon ? (
          <>
            {selectedIcon === 'checkout' && <ShoppingCart size={24} />}
            {selectedIcon === 'currentOrder' && <Clock size={24} />}
            {selectedIcon === 'takeOut' && <ShoppingBag size={24} />}
          </>
        ) : (
          <>
            {isOpen ? <X size={24} /> : <Plus size={24} />}
          </>
        )}
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
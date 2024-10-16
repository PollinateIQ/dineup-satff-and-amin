import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ShoppingCart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-4">Your Order</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                className="flex justify-between items-center mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <motion.button
                    className="bg-gray-200 px-2 py-1 rounded-l"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    whileHover={{ backgroundColor: '#e5e7eb' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    -
                  </motion.button>
                  <span className="bg-gray-100 px-2 py-1">{item.quantity}</span>
                  <motion.button
                    className="bg-gray-200 px-2 py-1 rounded-r"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    whileHover={{ backgroundColor: '#e5e7eb' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    +
                  </motion.button>
                  <motion.button
                    className="ml-2 text-red-500"
                    onClick={() => removeFromCart(item.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-bold">Total:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <motion.button
              className="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300 hidden md:block"
              onClick={handleCheckout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Proceed to Checkout
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ShoppingCart;
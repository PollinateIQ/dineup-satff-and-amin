import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, CreditCard } from 'lucide-react';
import OrderInstructionsDialog from '../components/OrderInstructionsDialog';

const PaymentPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showInstructionsDialog, setShowInstructionsDialog] = useState(false);
  const navigate = useNavigate();

  const handlePaymentSelection = (method: string) => {
    setPaymentMethod(method);
    setShowInstructionsDialog(true);
  };

  const handleInstructionsSubmit = (instructions: string) => {
    console.log('Order instructions:', instructions);
    setShowInstructionsDialog(false);
    // Here you would typically send the payment and order data to your backend
    console.log('Processing payment with method:', paymentMethod);
    
    // Generate a mock order ID (in a real app, this would come from the backend)
    const mockOrderId = 'ORD-' + Math.random().toString(36).substr(2, 9);
    
    // Navigate to the OrderPage with the new order ID
    navigate(`/order/${mockOrderId}`);
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Payment</h1>
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
        <div className="space-y-4">
          <motion.button
            className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            onClick={() => handlePaymentSelection('cash')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center">
              <DollarSign className="mr-2" />
              Cash
            </span>
            <span className="text-blue-500">Select</span>
          </motion.button>
          <motion.button
            className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            onClick={() => handlePaymentSelection('speedpoint')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center">
              <CreditCard className="mr-2" />
              Speedpoint
            </span>
            <span className="text-blue-500">Select</span>
          </motion.button>
        </div>
      </div>
      <OrderInstructionsDialog
        isOpen={showInstructionsDialog}
        onClose={() => setShowInstructionsDialog(false)}
        onSubmit={handleInstructionsSubmit}
      />
    </motion.div>
  );
};

export default PaymentPage;
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface LoyaltyProgramProps {
  points: number;
  tier: string;
}

const LoyaltyProgram: React.FC<LoyaltyProgramProps> = ({ points, tier }) => {
  const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum'];
  const currentTierIndex = tiers.indexOf(tier);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Loyalty Program</h2>
      <div className="flex items-center mb-4">
        <Star className="text-yellow-400 mr-2" />
        <span className="text-lg font-semibold">{points} Points</span>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Current Tier: {tier}</p>
      </div>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Progress to Next Tier
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {currentTierIndex < tiers.length - 1 ? `${tiers[currentTierIndex + 1]}` : 'Max Tier'}
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
          <div
            style={{ width: `${(currentTierIndex + 1) * 25}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          ></div>
        </div>
      </div>
      <p className="text-sm text-gray-600">
        Earn 1 point for every $1 spent. Unlock exclusive rewards and discounts as you progress through tiers!
      </p>
    </motion.div>
  );
};

export default LoyaltyProgram;
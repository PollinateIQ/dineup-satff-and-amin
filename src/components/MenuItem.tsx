import React from 'react';
import { motion } from 'framer-motion';
import { MenuItem as MenuItemType } from '../types/menu';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Heart } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavoriteToggle = () => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-2">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
          <motion.button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={() => addToCart(item)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Order
          </motion.button>
        </div>
      </div>
      <motion.button
        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
        onClick={handleFavoriteToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart
          className={`h-6 w-6 ${
            isFavorite(item.id) ? 'text-red-500 fill-current' : 'text-gray-400'
          }`}
        />
      </motion.button>
    </motion.div>
  );
};

export default MenuItem;
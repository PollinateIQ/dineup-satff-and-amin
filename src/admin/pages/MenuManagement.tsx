import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, X, Image as ImageIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  preparationArea: string;
  image: string;
}

const initialMenuItem: MenuItem = {
  id: '',
  name: '',
  description: '',
  price: 0,
  category: '',
  preparationArea: '',
  image: '',
};

const MenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MenuItem>(initialMenuItem);
  const [categories, setCategories] = useState<string[]>(['Starters', 'Main Course', 'Desserts', 'Drinks']);
  const [preparationAreas, setPreparationAreas] = useState<string[]>(['Kitchen', 'Bar', 'Bakery']);

  useEffect(() => {
    // In a real application, you would fetch menu items from an API
    const mockMenuItems: MenuItem[] = [
      {
        id: '1',
        name: 'Burger',
        description: 'Juicy beef patty with fresh vegetables',
        price: 85,
        category: 'Main Course',
        preparationArea: 'Kitchen',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      },
      // Add more mock menu items here
    ];
    setMenuItems(mockMenuItems);
  }, []);

  const handleAddItem = () => {
    setCurrentItem(initialMenuItem);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems(menuItems.filter(item => item.id !== itemId));
    }
  };

  const handleSaveItem = (item: MenuItem) => {
    if (item.id) {
      setMenuItems(menuItems.map(i => i.id === item.id ? item : i));
    } else {
      const newItem = { ...item, id: Date.now().toString() };
      setMenuItems([...menuItems, newItem]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Menu Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddItem}
          className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="mr-2" /> Add Menu Item
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={item.image || 'https://via.placeholder.com/300x200'} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-lg font-bold mb-2">R {item.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mb-2">Category: {item.category}</p>
              <p className="text-sm text-gray-500 mb-4">Prepared in: {item.preparationArea}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEditItem(item)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <MenuItemModal
          item={currentItem}
          onSave={handleSaveItem}
          onClose={() => setIsModalOpen(false)}
          categories={categories}
          preparationAreas={preparationAreas}
        />
      )}
    </div>
  );
};

interface MenuItemModalProps {
  item: MenuItem;
  onSave: (item: MenuItem) => void;
  onClose: () => void;
  categories: string[];
  preparationAreas: string[];
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({ item, onSave, onClose, categories, preparationAreas }) => {
  const [formData, setFormData] = useState(item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'price' ? parseFloat(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">{item.id ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (ZAR)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" min="0" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preparation Area</label>
            <select name="preparationArea" value={formData.preparationArea} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option value="">Select a preparation area</option>
              {preparationAreas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <ImageIcon className="h-5 w-5 inline-block mr-2" />
                Choose Image
              </label>
              {formData.image && (
                <img src={formData.image} alt="Preview" className="ml-4 h-20 w-20 object-cover rounded-md" />
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuManagement;
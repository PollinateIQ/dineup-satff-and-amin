import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, X, Search, AlertTriangle } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderPoint: number;
  supplierName: string;
  supplierContact: string;
  lastRestocked: string;
}

const initialInventoryItem: InventoryItem = {
  id: '',
  name: '',
  category: '',
  quantity: 0,
  unit: '',
  reorderPoint: 0,
  supplierName: '',
  supplierContact: '',
  lastRestocked: new Date().toISOString().split('T')[0],
};

const InventoryManagement: React.FC = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem>(initialInventoryItem);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real application, you would fetch inventory items from an API
    const mockInventoryItems: InventoryItem[] = [
      {
        id: '1',
        name: 'Tomatoes',
        category: 'Vegetables',
        quantity: 50,
        unit: 'kg',
        reorderPoint: 20,
        supplierName: 'Fresh Farms',
        supplierContact: 'john@freshfarms.com',
        lastRestocked: '2023-05-10',
      },
      {
        id: '2',
        name: 'Chicken Breast',
        category: 'Meat',
        quantity: 30,
        unit: 'kg',
        reorderPoint: 15,
        supplierName: 'Meat Suppliers Inc.',
        supplierContact: 'orders@meatsuppliers.com',
        lastRestocked: '2023-05-12',
      },
      // Add more mock inventory items here
    ];
    setInventoryItems(mockInventoryItems);
  }, []);

  const handleAddItem = () => {
    setCurrentItem(initialInventoryItem);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this inventory item?')) {
      setInventoryItems(inventoryItems.filter(item => item.id !== itemId));
    }
  };

  const handleSaveItem = (item: InventoryItem) => {
    if (item.id) {
      setInventoryItems(inventoryItems.map(i => i.id === item.id ? item : i));
    } else {
      const newItem = { ...item, id: Date.now().toString() };
      setInventoryItems([...inventoryItems, newItem]);
    }
    setIsModalOpen(false);
  };

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Inventory Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddItem}
          className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="mr-2" /> Add Inventory Item
        </motion.button>
      </div>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md pr-10"
        />
        <Search className="absolute right-3 top-2.5 text-gray-400" />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Restocked</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.quantity} {item.unit}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.quantity <= item.reorderPoint ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Low Stock
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      In Stock
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.lastRestocked}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEditItem(item)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDeleteItem(item.id)} className="text-red-600 hover:text-red-900">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <InventoryItemModal
          item={currentItem}
          onSave={handleSaveItem}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

interface InventoryItemModalProps {
  item: InventoryItem;
  onSave: (item: InventoryItem) => void;
  onClose: () => void;
}

const InventoryItemModal: React.FC<InventoryItemModalProps> = ({ item, onSave, onClose }) => {
  const [formData, setFormData] = useState(item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'quantity' || name === 'reorderPoint' ? parseInt(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">{item.id ? 'Edit Inventory Item' : 'Add New Inventory Item'}</h3>
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
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required min="0" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Unit</label>
            <input type="text" name="unit" value={formData.unit} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Reorder Point</label>
            <input type="number" name="reorderPoint" value={formData.reorderPoint} onChange={handleChange} required min="0" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Supplier Name</label>
            <input type="text" name="supplierName" value={formData.supplierName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Supplier Contact</label>
            <input type="text" name="supplierContact" value={formData.supplierContact} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Restocked</label>
            <input type="date" name="lastRestocked" value={formData.lastRestocked} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
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

export default InventoryManagement;
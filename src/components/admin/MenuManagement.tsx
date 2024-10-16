import React, { useState } from 'react';
import { MenuItem } from '../../types/menu';
import { Plus, Edit, Trash } from 'lucide-react';

const MenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const handleAddItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
    };
    setEditingItem(newItem);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
  };

  const handleDeleteItem = (itemId: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== itemId));
  };

  const handleSaveItem = (item: MenuItem) => {
    if (menuItems.find((i) => i.id === item.id)) {
      setMenuItems(menuItems.map((i) => (i.id === item.id ? item : i)));
    } else {
      setMenuItems([...menuItems, item]);
    }
    setEditingItem(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Menu Management</h2>
      <button
        onClick={handleAddItem}
        className="bg-green-500 text-white px-4 py-2 rounded flex items-center mb-4"
      >
        <Plus className="mr-2" /> Add Menu Item
      </button>
      {editingItem && (
        <div className="bg-white p-4 rounded shadow-md mb-4">
          <h3 className="text-xl font-semibold mb-2">
            {editingItem.id ? 'Edit' : 'Add'} Menu Item
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveItem(editingItem);
            }}
          >
            <input
              type="text"
              value={editingItem.name}
              onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
              placeholder="Item Name"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <textarea
              value={editingItem.description}
              onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
              placeholder="Item Description"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="number"
              value={editingItem.price}
              onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
              placeholder="Price"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="text"
              value={editingItem.image}
              onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
              placeholder="Image URL"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="text"
              value={editingItem.category}
              onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
              placeholder="Category"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} className="bg-white p-4 rounded shadow-md mb-2 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div>
              <button
                onClick={() => handleEditItem(item)}
                className="text-blue-500 mr-2"
              >
                <Edit />
              </button>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="text-red-500"
              >
                <Trash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuManagement;
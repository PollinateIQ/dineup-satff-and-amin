import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, X, Square, Circle } from 'lucide-react';

interface Table {
  id: string;
  number: number;
  capacity: number;
  shape: 'square' | 'round';
  status: 'available' | 'occupied' | 'reserved';
  positionX: number;
  positionY: number;
}

const TablesManagement: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTable, setCurrentTable] = useState<Table | null>(null);
  const [isLayoutMode, setIsLayoutMode] = useState(false);

  useEffect(() => {
    // In a real application, you would fetch tables from an API
    const mockTables: Table[] = [
      { id: '1', number: 1, capacity: 4, shape: 'square', status: 'available', positionX: 100, positionY: 100 },
      { id: '2', number: 2, capacity: 2, shape: 'round', status: 'occupied', positionX: 250, positionY: 100 },
      { id: '3', number: 3, capacity: 6, shape: 'square', status: 'reserved', positionX: 100, positionY: 250 },
    ];
    setTables(mockTables);
  }, []);

  const handleAddTable = () => {
    setCurrentTable(null);
    setIsModalOpen(true);
  };

  const handleEditTable = (table: Table) => {
    setCurrentTable(table);
    setIsModalOpen(true);
  };

  const handleDeleteTable = (tableId: string) => {
    if (window.confirm('Are you sure you want to delete this table?')) {
      setTables(tables.filter(table => table.id !== tableId));
    }
  };

  const handleSaveTable = (table: Table) => {
    if (table.id) {
      setTables(tables.map(t => t.id === table.id ? table : t));
    } else {
      const newTable = { ...table, id: Date.now().toString() };
      setTables([...tables, newTable]);
    }
    setIsModalOpen(false);
  };

  const handleDragTable = (tableId: string, x: number, y: number) => {
    setTables(tables.map(table => 
      table.id === tableId ? { ...table, positionX: x, positionY: y } : table
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Table Management</h2>
        <div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddTable}
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center mr-2"
          >
            <Plus className="mr-2" /> Add Table
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLayoutMode(!isLayoutMode)}
            className={`px-4 py-2 rounded-md flex items-center ${isLayoutMode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {isLayoutMode ? 'Save Layout' : 'Edit Layout'}
          </motion.button>
        </div>
      </div>

      {isLayoutMode ? (
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 h-[600px] relative">
          {tables.map(table => (
            <motion.div
              key={table.id}
              drag={isLayoutMode}
              dragMomentum={false}
              onDragEnd={(_, info) => handleDragTable(table.id, info.point.x, info.point.y)}
              style={{ 
                position: 'absolute',
                left: table.positionX,
                top: table.positionY,
                cursor: isLayoutMode ? 'move' : 'default'
              }}
              className={`w-20 h-20 flex items-center justify-center text-white font-bold ${
                table.status === 'available' ? 'bg-green-500' :
                table.status === 'occupied' ? 'bg-red-500' : 'bg-yellow-500'
              }`}
            >
              {table.shape === 'square' ? (
                <Square className="w-full h-full p-2" />
              ) : (
                <Circle className="w-full h-full p-2" />
              )}
              <span className="absolute">{table.number}</span>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shape</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tables.map(table => (
                <tr key={table.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{table.number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{table.capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{table.shape}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      table.status === 'available' ? 'bg-green-100 text-green-800' :
                      table.status === 'occupied' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {table.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEditTable(table)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDeleteTable(table.id)} className="text-red-600 hover:text-red-900">
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <TableModal
          table={currentTable}
          onSave={handleSaveTable}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

interface TableModalProps {
  table: Table | null;
  onSave: (table: Table) => void;
  onClose: () => void;
}

const TableModal: React.FC<TableModalProps> = ({ table, onSave, onClose }) => {
  const [formData, setFormData] = useState<Table>(
    table || {
      id: '',
      number: 0,
      capacity: 0,
      shape: 'square',
      status: 'available',
      positionX: 0,
      positionY: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">{table ? 'Edit Table' : 'Add New Table'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Table Number</label>
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Shape</label>
            <select
              name="shape"
              value={formData.shape}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="square">Square</option>
              <option value="round">Round</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TablesManagement;
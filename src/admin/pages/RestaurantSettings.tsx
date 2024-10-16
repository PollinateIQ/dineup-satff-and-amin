import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Save, Palette } from 'lucide-react';

interface RestaurantSettings {
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  customCSS: string;
}

const RestaurantSettings: React.FC = () => {
  const [settings, setSettings] = useState<RestaurantSettings>({
    name: 'My Restaurant',
    description: 'A great place to eat',
    logo: '',
    coverImage: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    fontFamily: 'Arial, sans-serif',
    customCSS: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'coverImage') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the settings to your backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Restaurant Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
          <input
            type="text"
            name="name"
            value={settings.name}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={settings.description}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Logo</label>
          <div className="mt-1 flex items-center">
            {settings.logo && (
              <img src={settings.logo} alt="Logo" className="w-16 h-16 object-cover mr-4" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'logo')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cover Image</label>
          <div className="mt-1 flex items-center">
            {settings.coverImage && (
              <img src={settings.coverImage} alt="Cover" className="w-32 h-16 object-cover mr-4" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'coverImage')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Primary Color</label>
            <div className="mt-1 flex items-center">
              <input
                type="color"
                name="primaryColor"
                value={settings.primaryColor}
                onChange={handleInputChange}
                className="w-8 h-8 rounded-full overflow-hidden"
              />
              <input
                type="text"
                name="primaryColor"
                value={settings.primaryColor}
                onChange={handleInputChange}
                className="ml-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
            <div className="mt-1 flex items-center">
              <input
                type="color"
                name="secondaryColor"
                value={settings.secondaryColor}
                onChange={handleInputChange}
                className="w-8 h-8 rounded-full overflow-hidden"
              />
              <input
                type="text"
                name="secondaryColor"
                value={settings.secondaryColor}
                onChange={handleInputChange}
                className="ml-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Font Family</label>
          <select
            name="fontFamily"
            value={settings.fontFamily}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="Arial, sans-serif">Arial</option>
            <option value="'Helvetica Neue', Helvetica, sans-serif">Helvetica</option>
            <option value="'Times New Roman', Times, serif">Times New Roman</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="'Courier New', Courier, monospace">Courier New</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Custom CSS</label>
          <textarea
            name="customCSS"
            value={settings.customCSS}
            onChange={handleInputChange}
            rows={5}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 font-mono text-sm"
            placeholder="Enter custom CSS here..."
          />
        </div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </motion.button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
        <div 
          className="p-4 border rounded-md"
          style={{
            fontFamily: settings.fontFamily,
            backgroundColor: settings.primaryColor,
            color: settings.secondaryColor
          }}
        >
          <h4 className="text-xl font-bold mb-2">{settings.name}</h4>
          <p>{settings.description}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSettings;
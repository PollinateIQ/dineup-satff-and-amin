import React, { useState } from 'react';

interface RestaurantSettings {
  name: string;
  description: string;
  address: string;
  phone: string;
  openingHours: string;
}

const initialSettings: RestaurantSettings = {
  name: 'Sample Restaurant',
  description: 'A great place to eat',
  address: '123 Main St, City, Country',
  phone: '+1 234 567 8900',
  openingHours: 'Mon-Fri: 9am-10pm, Sat-Sun: 10am-11pm',
};

const RestaurantSettings: React.FC = () => {
  const [settings, setSettings] = useState<RestaurantSettings>(initialSettings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated settings to your backend
    console.log('Updated settings:', settings);
    alert('Settings updated successfully!');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Restaurant Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Restaurant Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={settings.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={settings.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block mb-1">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={settings.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-1">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={settings.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="openingHours" className="block mb-1">Opening Hours</label>
          <input
            type="text"
            id="openingHours"
            name="openingHours"
            value={settings.openingHours}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default RestaurantSettings;
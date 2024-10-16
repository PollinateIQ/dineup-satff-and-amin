import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Users, Utensils, CheckSquare, Settings, BarChart, 
  DollarSign, Package, Clipboard, Grid, Menu as MenuIcon, X
} from 'lucide-react';
import Overview from '../components/Overview';

// Assume we have a function to get restaurant settings
import { getRestaurantSettings } from '../utils/settingsHelper';

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [brandColors, setBrandColors] = useState({ primary: '#3B82F6', secondary: '#1E40AF' });
  const location = useLocation();

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getRestaurantSettings();
      setBrandColors({
        primary: settings.primaryColor,
        secondary: settings.secondaryColor
      });
    };
    fetchSettings();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div 
        className={`text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}
        style={{ backgroundColor: brandColors.primary }}
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 0 }}
      >
        <div className="flex items-center justify-between px-4">
          <h2 className="text-2xl font-semibold">DineUp Admin</h2>
          <button onClick={toggleSidebar} className="p-2 rounded-md md:hidden">
            <X size={24} />
          </button>
        </div>
        <nav>
          <SidebarLink to="/admin" icon={<BarChart />} label="Overview" isActive={location.pathname === '/admin'} />
          <SidebarLink to="/admin/users" icon={<Users />} label="User Management" isActive={location.pathname === '/admin/users'} />
          <SidebarLink to="/admin/menu" icon={<Utensils />} label="Menu Management" isActive={location.pathname === '/admin/menu'} />
          <SidebarLink to="/admin/inventory" icon={<Package />} label="Inventory" isActive={location.pathname === '/admin/inventory'} />
          <SidebarLink to="/admin/finances" icon={<DollarSign />} label="Finances" isActive={location.pathname === '/admin/finances'} />
          <SidebarLink to="/admin/orders" icon={<Clipboard />} label="Orders" isActive={location.pathname === '/admin/orders'} />
          <SidebarLink to="/admin/tables" icon={<Grid />} label="Tables" isActive={location.pathname === '/admin/tables'} />
          <SidebarLink to="/admin/qr-generator" icon={<CheckSquare />} label="QR Code Generator" isActive={location.pathname === '/admin/qr-generator'} />
          <SidebarLink to="/admin/settings" icon={<Settings />} label="Settings" isActive={location.pathname === '/admin/settings'} />
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md">
          <div className="flex items-center justify-between p-4">
            <button onClick={toggleSidebar} className="p-2 rounded-md md:hidden">
              <MenuIcon size={24} />
            </button>
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <div>{/* Add user profile or notifications here */}</div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          {location.pathname === '/admin' ? (
            <Overview brandColors={brandColors} />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

const SidebarLink: React.FC<{ to: string; icon: React.ReactNode; label: string; isActive: boolean }> = ({ to, icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-opacity-80 ${isActive ? 'bg-opacity-80' : ''}`}
    style={{ backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent' }}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default AdminDashboard;
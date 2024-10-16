import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Utensils, CheckSquare, Settings, BarChart, 
  DollarSign, Package, Clipboard, Grid, PieChart, 
  Menu as MenuIcon, X
} from 'lucide-react';
import UserManagement from '../components/admin/UserManagement';
import MenuManagement from '../components/admin/MenuManagement';
import RestaurantSettings from '../components/admin/RestaurantSettings';
import QRCodeGenerator from '../components/admin/QRCodeGenerator';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend
);

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'menu':
        return <MenuManagement />;
      case 'settings':
        return <RestaurantSettings />;
      case 'qrcode':
        return <QRCodeGenerator />;
      case 'inventory':
        return <InventoryManagement />;
      case 'finances':
        return <FinancesManagement />;
      case 'orders':
        return <OrdersManagement />;
      case 'tables':
        return <TablesManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div 
        className={`bg-blue-600 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}
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
          <SidebarLink icon={<BarChart />} label="Overview" tabName="overview" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarLink icon={<Users />} label="User Management" tabName="users" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarLink icon={<Utensils />} label="Menu Management" tabName="menu" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarLink icon={<Package />} label="Inventory" tabName="inventory" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarLink icon={<DollarSign />} label="Finances" tabName="finances" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarLink icon={<Clipboard />} label="Orders" tabName="orders" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarLink icon={<Grid />} label="Tables" tabName="tables" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarLink icon={<CheckSquare />} label="QR Code Generator" tabName="qrcode" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarLink icon={<Settings />} label="Settings" tabName="settings" activeTab={activeTab} setActiveTab={setActiveTab} />
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
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

const SidebarLink: React.FC<{ icon: React.ReactNode; label: string; tabName: string; activeTab: string; setActiveTab: (tab: string) => void }> = ({ icon, label, tabName, activeTab, setActiveTab }) => (
  <a
    href={`#${tabName}`}
    className={`flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-blue-700 ${activeTab === tabName ? 'bg-blue-700' : ''}`}
    onClick={() => setActiveTab(tabName)}
  >
    {icon}
    <span>{label}</span>
  </a>
);

const DashboardOverview: React.FC = () => {
  // Mock data for the overview
  const totalUsers = 1250;
  const totalOrders = 5678;
  const completedOrders = 5432;
  const totalRevenue = 98765.43;

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 22000, 18000, 24000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const orderStatusData = {
    labels: ['Completed', 'In Progress', 'Cancelled'],
    datasets: [
      {
        data: [5432, 200, 46],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <OverviewCard title="Total Users" value={totalUsers} icon={<Users className="h-8 w-8 text-blue-500" />} />
        <OverviewCard title="Total Orders" value={totalOrders} icon={<Utensils className="h-8 w-8 text-green-500" />} />
        <OverviewCard title="Completed Orders" value={completedOrders} icon={<CheckSquare className="h-8 w-8 text-purple-500" />} />
        <OverviewCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} icon={<BarChart className="h-8 w-8 text-yellow-500" />} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Revenue Trend</h3>
          <Line data={revenueData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Order Status</h3>
          <Pie data={orderStatusData} />
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recent Completed Orders</h3>
        <RecentCompletedOrders />
      </div>
    </div>
  );
};

const OverviewCard: React.FC<{ title: string; value: number | string; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="bg-gray-100 p-3 rounded-full">
        {icon}
      </div>
    </div>
  </motion.div>
);

const RecentCompletedOrders: React.FC = () => {
  // Mock data for recent completed orders
  const recentOrders = [
    { id: '1234', customer: 'John Doe', total: 45.99, date: '2023-05-15' },
    { id: '1235', customer: 'Jane Smith', total: 32.50, date: '2023-05-14' },
    { id: '1236', customer: 'Bob Johnson', total: 78.25, date: '2023-05-13' },
    { id: '1237', customer: 'Alice Brown', total: 22.99, date: '2023-05-12' },
  ];

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recentOrders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const InventoryManagement: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Inventory Management</h2>
      <p>Implement inventory management features here.</p>
    </div>
  );
};

const FinancesManagement: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Finances Management</h2>
      <p>Implement finances management features here.</p>
    </div>
  );
};

const OrdersManagement: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Orders Management</h2>
      <p>Implement orders management features here.</p>
    </div>
  );
};

const TablesManagement: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Tables Management</h2>
      <p>Implement tables management features here.</p>
    </div>
  );
};

export default AdminDashboard;
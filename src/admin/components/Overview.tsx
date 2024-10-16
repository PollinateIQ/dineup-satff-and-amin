import React from 'react';
import { motion } from 'framer-motion';
import { Users, Utensils, CheckSquare, BarChart, DollarSign, ShoppingCart, Package, Clock, AlertTriangle } from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
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

interface OverviewProps {
  brandColors: {
    primary: string;
    secondary: string;
  };
}

const Overview: React.FC<OverviewProps> = ({ brandColors }) => {
  // Mock data
  const totalUsers = 1250;
  const totalOrders = 5678;
  const completedOrders = 5432;
  const totalRevenue = 987654.32;
  const lowStockItems = 5;
  const averageOrderTime = 25; // minutes

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [120000, 190000, 150000, 220000, 180000, 240000],
        borderColor: brandColors.primary,
        backgroundColor: `${brandColors.primary}33`,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const orderStatusData = {
    labels: ['Completed', 'In Progress', 'Cancelled'],
    datasets: [
      {
        data: [5432, 200, 46],
        backgroundColor: [brandColors.primary, brandColors.secondary, '#F44336'],
      },
    ],
  };

  const stockLevels = {
    labels: ['Low Stock', 'Adequate Stock'],
    datasets: [
      {
        data: [lowStockItems, 20 - lowStockItems], // Assuming 20 total inventory items
        backgroundColor: ['#FFA500', '#4CAF50'],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6" style={{ color: brandColors.primary }}>Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OverviewCard title="Total Users" value={totalUsers} icon={<Users />} color={brandColors.primary} />
        <OverviewCard title="Total Orders" value={totalOrders} icon={<ShoppingCart />} color={brandColors.secondary} />
        <OverviewCard title="Completed Orders" value={completedOrders} icon={<CheckSquare />} color={brandColors.primary} />
        <OverviewCard title="Total Revenue" value={`R ${totalRevenue.toFixed(2)}`} icon={<DollarSign />} color={brandColors.secondary} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4" style={{ color: brandColors.primary }}>Revenue Trend</h3>
          <Line 
            data={revenueData} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `R ${value}`,
                  },
                },
              },
            }}
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4" style={{ color: brandColors.primary }}>Order Status</h3>
          <Doughnut 
            data={orderStatusData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4" style={{ color: brandColors.primary }}>Inventory Status</h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium">Stock Levels</span>
            <span className="text-2xl font-bold" style={{ color: lowStockItems > 0 ? '#FFA500' : '#4CAF50' }}>
              {lowStockItems} / 20
            </span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-green-500" 
              style={{ width: `${(20 - lowStockItems) / 20 * 100}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {lowStockItems} items need restocking
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4" style={{ color: brandColors.primary }}>Average Order Time</h3>
          <div className="flex items-center justify-center">
            <div className="relative">
              <Clock size={120} color={brandColors.secondary} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{averageOrderTime}</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-gray-600">
            Average time to complete an order
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4" style={{ color: brandColors.primary }}>Alerts</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-yellow-600">
              <AlertTriangle size={20} className="mr-2" />
              <span>5 menu items low on stock</span>
            </li>
            <li className="flex items-center text-red-600">
              <AlertTriangle size={20} className="mr-2" />
              <span>2 orders exceeding target time</span>
            </li>
            <li className="flex items-center text-green-600">
              <CheckSquare size={20} className="mr-2" />
              <span>All equipment operational</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4" style={{ color: brandColors.primary }}>Recent Orders</h3>
        <RecentOrders brandColors={brandColors} />
      </div>
    </div>
  );
};

const OverviewCard: React.FC<{ title: string; value: number | string; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-3xl font-bold mt-2" style={{ color }}>{value}</p>
      </div>
      <div className="p-3 rounded-full" style={{ backgroundColor: `${color}22` }}>
        {React.cloneElement(icon as React.ReactElement, { size: 24, color: color })}
      </div>
    </div>
  </motion.div>
);

const RecentOrders: React.FC<{ brandColors: { primary: string; secondary: string } }> = ({ brandColors }) => {
  const recentOrders = [
    { id: '1234', customer: 'John Doe', total: 459.99, status: 'Completed', date: '2023-05-15', time: '15:30' },
    { id: '1235', customer: 'Jane Smith', total: 325.50, status: 'In Progress', date: '2023-05-14', time: '14:45' },
    { id: '1236', customer: 'Bob Johnson', total: 782.25, status: 'Completed', date: '2023-05-13', time: '12:15' },
    { id: '1237', customer: 'Alice Brown', total: 229.99, status: 'Cancelled', date: '2023-05-12', time: '18:00' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Order ID', 'Customer', 'Total', 'Status', 'Date', 'Time'].map((header) => (
              <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recentOrders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R {order.total.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                  order.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Overview;
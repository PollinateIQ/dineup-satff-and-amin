import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import MenuManagement from './pages/MenuManagement';
import OrderManagement from './pages/OrderManagement';
import InventoryManagement from './pages/InventoryManagement';
import FinancesManagement from './pages/FinancesManagement';
import TablesManagement from './pages/TablesManagement';
import QRCodeGenerator from './pages/QRCodeGenerator';
import RestaurantSettings from './pages/RestaurantSettings';

const AdminApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />}>
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="menu" element={<MenuManagement />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="inventory" element={<InventoryManagement />} />
        <Route path="finances" element={<FinancesManagement />} />
        <Route path="tables" element={<TablesManagement />} />
        <Route path="qr-generator" element={<QRCodeGenerator />} />
        <Route path="settings" element={<RestaurantSettings />} />
      </Route>
    </Routes>
  );
};

const AdminOverview: React.FC = () => {
  return <h2>Admin Overview</h2>;
};

export default AdminApp;
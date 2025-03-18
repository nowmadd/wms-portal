import React from 'react';
import './App.scss';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout';
// eslint-disable-next-line no-unused-vars
import Blank from './pages/Blank';
import Home from './pages/Home';
import InventoryLayout from './pages/Inventory-old/InventoryLayout';
import Inventory from './pages/Inventory-old/Inventory';
import Packaging from './pages/Inventory-old/Packaging';
import Jobs from './pages/Jobs';
import Orders from './pages/Orders';
import Shipments from './pages/Shipments';
import Workflows from './pages/Workflows';
import Locations from './pages/Locations';
import Profile from './pages/Profile';

import AdminLayout from './pages/Admin/AdminLayout';
import Tenants from './pages/Admin/Tenants/TenantList';
import TenantView from './pages/Admin/Tenants/TenantView';
// import Users from './pages/Admin/Users';
import Groups from './pages/Admin/Groups';
import Warehouses from './pages/Admin/Warehouses';
import Account from './pages/Admin/Account';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/inventory" element={<InventoryLayout />}>
            <Route index element={<Navigate to="/inventory/items" replace={true} />} />
            <Route path="/inventory/items" element={<Inventory />} />
            <Route path="/inventory/packaging" element={<Packaging />} />
          </Route>
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/tenants" replace={true} />} />
            <Route path="/admin/tenants" element={<Tenants />} />
            <Route path="/admin/tenants/tenant" element={<TenantView />} />
            {/* <Route path="/admin/users" element={<Users />} /> */}
            <Route path="/admin/groups" element={<Groups />} />
            <Route path="/admin/warehouses" element={<Warehouses />} />
            <Route path="/admin/account" element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

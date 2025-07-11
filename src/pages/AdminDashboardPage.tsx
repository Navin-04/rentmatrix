import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardPage: React.FC = () => (
  <div className="container mx-auto py-8">
    <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <ul className="space-y-2">
      <li><Link to="/admin/users" className="text-blue-600 underline">Manage Users</Link></li>
      <li><Link to="/admin/listings" className="text-blue-600 underline">Manage Listings</Link></li>
    </ul>
  </div>
);

export default AdminDashboardPage; 
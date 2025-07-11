import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, Heart, MessageCircle, Settings,
  Package, FileText, CreditCard, LogOut
} from 'lucide-react';

import DashboardHome from '../components/dashboard/DashboardHome';
import MyListings from '../components/dashboard/MyListings';
import MyBookings from '../components/dashboard/MyBookings';
import Favorites from '../components/dashboard/Favorites';
import Messages from '../components/dashboard/Messages';
import AccountSettings from '../components/dashboard/AccountSettings';

const UserDashboardPage: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/dashboard/my-listings', label: 'My Listings', icon: <Package size={20} /> },
    { path: '/dashboard/my-bookings', label: 'My Bookings', icon: <ShoppingBag size={20} /> },
    { path: '/dashboard/favorites', label: 'Favorites', icon: <Heart size={20} /> },
    { path: '/dashboard/messages', label: 'Messages', icon: <MessageCircle size={20} /> },
    { path: '/dashboard/settings', label: 'Account Settings', icon: <Settings size={20} /> },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile navigation toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <span className="font-medium">Dashboard Menu</span>
              <span>{isMobileMenuOpen ? '−' : '+'}</span>
            </button>
          </div>
          
          {/* Sidebar */}
          <div className={`lg:w-1/4 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center">
                  <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="User Avatar"
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">Rahul Sharma</h2>
                    <p className="text-gray-500 text-sm">rahul.sharma@example.com</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className={`flex items-center p-3 rounded-md transition-colors ${
                          isActive(link.path)
                            ? 'bg-primary-50 text-primary-600'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <span className="mr-3">{link.icon}</span>
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                  
                  <li className="pt-4 mt-4 border-t">
                    <Link
                      to="/logout"
                      className="flex items-center p-3 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={20} className="mr-3" />
                      <span>Logout</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            
            <div className="mt-6 bg-primary-50 border border-primary-100 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-primary-100 p-3 rounded-full mr-3">
                  <FileText size={20} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium">Post a New Listing</h3>
                  <p className="text-sm text-gray-600">Rent out your items and earn</p>
                </div>
              </div>
              <Link to="/post-ad" className="btn-primary w-full mt-3 text-center">
                Post Ad
              </Link>
            </div>
            
            <div className="mt-6 bg-secondary-50 border border-secondary-100 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-secondary-100 p-3 rounded-full mr-3">
                  <CreditCard size={20} className="text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-medium">Total Earnings</h3>
                  <p className="text-xl font-bold text-secondary-600">₹24,500</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/my-listings" element={<MyListings />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/settings" element={<AccountSettings />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
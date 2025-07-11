import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Package, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

const DashboardHome: React.FC = () => {
  // Mock data
  const stats = [
    { title: 'Active Listings', value: 12, icon: <Package size={24} className="text-primary-500" />, color: 'bg-primary-50' },
    { title: 'Active Bookings', value: 5, icon: <ShoppingBag size={24} className="text-blue-500" />, color: 'bg-blue-50' },
    { title: 'Total Earnings', value: 24500, icon: <TrendingUp size={24} className="text-green-500" />, color: 'bg-green-50' },
    { title: 'Profile Views', value: 156, icon: <Users size={24} className="text-purple-500" />, color: 'bg-purple-50' },
  ];
  
  const recentBookings = [
    { id: 1, product: 'Sony A7 III Camera', customer: 'Priya Sharma', startDate: '2025-01-15', endDate: '2025-01-18', amount: 2997, status: 'Active' },
    { id: 2, product: 'MacBook Pro 16"', customer: 'Arjun Mehta', startDate: '2025-01-10', endDate: '2025-01-14', amount: 3596, status: 'Completed' },
    { id: 3, product: 'DJI Mavic Air 2', customer: 'Vikram Singh', startDate: '2025-01-20', endDate: '2025-01-22', amount: 1499, status: 'Upcoming' },
  ];
  
  const recentListings = [
    { id: 1, title: 'Sony A7 III Camera', price: 999, priceType: 'day', views: 45, status: 'Active' },
    { id: 2, title: 'MacBook Pro 16"', price: 899, priceType: 'day', views: 32, status: 'Active' },
    { id: 3, title: 'DJI Mavic Air 2', price: 499, priceType: 'day', views: 28, status: 'Inactive' },
  ];
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border rounded-lg p-4 flex items-center">
            <div className={`${stat.color} p-3 rounded-full mr-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-xl font-bold">
                {stat.title.includes('Earnings') 
                  ? formatCurrency(stat.value) 
                  : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Bookings */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>
          <Link to="/dashboard/my-bookings" className="text-primary-500 hover:text-primary-600 flex items-center text-sm">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{booking.product}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{booking.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{booking.startDate} to {booking.endDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{formatCurrency(booking.amount)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${booking.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recent Listings */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Listings</h2>
          <Link to="/dashboard/my-listings" className="text-primary-500 hover:text-primary-600 flex items-center text-sm">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentListings.map((listing) => (
                <tr key={listing.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{listing.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{formatCurrency(listing.price)}/{listing.priceType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{listing.views}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${listing.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-secondary-600 hover:text-secondary-800 text-sm">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
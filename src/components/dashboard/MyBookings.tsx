import React, { useState } from 'react';
import { Search, Filter, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

const MyBookings: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'rented' | 'lent'>('rented');
  
  // Mock data
  const rentedItems = [
    { 
      id: 1, 
      title: 'MacBook Pro 16" (2023)',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      owner: 'Tech Rentals',
      startDate: '2025-01-10',
      endDate: '2025-01-14',
      amount: 3596,
      status: 'completed',
    },
    { 
      id: 2, 
      title: 'Sony A7 III Camera',
      image: 'https://images.pexels.com/photos/3605071/pexels-photo-3605071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      owner: 'Photography Rentals',
      startDate: '2025-01-15',
      endDate: '2025-01-18',
      amount: 2997,
      status: 'active',
    },
    { 
      id: 3, 
      title: 'DJI Mavic Air 2 Drone',
      image: 'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      owner: 'Drone Rental Hub',
      startDate: '2025-01-20',
      endDate: '2025-01-22',
      amount: 1499,
      status: 'upcoming',
    },
  ];
  
  const lentItems = [
    { 
      id: 1, 
      title: 'Sony A7 III Camera',
      image: 'https://images.pexels.com/photos/3605071/pexels-photo-3605071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      renter: 'Priya Sharma',
      startDate: '2025-01-15',
      endDate: '2025-01-18',
      amount: 2997,
      status: 'active',
    },
    { 
      id: 2, 
      title: 'MacBook Pro 16" (2023)',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      renter: 'Arjun Mehta',
      startDate: '2025-01-10',
      endDate: '2025-01-14',
      amount: 3596,
      status: 'completed',
    },
    { 
      id: 3, 
      title: 'Modern Sofa Set',
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      renter: 'Kavita Reddy',
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      amount: 4999,
      status: 'active',
    },
  ];
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };
  
  // Filter bookings based on search query and status
  const getFilteredBookings = () => {
    const bookings = activeTab === 'rented' ? rentedItems : lentItems;
    
    return bookings.filter(booking => {
      const matchesSearch = booking.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };
  
  const filteredBookings = getFilteredBookings();
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <AlertCircle size={16} className="text-yellow-500" />;
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'upcoming':
        return <Clock size={16} className="text-blue-500" />;
      default:
        return null;
    }
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      
      <div className="bg-white border rounded-lg overflow-hidden mb-6">
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 font-medium text-center ${
              activeTab === 'rented' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('rented')}
          >
            Items I Rented
          </button>
          <button
            className={`flex-1 py-3 font-medium text-center ${
              activeTab === 'lent' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('lent')}
          >
            Items I Lent Out
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="input-field pl-10 w-full"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="flex items-center">
              <Filter size={18} className="text-gray-500 mr-2" />
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="input-field"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {filteredBookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No bookings found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map(booking => (
            <div key={booking.id} className="bg-white border rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-48 h-48">
                  <img 
                    src={booking.image} 
                    alt={booking.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4 flex-grow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="font-medium text-lg mb-1">{booking.title}</h3>
                      {activeTab === 'rented' ? (
                        <p className="text-gray-600">Owner: {booking.owner}</p>
                      ) : (
                        <p className="text-gray-600">Rented by: {booking.renter}</p>
                      )}
                      
                      <div className="flex items-center mt-2">
                        <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(booking.status)}`}>
                          <span className="mr-1">{getStatusIcon(booking.status)}</span>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        
                        <span className="ml-4 text-sm text-gray-500 flex items-center">
                          <Calendar size={14} className="mr-1" /> 
                          {booking.startDate} to {booking.endDate}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 md:mt-0">
                      <p className="text-lg font-bold text-primary-600">
                        {formatCurrency(booking.amount)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="btn-outline py-1.5 px-3 text-sm">View Details</button>
                    
                    {booking.status === 'active' && (
                      <button className="btn-primary py-1.5 px-3 text-sm">
                        {activeTab === 'rented' ? 'Return Item' : 'Confirm Return'}
                      </button>
                    )}
                    
                    {booking.status === 'completed' && (
                      <button className="btn-outline py-1.5 px-3 text-sm">Leave Review</button>
                    )}
                    
                    {booking.status === 'upcoming' && (
                      <button className="btn-outline py-1.5 px-3 text-sm text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
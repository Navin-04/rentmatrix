import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Eye, Edit, Trash2, Search, Filter, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

const MyListings: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [showStatusModal, setShowStatusModal] = useState<{id: number, action: 'activate' | 'deactivate'} | null>(null);
  const [loading, setLoading] = useState<number | null>(null);
  
  // Mock data
  const [listings, setListings] = useState([
    { 
      id: 1, 
      title: 'Sony A7 III Camera with 24-70mm Lens', 
      image: 'https://images.pexels.com/photos/3605071/pexels-photo-3605071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 999, 
      priceType: 'day', 
      status: 'active',
      views: 45,
      bookings: 3,
      createdAt: '2024-12-15',
    },
    { 
      id: 2, 
      title: 'MacBook Pro 16" (2023) - 32GB RAM', 
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 899, 
      priceType: 'day', 
      status: 'active',
      views: 32,
      bookings: 2,
      createdAt: '2024-12-18',
    },
    { 
      id: 3, 
      title: 'DJI Mavic Air 2 Drone', 
      image: 'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 499, 
      priceType: 'day', 
      status: 'inactive',
      views: 28,
      bookings: 0,
      createdAt: '2024-12-20',
    },
    { 
      id: 4, 
      title: 'Modern Sofa Set - 3 Seater', 
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 4999, 
      priceType: 'month', 
      status: 'active',
      views: 38,
      bookings: 1,
      createdAt: '2024-12-25',
    },
    { 
      id: 5, 
      title: 'Honda City 2020 Model', 
      image: 'https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 1299, 
      priceType: 'day', 
      status: 'pending',
      views: 15,
      bookings: 0,
      createdAt: '2025-01-02',
    },
  ]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-listing/${id}`);
  };

  const handleDelete = async (id: number) => {
    setLoading(id);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setListings(prev => prev.filter(listing => listing.id !== id));
      setShowDeleteModal(null);
    } catch (error) {
      console.error('Error deleting listing:', error);
    } finally {
      setLoading(null);
    }
  };

  const handleStatusChange = async (id: number, newStatus: 'active' | 'inactive') => {
    setLoading(id);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setListings(prev => prev.map(listing => 
        listing.id === id ? { ...listing, status: newStatus } : listing
      ));
      setShowStatusModal(null);
    } catch (error) {
      console.error('Error updating listing status:', error);
    } finally {
      setLoading(null);
    }
  };
  
  // Filter listings based on search query and status
  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || listing.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Listings</h1>
        <Link to="/post-ad" className="btn-primary flex items-center">
          <PlusCircle size={18} className="mr-2" />
          Add New Listing
        </Link>
      </div>
      
      <div className="bg-white border rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search listings..."
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
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>
      
      {filteredListings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No listings found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredListings.map(listing => (
            <div key={listing.id} className="bg-white border rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-48 h-48">
                  <img 
                    src={listing.image} 
                    alt={listing.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4 flex-grow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="font-medium text-lg mb-1">{listing.title}</h3>
                      <p className="text-primary-600 font-bold">
                        {formatCurrency(listing.price)} / {listing.priceType}
                      </p>
                      
                      <div className="flex items-center mt-2">
                        <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(listing.status)}`}>
                          {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                        </span>
                        <span className="ml-4 text-sm text-gray-500 flex items-center">
                          <Eye size={14} className="mr-1" /> {listing.views} views
                        </span>
                        <span className="ml-4 text-sm text-gray-500">
                          {listing.bookings} bookings
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 md:mt-0">
                      <p className="text-sm text-gray-500">
                        Listed on: {listing.createdAt}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link to={`/products/${listing.id}`} className="btn-outline py-1.5 px-3 text-sm flex items-center">
                      <Eye size={14} className="mr-1" /> View
                    </Link>
                    <button 
                      onClick={() => handleEdit(listing.id)}
                      className="btn-outline py-1.5 px-3 text-sm flex items-center text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      <Edit size={14} className="mr-1" /> Edit
                    </button>
                    <button 
                      onClick={() => setShowDeleteModal(listing.id)}
                      className="btn-outline py-1.5 px-3 text-sm flex items-center text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 size={14} className="mr-1" /> Delete
                    </button>
                    
                    {listing.status === 'active' ? (
                      <button 
                        onClick={() => setShowStatusModal({id: listing.id, action: 'deactivate'})}
                        className="btn-outline py-1.5 px-3 text-sm flex items-center text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button 
                        onClick={() => setShowStatusModal({id: listing.id, action: 'activate'})}
                        className="btn-outline py-1.5 px-3 text-sm flex items-center text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                      >
                        Activate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle size={24} className="text-red-500 mr-3" />
              <h3 className="text-lg font-semibold">Delete Listing</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this listing? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 btn-outline"
                disabled={loading === showDeleteModal}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="flex-1 btn-primary bg-red-600 hover:bg-red-700"
                disabled={loading === showDeleteModal}
              >
                {loading === showDeleteModal ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Change Confirmation Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle size={24} className="text-yellow-500 mr-3" />
              <h3 className="text-lg font-semibold">
                {showStatusModal.action === 'activate' ? 'Activate' : 'Deactivate'} Listing
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to {showStatusModal.action} this listing? 
              {showStatusModal.action === 'deactivate' && ' It will no longer be visible to renters.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowStatusModal(null)}
                className="flex-1 btn-outline"
                disabled={loading === showStatusModal.id}
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusChange(showStatusModal.id, showStatusModal.action === 'activate' ? 'active' : 'inactive')}
                className={`flex-1 btn-primary ${
                  showStatusModal.action === 'activate' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
                disabled={loading === showStatusModal.id}
              >
                {loading === showStatusModal.id ? 'Updating...' : showStatusModal.action === 'activate' ? 'Activate' : 'Deactivate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
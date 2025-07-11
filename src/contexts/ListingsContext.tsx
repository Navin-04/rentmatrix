import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Listing {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  priceType: 'day' | 'week' | 'month';
  location: string;
  images: string[];
  securityDeposit: number;
  availableFrom: string;
  availableTo: string;
  status: 'active' | 'inactive' | 'pending';
  views: number;
  bookings: number;
  createdAt: string;
  userId?: string; // For future backend integration
}

interface ListingsContextType {
  listings: Listing[];
  addListing: (listing: Omit<Listing, 'id' | 'status' | 'views' | 'bookings' | 'createdAt'>) => void;
  updateListing: (id: number, updates: Partial<Listing>) => void;
  deleteListing: (id: number) => void;
  getListingById: (id: number) => Listing | undefined;
  getUserListings: (userId?: string) => Listing[];
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

// Sample initial data
const initialListings: Listing[] = [
  { 
    id: 1, 
    title: 'Sony A7 III Camera with 24-70mm Lens', 
    category: 'cameras',
    description: 'Professional mirrorless camera with amazing image quality. Perfect for photography enthusiasts and professionals. Comes with a 24-70mm f/2.8 G Master lens, camera bag, extra battery, and 64GB memory card.',
    price: 999, 
    priceType: 'day', 
    status: 'active',
    views: 45,
    bookings: 3,
    createdAt: '2024-12-15',
    location: 'Mumbai, Maharashtra',
    images: ['https://images.pexels.com/photos/3605071/pexels-photo-3605071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    securityDeposit: 1000,
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31',
  },
  { 
    id: 2, 
    title: 'MacBook Pro 16" (2023) - 32GB RAM', 
    category: 'electronics',
    description: 'Latest MacBook Pro with M2 Pro chip, 32GB RAM, and 1TB SSD. Perfect for professional work, video editing, and development.',
    price: 899, 
    priceType: 'day', 
    status: 'active',
    views: 32,
    bookings: 2,
    createdAt: '2024-12-18',
    location: 'Bangalore, Karnataka',
    images: ['https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    securityDeposit: 1500,
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31',
  },
  { 
    id: 3, 
    title: 'DJI Mavic Air 2 Drone', 
    category: 'cameras',
    description: 'Professional drone with 4K camera, 34-minute flight time, and advanced obstacle avoidance. Perfect for aerial photography and videography.',
    price: 499, 
    priceType: 'day', 
    status: 'inactive',
    views: 28,
    bookings: 0,
    createdAt: '2024-12-20',
    location: 'Delhi, NCR',
    images: ['https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    securityDeposit: 800,
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31',
  },
  { 
    id: 4, 
    title: 'Modern Sofa Set - 3 Seater', 
    category: 'furniture',
    description: 'Comfortable 3-seater sofa in excellent condition. Perfect for temporary accommodation or events.',
    price: 4999, 
    priceType: 'month', 
    status: 'active',
    views: 38,
    bookings: 1,
    createdAt: '2024-12-25',
    location: 'Chennai, Tamil Nadu',
    images: ['https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    securityDeposit: 2000,
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31',
  },
  { 
    id: 5, 
    title: 'Honda City 2020 Model', 
    category: 'vehicles',
    description: 'Well-maintained Honda City with automatic transmission. Perfect for city travel and road trips.',
    price: 1299, 
    priceType: 'day', 
    status: 'pending',
    views: 15,
    bookings: 0,
    createdAt: '2025-01-02',
    location: 'Pune, Maharashtra',
    images: ['https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    securityDeposit: 5000,
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31',
  },
];

export const ListingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('rentmatrix_listings');
    return saved ? JSON.parse(saved) : initialListings;
  });

  // Save to localStorage whenever listings change
  useEffect(() => {
    localStorage.setItem('rentmatrix_listings', JSON.stringify(listings));
  }, [listings]);

  const addListing = (listingData: Omit<Listing, 'id' | 'status' | 'views' | 'bookings' | 'createdAt'>) => {
    const newListing: Listing = {
      ...listingData,
      id: Math.max(...listings.map(l => l.id), 0) + 1,
      status: 'active',
      views: 0,
      bookings: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setListings(prev => [newListing, ...prev]);
  };

  const updateListing = (id: number, updates: Partial<Listing>) => {
    setListings(prev => prev.map(listing => 
      listing.id === id ? { ...listing, ...updates } : listing
    ));
  };

  const deleteListing = (id: number) => {
    setListings(prev => prev.filter(listing => listing.id !== id));
  };

  const getListingById = (id: number) => {
    return listings.find(listing => listing.id === id);
  };

  const getUserListings = (userId?: string) => {
    // For now, return all listings. In the future, filter by userId
    return listings;
  };

  return (
    <ListingsContext.Provider value={{
      listings,
      addListing,
      updateListing,
      deleteListing,
      getListingById,
      getUserListings,
    }}>
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => {
  const context = useContext(ListingsContext);
  if (context === undefined) {
    throw new Error('useListings must be used within a ListingsProvider');
  }
  return context;
}; 
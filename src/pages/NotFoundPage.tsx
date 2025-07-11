import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-9xl font-bold text-primary-500 mb-2">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 max-w-lg mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link to="/" className="btn-primary flex items-center justify-center">
            <Home size={18} className="mr-2" />
            Go Home
          </Link>
          <Link to="/products" className="btn-outline flex items-center justify-center">
            <Search size={18} className="mr-2" />
            Browse Products
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Popular Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/category/electronics" className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
              Electronics
            </Link>
            <Link to="/category/furniture" className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
              Furniture
            </Link>
            <Link to="/category/appliances" className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
              Appliances
            </Link>
            <Link to="/category/vehicles" className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
              Vehicles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/currency';
import { useWishlist } from '../../contexts/WishlistContext';

const Favorites: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div>
      <div className="flex items-center mb-6">
        <Heart size={24} className="text-red-500 mr-2" />
        <h1 className="text-2xl font-bold">My Favorites</h1>
      </div>
      {wishlist.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't added any favorites yet.</p>
          <Link to="/products" className="btn-primary inline-block mt-4">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishlist.map(item => (
            <div key={item.id} className="bg-white border rounded-lg overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-40 h-40">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <Link to={`/products/${item.id}`} className="font-medium text-lg mb-1 hover:text-primary-500 transition-colors">
                  {item.title}
                </Link>
                <div className="text-sm text-gray-600 mb-1">
                  {item.location}
                </div>
                <div className="text-primary-600 font-bold mb-1">
                  {formatCurrency(item.price)} / {item.priceType}
                </div>
                <div className="mt-auto flex justify-between">
                  <Link to={`/products/${item.id}`} className="btn-primary py-1.5 px-3 text-sm">
                    View Details
                  </Link>
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="btn-outline py-1.5 px-3 text-sm text-red-600 border-red-600 hover:bg-red-600 hover:text-white flex items-center"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
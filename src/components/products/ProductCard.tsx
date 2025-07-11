import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';
import { useWishlist } from '../../contexts/WishlistContext';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  priceType: 'day' | 'week' | 'month';
  location: string;
  rating: number;
  isPopular?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group">
      <div className="card h-full flex flex-col overflow-hidden transition duration-300 hover:shadow-lg">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-48 object-cover"
          />
          <button 
            className={`absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors ${inWishlist ? 'text-red-500' : 'text-gray-600'}`}
            onClick={(e) => {
              e.preventDefault();
              if (inWishlist) {
                removeFromWishlist(product.id);
              } else {
                addToWishlist({
                  id: product.id,
                  title: product.title,
                  image: product.image,
                  price: product.price,
                  priceType: product.priceType,
                  location: product.location,
                });
              }
            }}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
          {product.isPopular && (
            <span className="absolute top-3 left-3 bg-primary-500 text-white text-xs px-2 py-1 rounded">
              Popular
            </span>
          )}
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-medium text-lg line-clamp-2 group-hover:text-primary-500 transition-colors">
            {product.title}
          </h3>
          <div className="flex items-center mt-2 text-gray-500 text-sm">
            <MapPin size={14} className="mr-1" />
            <span>{product.location}</span>
          </div>
          <div className="mt-auto pt-3 flex items-end justify-between">
            <div>
              <span className="block text-lg font-bold text-primary-600">
                {formatCurrency(product.price)}
              </span>
              <span className="text-xs text-gray-500">Per {product.priceType}</span>
            </div>
            <div className="bg-primary-50 text-primary-600 px-2 py-1 rounded text-sm font-medium">
              {product.rating} ★
            </div>
          </div>
          <Link 
            to={`/products/${product.id}`}
            className="btn-primary w-full text-center mt-4"
          >
            View Details
          </Link>
          <button 
            onClick={() => {
              // Create minimal booking data and go directly to payment
              const bookingData = {
                productId: product.id,
                product: {
                  id: product.id,
                  title: product.title,
                  image: product.image,
                  price: product.price,
                  priceType: product.priceType,
                  security: 1000,
                  location: product.location,
                  owner: 'Product Owner'
                },
                dates: {
                  start: new Date().toISOString().split('T')[0],
                  end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                },
                quantity: 1,
                contactInfo: {
                  name: '',
                  email: '',
                  phone: '',
                  address: '',
                  specialRequests: ''
                },
                rentalFee: product.priceType === 'day' ? product.price * 7 : product.price,
                securityDeposit: 1000,
                totalAmount: (product.priceType === 'day' ? product.price * 7 : product.price) + 1000
              };
              window.location.href = `/payment?data=${encodeURIComponent(JSON.stringify(bookingData))}`;
            }}
            className="btn-secondary w-full text-center mt-2"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
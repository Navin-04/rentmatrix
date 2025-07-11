import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

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

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  return (
    <div className="group">
      <div className="card flex flex-col sm:flex-row overflow-hidden transition duration-300 hover:shadow-lg">
        <div className="relative w-full sm:w-48 h-48">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
          <button 
            className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              
            }}
          >
            <Heart size={18} className="text-gray-600" />
          </button>
          
          {product.isPopular && (
            <span className="absolute top-3 left-3 bg-primary-500 text-white text-xs px-2 py-1 rounded">
              Popular
            </span>
          )}
        </div>
        
        <div className="p-4 flex-grow">
          <div className="flex flex-col sm:flex-row justify-between">
            <h3 className="font-medium text-lg group-hover:text-primary-500 transition-colors mb-2 sm:mb-0">
              {product.title}
            </h3>
            
            <div className="flex items-center">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
              <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center mt-2 text-gray-500 text-sm">
            <MapPin size={14} className="mr-1" />
            <span>{product.location}</span>
          </div>
          
          <div className="mt-4 sm:mt-auto sm:pt-3 flex flex-col sm:flex-row sm:items-end justify-between">
            <div>
              <span className="block text-lg font-bold text-primary-600">
                {formatCurrency(product.price)}
              </span>
              <span className="text-xs text-gray-500">Per {product.priceType}</span>
            </div>
            
            <Link 
              to={`/products/${product.id}`}
              className="btn-outline mt-3 sm:mt-0 text-center mr-2"
            >
              View Details
            </Link>
            
            <button 
              onClick={() => {
                // minimal booking and go to payment
                const securityDeposit = Math.max(Math.ceil(product.price * 0.05), 500);
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
                  securityDeposit: securityDeposit,
                  totalAmount: (product.priceType === 'day' ? product.price * 7 : product.price) + securityDeposit
                };
                
                window.location.href = `/payment?data=${encodeURIComponent(JSON.stringify(bookingData))}`;
              }}
              className="btn-primary mt-3 sm:mt-0 text-center"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
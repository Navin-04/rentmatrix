import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Heart, Share, Flag, MapPin, 
  Calendar, Phone, MessageCircle, Star, Shield 
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDates, setSelectedDates] = useState<{start: string, end: string}>({ start: '', end: '' });
  const [quantity, setQuantity] = useState(1);
  
  //  product data
  const products = {
    1: {
      id: 1,
      title: 'Sony A7 III Camera with 24-70mm Lens',
      description: 'Professional mirrorless camera with amazing image quality. Perfect for photography enthusiasts and professionals. Comes with a 24-70mm f/2.8 G Master lens, camera bag, extra battery, and 64GB memory card.',
      price: 999,
      priceType: 'day',
      security: 1000,
      rating: 4.8,
      reviewCount: 57,
      location: 'Mumbai, Maharashtra',
      owner: {
        name: 'Rahul Photography',
        joinDate: 'June 2021',
        responseRate: '95%',
        responseTime: 'within an hour',
        image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      specifications: [
        { name: 'Brand', value: 'Sony' },
        { name: 'Model', value: 'A7 III' },
        { name: 'Resolution', value: '24.2MP' },
        { name: 'Lens Mount', value: 'Sony E-mount' },
        { name: 'Condition', value: 'Excellent' },
        { name: 'Age', value: '2 years' },
      ],
      images: [
        'https://images.pexels.com/photos/3605071/pexels-photo-3605071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1787235/pexels-photo-1787235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-19', '2025-01-20'],
    },
    2: {
      id: 2,
      title: 'LG Front Load Washing Machine',
      description: 'High-efficiency front load washing machine with steam technology. Perfect for apartments and homes. Energy efficient with multiple wash programs and gentle fabric care.',
      price: 599,
      priceType: 'month',
      security: 1000,
      rating: 4.6,
      reviewCount: 34,
      location: 'Bangalore, Karnataka',
      owner: {
        name: 'Home Appliances Hub',
        joinDate: 'March 2022',
        responseRate: '92%',
        responseTime: 'within 2 hours',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      specifications: [
        { name: 'Brand', value: 'LG' },
        { name: 'Capacity', value: '7 kg' },
        { name: 'Type', value: 'Front Load' },
        { name: 'Energy Rating', value: '5 Star' },
        { name: 'Condition', value: 'Excellent' },
        { name: 'Age', value: '1 year' },
      ],
      images: [
        'https://images.pexels.com/photos/5816934/pexels-photo-5816934.jpeg',
        'https://images.pexels.com/photos/4108674/pexels-photo-4108674.jpeg',
        'https://images.pexels.com/photos/6996088/pexels-photo-6996088.jpeg',
      ],
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-19', '2025-01-20'],
    },
    3: {
      id: 3,
      title: 'Bosch Microwave Oven',
      description: 'Compact and efficient microwave oven with convection cooking. Perfect for small kitchens and quick meal preparation. Multiple cooking modes and auto-cook menus.',
      price: 299,
      priceType: 'month',
      security: 1000,
      rating: 4.4,
      reviewCount: 28,
      location: 'Delhi, NCR',
      owner: {
        name: 'Kitchen Rentals',
        joinDate: 'August 2021',
        responseRate: '88%',
        responseTime: 'within 3 hours',
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      specifications: [
        { name: 'Brand', value: 'Bosch' },
        { name: 'Capacity', value: '25 L' },
        { name: 'Type', value: 'Convection' },
        { name: 'Power', value: '900W' },
        { name: 'Condition', value: 'Good' },
        { name: 'Age', value: '1.5 years' },
      ],
      images: [
        'https://images.pexels.com/photos/4108674/pexels-photo-4108674.jpeg',
        'https://images.pexels.com/photos/5816934/pexels-photo-5816934.jpeg',
        'https://images.pexels.com/photos/6996088/pexels-photo-6996088.jpeg',
      ],
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-19', '2025-01-20'],
    },
    4: {
      id: 4,
      title: 'Whirlpool Double Door Refrigerator',
      description: 'Spacious double door refrigerator with frost-free technology. Energy efficient with separate freezer compartment. Perfect for families and extended stays.',
      price: 899,
      priceType: 'month',
      security: 1000,
      rating: 4.7,
      reviewCount: 42,
      location: 'Chennai, Tamil Nadu',
      owner: {
        name: 'Cool Appliances',
        joinDate: 'January 2022',
        responseRate: '96%',
        responseTime: 'within 1 hour',
        image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      specifications: [
        { name: 'Brand', value: 'Whirlpool' },
        { name: 'Capacity', value: '265 L' },
        { name: 'Type', value: 'Double Door' },
        { name: 'Energy Rating', value: '4 Star' },
        { name: 'Condition', value: 'Excellent' },
        { name: 'Age', value: '6 months' },
      ],
      images: [
        'https://images.pexels.com/photos/6996088/pexels-photo-6996088.jpeg',
        'https://images.pexels.com/photos/4108674/pexels-photo-4108674.jpeg',
        'https://images.pexels.com/photos/5816934/pexels-photo-5816934.jpeg',
      ],
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-19', '2025-01-20'],
    },
    5: {
      id: 5,
      title: 'Dyson Air Purifier',
      description: 'Advanced air purifier with HEPA filtration. Removes 99.97% of allergens and pollutants. Perfect for clean air in homes and offices.',
      price: 499,
      priceType: 'month',
      security: 1000,
      rating: 4.9,
      reviewCount: 38,
      location: 'Hyderabad, Telangana',
      owner: {
        name: 'Clean Air Solutions',
        joinDate: 'May 2021',
        responseRate: '98%',
        responseTime: 'within 30 minutes',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      specifications: [
        { name: 'Brand', value: 'Dyson' },
        { name: 'Coverage', value: '400 sq ft' },
        { name: 'Filter Type', value: 'HEPA' },
        { name: 'Noise Level', value: '35 dB' },
        { name: 'Condition', value: 'Like New' },
        { name: 'Age', value: '3 months' },
      ],
      images: [
        'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg',
        'https://images.pexels.com/photos/4108674/pexels-photo-4108674.jpeg',
        'https://images.pexels.com/photos/6996088/pexels-photo-6996088.jpeg',
      ],
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-19', '2025-01-20'],
    },
    6: {
      id: 6,
      title: 'Philips Air Fryer',
      description: 'Healthy cooking air fryer with rapid air technology. Cook with little to no oil. Perfect for crispy and delicious meals.',
      price: 199,
      priceType: 'month',
      security: 1000,
      rating: 4.5,
      reviewCount: 25,
      location: 'Pune, Maharashtra',
      owner: {
        name: 'Smart Kitchen',
        joinDate: 'September 2021',
        responseRate: '90%',
        responseTime: 'within 2 hours',
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      specifications: [
        { name: 'Brand', value: 'Philips' },
        { name: 'Capacity', value: '4.1 L' },
        { name: 'Power', value: '1400W' },
        { name: 'Temperature', value: '80-200°C' },
        { name: 'Condition', value: 'Good' },
        { name: 'Age', value: '8 months' },
      ],
      images: [
        'https://images.pexels.com/photos/4108718/pexels-photo-4108718.jpeg',
        'https://images.pexels.com/photos/4108674/pexels-photo-4108674.jpeg',
        'https://images.pexels.com/photos/6996088/pexels-photo-6996088.jpeg',
      ],
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-19', '2025-01-20'],
    },
    7: {
      id: 7,
      title: 'Havells Water Purifier',
      description: 'Advanced RO water purifier with UV sterilization. Ensures pure and safe drinking water. Perfect for homes and offices.',
      price: 299,
      priceType: 'month',
      security: 1000,
      rating: 4.6,
      reviewCount: 31,
      location: 'Gurgaon, Haryana',
      owner: {
        name: 'Pure Water Co',
        joinDate: 'November 2021',
        responseRate: '94%',
        responseTime: 'within 1 hour',
        image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      specifications: [
        { name: 'Brand', value: 'Havells' },
        { name: 'Technology', value: 'RO + UV' },
        { name: 'Capacity', value: '7 L' },
        { name: 'Purification', value: '8 Stage' },
        { name: 'Condition', value: 'Excellent' },
        { name: 'Age', value: '4 months' },
      ],
      images: [
        'https://images.pexels.com/photos/4108720/pexels-photo-4108720.jpeg',
        'https://images.pexels.com/photos/4108674/pexels-photo-4108674.jpeg',
        'https://images.pexels.com/photos/6996088/pexels-photo-6996088.jpeg',
      ],
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-19', '2025-01-20'],
    },
    8: {
      id: 8,
      title: 'IFB Dishwasher',
      description: 'Efficient dishwasher with multiple wash programs. Saves time and water while ensuring spotless dishes. Perfect for busy households.',
      price: 699,
      priceType: 'month',
      security: 1000,
      rating: 4.3,
      reviewCount: 19,
      location: 'Jaipur, Rajasthan',
      owner: {
        name: 'Dish Clean Pro',
        joinDate: 'December 2021',
        responseRate: '87%',
        responseTime: 'within 4 hours',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      specifications: [
        { name: 'Brand', value: 'IFB' },
        { name: 'Capacity', value: '12 Place Settings' },
        { name: 'Programs', value: '6 Wash Programs' },
        { name: 'Energy Rating', value: '4 Star' },
        { name: 'Condition', value: 'Good' },
        { name: 'Age', value: '10 months' },
      ],
      images: [
        'https://images.pexels.com/photos/4108722/pexels-photo-4108722.jpeg',
        'https://images.pexels.com/photos/4108674/pexels-photo-4108674.jpeg',
        'https://images.pexels.com/photos/6996088/pexels-photo-6996088.jpeg',
      ],
      availableDates: ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-19', '2025-01-20'],
    }
  };
  
  const product = products[parseInt(id || '1') as keyof typeof products] || products[1];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };
  
  const handleDateChange = (field: 'start' | 'end', value: string) => {
    setSelectedDates(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const calculateTotal = () => {
    if (!selectedDates.start || !selectedDates.end) return 0;
    
    const start = new Date(selectedDates.start);
    const end = new Date(selectedDates.end);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return product.price * diffDays * quantity;
  };
  
  // Instead of using product.security, calculate security as max(5% of price, 500)
  const securityDeposit = Math.max(Math.ceil(product.price * 0.05), 500);
  
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Image Gallery */}
          <div className="relative">
            <img 
              src={product.images[currentImageIndex]} 
              alt={product.title} 
              className="w-full h-96 object-cover"
            />
            
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {product.images.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Product Details */}
              <div className="lg:w-2/3">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold">{product.title}</h1>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                      <Heart size={20} className="text-gray-700" />
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                      <Share size={20} className="text-gray-700" />
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                      <Flag size={20} className="text-gray-700" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-gray-700">{product.rating} ({product.reviewCount} reviews)</span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin size={16} className="mr-1" />
                  <span>{product.location}</span>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-gray-700">{product.description}</p>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Specifications</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex">
                        <span className="font-medium w-24">{spec.name}:</span>
                        <span className="text-gray-700">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">About the Owner</h2>
                  <div className="flex items-start">
                    <img 
                      src={product.owner.image} 
                      alt={product.owner.name} 
                      className="w-16 h-16 rounded-full mr-4 object-cover" 
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{product.owner.name}</h3>
                      <p className="text-gray-600 text-sm">Member since {product.owner.joinDate}</p>
                      <p className="text-gray-600 text-sm">Response rate: {product.owner.responseRate}</p>
                      <p className="text-gray-600 text-sm">Response time: {product.owner.responseTime}</p>
                      <div className="mt-2 flex space-x-2">
                        <button className="btn-outline py-1.5 px-3 text-sm flex items-center">
                          <Phone size={14} className="mr-1" /> Call
                        </button>
                        <button className="btn-outline py-1.5 px-3 text-sm flex items-center">
                          <MessageCircle size={14} className="mr-1" /> Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-4">Reviews & Ratings</h2>
                  <button className="btn-outline">View All Reviews</button>
                </div>
              </div>
              
              {/* Booking Panel */}
              <div className="lg:w-1/3">
                <div className="border border-gray-200 rounded-lg p-6 sticky top-20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">{formatCurrency(product.price)}</span>
                      <span className="text-gray-500">/{product.priceType}</span>
                    </div>
                    <div className="bg-primary-50 text-primary-600 px-2 py-1 rounded text-sm font-medium">
                      {product.rating} ★
                    </div>
                  </div>
                  
                  <div className="border-t border-b border-gray-200 py-4 my-4">
                    <p className="flex items-center text-sm text-gray-600 mb-2">
                      <Shield size={16} className="mr-2 text-green-500" />
                      Security Deposit: {formatCurrency(securityDeposit)}
                    </p>
                  </div>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rental Dates</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                          <input 
                            type="date" 
                            value={selectedDates.start}
                            onChange={(e) => handleDateChange('start', e.target.value)}
                            className="input-field py-2" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">End Date</label>
                          <input 
                            type="date" 
                            value={selectedDates.end}
                            onChange={(e) => handleDateChange('end', e.target.value)}
                            className="input-field py-2" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                      <div className="flex items-center">
                        <button 
                          type="button" 
                          className="border border-gray-300 rounded-l-md p-2"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          min="1" 
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                          className="border-t border-b border-gray-300 p-2 w-16 text-center" 
                        />
                        <button 
                          type="button" 
                          className="border border-gray-300 rounded-r-md p-2"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {selectedDates.start && selectedDates.end && (
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Rental Fee</span>
                          <span>{formatCurrency(calculateTotal())}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Security Deposit</span>
                          <span>{formatCurrency(securityDeposit)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-gray-200">
                          <span>Total</span>
                          <span>{formatCurrency(calculateTotal() + securityDeposit)}</span>
                        </div>
                      </div>
                    )}
                    
                    <button 
                      type="submit" 
                      onClick={(e) => {
                        e.preventDefault();
                        // Create booking data and go to payment
                        const bookingData = {
                          productId: product.id,
                          product: {
                            id: product.id,
                            title: product.title,
                            image: product.images[0],
                            price: product.price,
                            priceType: product.priceType,
                            security: securityDeposit,
                            location: product.location,
                            owner: product.owner.name
                          },
                          dates: selectedDates,
                          quantity,
                          contactInfo: {
                            name: '',
                            email: '',
                            phone: '',
                            address: '',
                            specialRequests: ''
                          },
                          rentalFee: calculateTotal(),
                          securityDeposit: securityDeposit,
                          totalAmount: calculateTotal() + securityDeposit
                        };
                        
                        navigate('/payment', { state: { bookingData } });
                      }}
                      className="btn-primary w-full flex items-center justify-center"
                    >
                      <Calendar size={18} className="mr-2" />
                      Book Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Shield, User, Phone, Mail, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState<{start: string, end: string}>({ start: '', end: '' });
  const [quantity, setQuantity] = useState(1);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    specialRequests: ''
  });

  // Mock
  const products = {
    1: {
      id: 1,
      title: 'Sony A7 III Camera with 24-70mm Lens',
      image: 'https://images.pexels.com/photos/3605071/pexels-photo-3605071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 999,
      priceType: 'day',
      security: 1000,
      location: 'Mumbai, Maharashtra',
      owner: 'Rahul Photography'
    },
    2: {
      id: 2,
      title: 'LG Front Load Washing Machine',
      image: 'https://images.pexels.com/photos/5816934/pexels-photo-5816934.jpeg',
      price: 599,
      priceType: 'month',
      security: 1000,
      location: 'Bangalore, Karnataka',
      owner: 'Home Appliances Hub'
    },
    3: {
      id: 3,
      title: 'Bosch Microwave Oven',
      image: 'https://images.pexels.com/photos/4108674/pexels-photo-4108674.jpeg',
      price: 299,
      priceType: 'month',
      security: 1000,
      location: 'Delhi, NCR',
      owner: 'Kitchen Rentals'
    },
    4: {
      id: 4,
      title: 'Whirlpool Double Door Refrigerator',
      image: 'https://images.pexels.com/photos/6996088/pexels-photo-6996088.jpeg',
      price: 899,
      priceType: 'month',
      security: 1000,
      location: 'Chennai, Tamil Nadu',
      owner: 'Cool Appliances'
    },
    5: {
      id: 5,
      title: 'Dyson Air Purifier',
      image: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg',
      price: 499,
      priceType: 'month',
      security: 1000,
      location: 'Hyderabad, Telangana',
      owner: 'Clean Air Solutions'
    },
    6: {
      id: 6,
      title: 'Philips Air Fryer',
      image: 'https://images.pexels.com/photos/4108718/pexels-photo-4108718.jpeg',
      price: 199,
      priceType: 'month',
      security: 1000,
      location: 'Pune, Maharashtra',
      owner: 'Smart Kitchen'
    },
    7: {
      id: 7,
      title: 'Havells Water Purifier',
      image: 'https://images.pexels.com/photos/4108720/pexels-photo-4108720.jpeg',
      price: 299,
      priceType: 'month',
      security: 1000,
      location: 'Gurgaon, Haryana',
      owner: 'Pure Water Co'
    },
    8: {
      id: 8,
      title: 'IFB Dishwasher',
      image: 'https://images.pexels.com/photos/4108722/pexels-photo-4108722.jpeg',
      price: 699,
      priceType: 'month',
      security: 1000,
      location: 'Jaipur, Rajasthan',
      owner: 'Dish Clean Pro'
    }
  };

  const product = products[parseInt(id || '1') as keyof typeof products] || products[1];

  // Instead of using product.security, calculate security as max(5% of price, 500)
  const securityDeposit = Math.max(Math.ceil(product.price * 0.05), 500);

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    setSelectedDates(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateRentalDays = () => {
    if (!selectedDates.start || !selectedDates.end) return 0;
    
    const start = new Date(selectedDates.start);
    const end = new Date(selectedDates.end);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    
    if (product.priceType === 'day') {
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    } else if (product.priceType === 'month') {
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30)) || 1;
    }
    return 1;
  };

  const calculateTotal = () => {
    const days = calculateRentalDays();
    return product.price * days * quantity;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDates.start || !selectedDates.end) {
      alert('Please select rental dates');
      return;
    }

    const bookingData = {
      productId: product.id,
      product: product,
      dates: selectedDates,
      quantity,
      contactInfo,
      rentalFee: calculateTotal(),
      securityDeposit: securityDeposit,
      totalAmount: calculateTotal() + securityDeposit
    };

    // Navigate to payment page with booking data
    navigate('/payment', { state: { bookingData } });
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Product
        </button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Summary */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Product Details</h2>
                  <div className="flex items-start">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-24 h-24 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="font-medium text-lg">{product.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <MapPin size={14} className="mr-1" />
                        <span>{product.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <User size={14} className="mr-1" />
                        <span>Owner: {product.owner}</span>
                      </div>
                      <div className="text-primary-600 font-bold mt-2">
                        {formatCurrency(product.price)} / {product.priceType}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rental Dates */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Rental Period</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <div className="relative">
                        <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          required
                          value={selectedDates.start}
                          onChange={(e) => handleDateChange('start', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <div className="relative">
                        <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          required
                          value={selectedDates.end}
                          onChange={(e) => handleDateChange('end', e.target.value)}
                          min={selectedDates.start || new Date().toISOString().split('T')[0]}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <div className="flex items-center">
                      <button 
                        type="button" 
                        className="border border-gray-300 rounded-l-md p-2 hover:bg-gray-50"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="border-t border-b border-gray-300 p-2 w-20 text-center" 
                      />
                      <button 
                        type="button" 
                        className="border border-gray-300 rounded-r-md p-2 hover:bg-gray-50"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={contactInfo.name}
                          onChange={(e) => handleContactChange('name', e.target.value)}
                          className="input-field pl-10"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={contactInfo.email}
                          onChange={(e) => handleContactChange('email', e.target.value)}
                          className="input-field pl-10"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          required
                          value={contactInfo.phone}
                          onChange={(e) => handleContactChange('phone', e.target.value)}
                          className="input-field pl-10"
                          placeholder="+91 9988776655"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        required
                        value={contactInfo.address}
                        onChange={(e) => handleContactChange('address', e.target.value)}
                        className="input-field"
                        placeholder="Your address"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={contactInfo.specialRequests}
                      onChange={(e) => handleContactChange('specialRequests', e.target.value)}
                      className="input-field h-20 resize-none"
                      placeholder="Any special requirements or requests..."
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rental Period:</span>
                    <span className="font-medium">
                      {calculateRentalDays()} {product.priceType}(s)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rate:</span>
                    <span className="font-medium">
                      {formatCurrency(product.price)} / {product.priceType}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rental Fee:</span>
                    <span className="font-medium">{formatCurrency(calculateTotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 flex items-center">
                      <Shield size={16} className="mr-1 text-green-500" />
                      Security Deposit:
                    </span>
                    <span className="font-medium">{formatCurrency(securityDeposit)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                    <span>Total Amount:</span>
                    <span className="text-primary-600">
                      {formatCurrency(calculateTotal() + securityDeposit)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">Important Notes:</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Security deposit will be refunded after return</li>
                    <li>• Please inspect the item upon delivery</li>
                    <li>• Return in the same condition as received</li>
                  </ul>
                </div>

                <button 
                  onClick={handleSubmit}
                  className="btn-primary w-full mt-6"
                  disabled={!selectedDates.start || !selectedDates.end}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
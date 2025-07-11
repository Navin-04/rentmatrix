import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Star, Calendar, Clock, User, Phone, Mail, 
  Shield, CheckCircle, ArrowLeft, Heart, Share2,
  Users, Award, Clock as ClockIcon
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';

interface Service {
  id: number;
  title: string;
  images: string[];
  price: number;
  priceType: string;
  location: string;
  rating: number;
  reviewCount: number;
  description: string;
  longDescription: string;
  features: string[];
  owner: {
    name: string;
    avatar: string;
    rating: number;
    responseTime: string;
    verified: boolean;
  };
  availability: {
    days: string[];
    hours: string;
  };
  included: string[];
  notIncluded: string[];
  requirements: string[];
  cancellation: string;
}

const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    specialRequests: ''
  });
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'location'>('details');

  // Mock service data - in real app, this would come from API
  const mockServices: Service[] = [
    {
      id: 1,
      title: 'Premium Catering Service',
      images: [
        'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg',
        'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg'
      ],
      price: 25000,
      priceType: 'event',
      location: 'Mumbai, Maharashtra',
      rating: 4.8,
      reviewCount: 127,
      description: 'Full-service catering for weddings, corporate events, and parties',
      longDescription: 'Our premium catering service offers a complete dining experience for your special occasions. From intimate gatherings to large corporate events, we provide customized menus, professional staff, and exceptional service. Our team of experienced chefs creates delicious, fresh meals using the finest ingredients.',
      features: [
        'Custom menu planning',
        'Professional staff',
        'Setup and cleanup',
        'Dietary accommodations',
        'Quality ingredients',
        'Flexible serving styles'
      ],
      owner: {
        name: 'Chef Priya Sharma',
        avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg',
        rating: 4.9,
        responseTime: 'Within 2 hours',
        verified: true
      },
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        hours: '6:00 AM - 11:00 PM'
      },
      included: [
        'Menu consultation',
        'Food preparation',
        'Service staff',
        'Basic tableware',
        'Setup and cleanup',
        'Leftover packaging'
      ],
      notIncluded: [
        'Venue rental',
        'Alcohol service',
        'Specialty equipment',
        'Transportation',
        'Gratuities'
      ],
      requirements: [
        'Advance booking (minimum 48 hours)',
        'Venue access for setup',
        'Kitchen facilities (if required)',
        'Guest count confirmation 24 hours prior'
      ],
      cancellation: 'Free cancellation up to 24 hours before the event. 50% refund for cancellations within 24 hours.'
    },
    {
      id: 2,
      title: 'Luxury Event Decoration',
      images: [
        'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg',
        'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg',
        'https://images.pexels.com/photos/169194/pexels-photo-169194.jpeg',
        'https://images.pexels.com/photos/169195/pexels-photo-169195.jpeg'
      ],
      price: 35000,
      priceType: 'event',
      location: 'Delhi, NCR',
      rating: 4.9,
      reviewCount: 89,
      description: 'Professional event decoration services for all occasions',
      longDescription: 'Transform your venue into a magical space with our luxury decoration services. We specialize in creating stunning visual experiences for weddings, corporate events, birthdays, and special celebrations. Our team of creative designers works closely with you to bring your vision to life.',
      features: [
        'Custom design consultation',
        'Theme-based decorations',
        'Flower arrangements',
        'Lighting design',
        'Setup and dismantling',
        'On-site coordination'
      ],
      owner: {
        name: 'Design Studio Elegance',
        avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg',
        rating: 4.9,
        responseTime: 'Within 1 hour',
        verified: true
      },
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        hours: '8:00 AM - 10:00 PM'
      },
      included: [
        'Design consultation',
        'All decorative materials',
        'Setup and dismantling',
        'On-site coordination',
        'Basic lighting',
        'Theme coordination'
      ],
      notIncluded: [
        'Venue rental',
        'Specialty equipment',
        'Additional lighting',
        'Transportation',
        'Storage fees'
      ],
      requirements: [
        'Advance booking (minimum 72 hours)',
        'Venue access for setup',
        'Theme preferences discussion',
        'Budget confirmation'
      ],
      cancellation: 'Free cancellation up to 48 hours before the event. 25% refund for cancellations within 48 hours.'
    },
    {
      id: 3,
      title: 'Professional DJ Services',
      images: [
        'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
        'https://images.pexels.com/photos/2608518/pexels-photo-2608518.jpeg',
        'https://images.pexels.com/photos/2608519/pexels-photo-2608519.jpeg',
        'https://images.pexels.com/photos/2608520/pexels-photo-2608520.jpeg'
      ],
      price: 15000,
      priceType: 'event',
      location: 'Bangalore, Karnataka',
      rating: 4.7,
      reviewCount: 156,
      description: 'Experienced DJ with top-quality sound equipment',
      longDescription: 'Get the party started with our professional DJ services. Our experienced DJs bring energy and excitement to any event with a carefully curated playlist, high-quality sound equipment, and interactive entertainment. Perfect for weddings, corporate events, parties, and celebrations.',
      features: [
        'Professional DJ equipment',
        'Custom playlist creation',
        'Interactive entertainment',
        'Sound system setup',
        'Music requests handling',
        'Event coordination'
      ],
      owner: {
        name: 'DJ Rahul Kumar',
        avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg',
        rating: 4.7,
        responseTime: 'Within 3 hours',
        verified: true
      },
      availability: {
        days: ['Friday', 'Saturday', 'Sunday'],
        hours: '6:00 PM - 2:00 AM'
      },
      included: [
        'Professional DJ equipment',
        'Sound system setup',
        'Custom playlist',
        'Interactive entertainment',
        'Setup and teardown',
        'Basic lighting effects'
      ],
      notIncluded: [
        'Venue rental',
        'Additional lighting',
        'Special effects',
        'Transportation',
        'Extra hours'
      ],
      requirements: [
        'Advance booking (minimum 24 hours)',
        'Venue access for setup',
        'Power supply access',
        'Music preferences discussion'
      ],
      cancellation: 'Free cancellation up to 12 hours before the event. No refund for cancellations within 12 hours.'
    },
    {
      id: 4,
      title: 'Photography & Videography',
      images: [
        'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
        'https://images.pexels.com/photos/1444443/pexels-photo-1444443.jpeg',
        'https://images.pexels.com/photos/1444444/pexels-photo-1444444.jpeg',
        'https://images.pexels.com/photos/1444445/pexels-photo-1444445.jpeg'
      ],
      price: 20000,
      priceType: 'event',
      location: 'Chennai, Tamil Nadu',
      rating: 4.9,
      reviewCount: 203,
      description: 'Professional photo and video coverage for your events',
      longDescription: 'Capture your precious moments with our professional photography and videography services. Our team of skilled photographers and videographers use state-of-the-art equipment to create stunning visual memories. We specialize in weddings, corporate events, parties, and special occasions.',
      features: [
        'Professional camera equipment',
        'Photo and video coverage',
        'Post-processing editing',
        'Digital delivery',
        'Print options available',
        'Event coordination'
      ],
      owner: {
        name: 'Capture Moments Studio',
        avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg',
        rating: 4.9,
        responseTime: 'Within 4 hours',
        verified: true
      },
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        hours: '6:00 AM - 11:00 PM'
      },
      included: [
        'Professional photography',
        'Video coverage',
        'Photo editing',
        'Digital delivery',
        'Event coordination',
        'Basic prints'
      ],
      notIncluded: [
        'Venue rental',
        'Additional prints',
        'Special effects',
        'Transportation',
        'Extra hours'
      ],
      requirements: [
        'Advance booking (minimum 48 hours)',
        'Venue access',
        'Shot list discussion',
        'Timeline coordination'
      ],
      cancellation: 'Free cancellation up to 24 hours before the event. 50% refund for cancellations within 24 hours.'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundService = mockServices.find(s => s.id === parseInt(id || '0'));
      setService(foundService || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/services')}
            className="btn-primary"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    return service.price;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }

    const bookingData = {
      serviceId: service.id,
      service: {
        id: service.id,
        title: service.title,
        image: service.images[0],
        price: service.price,
        priceType: service.priceType,
        location: service.location,
        owner: service.owner.name
      },
      date: selectedDate,
      time: selectedTime,
      guests,
      contactInfo,
      totalAmount: calculateTotal()
    };

    // Navigate to payment page with booking data
    navigate('/payment', { state: { bookingData } });
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button 
            onClick={() => navigate('/services')}
            className="flex items-center text-gray-600 hover:text-primary-500 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Services
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="relative">
                <img 
                  src={service.images[0]} 
                  alt={service.title} 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                    <Heart size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {service.images.slice(1).map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${service.title} ${index + 2}`} 
                    className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            </div>

            {/* Service Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{service.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span>{service.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-medium">{service.rating}</span>
                    <span className="text-gray-500 ml-1">({service.reviewCount} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    {formatCurrency(service.price)}
                  </div>
                  <div className="text-sm text-gray-500">Per {service.priceType}</div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{service.longDescription}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">What's included:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b">
                <div className="flex">
                  {[
                    { id: 'details', label: 'Details' },
                    { id: 'reviews', label: 'Reviews' },
                    { id: 'location', label: 'Location' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Included in your booking:</h3>
                      <ul className="space-y-2">
                        {service.included.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle size={16} className="text-green-500 mr-2" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Not included:</h3>
                      <ul className="space-y-2">
                        {service.notIncluded.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-4 h-4 border border-gray-300 rounded mr-2"></span>
                            <span className="text-sm text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Requirements:</h3>
                      <ul className="space-y-2">
                        {service.requirements.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></span>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Cancellation Policy:</h3>
                      <p className="text-sm text-gray-600">{service.cancellation}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Reviews coming soon...</p>
                  </div>
                )}

                {activeTab === 'location' && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Location details coming soon...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Book This Service</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Event Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field w-full"
                    required
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Event Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="input-field w-full"
                    required
                  >
                    <option value="">Select time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                  </select>
                </div>

                {/* Guest Count */}
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="input-field w-full"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                    ))}
                  </select>
                </div>

                {/* Contact Information */}
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Contact Information</h3>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="input-field w-full"
                      required
                    />
                    
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="input-field w-full"
                      required
                    />
                    
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="input-field w-full"
                      required
                    />
                    
                    <textarea
                      placeholder="Event Address"
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, address: e.target.value }))}
                      className="input-field w-full"
                      rows={3}
                      required
                    />
                    
                    <textarea
                      placeholder="Special Requests (Optional)"
                      value={contactInfo.specialRequests}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, specialRequests: e.target.value }))}
                      className="input-field w-full"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Price Summary */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>Service Fee:</span>
                    <span className="font-medium">{formatCurrency(service.price)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-primary-600">{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <Calendar size={18} className="mr-2" />
                  Book Now
                </button>
              </form>

              {/* Service Provider Info */}
              <div className="border-t pt-4 mt-6">
                <h3 className="font-medium mb-3">Service Provider</h3>
                <div className="flex items-center">
                  <img 
                    src={service.owner.avatar} 
                    alt={service.owner.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium">{service.owner.name}</div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
                      <span>{service.owner.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{service.owner.responseTime}</span>
                    </div>
                    {service.owner.verified && (
                      <div className="flex items-center text-sm text-green-600">
                        <Shield size={14} className="mr-1" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage; 
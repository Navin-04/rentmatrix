import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

const ServicePage: React.FC = () => {
  const services = [
    {
      id: 1,
      title: 'Premium Catering Service',
      image: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg',
      price: 25000,
      priceType: 'event',
      location: 'Mumbai, Maharashtra',
      rating: 4.8,
      description: 'Full-service catering for weddings, corporate events, and parties',
    },
    {
      id: 2,
      title: 'Luxury Event Decoration',
      image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg',
      price: 35000,
      priceType: 'event',
      location: 'Delhi, NCR',
      rating: 4.9,
      description: 'Professional event decoration services for all occasions',
    },
    {
      id: 3,
      title: 'Professional DJ Services',
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
      price: 15000,
      priceType: 'event',
      location: 'Bangalore, Karnataka',
      rating: 4.7,
      description: 'Experienced DJ with top-quality sound equipment',
    },
    {
      id: 4,
      title: 'Photography & Videography',
      image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
      price: 20000,
      priceType: 'event',
      location: 'Chennai, Tamil Nadu',
      rating: 4.9,
      description: 'Professional photo and video coverage for your events',
    },
  ];

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Event Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.id} to={`/services/${service.id}`} className="group">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden transition duration-300 hover:shadow-lg">
                <div className="relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs px-2 py-1 rounded">
                    Available
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2 group-hover:text-primary-500 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin size={14} className="mr-1" />
                    <span>{service.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-lg font-bold text-primary-600">
                        {formatCurrency(service.price)}
                      </span>
                      <span className="text-xs text-gray-500">Per {service.priceType}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{service.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
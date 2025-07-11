import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FilterSidebar: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    location: true,
    rating: true
  });
  
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Mock data
  const categories = [
    { id: 'electronics', name: 'Electronics', count: 240 },
    { id: 'furniture', name: 'Furniture', count: 186 },
    { id: 'appliances', name: 'Appliances', count: 130 },
    { id: 'vehicles', name: 'Vehicles', count: 155 },
    { id: 'clothing', name: 'Clothing', count: 95 },
    { id: 'books', name: 'Books', count: 210 },
    { id: 'camera', name: 'Cameras', count: 85 },
  ];
  
  const locations = [
    { id: 'mumbai', name: 'Mumbai', count: 320 },
    { id: 'delhi', name: 'Delhi', count: 290 },
    { id: 'bangalore', name: 'Bangalore', count: 250 },
    { id: 'hyderabad', name: 'Hyderabad', count: 180 },
    { id: 'chennai', name: 'Chennai', count: 170 },
    { id: 'pune', name: 'Pune', count: 150 },
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      
      {/* Categories */}
      <div className="border-b pb-4 mb-4">
        <button
          className="flex justify-between items-center w-full text-left font-medium"
          onClick={() => toggleSection('categories')}
        >
          Categories
          {expandedSections.categories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.categories && (
          <div className="mt-3 space-y-2">
            {categories.map(category => (
              <div key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  className="h-4 w-4 text-primary-500 rounded border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700 flex justify-between w-full">
                  {category.name}
                  <span className="text-gray-500">({category.count})</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Price Range */}
      <div className="border-b pb-4 mb-4">
        <button
          className="flex justify-between items-center w-full text-left font-medium"
          onClick={() => toggleSection('price')}
        >
          Price Range
          {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.price && (
          <div className="mt-3">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                min="0"
                className="w-1/2 input-field py-1"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                min="0"
                className="w-1/2 input-field py-1"
              />
            </div>
            <button className="btn-outline w-full mt-3 py-1.5">Apply</button>
          </div>
        )}
      </div>
      
      {/* Location */}
      <div className="border-b pb-4 mb-4">
        <button
          className="flex justify-between items-center w-full text-left font-medium"
          onClick={() => toggleSection('location')}
        >
          Location
          {expandedSections.location ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.location && (
          <div className="mt-3 space-y-2">
            {locations.map(location => (
              <div key={location.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`location-${location.id}`}
                  className="h-4 w-4 text-primary-500 rounded border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor={`location-${location.id}`} className="ml-2 text-sm text-gray-700 flex justify-between w-full">
                  {location.name}
                  <span className="text-gray-500">({location.count})</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Rating */}
      <div>
        <button
          className="flex justify-between items-center w-full text-left font-medium"
          onClick={() => toggleSection('rating')}
        >
          Rating
          {expandedSections.rating ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.rating && (
          <div className="mt-3 space-y-2">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center">
                <input
                  type="checkbox"
                  id={`rating-${rating}`}
                  className="h-4 w-4 text-primary-500 rounded border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center">
                  {Array(rating).fill(0).map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                  {Array(5 - rating).fill(0).map((_, i) => (
                    <span key={i} className="text-gray-300">★</span>
                  ))}
                  <span className="ml-1">& Up</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <button className="btn-primary w-full mt-6">Apply Filters</button>
    </div>
  );
};

export default FilterSidebar;
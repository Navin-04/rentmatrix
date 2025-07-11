import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Sofa, Home, Car, Camera, BookOpen, Shirt, Tv, Utensils } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}

const CategorySection: React.FC = () => {
  const categories: Category[] = [
    { id: 'electronics', name: 'Electronics', icon: <Laptop size={28} />, count: 240, color: 'bg-blue-100 text-blue-600' },
    { id: 'furniture', name: 'Furniture', icon: <Sofa size={28} />, count: 186, color: 'bg-green-100 text-green-600' },
    { id: 'vehicles', name: 'Vehicles', icon: <Car size={28} />, count: 155, color: 'bg-red-100 text-red-600' },
    { id: 'camera', name: 'Cameras', icon: <Camera size={28} />, count: 85, color: 'bg-purple-100 text-purple-600' },
    { id: 'books', name: 'Books', icon: <BookOpen size={28} />, count: 210, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'clothing', name: 'Clothing', icon: <Shirt size={28} />, count: 95, color: 'bg-pink-100 text-pink-600' },
    { id: 'appliances', name: 'Appliances', icon: <Tv size={28} />, count: 130, color: 'bg-indigo-100 text-indigo-600' },
    { id: 'services', name: 'Services', icon: <Utensils size={28} />, count: 75, color: 'bg-orange-100 text-orange-600' },
  ];
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Browse Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of rental categories and find exactly what you need.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={category.id === 'services' ? '/services' : `/category/${category.id}`}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className={`${category.color} p-3 rounded-full mb-4`}>
                {category.icon}
              </div>
              <h3 className="font-medium text-lg mb-1">{category.name}</h3>
              <p className="text-gray-500 text-sm">{category.count} items</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
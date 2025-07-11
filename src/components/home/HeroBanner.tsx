import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const HeroBanner: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/products?q=${searchQuery}&category=${category}`);
  };
  
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'appliances', label: 'Appliances' },
    { value: 'vehicles', label: 'Vehicles' },
    { value: 'camera', label: 'Cameras' },
    { value: 'books', label: 'Books' },
    { value: 'clothing', label: 'Clothing' },
  ];
  
  return (
    <section className="relative bg-gray-900 text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
      ></div>
      
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Rent Anything, Anytime, Anywhere
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            India's #1 rental marketplace for all your needs
          </p>
          
          <form 
            onSubmit={handleSearch}
            className="bg-white rounded-lg shadow-lg overflow-hidden p-2"
          >
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 md:border-r border-gray-300">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 text-gray-800 focus:outline-none"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search size={20} />
                  </span>
                </div>
              </div>
              
              <div className="md:w-52">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 bg-white text-gray-800 focus:outline-none cursor-pointer appearance-none"
                  aria-label="Select category"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium transition duration-300"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
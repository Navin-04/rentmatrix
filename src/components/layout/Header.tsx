import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, User, ShoppingCart, LogIn } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      window.location.href = `/products?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const categories = [
    'Electronics', 'Furniture', 'Appliances', 'Vehicles', 
    'Cameras', 'Books', 'Clothing'
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white lg:bg-transparent'}`}>
      {/* Top bar */}
      <div className="hidden lg:block bg-primary-600 text-white py-1">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 text-xs">
            <span>Email: info@rentit4me.com</span>
            <span>Phone: +91 9988776655</span>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <Link to="/register" className="hover:underline">Register</Link>
            <span>|</span>
            <Link to="/login" className="hover:underline">Login</Link>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>
          
          {/* Search bar - visible on larger screens */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search for rental items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 pr-4 py-2 w-full"
              />
              <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" aria-label="Search">
                <Search size={18} />
              </button>
            </form>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <Link to="/about" className="text-sm font-medium hover:text-primary-500">About</Link>
              <Link to="/faq" className="text-sm font-medium hover:text-primary-500">FAQ</Link>
              <Link to="/contact" className="text-sm font-medium hover:text-primary-500">Contact</Link>
            </div>
            <Link to="/dashboard" className="flex items-center gap-1 hover:text-primary-500">
              <User size={18} />
              <span>My Account</span>
            </Link>
            <Link to="/login" className="btn-primary flex items-center gap-1">
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
            <Link to="/post-ad" className="btn-secondary">
              Post Ad
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-200"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen ? "true" : "false"}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Category bar */}
      <div className="hidden lg:block bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 py-2 overflow-x-auto whitespace-nowrap">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center text-sm font-medium hover:text-primary-500 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-xl">
          <div className="py-2 px-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search for rental items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 pr-4 py-2 w-full"
              />
              <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" aria-label="Search">
                <Search size={18} />
              </button>
            </form>
            
            <div className="space-y-3">
              <Link to="/" className="block py-2 font-medium hover:text-primary-500">Home</Link>
              <Link to="/about" className="block py-2 font-medium hover:text-primary-500">About Us</Link>
              <Link to="/faq" className="block py-2 font-medium hover:text-primary-500">FAQ</Link>
              <Link to="/contact" className="block py-2 font-medium hover:text-primary-500">Contact</Link>
              
              <div className="py-2 font-medium">
                <span className="flex items-center justify-between cursor-pointer">
                  Categories
                  <ChevronDown size={20} />
                </span>
                <div className="pl-4 mt-2 space-y-2">
                  {categories.slice(0, 5).map((category, index) => (
                    <Link 
                      key={index} 
                      to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block py-1 text-sm hover:text-primary-500"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link to="/login" className="block py-2 font-medium hover:text-primary-500">Sign In</Link>
              <Link to="/register" className="block py-2 font-medium hover:text-primary-500">Register</Link>
              <Link to="/post-ad" className="btn-primary block text-center mt-4">Post Ad</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
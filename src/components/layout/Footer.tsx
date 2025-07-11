import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-400 mb-4">
              RentIt4Me is India's leading rental marketplace, connecting people who need temporary access to products with people who aren't using their own.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Browse Products</Link></li>
              <li><Link to="/post-ad" className="text-gray-400 hover:text-white transition-colors">Post Ad</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/category/electronics" className="text-gray-400 hover:text-white transition-colors">Electronics</Link></li>
              <li><Link to="/category/furniture" className="text-gray-400 hover:text-white transition-colors">Furniture</Link></li>
              <li><Link to="/category/appliances" className="text-gray-400 hover:text-white transition-colors">Appliances</Link></li>
              <li><Link to="/category/vehicles" className="text-gray-400 hover:text-white transition-colors">Vehicles</Link></li>
              <li><Link to="/category/clothing" className="text-gray-400 hover:text-white transition-colors">Clothing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="flex-shrink-0 mr-2 mt-1 text-primary-500" />
                <span className="text-gray-400">123 Main Street, Mumbai, Maharashtra 400001, India</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="flex-shrink-0 mr-2 text-primary-500" />
                <span className="text-gray-400">+91 9988776655</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="flex-shrink-0 mr-2 text-primary-500" />
                <span className="text-gray-400">info@rentit4me.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} RentIt4Me. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
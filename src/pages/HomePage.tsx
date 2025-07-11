import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import HeroBanner from '../components/home/HeroBanner';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import HowItWorks from '../components/home/HowItWorks';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CallToAction from '../components/home/CallToAction';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroBanner />
      
      <CategorySection />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="flex items-center text-primary-500 hover:text-primary-600 mt-4 md:mt-0">
              View All Products <ChevronRight size={20} />
            </Link>
          </div>
          <FeaturedProducts />
        </div>
      </section>
      
      <HowItWorks />
      
      <TestimonialsSection />
      
      <CallToAction />
    </div>
  );
};

export default HomePage;
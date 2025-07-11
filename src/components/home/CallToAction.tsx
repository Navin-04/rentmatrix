import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-500 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Ready to Start Renting or Listing Your Items?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of satisfied users making extra income by renting out their items
            or saving money by renting instead of buying.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium flex items-center justify-center transition-colors"
            >
              Get Started <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link 
              to="/post-ad" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-md font-medium flex items-center justify-center transition-colors"
            >
              List an Item
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
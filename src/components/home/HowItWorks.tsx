import React from 'react';
import { Search, Calendar, CreditCard, ThumbsUp } from 'lucide-react';

interface Step {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HowItWorks: React.FC = () => {
  const steps: Step[] = [
    {
      id: 1,
      icon: <Search size={32} className="text-primary-500" />,
      title: "Find What You Need",
      description: "Browse through thousands of available products for rent across multiple categories."
    },
    {
      id: 2,
      icon: <Calendar size={32} className="text-primary-500" />,
      title: "Book Your Rental",
      description: "Select your rental dates, review terms, and book your item with just a few clicks."
    },
    {
      id: 3,
      icon: <CreditCard size={32} className="text-primary-500" />,
      title: "Make Secure Payment",
      description: "Pay securely through our platform with multiple payment options available."
    },
    {
      id: 4,
      icon: <ThumbsUp size={32} className="text-primary-500" />,
      title: "Enjoy & Return",
      description: "Enjoy your rented item and return it as per the agreed terms and conditions."
    }
  ];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">How RentIt4Me Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Renting has never been easier. Follow these simple steps to get started.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="bg-white p-6 rounded-lg shadow-sm text-center transition-transform hover:transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
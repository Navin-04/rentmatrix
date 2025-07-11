import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "RentIt4Me helped me find the perfect camera for my wedding photoshoot. The process was smooth, and I saved so much money compared to buying one!",
      author: "Priya Sharma",
      role: "Photographer",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 5
    },
    {
      id: 2,
      content: "I needed furniture for my new apartment but didn't want to commit to buying. RentIt4Me offered great options at affordable rates. Highly recommend!",
      author: "Rahul Mehta",
      role: "Software Engineer",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 4
    },
    {
      id: 3,
      content: "As a small business owner, I often need equipment for short durations. This platform has been a game changer for managing my business expenses.",
      author: "Kavita Reddy",
      role: "Business Owner",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 5
    }
  ];
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={18} 
        className={`${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how RentIt4Me has helped thousands of customers find the perfect rental solutions.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-gray-50 rounded-lg shadow-sm p-8 md:p-10">
            <div className="flex flex-col items-center text-center">
              <div className="flex mb-4">
                {renderStars(testimonials[activeIndex].rating)}
              </div>
              
              <blockquote className="text-lg md:text-xl italic text-gray-700 mb-6">
                "{testimonials[activeIndex].content}"
              </blockquote>
              
              <div className="flex items-center mb-4">
                <img 
                  src={testimonials[activeIndex].avatar} 
                  alt={testimonials[activeIndex].author} 
                  className="w-16 h-16 rounded-full object-cover mr-4" 
                />
                <div className="text-left">
                  <div className="font-semibold text-lg">{testimonials[activeIndex].author}</div>
                  <div className="text-gray-500">{testimonials[activeIndex].role}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-6 space-x-4">
            <button 
              className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors"
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors"
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className="flex justify-center mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`mx-1 w-3 h-3 rounded-full ${
                  index === activeIndex ? 'bg-primary-500' : 'bg-gray-300'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
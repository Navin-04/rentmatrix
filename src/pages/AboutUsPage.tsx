import React from 'react';
import { Users, Target, Award, Shield, TrendingUp, Heart } from 'lucide-react';

const AboutUsPage: React.FC = () => {
  const stats = [
    { number: '50,000+', label: 'Happy Customers', icon: <Users size={24} /> },
    { number: '100,000+', label: 'Items Rented', icon: <TrendingUp size={24} /> },
    { number: '500+', label: 'Cities Covered', icon: <Target size={24} /> },
    { number: '4.8★', label: 'Average Rating', icon: <Award size={24} /> },
  ];

  const values = [
    {
      icon: <Shield size={32} />,
      title: 'Trust & Safety',
      description: 'We prioritize the safety and security of our community with verified users and secure payment systems.'
    },
    {
      icon: <Heart size={32} />,
      title: 'Community First',
      description: 'Building a sustainable community where sharing resources benefits everyone and reduces waste.'
    },
    {
      icon: <Target size={32} />,
      title: 'Accessibility',
      description: 'Making quality items accessible to everyone, regardless of their budget or location.'
    },
    {
      icon: <Award size={32} />,
      title: 'Quality Service',
      description: 'Committed to providing excellent customer service and maintaining high standards.'
    }
  ];

  const team = [
    {
      name: 'Rahul Sharma',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      bio: 'Former tech executive with 15+ years experience in building scalable platforms.'
    },
    {
      name: 'Priya Patel',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      bio: 'Full-stack developer passionate about creating user-friendly digital experiences.'
    },
    {
      name: 'Amit Kumar',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'Operations expert with deep understanding of logistics and customer service.'
    },
    {
      name: 'Neha Singh',
      role: 'Head of Marketing',
      image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg',
      bio: 'Marketing strategist focused on building meaningful customer relationships.'
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About RentMatrix</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            India's leading rental marketplace, connecting people with the things they need, when they need them.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              At RentMatrix, we believe that access is better than ownership. Our mission is to create a sustainable, 
              community-driven marketplace where people can easily rent the items they need, reducing waste and making 
              quality products accessible to everyone.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We're building a future where sharing resources is the norm, helping people save money, reduce their 
              environmental impact, and build stronger communities through collaborative consumption.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-primary-600 mb-3 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-primary-600 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">How It All Started</h3>
                <p className="text-gray-700 mb-4">
                  RentMatrix was born from a simple observation: people often buy items they only need occasionally, 
                  leading to wasted money and resources. Our founder, Rahul Sharma, experienced this firsthand when 
                  he needed a camera for a weekend trip but couldn't justify buying one.
                </p>
                <p className="text-gray-700 mb-4">
                  What started as a small community of friends sharing items has grown into India's most trusted 
                  rental marketplace, serving thousands of customers across the country.
                </p>
                <p className="text-gray-700">
                  Today, we're proud to help people access the things they need while building a more sustainable 
                  and connected community.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold mb-4">Why Choose RentMatrix?</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span>Verified users and secure transactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span>Wide variety of items across all categories</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span>24/7 customer support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span>Flexible rental periods</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span>Competitive pricing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary-600 mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 opacity-90">
            Start renting today and be part of the sharing economy revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/products" className="btn-secondary">
              Browse Items
            </a>
            <a href="/post-ad" className="btn-primary">
              List Your Item
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage; 
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string[];
  link?: string;
}

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: <Mail size={24} />,
      title: 'Email Us',
      details: ['support@rentmatrix.com', 'business@rentmatrix.com'],
      link: 'mailto:support@rentmatrix.com'
    },
    {
      icon: <Phone size={24} />,
      title: 'Call Us',
      details: ['+91 9988776655', '+91 9988776656'],
      link: 'tel:+919988776655'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Visit Us',
      details: ['RentMatrix HQ', '123 Tech Park, Bangalore', 'Karnataka 560001, India']
    },
    {
      icon: <Clock size={24} />,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed']
    }
  ];

  const officeLocations = [
    {
      city: 'Bangalore',
      address: '123 Tech Park, Electronic City, Bangalore, Karnataka 560100',
      phone: '+91 9988776655',
      email: 'bangalore@rentmatrix.com'
    },
    {
      city: 'Mumbai',
      address: '456 Business Center, Andheri West, Mumbai, Maharashtra 400058',
      phone: '+91 9988776656',
      email: 'mumbai@rentmatrix.com'
    },
    {
      city: 'Delhi',
      address: '789 Innovation Hub, Connaught Place, New Delhi, Delhi 110001',
      phone: '+91 9988776657',
      email: 'delhi@rentmatrix.com'
    },
    {
      city: 'Chennai',
      address: '321 Startup Zone, T Nagar, Chennai, Tamil Nadu 600017',
      phone: '+91 9988776658',
      email: 'chennai@rentmatrix.com'
    }
  ];

  const subjects = [
    'General Inquiry',
    'Technical Support',
    'Billing & Payments',
    'Account Issues',
    'Safety & Security',
    'Partnership Opportunities',
    'Press & Media',
    'Other'
  ];

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions, feedback, or need help? We're here to assist you 24/7. 
            Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-primary-600 mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
                {info.link && (
                  <a 
                    href={info.link}
                    className="inline-block mt-3 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Contact Now
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-6">
                <MessageCircle className="text-primary-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold">Send us a Message</h2>
              </div>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">
                    Thank you for your message! We'll get back to you within 24 hours.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject, index) => (
                        <option key={index} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Office Locations */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-6">
                <MapPin className="text-primary-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold">Our Offices</h2>
              </div>

              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {office.city}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="flex items-start">
                        <MapPin size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                        {office.address}
                      </p>
                      <p className="flex items-center">
                        <Phone size={16} className="mr-2 flex-shrink-0" />
                        <a href={`tel:${office.phone}`} className="hover:text-primary-600">
                          {office.phone}
                        </a>
                      </p>
                      <p className="flex items-center">
                        <Mail size={16} className="mr-2 flex-shrink-0" />
                        <a href={`mailto:${office.email}`} className="hover:text-primary-600">
                          {office.email}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="mt-12 text-center">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Quick Help</h2>
              <p className="text-gray-600 mb-6">
                Looking for quick answers? Check out our frequently asked questions.
              </p>
              <a href="/faq" className="btn-outline">
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage; 
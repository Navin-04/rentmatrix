import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const faqCategories: FAQCategory[] = [
    {
      title: 'Getting Started',
      icon: <HelpCircle size={24} />,
      items: [
        {
          question: 'How do I create an account?',
          answer: 'Creating an account is simple! Click on "Sign Up" in the top right corner, fill in your details, verify your email, and you\'re ready to start renting or listing items.'
        },
        {
          question: 'Is it free to join RentMatrix?',
          answer: 'Yes, creating an account and browsing items is completely free. You only pay when you rent an item or if you choose to upgrade to premium features.'
        },
        {
          question: 'How do I verify my account?',
          answer: 'We require email verification and phone number verification for all accounts. For additional security, you can also upload government-issued ID for enhanced verification.'
        },
        {
          question: 'Can I use RentMatrix without creating an account?',
          answer: 'You can browse items without an account, but you\'ll need to create one to rent items, list your own items, or contact other users.'
        }
      ]
    },
    {
      title: 'Renting Items',
      icon: <HelpCircle size={24} />,
      items: [
        {
          question: 'How do I rent an item?',
          answer: 'Browse items, select the one you want, choose your rental dates, provide your contact information, and complete the payment. The item owner will contact you to arrange pickup or delivery.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit/debit cards, UPI payments, net banking, and digital wallets like Paytm, PhonePe, and Google Pay.'
        },
        {
          question: 'Is there a security deposit?',
          answer: 'Yes, most items require a security deposit which is typically 10-20% of the item\'s value. This is refunded after the item is returned in good condition.'
        },
        {
          question: 'What happens if I damage an item?',
          answer: 'If an item is damaged during your rental period, the cost of repairs or replacement will be deducted from your security deposit. We encourage open communication with the item owner.'
        },
        {
          question: 'Can I extend my rental period?',
          answer: 'Yes, you can request an extension through the platform. The item owner will need to approve the extension, and additional charges will apply.'
        }
      ]
    },
    {
      title: 'Listing Items',
      icon: <HelpCircle size={24} />,
      items: [
        {
          question: 'How do I list an item for rent?',
          answer: 'Click "Post Ad" in the header, fill in your item details, upload photos, set your price and availability, and publish your listing. It\'s that simple!'
        },
        {
          question: 'What items can I list?',
          answer: 'You can list almost anything: electronics, furniture, vehicles, clothing, books, cameras, appliances, and more. Items must be in good condition and legal to rent.'
        },
        {
          question: 'How much should I charge for my item?',
          answer: 'Consider the item\'s value, condition, and market demand. We suggest checking similar items on our platform and pricing competitively. You can always adjust your price later.'
        },
        {
          question: 'How do I get paid?',
          answer: 'Payments are processed through our secure platform. You\'ll receive payment (minus our service fee) within 2-3 business days after the rental period ends.'
        },
        {
          question: 'What if someone doesn\'t return my item?',
          answer: 'We have a comprehensive insurance and dispute resolution system. If an item isn\'t returned, we\'ll help you recover the value through the security deposit and insurance.'
        }
      ]
    },
    {
      title: 'Safety & Security',
      icon: <HelpCircle size={24} />,
      items: [
        {
          question: 'How do you verify users?',
          answer: 'We verify all users through email, phone number, and optional ID verification. We also have a rating and review system to build trust within our community.'
        },
        {
          question: 'What if I have a dispute with another user?',
          answer: 'Our customer support team is available 24/7 to help resolve disputes. We encourage open communication between users and can mediate when necessary.'
        },
        {
          question: 'Is my personal information safe?',
          answer: 'Yes, we take data security seriously. Your personal information is encrypted and never shared with third parties without your consent.'
        },
        {
          question: 'What insurance do you provide?',
          answer: 'We provide basic insurance coverage for all rentals. For high-value items, we recommend additional insurance coverage which can be purchased through our platform.'
        }
      ]
    },
    {
      title: 'Pricing & Fees',
      icon: <HelpCircle size={24} />,
      items: [
        {
          question: 'What are your service fees?',
          answer: 'We charge a 10% service fee on successful rentals. This helps us maintain the platform, provide customer support, and ensure secure transactions.'
        },
        {
          question: 'Are there any hidden charges?',
          answer: 'No hidden charges! All fees are clearly displayed before you complete a transaction. You\'ll see the total cost including rental fee, security deposit, and service fee upfront.'
        },
        {
          question: 'How do refunds work?',
          answer: 'Refunds are processed within 5-7 business days. Security deposits are refunded after item inspection, and rental fees are refunded if the item owner cancels.'
        },
        {
          question: 'Do you offer any discounts?',
          answer: 'Yes! We offer discounts for first-time users, long-term rentals, and bulk rentals. Follow our social media for seasonal promotions and special offers.'
        }
      ]
    },
    {
      title: 'Technical Support',
      icon: <HelpCircle size={24} />,
      items: [
        {
          question: 'How do I contact customer support?',
          answer: 'You can reach us through live chat, email at support@rentmatrix.com, or call us at +91 9988776655. We\'re available 24/7 to help you.'
        },
        {
          question: 'What if the app/website isn\'t working?',
          answer: 'Try refreshing the page or clearing your browser cache. If the issue persists, contact our technical support team and we\'ll help you resolve it quickly.'
        },
        {
          question: 'Can I use RentMatrix on my mobile?',
          answer: 'Yes! Our website is fully responsive and works great on all devices. We also have mobile apps available for iOS and Android.'
        },
        {
          question: 'How do I update my profile information?',
          answer: 'Go to your dashboard, click on "Account Settings", and you can update your personal information, contact details, and preferences anytime.'
        }
      ]
    }
  ];

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about renting and listing items on RentMatrix. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-primary-50 p-6 border-b">
                <div className="flex items-center">
                  <div className="text-primary-600 mr-3">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {category.items.map((item, itemIndex) => {
                  const key = `${categoryIndex}-${itemIndex}`;
                  const isOpen = openItems[key];
                  
                  return (
                    <div key={itemIndex} className="p-6">
                      <button
                        onClick={() => toggleItem(categoryIndex, itemIndex)}
                        className="w-full flex justify-between items-start text-left"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {item.question}
                        </h3>
                        <div className="flex-shrink-0 text-primary-600">
                          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="mt-4 text-gray-600 leading-relaxed">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you 24/7. Don't hesitate to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="btn-primary"
              >
                Contact Support
              </a>
              <a 
                href="mailto:support@rentmatrix.com" 
                className="btn-outline"
              >
                Send Email
              </a>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p>Email: support@rentmatrix.com</p>
              <p>Phone: +91 9988776655</p>
              <p>Response time: Usually within 2 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 
import React, { useState } from 'react';
import { User, Lock, MapPin, Phone, Mail, Smartphone, CreditCard, Shield } from 'lucide-react';

const AccountSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'payment' | 'notifications'>('profile');
  
  // Mock user data
  const user = {
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 9988776655',
    address: '123 Main Street, Mumbai, Maharashtra 400001, India',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  };
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Lock size={18} /> },
    { id: 'payment', label: 'Payment Methods', icon: <CreditCard size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
  ];
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Tabs */}
          <div className="md:w-1/4 border-r">
            <div className="p-4 border-b">
              <div className="flex items-center">
                <img 
                  src={user.profileImage} 
                  alt={`${user.firstName} ${user.lastName}`} 
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-medium">{user.firstName} {user.lastName}</h3>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
            
            <nav className="p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center p-3 rounded-md transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
          
          {/* Content */}
          <div className="md:w-3/4 p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                <p className="text-gray-600 mb-6">Update your personal information and contact details.</p>
                
                <form className="space-y-6">
                  <div className="flex items-center mb-6">
                    <img 
                      src={user.profileImage} 
                      alt={`${user.firstName} ${user.lastName}`} 
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                    <div>
                      <button type="button" className="btn-outline text-sm py-1.5 px-3">
                        Change Photo
                      </button>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, GIF or PNG. Max size 2MB.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          defaultValue={user.firstName}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          defaultValue={user.lastName}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        defaultValue={user.phone}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                        <MapPin size={18} className="text-gray-400" />
                      </div>
                      <textarea
                        defaultValue={user.address}
                        rows={3}
                        className="input-field pl-10 resize-none"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button type="submit" className="btn-primary">Save Changes</button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                <p className="text-gray-600 mb-6">Update your password and security preferences.</p>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="input-field pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="input-field pl-10"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Password must be at least 8 characters long with a number and a special character.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="input-field pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="border-t pt-6 mt-6">
                    <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                    
                    <div className="flex items-start mb-4">
                      <div className="flex items-center h-5">
                        <input
                          id="2fa"
                          type="checkbox"
                          className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="2fa" className="font-medium text-gray-700">
                          Enable Two-Factor Authentication
                        </label>
                        <p className="text-sm text-gray-500">
                          Add an extra layer of security to your account by requiring a verification code.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
                      <Shield size={20} className="text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm text-yellow-800">Security Recommendation</h4>
                        <p className="text-sm text-yellow-700">
                          We strongly recommend enabling two-factor authentication for increased account security.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button type="submit" className="btn-primary">Update Security Settings</button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'payment' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
                <p className="text-gray-600 mb-6">Manage your payment methods and billing information.</p>
                
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded mr-3">
                          <CreditCard size={24} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">HDFC Bank Credit Card</h3>
                          <p className="text-sm text-gray-500">•••• •••• •••• 4242</p>
                          <p className="text-xs text-gray-500">Expires 12/25</p>
                        </div>
                      </div>
                      <div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-2 rounded mr-3">
                          <Smartphone size={24} className="text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">UPI Payment</h3>
                          <p className="text-sm text-gray-500">rahul.sharma@okbank</p>
                        </div>
                      </div>
                      <button className="text-sm text-primary-500 hover:text-primary-600">
                        Make Default
                      </button>
                    </div>
                  </div>
                  
                  <button className="btn-outline py-3 w-full flex items-center justify-center">
                    <CreditCard size={18} className="mr-2" />
                    Add New Payment Method
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
                <p className="text-gray-600 mb-6">Control how we communicate with you.</p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Email Notifications</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Messages</p>
                          <p className="text-sm text-gray-500">Get notified when you receive a new message</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Booking Updates</p>
                          <p className="text-sm text-gray-500">Get notified about your booking status changes</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Promotional Emails</p>
                          <p className="text-sm text-gray-500">Receive offers, discounts, and news</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-3">SMS Notifications</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Booking Confirmation</p>
                          <p className="text-sm text-gray-500">Receive SMS when a booking is confirmed</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Payment Notifications</p>
                          <p className="text-sm text-gray-500">Receive SMS for payment confirmations</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button type="submit" className="btn-primary">Save Preferences</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Define missing component
const Bell: React.FC<{ size: number }> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  );
};

export default AccountSettings;
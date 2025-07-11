import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CreditCard, Smartphone, Building, Shield, CheckCircle, 
  ArrowLeft, Lock, Calendar, MapPin 
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  // Get booking data from either state or URL params
  let bookingData = location.state?.bookingData;
  
  // If no state data, try to get from URL params
  if (!bookingData) {
    const urlParams = new URLSearchParams(location.search);
    const dataParam = urlParams.get('data');
    if (dataParam) {
      try {
        bookingData = JSON.parse(decodeURIComponent(dataParam));
      } catch (error) {
        console.error('Error parsing booking data from URL:', error);
      }
    }
  }
  
  if (!bookingData) {
    // Try to determine if it's a service or product booking and redirect accordingly
    navigate('/services');
    return null;
  }

  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const [upiDetails, setUpiDetails] = useState({
    upiId: ''
  });

  const [netbankingDetails, setNetbankingDetails] = useState({
    bank: ''
  });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setPaymentComplete(true);
      
      // Redirect to success page after 3 seconds
      setTimeout(() => {
        navigate('/dashboard/my-bookings');
      }, 3000);
    }, 2000);
  };

  if (paymentComplete) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-4">
              Your booking has been confirmed. You will receive a confirmation email shortly.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Booking ID</p>
              <p className="font-mono font-bold">BK{Date.now().toString().slice(-8)}</p>
            </div>
            <p className="text-sm text-gray-500">
              Redirecting to your bookings...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Booking
        </button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Complete Payment</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <Lock size={20} className="text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">Secure Payment - Your information is protected</span>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border rounded-lg flex flex-col items-center transition-colors ${
                        paymentMethod === 'card' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <CreditCard size={24} className="mb-2" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 border rounded-lg flex flex-col items-center transition-colors ${
                        paymentMethod === 'upi' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Smartphone size={24} className="mb-2" />
                      <span className="font-medium">UPI Payment</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-4 border rounded-lg flex flex-col items-center transition-colors ${
                        paymentMethod === 'netbanking' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Building size={24} className="mb-2" />
                      <span className="font-medium">Net Banking</span>
                    </button>
                  </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={handlePayment}>
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          required
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                          className="input-field"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            required
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                            className="input-field"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            required
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                            className="input-field"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          required
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                          className="input-field"
                          placeholder="Name as on card"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        required
                        value={upiDetails.upiId}
                        onChange={(e) => setUpiDetails(prev => ({ ...prev, upiId: e.target.value }))}
                        className="input-field"
                        placeholder="yourname@paytm"
                      />
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Bank
                      </label>
                      <select
                        required
                        value={netbankingDetails.bank}
                        onChange={(e) => setNetbankingDetails(prev => ({ ...prev, bank: e.target.value }))}
                        className="input-field"
                        aria-label="Select your bank"
                      >
                        <option value="">Choose your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={processing}
                    className={`btn-primary w-full mt-6 ${
                      processing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {processing ? 'Processing Payment...' : `Pay ${formatCurrency(bookingData.totalAmount)}`}
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                {/* Item Info */}
                <div className="flex items-start mb-4">
                  <img 
                    src={bookingData.product?.image || bookingData.service?.image} 
                    alt={bookingData.product?.title || bookingData.service?.title} 
                    className="w-16 h-16 object-cover rounded-lg mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-sm">{bookingData.product?.title || bookingData.service?.title}</h3>
                    <div className="flex items-center text-gray-600 text-xs mt-1">
                      <MapPin size={12} className="mr-1" />
                      <span>{bookingData.product?.location || bookingData.service?.location}</span>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-2 mb-4 text-sm">
                  {bookingData.dates ? (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rental Period:</span>
                      <span className="font-medium">
                        {new Date(bookingData.dates.start).toLocaleDateString()} - {new Date(bookingData.dates.end).toLocaleDateString()}
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Event Date:</span>
                      <span className="font-medium">
                        {new Date(bookingData.date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {bookingData.time && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Event Time:</span>
                      <span className="font-medium">{bookingData.time}</span>
                    </div>
                  )}
                  {bookingData.quantity && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium">{bookingData.quantity}</span>
                    </div>
                  )}
                  {bookingData.guests && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guests:</span>
                      <span className="font-medium">{bookingData.guests}</span>
                    </div>
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {bookingData.rentalFee ? 'Rental Fee:' : 'Service Fee:'}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(bookingData.rentalFee || bookingData.totalAmount)}
                    </span>
                  </div>
                  {bookingData.securityDeposit && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 flex items-center">
                        <Shield size={14} className="mr-1 text-green-500" />
                        Security Deposit:
                      </span>
                      <span className="font-medium">{formatCurrency(bookingData.securityDeposit)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                    <span>Total Amount:</span>
                    <span className="text-primary-600">
                      {formatCurrency(bookingData.totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Security Info */}
                <div className="mt-6 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center text-green-700 text-sm">
                    <Shield size={16} className="mr-2" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
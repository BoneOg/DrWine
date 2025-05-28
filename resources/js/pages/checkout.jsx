import Layout from '@/components/layout'; 
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Checkout({ reservation }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({});

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const paymentMethods = [
    { name: 'GCash', icon: '📱' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'Visa', icon: '💳' },
    { name: 'PayMaya', icon: '📲' },
    { name: 'PayPal', icon: '🅿️' }
  ];

  const handlePayment = () => {
    if (!selectedMethod) return;

    router.post('/transactions', {
      reservationID: reservation.reservationID,
      amount: 20,
      transaction_type: 'reservation',
      payment_method: selectedMethod,
      payment_details: paymentInfo,
    });
  };

  const handleCancel = () => {
    router.delete(`/reservation/${reservation.reservationID}/cancel`);
  };

  const dateTime = new Date(reservation.date_time);
  const dateStr = dateTime.toLocaleDateString('en-US', { 
    timeZone: 'UTC',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const timeStr = dateTime.toLocaleTimeString('en-US', { 
    timeZone: 'UTC', 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const renderPaymentInputs = () => {
    const inputBaseClass = "w-full bg-black/20 border border-white/10 px-4 py-3 text-sm font-monts \
    placeholder:text-gray-500 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 focus:ring-[#CDAF7B] \
    transition-all duration-300 text-white";

    switch (selectedMethod) {
      case 'GCash':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">GCash Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter your GCash number"
                className={inputBaseClass}
                value={paymentInfo.mobile || ''}
                onChange={e => setPaymentInfo({ ...paymentInfo, mobile: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Reference Number</label>
              <input
                type="text"
                placeholder="Enter reference number"
                className={inputBaseClass}
                value={paymentInfo.ref || ''}
                onChange={e => setPaymentInfo({ ...paymentInfo, ref: e.target.value })}
              />
            </div>
          </div>
        );
      case 'Mastercard':
      case 'Visa':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Cardholder Name</label>
              <input
                type="text"
                placeholder="Enter cardholder name"
                className={inputBaseClass}
                value={paymentInfo.name || ''}
                onChange={e => setPaymentInfo({ ...paymentInfo, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Card Number</label>
              <input
                type="text"
                maxLength={16}
                placeholder="Enter card number"
                className={inputBaseClass}
                value={paymentInfo.cardNumber || ''}
                onChange={e => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
              />
            </div>
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Expiry Date</label>
                <input
                  type="text"
                  maxLength={5}
                  placeholder="MM/YY"
                  className={inputBaseClass}
                  value={paymentInfo.expiry || ''}
                  onChange={e => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                />
              </div>
              <div className="w-32">
                <label className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">CVV</label>
                <input
                  type="text"
                  maxLength={3}
                  placeholder="CVV"
                  className={inputBaseClass}
                  value={paymentInfo.cvv || ''}
                  onChange={e => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                />
              </div>
            </div>
          </div>
        );
      case 'PayMaya':
      case 'PayPal':
        return (
          <div>
            <label className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">{selectedMethod} Email</label>
            <input
              type="email"
              placeholder={`Enter your ${selectedMethod} email`}
              className={inputBaseClass}
              value={paymentInfo.email || ''}
              onChange={e => setPaymentInfo({ ...paymentInfo, email: e.target.value })}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Head title="Checkout" />
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-[#000C1C] to-[#000C1C] text-white">
          {/* Hero Section */}
          <div className="relative h-[50vh] pt-20 flex items-center overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/assets/reserve.png" 
                alt="Background" 
                className="w-full h-full object-cover opacity-90 scale-105 transform hover:scale-100 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#000C1C]/80 to-[#000C1C]"></div>
            </div>
            
            <motion.div 
              className="relative z-10 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-8"
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-felix mb-8 tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#CDAF7B] via-white to-[#CDAF7B]">
                    COMPLETE YOUR RESERVATION
                  </h1>
                  <motion.div 
                    className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-6"
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  <motion.p 
                    className="text-[#CDAF7B] font-monts tracking-[0.3em] uppercase text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    CHECKOUT PROCESS
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="relative pt-20 -mt-20 z-20 pb-20">
            <div className="max-w-5xl mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Summary */}
                <motion.div 
                  className="lg:col-span-5 space-y-6"
                  {...fadeIn}
                >
                  <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-none p-8 hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CDAF7B] to-[#E5C992] flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                        <span className="text-black text-lg font-medium">1</span>
                      </div>
                      <h2 className="text-2xl font-felix text-white">Reservation Details</h2>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white/[0.02] p-6 backdrop-blur-sm border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[#CDAF7B]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="text-sm font-monts tracking-wider uppercase text-[#CDAF7B]">Guest Info</span>
                        </div>
                        <div className="space-y-3 font-monts divide-y divide-white/10">
                          <div className="flex justify-between items-center py-3">
                            <span className="text-[#CDAF7B]">Name</span>
                            <span className="text-white/90">{reservation.customer?.name}</span>
                          </div>
                          <div className="flex justify-between items-center py-3">
                            <span className="text-[#CDAF7B]">Phone</span>
                            <span className="text-white/90">{reservation.customer?.phone}</span>
                          </div>
                          <div className="flex justify-between items-center py-3">
                            <span className="text-[#CDAF7B]">Email</span>
                            <span className="text-white/90">{reservation.customer?.email}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/[0.02] p-6 backdrop-blur-sm border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[#CDAF7B]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="text-sm font-monts tracking-wider uppercase text-[#CDAF7B]">Date & Time</span>
                        </div>
                        <div className="space-y-3 font-monts divide-y divide-white/10">
                          <div className="flex justify-between items-center py-3">
                            <span className="text-[#CDAF7B]">Date</span>
                            <span className="text-white/90">{dateStr}</span>
                          </div>
                          <div className="flex justify-between items-center py-3">
                            <span className="text-[#CDAF7B]">Time</span>
                            <span className="text-white/90">{timeStr}</span>
                          </div>
                          <div className="flex justify-between items-center py-3">
                            <span className="text-[#CDAF7B]">Party Size</span>
                            <span className="text-white/90">{reservation.size} {reservation.size > 1 ? 'guests' : 'guest'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-[#CDAF7B]/10 to-[#E5C992]/10 p-6 border border-white/10">
                        <div className="flex justify-between items-center font-monts">
                          <span className="text-sm text-[#CDAF7B]">Reservation Fee</span>
                          <span className="text-xl font-felix text-white/90">$20.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column - Payment */}
                <motion.div 
                  className="lg:col-span-7"
                  {...fadeIn}
                  transition={{ delay: 0.2 }}
                >
                  <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-none p-8 hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CDAF7B] to-[#E5C992] flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                        <span className="text-black text-lg font-medium">2</span>
                      </div>
                      <h2 className="text-2xl font-felix text-white">Payment Method</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                      {paymentMethods.map(({ name, icon }) => (
                        <label
                          key={name}
                          className={`group cursor-pointer transition-all duration-300 border
                            ${selectedMethod === name 
                              ? 'bg-gradient-to-r from-[#CDAF7B] to-[#E5C992] text-black border-transparent'
                              : 'bg-white/[0.02] hover:bg-white/[0.04] text-white border-white/10'}
                          `}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={name}
                            className="hidden"
                            checked={selectedMethod === name}
                            onChange={() => {
                              setSelectedMethod(name);
                              setPaymentInfo({});
                            }}
                          />
                          <div className="p-6 flex flex-col items-center gap-3">
                            <span className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-110">{icon}</span>
                            <span className="font-monts text-sm text-center">{name}</span>
                          </div>
                        </label>
                      ))}
                    </div>

                    {selectedMethod && (
                      <motion.div 
                        className="mt-8 bg-white/[0.02] p-8 border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        {renderPaymentInputs()}
                      </motion.div>
                    )}

                    {/* Action Buttons */}
                    <motion.div 
                      className="flex flex-col sm:flex-row justify-end gap-4 mt-8 pt-8 border-t border-white/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <button
                        onClick={handleCancel}
                        className="group relative px-8 py-4 font-monts text-sm tracking-wider overflow-hidden text-white/90 hover:text-white transition-colors duration-300"
                      >
                        Cancel Reservation
                      </button>

                      <button
                        onClick={handlePayment}
                        disabled={!selectedMethod}
                        className={`group relative px-8 py-4 font-monts text-sm tracking-wider overflow-hidden
                          ${selectedMethod
                            ? 'cursor-pointer'
                            : 'cursor-not-allowed opacity-50'}
                        `}
                      >
                        <span className="relative z-10 text-black font-medium">
                          Pay $20.00
                        </span>
                        <div className={`absolute inset-0 transition-all duration-300
                          ${selectedMethod
                            ? 'bg-gradient-to-r from-[#CDAF7B] to-[#E5C992] group-hover:scale-105'
                            : 'bg-white/10'}
                        `}></div>
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

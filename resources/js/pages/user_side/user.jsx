// resources/js/pages/user_side/user.jsx

import { Head, router } from '@inertiajs/react';
import Layout from '@/components/layout';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function UserDashboard({ user, customer, transactions }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleLogout = () => {
    router.post('/logout');
  };

  const handleDelete = () => {
    if (
      confirm('Are you sure you want to delete your account? This action cannot be undone.')
    ) {
      router.post(route('user.delete'));
    }
  };

  return (
    <>
      <Head title="User Dashboard" />
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-[#000C1C] to-[#000C1C]">
          {/* Hero Section */}
          <div className="relative h-[40vh] md:h-[60vh] pt-16 md:pt-20 flex items-center overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/assets/contactsection.jpg" 
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
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-6 md:mb-8"
                    initial={{ width: 0 }}
                    animate={{ width: isMobile ? 64 : 80 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-felix text-white mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#CDAF7B] via-white to-[#CDAF7B]">
                    {customer?.name || user.username}
                  </h1>
                  <motion.div 
                    className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-4 md:mb-6"
                    initial={{ width: 0 }}
                    animate={{ width: isMobile ? 64 : 80 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  <motion.p 
                    className="text-[#CDAF7B] font-monts tracking-[0.3em] uppercase text-xs sm:text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Member Dashboard
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="relative pt-12 md:pt-20 -mt-20 z-20 pb-12 md:pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Profile Card */}
                <motion.div 
                  className="lg:col-span-1"
                  {...fadeIn}
                >
                  <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-none p-6 md:p-8 hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                      <h2 className="text-xl md:text-2xl font-felix text-white">Profile</h2>
                      <div className="w-12 h-[1px] bg-gradient-to-r from-[#CDAF7B] to-transparent"></div>
                    </div>
                    
                    <div className="space-y-4 md:space-y-6 font-monts divide-y divide-white/10">
                      <div className="pb-4">
                        <p className="text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Full Name</p>
                        <p className="text-white/90 text-sm">{customer?.name || user.username}</p>
                      </div>
                      <div className="py-4">
                        <p className="text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Email Address</p>
                        <p className="text-white/90 text-sm">{customer?.email || user.email}</p>
                      </div>
                      <div className="py-4">
                        <p className="text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Phone Number</p>
                        <p className="text-white/90 text-sm">{customer?.phone || 'Not Provided'}</p>
                      </div>
                    </div>

                    <div className="mt-8 md:mt-12 space-y-4">
                      <button
                        onClick={handleLogout}
                        className="w-full group relative px-6 md:px-8 py-3 md:py-4 font-monts text-sm tracking-wider overflow-hidden"
                      >
                        <span className="relative z-10 text-black font-medium">
                          SIGN OUT
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#CDAF7B] to-[#E5C992] transform group-hover:scale-105 transition-transform duration-300"></div>
                      </button>
                      <button
                        onClick={handleDelete}
                        className="w-full group relative px-6 md:px-8 py-3 md:py-4 font-monts text-sm tracking-wider overflow-hidden border border-red-500/30 text-red-400 hover:text-red-300 transition-colors duration-300"
                      >
                        DELETE ACCOUNT
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Transactions Card */}
                <motion.div 
                  className="lg:col-span-2"
                  {...fadeIn}
                  transition={{ delay: 0.2 }}
                >
                  <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-none p-6 md:p-8 hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                      <h2 className="text-xl md:text-2xl font-felix text-white">Transaction History</h2>
                      <div className="w-12 h-[1px] bg-gradient-to-r from-[#CDAF7B] to-transparent"></div>
                    </div>

                    {transactions.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-[#CDAF7B] font-monts text-sm">No transactions found</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse font-monts">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left py-3 md:py-4 px-3 md:px-4 text-xs tracking-wider text-[#CDAF7B] uppercase font-normal">Transaction ID</th>
                              <th className="text-left py-3 md:py-4 px-3 md:px-4 text-xs tracking-wider text-[#CDAF7B] uppercase font-normal">Amount</th>
                              <th className="text-left py-3 md:py-4 px-3 md:px-4 text-xs tracking-wider text-[#CDAF7B] uppercase font-normal">Type</th>
                              <th className="text-left py-3 md:py-4 px-3 md:px-4 text-xs tracking-wider text-[#CDAF7B] uppercase font-normal">Status</th>
                              <th className="text-left py-3 md:py-4 px-3 md:px-4 text-xs tracking-wider text-[#CDAF7B] uppercase font-normal">Date</th>
                            </tr>
                          </thead>
                          <tbody className="text-white/90">
                            {transactions.map((transaction, index) => (
                              <tr 
                                key={transaction.transactionID}
                                className="border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-300"
                              >
                                <td className="py-3 md:py-4 px-3 md:px-4 text-xs md:text-sm">{transaction.transactionID}</td>
                                <td className="py-3 md:py-4 px-3 md:px-4 text-xs md:text-sm">₱{transaction.amount.toLocaleString()}</td>
                                <td className="py-3 md:py-4 px-3 md:px-4 text-xs md:text-sm">{transaction.transaction_type}</td>
                                <td className="py-3 md:py-4 px-3 md:px-4">
                                  <span className={`inline-block px-2 md:px-3 py-1 text-xs tracking-wider uppercase
                                    ${transaction.status === 'paid' ? 'text-green-300 border border-green-500/30' :
                                      transaction.status === 'pending' ? 'text-yellow-300 border border-yellow-500/30' :
                                      transaction.status === 'failed' ? 'text-red-300 border border-red-500/30' :
                                      'text-gray-300 border border-gray-500/30'}`}>
                                    {transaction.status}
                                  </span>
                                </td>
                                <td className="py-3 md:py-4 px-3 md:px-4 text-xs md:text-sm">
                                  {transaction.reservation?.date_time
                                    ? (() => {
                                        const dateTime = new Date(transaction.reservation.date_time);
                                        const dateStr = dateTime.toLocaleDateString('en-US', { 
                                          timeZone: 'UTC',
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric'
                                        });
                                        const timeStr = dateTime.toLocaleTimeString('en-US', {
                                          timeZone: 'UTC',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                        });
                                        return `${dateStr} at ${timeStr}`;
                                      })()
                                    : 'N/A'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
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

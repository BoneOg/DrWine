// resources/js/pages/user_side/user.jsx

import { Head, router } from '@inertiajs/react';
import Layout from '@/components/layout';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function UserDashboard({ user, customer, transactions }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user.username,
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
  });
  const [errors, setErrors] = useState({});

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

  const handleEditSubmit = (e) => {
    e.preventDefault();
    router.post('/user/profile/update', editForm, {
      onSuccess: () => {
        setIsEditModalOpen(false);
        setErrors({});
      },
      onError: (errors) => {
        setErrors(errors);
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
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
                    className="text-[#CDAF7B] font-monts tracking-[0.3em] uppercase text-xs sm:text-sm mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Member Dashboard
                  </motion.p>
                  
                  {/* User Action Buttons */}
                  <motion.div 
                    className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="relative pt-12 md:pt-20 -mt-0 z-20 pb-12 md:pb-20">
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
                      <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="group relative px-4 py-2 font-monts text-xs tracking-wider overflow-hidden border border-[#CDAF7B]/30"
                      >
                        <span className="relative z-10 text-black font-bold">
                          EDIT
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#CDAF7B] to-[#E5C992]"></div>
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-[#E5C992] via-white/10 to-[#CDAF7B] opacity-0 
                          group-hover:opacity-100 transition-all duration-500 scale-x-[102%] scale-y-[110%]"
                        ></div>
                      </button>
                    </div>
                    
                    <div className="font-monts divide-y divide-white/10">
                      <div className="pb-3">
                        <p className="text-xs tracking-wider text-[#CDAF7B] uppercase mb-1">Username</p>
                        <p className="text-white/90 text-sm">{user.username}</p>
                      </div>
                      <div className="py-3">
                        <p className="text-xs tracking-wider text-[#CDAF7B] uppercase mb-1">Full Name</p>
                        <p className="text-white/90 text-sm">{customer?.name || user.username}</p>
                      </div>
                      <div className="py-3">
                        <p className="text-xs tracking-wider text-[#CDAF7B] uppercase mb-1">Email Address</p>
                        <p className="text-white/90 text-sm">{customer?.email || user.email}</p>
                      </div>
                      <div className="py-3">
                        <p className="text-xs tracking-wider text-[#CDAF7B] uppercase mb-1">Phone Number</p>
                        <p className="text-white/90 text-sm">{customer?.phone || 'Not Provided'}</p>
                      </div>
                      <div className="mt-12 space-y-4">
                        <button
                          onClick={handleLogout}
                          className="w-full bg-[#CDAF7B] text-black font-monts px-6 py-3 hover:bg-[#B69A6B] 
                          transition-all duration-300 text-sm uppercase tracking-widest"
                        >
                          Sign Out
                        </button>
                        <button
                          onClick={handleDelete}
                          className="w-full bg-transparent border border-red-500/50 text-red-500 font-monts px-6 py-3
                          hover:bg-red-500/10 transition-all duration-300 text-sm uppercase tracking-widest"
                        >
                          Delete Account
                        </button>
                      </div>
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
                                <td className="py-3 md:py-4 px-3 md:px-4 text-xs md:text-sm">${transaction.amount.toLocaleString()}</td>
                                <td className="py-3 md:py-4 px-3 md:px-4 text-xs md:text-sm">{transaction.transaction_type}</td>
                                <td className="py-3 md:py-4 px-3 md:px-4">
                                  <span className={`inline-flex items-center px-3 py-1 text-xs tracking-wider uppercase font-monts
                                    ${transaction.status === 'paid' ? 
                                      'text-emerald-300 border border-emerald-500/30 bg-emerald-500/10' : 
                                    transaction.status === 'pending' ? 
                                      'text-amber-300 border border-amber-500/30 bg-amber-500/10' : 
                                    transaction.status === 'failed' ? 
                                      'text-rose-300 border border-rose-500/30 bg-rose-500/10' :
                                    transaction.status === 'cancelled' ?
                                      'text-slate-300 border border-slate-500/30 bg-slate-500/10' :
                                    transaction.status === 'confirmed' ?
                                      'text-emerald-300 border border-emerald-500/30 bg-emerald-500/10' :
                                    transaction.status === 'completed' ?
                                      'text-sky-300 border border-sky-500/30 bg-sky-500/10' :
                                      'text-gray-300 border border-gray-500/30 bg-gray-500/10'
                                    }`}
                                  >
                                    <div className={`w-1.5 h-1.5 rounded-full mr-2
                                      ${transaction.status === 'paid' ? 'bg-emerald-400' :
                                        transaction.status === 'pending' ? 'bg-amber-400' :
                                        transaction.status === 'failed' ? 'bg-rose-400' :
                                        transaction.status === 'cancelled' ? 'bg-slate-400' :
                                        transaction.status === 'confirmed' ? 'bg-emerald-400' :
                                        transaction.status === 'completed' ? 'bg-sky-400' :
                                        'bg-gray-400'
                                      }`}
                                    />
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

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-black opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom backdrop-blur-xl bg-[#000C1C]/90 border border-[#CDAF7B]/20 rounded-none px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <h3 className="text-2xl font-felix text-white mb-6">Edit Profile</h3>
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="username" className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Username</label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={editForm.username}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                          placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                          focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                        />
                        {errors.username && <p className="text-[#CDAF7B] text-xs mt-1">{errors.username}</p>}
                      </div>

                      <div>
                        <label htmlFor="name" className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={editForm.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                          placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                          focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                        />
                        {errors.name && <p className="text-[#CDAF7B] text-xs mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={editForm.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                          placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                          focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                        />
                        {errors.email && <p className="text-[#CDAF7B] text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={editForm.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                          placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                          focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                        />
                        {errors.phone && <p className="text-[#CDAF7B] text-xs mt-1">{errors.phone}</p>}
                      </div>

                      <div className="mt-8 flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setIsEditModalOpen(false)}
                          className="px-4 py-2 font-monts text-sm tracking-wider text-[#CDAF7B] border border-[#CDAF7B]/30 hover:bg-[#CDAF7B]/10 transition-colors duration-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="group relative px-6 py-2 overflow-hidden border border-[#CDAF7B]/30"
                        >
                          <span className="relative z-10 text-black font-monts font-bold text-sm tracking-wider">
                            Save Changes
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#CDAF7B] to-[#E5C992]"></div>
                          <div 
                            className="absolute inset-0 bg-gradient-to-r from-[#E5C992] via-white/10 to-[#CDAF7B] opacity-0 
                            group-hover:opacity-100 transition-all duration-500 scale-x-[102%] scale-y-[110%]"
                          ></div>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}
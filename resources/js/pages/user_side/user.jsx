// resources/js/pages/user_side/user.jsx

import { Head, router } from '@inertiajs/react';
import Layout from '@/components/layout';

export default function UserDashboard({ user, customer, transactions }) {
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
        <div className="min-h-screen bg-[#000C1C]">
          {/* Hero Section */}
          <div className="relative h-[60vh] flex items-center">
            <div className="absolute inset-0">
              <img 
                src="/assets/contactsection.jpg" 
                alt="Background" 
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#000C1C]/80 to-[#000C1C]"></div>
            </div>
            
            <div className="relative z-10 w-full">
              <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-[1px] bg-[#CDAF7B] mb-8 transform -translate-y-4"></div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-felix text-white mb-4">
                    {customer?.name || user.username}
                  </h1>
                  <div className="w-24 h-[1px] bg-[#CDAF7B] mb-6"></div>
                  <p className="text-[#CDAF7B] font-monts tracking-[0.2em] uppercase text-sm">Member Dashboard</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="relative -mt-20 z-20">
            <div className="max-w-7xl mx-auto px-6 md:px-8 pb-20">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                  <div className="backdrop-blur-md bg-black/30 border border-[#CDAF7B]/20 p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-felix text-[#CDAF7B]">Profile</h2>
                      <div className="w-12 h-[1px] bg-[#CDAF7B]/50"></div>
                    </div>
                    
                    <div className="space-y-6 text-gray-300 font-monts">
                      <div>
                        <p className="text-xs tracking-wider text-[#CDAF7B]/70 uppercase mb-2">Full Name</p>
                        <p className="font-light">{customer?.name || user.username}</p>
                      </div>
                      <div>
                        <p className="text-xs tracking-wider text-[#CDAF7B]/70 uppercase mb-2">Email Address</p>
                        <p className="font-light">{customer?.email || user.email}</p>
                      </div>
                      <div>
                        <p className="text-xs tracking-wider text-[#CDAF7B]/70 uppercase mb-2">Phone Number</p>
                        <p className="font-light">{customer?.phone || 'Not Provided'}</p>
                      </div>
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

                {/* Transactions Card */}
                <div className="lg:col-span-2">
                  <div className="backdrop-blur-md bg-black/30 border border-[#CDAF7B]/20 p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-felix text-[#CDAF7B]">Transaction History</h2>
                      <div className="w-12 h-[1px] bg-[#CDAF7B]/50"></div>
                    </div>

                    {transactions.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-400 font-monts text-sm">No transactions found</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse font-monts">
                          <thead>
                            <tr className="border-b border-[#CDAF7B]/20">
                              <th className="text-left py-4 px-4 text-xs tracking-wider text-[#CDAF7B]/70 uppercase font-normal">Transaction ID</th>
                              <th className="text-left py-4 px-4 text-xs tracking-wider text-[#CDAF7B]/70 uppercase font-normal">Amount</th>
                              <th className="text-left py-4 px-4 text-xs tracking-wider text-[#CDAF7B]/70 uppercase font-normal">Type</th>
                              <th className="text-left py-4 px-4 text-xs tracking-wider text-[#CDAF7B]/70 uppercase font-normal">Status</th>
                              <th className="text-left py-4 px-4 text-xs tracking-wider text-[#CDAF7B]/70 uppercase font-normal">Date</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-300">
                            {transactions.map((transaction, index) => (
                              <tr 
                                key={transaction.transactionID}
                                className="border-b border-[#CDAF7B]/10 hover:bg-[#CDAF7B]/5 transition-colors duration-300"
                              >
                                <td className="py-4 px-4 text-sm font-light">{transaction.transactionID}</td>
                                <td className="py-4 px-4 text-sm font-light">₱{transaction.amount.toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm font-light">{transaction.transaction_type}</td>
                                <td className="py-4 px-4">
                                  <span className={`inline-block px-3 py-1 text-xs tracking-wider uppercase
                                    ${transaction.status === 'paid' ? 'text-green-300 border border-green-500/30' :
                                      transaction.status === 'pending' ? 'text-yellow-300 border border-yellow-500/30' :
                                      transaction.status === 'failed' ? 'text-red-300 border border-red-500/30' :
                                      'text-gray-300 border border-gray-500/30'}`}>
                                    {transaction.status}
                                  </span>
                                </td>
                                <td className="py-4 px-4 text-sm font-light">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

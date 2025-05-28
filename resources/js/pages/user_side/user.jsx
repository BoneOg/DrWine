// resources/js/pages/user_side/user.jsx

import { Head, router, usePage } from '@inertiajs/react';
import Layout from '@/components/layout';
import { useEffect } from "react";

export default function UserDashboard({ user, customer, transactions }) { 
    const { auth } = usePage().props;

    useEffect(() => {
        // Prevent cached version from loading
        window.history.replaceState(null, null, window.location.href);
        
        // If user is not authenticated, redirect to login
        if (!auth.user) {
            router.visit('/login');
        }
    }, [auth]);

    const handleLogout = () => {
        router.post('/logout', {
            onSuccess: () => {
                page.reset();
                window.history.replaceState(null, null, "/login");
                window.location.replace('/login');
            },
        });
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
        <div className="min-h-screen bg-[#000C1C] text-white">
          {/* Hero Section */}
          <div className="relative bg-black/20 py-28 md:py-32 lg:py-36">
            <div className="absolute inset-0 z-0">
              <img 
                src="/assets/contactsection.jpg" 
                alt="Background" 
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-[#000C1C]"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-felix mb-6">
                Welcome, {customer?.name || user.username}!
              </h1>
              <div className="w-24 h-[2px] bg-[#CDAF7B] mb-8"></div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
            {/* Profile Info */}
            <div className="mb-12 backdrop-blur-sm bg-black/20 border border-[#CDAF7B]/20 p-8">
              <h2 className="text-2xl font-felix text-[#CDAF7B] mb-6">Profile Information</h2>
              <div className="space-y-4 text-gray-300 font-monts">
                <p className="flex items-center space-x-2">
                  <span className="text-[#CDAF7B]">Full Name:</span>
                  <span>{customer?.name || user.username}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-[#CDAF7B]">Email:</span>
                  <span>{customer?.email || user.email}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-[#CDAF7B]">Phone Number:</span>
                  <span>{customer?.phone || 'N/A'}</span>
                </p>
              </div>
            </div>

            {/* Transaction History */}
            <div className="mb-12 backdrop-blur-sm bg-black/20 border border-[#CDAF7B]/20 p-8">
              <h2 className="text-2xl font-felix text-[#CDAF7B] mb-6">Transaction History</h2>

              {transactions.length === 0 ? (
                <p className="text-gray-400 font-monts">No transactions found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse font-monts">
                    <thead className="bg-[#CDAF7B]/10 text-[#CDAF7B]">
                      <tr>
                        <th className="px-4 py-3 text-left border-b border-[#CDAF7B]/20">Transaction ID</th>
                        <th className="px-4 py-3 text-left border-b border-[#CDAF7B]/20">Amount</th>
                        <th className="px-4 py-3 text-left border-b border-[#CDAF7B]/20">Type</th>
                        <th className="px-4 py-3 text-left border-b border-[#CDAF7B]/20">Payment</th>
                        <th className="px-4 py-3 text-left border-b border-[#CDAF7B]/20">Status</th>
                        <th className="px-4 py-3 text-left border-b border-[#CDAF7B]/20">Reservation Date</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      {transactions.map((transaction, index) => (
                        <tr 
                          key={transaction.transactionID} 
                          className={`border-b border-[#CDAF7B]/10 hover:bg-[#CDAF7B]/5 transition-colors duration-200
                            ${index % 2 === 0 ? 'bg-black/20' : 'bg-black/10'}`}
                        >
                          <td className="px-4 py-4">{transaction.transactionID}</td>
                          <td className="px-4 py-4">₱{transaction.amount.toLocaleString()}</td>
                          <td className="px-4 py-4">{transaction.transaction_type}</td>
                          <td className="px-4 py-4">{transaction.payment_method}</td>
                          <td className="px-4 py-4">
                            <span className={`px-3 py-1 text-xs font-medium rounded-none
                              ${transaction.status === 'paid' ? 'bg-green-500/20 text-green-300 border border-green-500/50' :
                                transaction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50' :
                                transaction.status === 'failed' ? 'bg-red-500/20 text-red-300 border border-red-500/50' :
                                'bg-gray-500/20 text-gray-300 border border-gray-500/50'}`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            {transaction.reservation?.date_time
                              ? (() => {
                                  const dateTime = new Date(transaction.reservation.date_time);
                                  const dateStr = dateTime.toLocaleDateString('en-US', { timeZone: 'UTC' });
                                  const timeStr = dateTime.toLocaleTimeString('en-US', {
                                    timeZone: 'UTC',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  });
                                  return `${dateStr} ${timeStr}`;
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

            <div className="flex space-x-6">
              <button
                onClick={handleDelete}
                className="bg-transparent border-2 border-red-500 text-red-500 px-8 py-3 font-monts
                hover:bg-red-500 hover:text-white transition-all duration-300 text-sm uppercase tracking-wider"
              >
                Delete Account
              </button>
              <button
                onClick={handleLogout}
                className="bg-[#CDAF7B] text-black px-8 py-3 font-monts hover:bg-[#B69A6B] 
                transition-all duration-300 text-sm uppercase tracking-wider"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

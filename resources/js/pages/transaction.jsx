import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/components/layout';
import { motion } from 'framer-motion';

export default function Transaction({ transaction }) {
    const { reservation } = transaction;
    const customer = reservation?.customer;

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <>
            <Head title="Transaction Details" />
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
                                        TRANSACTION DETAILS
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
                                        RESERVATION CONFIRMED
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="relative pt-20 -mt-20 z-20 pb-20">
                        <div className="max-w-4xl mx-auto px-4 md:px-8">
                            {transaction ? (
                                <div className="space-y-8">
                                    {/* Customer Information */}
                                    <motion.div 
                                        className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-none p-8 hover:bg-white/[0.04] transition-all duration-300"
                                        {...fadeIn}
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CDAF7B] to-[#E5C992] flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <h2 className="text-2xl font-felix text-white">Guest Information</h2>
                                        </div>
                                        <div className="space-y-4 font-monts divide-y divide-white/10">
                                            <div className="flex justify-between items-center py-3">
                                                <span className="text-[#CDAF7B]">Name</span>
                                                <span className="text-white/90">{customer?.name || 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3">
                                                <span className="text-[#CDAF7B]">Phone</span>
                                                <span className="text-white/90">{customer?.phone || 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3">
                                                <span className="text-[#CDAF7B]">Email</span>
                                                <span className="text-white/90">{customer?.email || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Reservation Details */}
                                    <motion.div 
                                        className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-none p-8 hover:bg-white/[0.04] transition-all duration-300"
                                        {...fadeIn}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CDAF7B] to-[#E5C992] flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <h2 className="text-2xl font-felix text-white">Reservation Details</h2>
                                        </div>
                                        <div className="space-y-4 font-monts divide-y divide-white/10">
                                            {(() => {
                                                const dateTime = new Date(reservation?.date_time);
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

                                                return (
                                                    <>
                                                        <div className="flex justify-between items-center py-3">
                                                            <span className="text-[#CDAF7B]">Date</span>
                                                            <span className="text-white/90">{dateStr}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center py-3">
                                                            <span className="text-[#CDAF7B]">Time</span>
                                                            <span className="text-white/90">{timeStr}</span>
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                            <div className="flex justify-between items-center py-3">
                                                <span className="text-[#CDAF7B]">Party Size</span>
                                                <span className="text-white/90">{reservation?.size || 'N/A'} {reservation?.size > 1 ? 'guests' : 'guest'}</span>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Payment Details */}
                                    <motion.div 
                                        className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-none p-8 hover:bg-white/[0.04] transition-all duration-300"
                                        {...fadeIn}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CDAF7B] to-[#E5C992] flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <h2 className="text-2xl font-felix text-white">Payment Details</h2>
                                        </div>
                                        <div className="space-y-4 font-monts divide-y divide-white/10">
                                            <div className="flex justify-between items-center py-3">
                                                <span className="text-[#CDAF7B]">Payment Method</span>
                                                <span className="text-white/90">{transaction.payment_method || 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3">
                                                <span className="text-[#CDAF7B]">Amount</span>
                                                <span className="text-white/90 text-lg">₱{parseFloat(transaction.amount).toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3">
                                                <span className="text-[#CDAF7B]">Status</span>
                                                <span className="px-4 py-1.5 bg-gradient-to-r from-[#CDAF7B] to-[#E5C992] text-black rounded-full font-medium">
                                                    Confirmed
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center py-3">
                                                <span className="text-[#CDAF7B]">Transaction ID</span>
                                                <span className="font-mono text-white/90">{transaction.transactionID || transaction.id}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3">
                                                <span className="text-[#CDAF7B]">Date & Time</span>
                                                <span className="text-white/90">{new Date(transaction.created_at).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Action Button */}
                                    <motion.div 
                                        className="flex justify-center pt-12"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <a
                                            href="/"
                                            className="group relative px-8 py-4 font-monts text-sm tracking-wider overflow-hidden"
                                        >
                                            <span className="relative z-10 text-black font-medium">
                                                RETURN TO HOME
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#CDAF7B] to-[#E5C992] transform group-hover:scale-105 transition-transform duration-300"></div>
                                        </a>
                                    </motion.div>
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-[#CDAF7B] font-monts">No transaction details found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
    
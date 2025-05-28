import { Head } from '@inertiajs/react';
import AdminSidebar from './admin_sidebar';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AdminDashboard({
  totalPendingReservations,
  totalConfirmedReservations,
  totalCancelledReservations,
  totalCompletedReservations,
}) {
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

  return (
    <>
      <Head title="Admin Dashboard" />
      <div className="min-h-screen bg-gradient-to-b from-[#000C1C] to-[#000C1C] text-white flex">
        <AdminSidebar />

        <main className="flex-1 px-6 sm:px-10 pt-16 md:pt-20">
          {/* Header Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-6"
                initial={{ width: 0 }}
                animate={{ width: isMobile ? 64 : 80 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-felix text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#CDAF7B] via-white to-[#CDAF7B]">
                Admin Dashboard Overview
              </h1>
              <motion.div
                className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-4"
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
                Reservation Statuses
              </motion.p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 font-monts"
            {...fadeIn}
          >
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 p-6 md:p-8 hover:bg-white/[0.04] transition-all duration-300">
              <h3 className="text-lg font-semibold text-[#CDAF7B] mb-2">Pending Bookings</h3>
              <p className="text-4xl font-lmonts">{totalPendingReservations}</p>
            </div>

            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 p-6 md:p-8 hover:bg-white/[0.04] transition-all duration-300">
              <h3 className="text-lg font-semibold text-[#CDAF7B] mb-2">Confirmed Bookings</h3>
              <p className="text-4xl font-lmonts">{totalConfirmedReservations}</p>
            </div>

            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 p-6 md:p-8 hover:bg-white/[0.04] transition-all duration-300">
              <h3 className="text-lg font-semibold text-[#CDAF7B] mb-2">Cancelled Bookings</h3>
              <p className="text-4xl font-lmonts">{totalCancelledReservations}</p>
            </div>

            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 p-6 md:p-8 hover:bg-white/[0.04] transition-all duration-300">
              <h3 className="text-lg font-semibold text-[#CDAF7B] mb-2">Completed Bookings</h3>
              <p className="text-4xl font-lmonts">{totalCompletedReservations}</p>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}

// AdminDashboard.jsx
import { Head } from '@inertiajs/react';
import AdminSidebar from '../../components/adminSidebar';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function AdminDashboard({
  totalPendingReservations,
  totalConfirmedReservations,
  totalCancelledReservations,
  totalCompletedReservations,
  userStats,
  revenueStats,
  recentActivity,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint is 768px
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect to close sidebar when switching to larger screens from mobile
  useEffect(() => {
    if (!isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }, [isMobile, isSidebarOpen]); // Added isSidebarOpen to dependency array

  return (
    <>
      <Head title="Admin Dashboard" />
      <div className="min-h-screen bg-gradient-to-b from-[#000C1C] to-[#000C1C] text-white flex relative">
        {/* Mobile menu button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#000C1C] focus:ring-[#CDAF7B]"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* AdminSidebar component */}
        {/* Pass isOpen and onClose props to control its visibility and provide close functionality */}
        <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Overlay for mobile when sidebar is open */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)} // Clicking overlay closes sidebar
          ></div>
        )}

        <main className={`flex-1 px-4 sm:px-6 md:px-8 pt-16 md:pt-20 transition-all duration-300 ease-in-out ${isMobile ? 'ml-0' : 'ml-64'}`}>
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
                Statistics & Analytics
              </motion.p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 font-monts md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Reservation Status Cards */}
            <StatsCard
              title="Pending Bookings"
              value={totalPendingReservations}
              color="yellow"
            />
            <StatsCard
              title="Confirmed Bookings"
              value={totalConfirmedReservations}
              color="green"
            />
            <StatsCard
              title="Cancelled Bookings"
              value={totalCancelledReservations}
              color="red"
            />
            <StatsCard
              title="Completed Bookings"
              value={totalCompletedReservations}
              color="blue"
            />
          </div>

          {/* User Statistics & Revenue Overview */}
          <motion.div className="grid grid-cols-1 font-monts lg:grid-cols-2 gap-6 mb-8" {...fadeIn}>
            {/* User Statistics */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 p-6 rounded-lg">
              <h2 className="text-xl font-felix text-white mb-4">User Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <StatItem label="Total Users" value={userStats.total} />
                <StatItem label="Admin Users" value={userStats.admin} />
                <StatItem label="Regular Users" value={userStats.user} />
                <StatItem label="New This Month" value={userStats.newThisMonth} />
              </div>
            </div>

            {/* Revenue Overview */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 p-6 rounded-lg">
              <h2 className="text-xl font-felix text-white mb-4">Revenue Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <StatItem
                  label="Today's Revenue"
                  value={`$${revenueStats.today?.toLocaleString() || '0'}`}
                />
                <StatItem
                  label="This Week"
                  value={`$${revenueStats.thisWeek?.toLocaleString() || '0'}`}
                />
                <StatItem
                  label="This Month"
                  value={`$${revenueStats.thisMonth?.toLocaleString() || '0'}`}
                />
                <StatItem
                  label="Total Revenue"
                  value={`$${revenueStats.total?.toLocaleString() || '0'}`}
                />
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div className="mb-8" {...fadeIn}>
            <div className="backdrop-blur-xl font-monts bg-white/[0.02] border border-white/10 p-6 rounded-lg">
              <h2 className="text-xl font-felix text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity && recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-2 pt-2 last:border-b-0 last:pb-0"
                    >
                      <div className="mb-2 sm:mb-0">
                        <p className="text-[#CDAF7B]">{activity.customer_name}</p>
                        <p className="text-sm text-white/70">
                          {activity.date_time ? new Date(activity.date_time).toLocaleString() : 'N/A'}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <StatusBadge status={activity.status} />
                        {activity.amount && (
                          <p className="text-right text-sm text-white/70">
                            ${activity.amount.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-[#CDAF7B] py-4">No recent activity</p>
                )}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}

// Helper Components (These remain the same as before)
function StatsCard({ title, value, color }) {
  const colorMap = {
    yellow: "text-yellow-400",
    green: "text-green-400",
    red: "text-red-400",
    blue: "text-blue-400",
  };

  return (
    <motion.div
      className="backdrop-blur-xl bg-white/[0.02] border border-white/10 p-6 md:p-8 hover:bg-white/[0.04] transition-all duration-300 rounded-lg"
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={fadeIn.transition}
    >
      <h3 className={`text-lg font-semibold ${colorMap[color]} mb-2`}>
        {title}
      </h3>
      <p className="text-4xl font-lmonts text-white">{value}</p>
    </motion.div>
  );
}

function StatItem({ label, value }) {
  return (
    <div className="text-center p-3 bg-white/[0.01] border border-white/5 rounded-md">
      <p className="text-sm text-[#CDAF7B] mb-1">{label}</p>
      <p className="text-xl text-white">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusMap = {
    pending: "bg-yellow-800/20 text-yellow-400 border border-yellow-800",
    confirmed: "bg-green-800/20 text-green-400 border border-green-800",
    cancelled: "bg-red-800/20 text-red-400 border border-red-800",
    completed: "bg-blue-800/20 text-blue-400 border border-blue-800",
  };

  const classes = statusMap[status?.toLowerCase()] || "bg-gray-800/20 text-gray-400 border border-gray-800"; // Added optional chaining for safety

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${classes}`}>
      {status}
    </span>
  );
}
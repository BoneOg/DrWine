import { usePage, router } from "@inertiajs/react";
import { useState, useMemo, useEffect } from "react";
import AdminSidebar from "../../components/adminSidebar";
import { motion } from 'framer-motion';
import { Head } from '@inertiajs/react';

export default function Booking() {
  const { reservations = [], flash = {} } = usePage().props;

  const counts = {
    pending: reservations.filter(res => res.status === 'pending').length,
    confirmed: reservations.filter(res => res.transaction?.status === 'confirmed').length,
    cancelled: reservations.filter(res => res.transaction?.status === 'cancelled').length,
    completed: reservations.filter(res => res.transaction?.status === 'completed').length,
  };

  const [expanded, setExpanded] = useState(null);

  // Modal state
  const [modal, setModal] = useState({
    isOpen: false,
    reservationID: null,
    action: null,
  });

  // Search and sort state
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ field: null, order: "asc" });
  const [isMobile, setIsMobile] = useState(false); // State for mobile detection

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const openModal = (reservationID, action) => {
    setModal({
      isOpen: true,
      reservationID,
      action,
    });
  };

  const closeModal = () => {
    setModal({ isOpen: false, reservationID: null, action: null });
  };

  const confirmAction = () => {
    router.post("/admin/reservations/action", {
      reservationID: modal.reservationID,
      action: modal.action,
    });
    closeModal();
  };

  // Sort + Filter Reservations safely
  const filteredAndSortedReservations = useMemo(() => {
    try {
      let filtered = reservations;

      if (searchTerm.trim() !== "") {
        filtered = filtered.filter((res) =>
          (res.customer?.name || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      }

      if (sort.field) {
        filtered = [...filtered].sort((a, b) => {
          let aVal, bVal;

          switch (sort.field) {
            case "name":
              aVal = a.customer?.name?.toLowerCase() || "";
              bVal = b.customer?.name?.toLowerCase() || "";
              break;
            case "guests":
              aVal = a.size ?? 0;
              bVal = b.size ?? 0;
              break;
            case "status":
              aVal = (a.transaction?.status || a.status || "").toLowerCase();
              bVal = (b.transaction?.status || b.status || "").toLowerCase();
              break;
            case "date":
              aVal = a.date_time ? new Date(a.date_time).getTime() : 0; // Sort by reservation date_time
              bVal = b.date_time ? new Date(b.date_time).getTime() : 0;
              break;
            default:
              aVal = "";
              bVal = "";
          }

          if (aVal < bVal) return sort.order === "asc" ? -1 : 1;
          if (aVal > bVal) return sort.order === "asc" ? 1 : -1;
          return 0;
        });
      }

      return filtered;
    } catch (error) {
      console.error("Error filtering/sorting reservations:", error);
      return reservations;
    }
  }, [reservations, searchTerm, sort]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setSort({ field: null, order: "asc" });
      return;
    }
    const [field, order] = value.split("-");
    setSort({ field, order });
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <Head title="Admin Bookings" />
      <div className="min-h-screen bg-gradient-to-b from-[#000C1C] to-[#000C1C] text-white flex">
        <AdminSidebar />
        <main className="flex-1 px-6 sm:px-10 lg:px-8 pt-16 pb-8 lg:ml-64">
          {/* Header Section */}
          <motion.div
            className="mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-4 md:mb-6"
                initial={{ width: 0 }}
                animate={{ width: isMobile ? 64 : 80 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-felix text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#CDAF7B] via-white to-[#CDAF7B]">
                Booking Overview
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 font-monts mb-8"
            {...fadeIn}
          >
            <StatusCard color="yellow" label="Pending" count={counts.pending} />
            <StatusCard color="green" label="Confirmed" count={counts.confirmed} />
            <StatusCard color="red" label="Cancelled" count={counts.cancelled} />
            <StatusCard color="blue" label="Completed" count={counts.completed} />
          </motion.div>

          {/* Parent container for table */}
          <motion.div
            className="backdrop-blur-xl bg-white/[0.02] border border-white/10 shadow-md rounded-lg mb-8 overflow-hidden"
            {...fadeIn}
          >
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row mb-4 font-monts justify-between items-stretch sm:items-center gap-4 p-4 lg:p-6">
              {/* Sort dropdown */}
              <select
                className="w-full sm:w-auto py-2.5 px-4 text-sm border border-white/10 rounded-lg bg-white/[0.02] text-white placeholder-[#CDAF7B] focus:outline-none focus:ring-2 focus:ring-[#CDAF7B]"
                value={sort.field ? `${sort.field}-${sort.order}` : ""}
                onChange={handleSortChange}
              >
                <option value="">Sort by...</option>
                <option value="name-asc">Alphabet Name ↑</option>
                <option value="name-desc">Alphabet Name ↓</option>
                <option value="guests-asc">Guests ↑</option>
                <option value="guests-desc">Guests ↓</option>
                <option value="status-asc">Status ↑</option>
                <option value="status-desc">Status ↓</option>
                <option value="date-asc">Date & Time ↑</option>
                <option value="date-desc">Date & Time ↓</option>
              </select>

              {/* Search input */}
              <div className="relative font-monts w-full sm:w-72 lg:w-96">
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="w-full py-2.5 px-4 pl-10 text-sm border border-white/10 rounded-lg bg-white/[0.02] text-white placeholder-[#CDAF7B] focus:outline-none focus:ring-2 focus:ring-[#CDAF7B]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-[#CDAF7B]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Header Row */}
            <div className="hidden font-monts md:grid grid-cols-6 text-sm font-semibold text-[#CDAF7B] border-b border-white/10 px-6 py-4 bg-white/[0.01]">
              <span>Name</span>
              <span>Guests</span>
              <span>Table Number</span>
              <span>Status</span>
              <span>Date & Time</span>
              <span>Actions</span>
            </div>

            {/* Booking Rows */}
            <div className="relative font-monts max-h-[500px] overflow-y-auto rounded-b-lg">
              <div className="divide-y divide-white/10">
                {filteredAndSortedReservations.length === 0 ? (
                  <p className="text-center text-[#CDAF7B] py-20">
                    No reservations found.
                  </p>
                ) : (
                  filteredAndSortedReservations.map((res) => {
                    const isOpen = expanded === res.reservationID;
                    const isCompletedOrCancelled =
                      res.transaction?.status === "completed" ||
                      res.transaction?.status === "cancelled" ||
                      res.status === "completed" ||
                      res.status === "cancelled";
                    return (
                      <div
                        key={res.reservationID}
                        className="px-4 lg:px-6 py-4 hover:bg-white/[0.03] transition duration-150 cursor-pointer"
                        onClick={() => toggleExpand(res.reservationID)}
                      >
                        {/* Mobile View */}
                        <div className="md:hidden space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-white">{res.customer?.name || "N/A"}</p>
                              <p className="text-sm text-white/70">Guests: {res.size || "N/A"}</p>
                              <p className="text-sm text-white/70">Table: {res.table?.table_number || "N/A"}</p>
                            </div>
                            <StatusBadge status={res.transaction?.status || res.status} />
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-white/70">{new Date(res.date_time).toLocaleString()}</p>
                            {!isCompletedOrCancelled && (
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openModal(res.reservationID, "confirm");
                                  }}
                                  className="bg-green-800/20 text-green-400 border border-green-800 hover:bg-green-700 text-xs px-3 py-1 rounded transition duration-150"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openModal(res.reservationID, "cancel");
                                  }}
                                  className="bg-red-800/20 text-red-400 border border-red-800 hover:bg-red-700 text-xs px-3 py-1 rounded transition duration-150"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Desktop View */}
                        <div className="hidden md:grid grid-cols-6 text-sm text-white items-center">
                          <span>{res.customer?.name || "N/A"}</span>
                          <span>{res.size || "N/A"}</span>
                          <span>{res.table?.table_number || "N/A"}</span>
                          <span>
                            <StatusBadge status={res.transaction?.status || res.status} />
                          </span>
                          <span>{new Date(res.date_time).toLocaleString()}</span>
                          <span className="flex gap-2">
                            {!isCompletedOrCancelled && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openModal(res.reservationID, "confirm");
                                  }}
                                  className="bg-green-800/20 text-green-400 border border-green-800 hover:bg-green-700 text-xs px-3 py-1 rounded transition duration-150"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openModal(res.reservationID, "cancel");
                                  }}
                                  className="bg-red-800/20 text-red-400 border border-red-800 hover:bg-red-700 text-xs px-3 py-1 rounded transition duration-150"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                          </span>
                        </div>

                        {/* Expanded Details */}
                        {isOpen && (
                          <div className="mt-4 rounded-xl px-4 py-4 bg-white/[0.01]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 text-sm text-[#CDAF7B] gap-y-4 gap-x-6">
                              <Detail label="Phone" value={res.customer?.phone} />
                              <Detail label="Email" value={res.customer?.email} />
                              <Detail
                                label="Payment"
                                value={res.transaction?.payment_method}
                              />
                              <Detail
                                label="Date Created"
                                value={
                                  res.transaction?.created_at
                                    ? new Date(res.transaction.created_at).toLocaleString()
                                    : "N/A"
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>

          {/* Flash Message */}
          {flash.success && (
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="px-4 py-3 rounded-lg bg-[#CDAF7B]/20 text-[#CDAF7B] max-w-xs w-full text-center border border-[#CDAF7B]/30">
                {flash.success}
              </div>
            </motion.div>
          )}
        </main>

        {/* Custom Confirmation Modal */}
        {modal.isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
              onClick={closeModal}
              style={{ position: 'fixed', height: '100vh', width: '100vw', top: 0, left: 0 }}
            />

            <motion.div
              className="fixed z-[9999] font-monts"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                position: 'fixed',
                top: '50vh',
                left: '50vw',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="bg-[#0D1B2A] rounded-lg p-8 w-[90vw] max-w-md shadow-xl border border-[#CDAF7B]/30">
                <h2 className="text-xl font-monts mb-6 text-white text-center">
                  Are you sure you want to <span className="text-[#CDAF7B]">{modal.action}</span> this reservation?
                </h2>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2.5 rounded-lg bg-red-800/20 text-red-400 border border-red-800 hover:bg-red-900/30 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmAction}
                    className="px-6 py-2.5 rounded-lg bg-green-800/20 text-green-400 border border-green-800 hover:bg-green-900/30 transition-all duration-200 font-medium"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </>
  );
}

// ---
// ## Helper Components (moved outside main component for clarity)
// ---

function StatusCard({ color, label, count }) {
  // Define color mapping for different statuses, but use fixed styles for the card itself
  const colorMap = {
    yellow: "text-yellow-400", // For text color inside the card
    green: "text-green-400",
    red: "text-red-400",
    blue: "text-blue-400",
  };

  return (
    <div
      className="backdrop-blur-xl bg-white/[0.02] border border-white/10 p-6 md:p-8 hover:bg-white/[0.04] transition-all duration-300"
    >
      <h3 className={`text-lg font-semibold ${colorMap[color]} mb-2`}>
        {label} Bookings
      </h3>
      <p className="text-4xl font-lmonts text-white">{count || 0}</p>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-[#CDAF7B] uppercase font-medium mb-1 tracking-wide">
        {label}
      </p>
      <p className="text-white">{value || "N/A"}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusMap = {
    pending: "bg-yellow-800/20 text-yellow-400 border border-yellow-800",
    confirmed: "bg-green-800/20 text-green-400 border border-green-800",
    cancelled: "bg-red-800/20 text-red-400 border border-red-800",
    completed: "bg-blue-800/20 text-blue-400 border border-blue-800",
    // Fallback for any unknown status
    unknown: "bg-gray-800/20 text-gray-400 border border-gray-800",
  };

  const normalizedStatus = status?.toLowerCase() || "unknown";
  const classes = statusMap[normalizedStatus] || statusMap.unknown;

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium capitalize inline-block ${classes}`}
    >
      {normalizedStatus}
    </span>
  );
}
import { usePage, router } from "@inertiajs/react";
import { useState, useMemo, useEffect } from "react";
import AdminSidebar from "../../components/adminSidebar";
import { motion } from 'framer-motion';
import { Head } from '@inertiajs/react';

// Centralized status definitions
const RESERVATION_STATUSES = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
    UNKNOWN: 'unknown',
};

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const timeslots = [
  "09:00",
  "11:00",
  "13:00",
  "15:00",
  "17:00",
  "19:00",
  "21:00",
];

export default function AdminBooking() {
    const { reservations = [], flash = {} } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const counts = {
        pending: reservations.filter(res => res.status === RESERVATION_STATUSES.PENDING).length,
        confirmed: reservations.filter(res => res.transaction?.status === RESERVATION_STATUSES.CONFIRMED).length,
        cancelled: reservations.filter(res => res.transaction?.status === RESERVATION_STATUSES.CANCELLED).length,
        completed: reservations.filter(res => res.transaction?.status === RESERVATION_STATUSES.COMPLETED).length,
        all: reservations.length, // Add a count for all reservations
    };

    const [expanded, setExpanded] = useState(null);

    // Modal state
    const [modal, setModal] = useState({
        isOpen: false,
        reservationID: null,
        action: null,
    });

    // Search, sort, and filter state
    const [searchTerm, setSearchTerm] = useState("");
    const [sort, setSort] = useState({ field: null, order: "asc" });
    const [filterStatus, setFilterStatus] = useState(null); // New state for dashboard filter
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [disabledDays, setDisabledDays] = useState([]);
    const [disabledTimes, setDisabledTimes] = useState([]);
    const today = new Date();

    const isMonthDisabled = (m) => {
        const thisYear = today.getFullYear();
        const monthDate = new Date(thisYear, m - 1, 1);
        return monthDate < new Date(today.getFullYear(), today.getMonth(), 1);
    };

    // Disable past days for selected month
    useEffect(() => {
        if (!month) return setDisabledDays([]);

        const year = today.getFullYear();
        const selectedMonth = month;
        const daysInMonth = new Date(year, selectedMonth, 0).getDate();

        let disabled = [];
        for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, selectedMonth - 1, d);
        if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate()))
            disabled.push(d);
        }
        setDisabledDays(disabled);
    }, [month]);

    useEffect(() => {
        async function fetchOccupiedTimes() {
        if (!month || !day) return setDisabledTimes([]);

        // Format date string YYYY-MM-DD
        const year = today.getFullYear();
        const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        try {
            const res = await fetch(
            `/api/admin/getOccupiedTables?date=${dateStr}`
            );
            const data = await res.json();

            const disabled = timeslots.filter(
            (slot) => data[slot] >= 6
            );
            setDisabledTimes(disabled);
        } catch (err) {
            console.error(err);
        }
        }
        fetchOccupiedTimes();
    }, [month, day]);


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

            // Apply filter based on dashboard card click
            if (filterStatus) {
                filtered = filtered.filter((res) =>
                    (res.transaction?.status || res.status)?.toLowerCase() === filterStatus
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
                            aVal = a.date_time ? new Date(a.date_time).getTime() : 0;
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
    }, [reservations, searchTerm, sort, filterStatus]); 

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

    const handleReserveClick = () => {
        if (!month || !day || !time || !guests || !name || !email || !phone) {
        alert("Please fill out all fields.");
        return;
        }
        setShowConfirmModal(true);
        setShowModal(false);
    };


    const handleYesClick = () => {
    setShowConfirmModal(false);

    const year = today.getFullYear();
    const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    router.post('/admin/createReservation', {
        name,
        email,
        phone,
        date,
        time,
        guests: Number(guests),
    }, {
        onSuccess: () => {
        setMonth("");
        setDay("");
        setTime("");
        setGuests("");
        setName("");
        setEmail("");
        setPhone("");
        },
        onError: () => {
        alert("Failed to create reservation");
        }
    });
    };

    const isFormValid = () => {
    const nameValid = /^[a-zA-Z\s]+$/.test(name);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneValid = /^\d{11}$/.test(phone);

    return (
        month !== "" &&
        day !== "" &&
        time !== "" &&
        guests !== "" &&
        nameValid &&
        emailValid &&
        phoneValid
    );
    };

    return (
        <>
            <Head title="Staff Bookings" />
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

                {/* StaffSidebar component */}
                <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                {/* Overlay for mobile when sidebar is open */}
                {isMobile && isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                <main className={`flex-1 px-4 sm:px-6 md:px-8 pt-16 md:pt-20 transition-all duration-300 ease-in-out ${isMobile ? 'ml-0' : 'ml-64'}`}>
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
                                Booking Management
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
                                Handle Reservations
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Stats Cards - Now Interactive */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 font-monts mb-8"
                        {...fadeIn}
                    >
                        <StatusCard
                            color="yellow"
                            label="Pending"
                            count={counts.pending}
                            onClick={() => setFilterStatus(RESERVATION_STATUSES.PENDING)}
                            isActive={filterStatus === RESERVATION_STATUSES.PENDING}
                        />
                        <StatusCard
                            color="green"
                            label="Confirmed"
                            count={counts.confirmed}
                            onClick={() => setFilterStatus(RESERVATION_STATUSES.CONFIRMED)}
                            isActive={filterStatus === RESERVATION_STATUSES.CONFIRMED}
                        />
                        <StatusCard
                            color="red"
                            label="Cancelled"
                            count={counts.cancelled}
                            onClick={() => setFilterStatus(RESERVATION_STATUSES.CANCELLED)}
                            isActive={filterStatus === RESERVATION_STATUSES.CANCELLED}
                        />
                        <StatusCard
                            color="blue"
                            label="Completed"
                            count={counts.completed}
                            onClick={() => setFilterStatus(RESERVATION_STATUSES.COMPLETED)}
                            isActive={filterStatus === RESERVATION_STATUSES.COMPLETED}
                        />
                        <StatusCard
                            color="gray"
                            label="All"
                            count={counts.all}
                            onClick={() => setFilterStatus(null)} // Clear filter
                            isActive={filterStatus === null}
                        />
                    </motion.div>

                    {/* Parent container for table */}
                    <motion.div
                        className="backdrop-blur-xl bg-white/[0.02] border border-white/10 shadow-md rounded-lg mb-8 overflow-hidden"
                        {...fadeIn}
                    >
                        {/* Filter Bar */}
                        <div className="flex flex-col sm:flex-row mb-4 font-monts justify-between items-stretch gap-4 p-4 lg:p-6">

                        {/* Left side: Create Reservation button */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-4 py-2 bg-[#CDAF7B] hover:bg-[#d6bb8f]/60 text-black"
                        >
                            Create Reservation
                        </button>

                        {/* Right side: Sort + Search */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:ml-auto">
                            {/* Sort dropdown */}
                            <select
                            className="py-2.5 px-4 text-sm border border-white/10 rounded-lg bg-white/[0.02] text-white placeholder-[#CDAF7B] focus:outline-none focus:ring-2 focus:ring-[#CDAF7B]"
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
                            <div className="relative w-full sm:w-72 lg:w-96">
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
                                        const currentStatus = (res.transaction?.status || res.status)?.toLowerCase();
                                        const isCompletedOrCancelled =
                                            currentStatus === RESERVATION_STATUSES.COMPLETED ||
                                            currentStatus === RESERVATION_STATUSES.CANCELLED ||
                                            currentStatus === RESERVATION_STATUSES.PENDING;
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
                                                        <StatusBadge status={currentStatus} />
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
                                                                    className="bg-blue-800/20 text-blue-400 border border-blue-800 hover:bg-blue-700 text-xs px-3 py-1 rounded transition duration-150"
                                                                >
                                                                    Complete
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
                                                        <StatusBadge status={currentStatus} />
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
                                                                    className="bg-blue-800/20 text-blue-400 border border-blue-800 hover:bg-blue-700 text-xs px-3 py-1 rounded transition duration-150"
                                                                >
                                                                    Complete
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

                    {/* Reservation Modal */}
                    {showModal && (
                        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                        <div className="bg-[#000C1C] text-white rounded-lg shadow-xl w-full max-w-md p-3 border border-[#CDAF7B] space-y-4">
                            <h2 className="font-monts text-lg text-[#CDAF7B]">Create Reservation</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                            {/* Month */}
                            <select
                                value={month}
                                onChange={e => setMonth(e.target.value)}
                                className="font-monts bg-white/[0.02] text-white text-sm border border-white/10 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#CDAF7B]"
                                >
                                <option value="">Month</option>
                                {months.map((m, index) => {
                                    const monthNumber = index + 1;
                                    const disabled = isMonthDisabled(monthNumber);
                                    return (
                                    <option key={m} value={monthNumber} disabled={disabled}>
                                        {m}
                                    </option>
                                    );
                                })}
                                </select>

                            {/* Day */}
                            <select
                                className="font-monts bg-white/[0.02] text-white text-sm border border-white/10 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#CDAF7B]"
                                value={day}
                                onChange={(e) => setDay(Number(e.target.value))}
                                disabled={!month}
                            >
                                <option value="">Day</option>
                                {month &&
                                [...Array(new Date(today.getFullYear(), month, 0).getDate())].map((_, i) => {
                                    const d = i + 1;
                                    return (
                                    <option key={d} value={d} disabled={disabledDays.includes(d)}>
                                        {d}
                                    </option>
                                    );
                                })}
                            </select>

                            {/* Time */}
                            <select
                                className="font-monts bg-white/[0.02] text-white text-sm border border-white/10 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#CDAF7B]"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                disabled={!month || !day}
                            >
                                <option value="">Time</option>
                                {timeslots.map((slot) => (
                                <option key={slot} value={slot} disabled={disabledTimes.includes(slot)}>
                                    {slot}
                                </option>
                                ))}
                            </select>

                            {/* Guests */}
                            <select
                                className="font-monts bg-white/[0.02] text-white text-sm border border-white/10 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#CDAF7B]"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                            >
                                <option value="">Guests</option>
                                {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                                ))}
                            </select>
                            </div>

                            <input
                            type="text"
                            placeholder="Name"
                            className="font-monts w-full px-3 py-2 text-sm bg-white/[0.02] text-white border border-white/10 rounded-md focus:ring-2 focus:ring-[#CDAF7B]"
                            value={name}
                            onChange={(e) => {
                                // Only letters and spaces allowed (basic string validation)
                                const val = e.target.value;
                                if (/^[a-zA-Z\s]*$/.test(val)) {
                                setName(val);
                                }
                            }}
                            required
                            />

                            <input
                            type="email"
                            placeholder="Email"
                            className="font-monts w-full px-3 py-2 text-sm bg-white/[0.02] text-white border border-white/10 rounded-md focus:ring-2 focus:ring-[#CDAF7B]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />

                            <input
                            type="tel"
                            placeholder="Phone Number"
                            className="font-monts w-full px-3 py-2 text-sm bg-white/[0.02] text-white border border-white/10 rounded-md focus:ring-2 focus:ring-[#CDAF7B]"
                            value={phone}
                            onChange={(e) => {
                                // Allow only digits, max length 11
                                const val = e.target.value;
                                if (/^\d{0,11}$/.test(val)) {
                                setPhone(val);
                                }
                            }}
                            maxLength={11}
                            required
                            />

                            <div className="flex justify-end gap-2 pt-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="font-monts px-4 py-2 text-sm rounded-md border border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                            >
                                Cancel
                            </button>
                            <button
                            onClick={handleReserveClick}
                            className="font-monts px-4 py-2 text-sm rounded-md bg-[#CDAF7B] text-black hover:bg-[#d6bb8f] transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!isFormValid()}
                            >
                            Reserve Table
                            </button>
                            </div>
                        </div>
                        </div>
                    )}

                    {/* Confirmation modal */}
                    {showConfirmModal && (
                        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                        <div className="bg-[#000C1C] text-white rounded-lg shadow-xl w-full max-w-sm p-6 space-y-4 text-center">
                            <h2 className="font-monts text-lg text-[#CDAF7B]">
                            Do you want to confirm this reservation?
                            </h2>
                            <div className="flex justify-center gap-4 pt-4">
                            <button
                                onClick={handleYesClick}
                                className="font-monts px-6 py-2 bg-[#CDAF7B] text-black rounded-md hover:bg-[#d6bb8f] transition"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => {
                                setShowConfirmModal(false);
                                setShowModal(true);
                                }}
                                className="font-monts px-6 py-2 bg-white/[0.02] border border-white/10 rounded-md hover:bg-white/[0.05]"
                            >
                                No
                            </button>
                            </div>
                        </div>
                        </div>
                    )}

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

function StatusCard({ color, label, count, onClick, isActive }) {
    const colorMap = {
        yellow: "text-yellow-400",
        green: "text-green-400",
        red: "text-red-400",
        blue: "text-blue-400",
        gray: "text-gray-400", // Add gray for "All"
    };

    return (
        <div
            className={`backdrop-blur-xl bg-white/[0.02] border p-6 md:p-8 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer ${isActive ? 'border-[#CDAF7B] ring-1 ring-[#CDAF7B]' : 'border-white/10'}`}
            onClick={onClick}
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
        [RESERVATION_STATUSES.PENDING]: "bg-yellow-800/20 text-yellow-400 border border-yellow-800",
        [RESERVATION_STATUSES.CONFIRMED]: "bg-green-800/20 text-green-400 border border-green-800",
        [RESERVATION_STATUSES.CANCELLED]: "bg-red-800/20 text-red-400 border border-red-800",
        [RESERVATION_STATUSES.COMPLETED]: "bg-blue-800/20 text-blue-400 border border-blue-800",
        [RESERVATION_STATUSES.UNKNOWN]: "bg-gray-800/20 text-gray-400 border border-gray-800",
    };

    const normalizedStatus = status?.toLowerCase() || RESERVATION_STATUSES.UNKNOWN;
    const classes = statusMap[normalizedStatus] || statusMap[RESERVATION_STATUSES.UNKNOWN];

    return (
        <span
            className={`px-2 py-1 rounded-full text-xs font-medium capitalize inline-block ${classes}`}
        >
            {normalizedStatus}
        </span>
    );
}
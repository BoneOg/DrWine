import { Head, router } from '@inertiajs/react';
import AdminSidebar from '@/components/adminSidebar';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function StaffDashboard({
  selectedDate: initialDate,
  reservationsForDate = [],
  tableOccupancy = [],
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if (!isMobile && isSidebarOpen) setIsSidebarOpen(false);
  }, [isMobile, isSidebarOpen]);

  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    initialDate ? new Date(initialDate).getMonth() : today.getMonth()
  );
  const [selectedDay, setSelectedDay] = useState(
    initialDate ? new Date(initialDate).getDate() : today.getDate()
  );
  const [currentYear, setCurrentYear] = useState(
    initialDate ? new Date(initialDate).getFullYear() : today.getFullYear()
  );
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const daysInMonth = new Date(currentYear, selectedMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, selectedMonth, 1).getDay();
  const emptyCellsCount = (firstDayOfWeek + 6) % 7;

  const isPast = (day) => {
    const date = new Date(currentYear, selectedMonth, day);
    const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayMid;
  };
  const pickDate = (day) => {
    if (isPast(day)) return;
    setSelectedDay(day);
    const yyyy = currentYear;
    const mm = String(selectedMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    router.get(route('admin.tables'), { date: `${yyyy}-${mm}-${dd}` });
  };

  const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  const changeMonth = (newMonth) => {
    const newDate = new Date(currentYear, newMonth, 1);
    setSelectedMonth(newMonth);
    const newDays = new Date(currentYear, newMonth + 1, 0).getDate();
    const dayToPick = Math.min(selectedDay, newDays);
    setSelectedDay(dayToPick);
    setShowMonthPicker(false);
    const yyyy = currentYear;
    const mm = String(newMonth + 1).padStart(2, '0');
    const dd = String(dayToPick).padStart(2, '0');
    router.get(route('staff.dashboard'), { date: `${yyyy}-${mm}-${dd}` });
  };
  const prevMonth = () => {
    let newMonth = selectedMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
      setCurrentYear(newYear);
    }
    changeMonth(newMonth);
  };
  const nextMonth = () => {
    let newMonth = selectedMonth + 1;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
      setCurrentYear(newYear);
    }
    changeMonth(newMonth);
  };

  const timeSlots = ['09:00','11:00','13:00','15:00','17:00','19:00'];
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);

  function formatTime12Hour(time24) {
    const [hour, minute] = time24.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;
  }

  // Sort reservations by time (full day)
  const sortedReservations = [...reservationsForDate].sort((a, b) =>
    new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`)
  );

  // ─────────── “Per‐time” occupancy logic ───────────
  const occupancyForTime = tableOccupancy.map((tbl) => {
    // Convert "15:00" → "3:00 PM"
    const selectedTime12 = formatTime12Hour(selectedTime);

    // Mark reserved only if a reservation exists at that exact 12hr string AND status = confirmed
    const isReserved = reservationsForDate.some(
      (res) =>
        res.time === selectedTime12 &&
        parseInt(res.table_number, 10) === tbl.table_number &&
        res.status?.toLowerCase() === 'confirmed'
    );

    return { ...tbl, status: isReserved ? 'reserved' : 'available' };
  });

  return (
    <>
      <Head title="Staff Dashboard" />
      <div className="min-h-screen bg-gradient-to-b from-[#000C1C] to-[#000C1C] text-white flex relative">
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#000C1C] focus:ring-[#CDAF7B]"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        {isMobile && isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsSidebarOpen(false)} />
        )}
        <main className={`flex-1 px-4 sm:px-6 md:px-8 pt-16 md:pt-20 transition-all duration-300 ease-in-out ${isMobile ? 'ml-0' : 'ml-64'}`}>
          <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex flex-col items-center text-center">
              <motion.div
                className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-6"
                initial={{ width: 0 }}
                animate={{ width: isMobile ? 64 : 80 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-felix text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#CDAF7B] via-white to-[#CDAF7B]">
                Tables Overview
              </h1>
              <motion.div
                className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-4"
                initial={{ width: 0 }}
                animate={{ width: isMobile ? 64 : 80 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.p className="text-[#CDAF7B] font-monts tracking-[0.3em] uppercase text-xs sm:text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                Table Occupancy & Reservations
              </motion.p>
            </div>
          </motion.div>

          {/* ─────────── Layout ─────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-stretch">
            {/* ─────────── Mini Calendar ─────────── */}
            <div className="relative backdrop-blur-xl bg-white/[0.02] border border-white/10 p-6 rounded-lg flex flex-col h-full">
              <div className="flex justify-between items-center w-full mb-4">
                <button onClick={prevMonth} className="text-[#CDAF7B] hover:text-white transition text-lg">‹</button>
                <button onClick={() => setShowMonthPicker(true)} className="text-white font-felix text-lg">
                  {months[selectedMonth]} {currentYear}
                </button>
                <button onClick={nextMonth} className="text-[#CDAF7B] hover:text-white transition text-lg">›</button>
              </div>

              {showMonthPicker && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                  <div className="bg-[#000C1C]/[0.6] backdrop-blur-xl border border-white/10 p-6 rounded-lg grid grid-cols-4 gap-6">
                    {months.map((m, idx) => {
                      const isPastMonth = currentYear === today.getFullYear() && idx < today.getMonth();
                      return (
                        <div
                          key={m}
                          onClick={() => !isPastMonth && changeMonth(idx)}
                          className={`text-center font-monts py-2 rounded transition ${
                            isPastMonth 
                              ? 'text-gray-600 cursor-not-allowed'
                              : 'text-white cursor-pointer hover:bg-[#CDAF7B] hover:text-black'
                          }`}
                        >
                          {m}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-7 font-monts text-center gap-y-3 gap-x-2 text-sm w-full mb-6">
                {['MO','TU','WE','TH','FR','SA','SU'].map((abbr) => (
                  <div key={abbr} className="font-monts text-[#CDAF7B]">{abbr}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-3 gap-x-2 w-full flex-grow">
                {Array.from({ length: emptyCellsCount }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isSelected = day === selectedDay;
                  const past = isPast(day);
                  return (
                    <div
                      key={day}
                      onClick={() => !past && pickDate(day)}
                      className={`py-1 rounded-full font-monts transition text-sm cursor-pointer w-full text-center ${
                        past
                          ? 'text-gray-600 cursor-not-allowed'
                          : isSelected
                          ? 'bg-[#CDAF7B] text-white'
                          : 'hover:bg-[#CDAF7B] hover:text-white'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─────────── Table Occupancy ─────────── */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 p-6 rounded-lg h-full">
              <h2 className="text-xl font-felix text-white mb-4">Table Occupancy</h2>
              <div className="mb-4">
                <label className="block text-sm font-monts text-gray-400 mb-2">Select Time Slot</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-transparent border border-gray-400 text-white px-3 py-2 rounded focus:outline-none focus:border-[#CDAF7B] font-monts text-sm"
                >
                  {timeSlots.map((t) => (
                    <option key={t} value={t} className="bg-[#000C1C] text-white">
                      {formatTime12Hour(t)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {occupancyForTime.map((tbl) => (
                  <div
                    key={tbl.id}
                    className={`p-3 flex flex-col items-center justify-center rounded-lg ${
                      tbl.status === 'reserved'
                        ? 'bg-yellow-800/20 border border-yellow-800'
                        : 'bg-green-800/20 border border-green-800'
                    }`}
                  >
                    <span className="text-white font-monts text-lg">Table {tbl.table_number}</span>
                    <span
                      className={`mt-1 px-2 py-1 text-xs rounded-full font-medium capitalize ${
                        tbl.status === 'reserved'
                          ? 'bg-yellow-800/20 text-yellow-400 border border-yellow-800 font-monts'
                          : 'bg-green-800/20 text-green-400 border border-green-800 font-monts'
                      }`}
                    >
                      {tbl.status}
                    </span>
                    <span className="mt-1 font-monts text-white/70 text-xs">Capacity: {tbl.capacity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─────────── Today's Reservations ─────────── */}
          <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 p-6 rounded-lg mb-20">
            <h2 className="text-xl font-felix text-white mb-4">
              Reservations for{' '}
              {new Date(currentYear, selectedMonth, selectedDay).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </h2>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {sortedReservations.filter(res => !['pending', 'completed', 'cancelled'].includes(res.status?.toLowerCase())).length > 0 ? (
                    sortedReservations
                    .filter(res => !['pending', 'completed', 'cancelled'].includes(res.status?.toLowerCase()))
                    .map((res) => (
                        <div key={res.id} className="flex justify-between items-center border-b border-white/10 pb-2">
                        <div>
                            <p className="text-[#CDAF7B] font-monts">{res.customer_name}</p>
                            <p className="text-sm text-white/70">
                            {res.time} • {res.guest_count} guest{res.guest_count > 1 ? 's' : ''}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-white/70">Table {res.table_number}</span>
                            <StatusBadge status={res.status} />
                        </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-[#CDAF7B]">No reservations on this date</p>
                )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function StatusBadge({ status }) {
  const statusMap = {
    confirmed: 'bg-green-800/20 text-green-400 border border-green-800',
    cancelled: 'bg-red-800/20 text-red-400 border border-red-800',
    completed: 'bg-blue-800/20 text-blue-400 border border-blue-800',
  };
  const classes = statusMap[status?.toLowerCase()] || 'bg-gray-800/20 text-gray-400 border border-gray-800';
  return (
    <span className={`px-2 py-1 rounded-full font-monts text-xs font-medium capitalize ${classes}`}>
      {status}
    </span>
  );
}

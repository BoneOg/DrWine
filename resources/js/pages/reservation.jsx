import { useState } from 'react';
import Layout from '@/components/layout';
import { router } from '@inertiajs/react';

export default function Reservation() {
  const today = new Date();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const timeSlots = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'];
  const guests = Array.from({ length: 10 }, (_, i) => i + 1);

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [selectedGuests, setSelectedGuests] = useState(1);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const currentYear = today.getFullYear();
  const selectedDate = new Date(currentYear, selectedMonth, selectedDay);
  const daysInMonth = new Date(currentYear, selectedMonth + 1, 0).getDate();

  const getDayOfWeek = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const firstDayOfWeek = new Date(currentYear, selectedMonth, 1).getDay();
  const emptyCellsCount = (firstDayOfWeek + 6) % 7;

  const isPast = (day) => {
    const date = new Date(currentYear, selectedMonth, day);
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const formValid =
    name.trim() !== '' &&
    email.trim() !== '' &&
    phone.trim() !== '' &&
    selectedGuests > 0 &&
    !isPast(selectedDay);

  const handleSubmit = () => {
    if (!formValid) return;

    const formattedDate = `${currentYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    const dateTime = `${formattedDate} ${selectedTime}`;

    router.post('/reservation', {
      name,
      email,
      phone,
      size: selectedGuests,
      date_time: dateTime
    });
  };

  // Track dropdown open states separately
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  // Arrow rotation class helper
  const arrowClass = (isOpen) =>
    `w-4 h-4 absolute right-1 top-1/2 pointer-events-none transition-transform duration-300 ease-in-out ${
      isOpen ? 'rotate-[90deg]' : 'rotate-0'
    }`;

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
        <div className="scale-120 origin-top">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-[4fr_2fr] gap-15 items-stretch">


            <div className="flex flex-col flex-grow">
              <h1 className="text-5xl font-felix mb-6 tracking-wide">RESERVATION</h1>

              <div className="flex gap-6 mb-4 max-w-md w-full">
                {/* Month Dropdown */}
                <div className="relative flex-1">
                  <label className="block text-sm font-monts text-gray-400 mb-1">Month</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => {
                      setSelectedMonth(Number(e.target.value));
                      setSelectedDay(1);
                    }}
                    onFocus={() => setIsMonthOpen(true)}
                    onBlur={() => setIsMonthOpen(false)}
                    className="w-full text-white bg-transparent border-b border-gray-500 text-base font-light font-monts tracking-wide py-1 pr-6 appearance-none focus:outline-none focus:border-white"
                  >
                    {months.map((month, index) => (
                      <option key={month} value={index}>{month}</option>
                    ))}
                  </select>
                  <img
                    src="/assets/drop.png"
                    alt="Dropdown arrow"
                    className={arrowClass(isMonthOpen)}
                  />
                </div>

                {/* Time Dropdown */}
                <div className="relative flex-1">
                  <label className="block text-sm font-monts text-gray-400 mb-1">Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    onFocus={() => setIsTimeOpen(true)}
                    onBlur={() => setIsTimeOpen(false)}
                    className="w-full text-white bg-transparent border-b border-gray-500 text-base font-light font-monts tracking-wide py-1 pr-6 appearance-none focus:outline-none focus:border-white"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  <img
                    src="/assets/drop.png"
                    alt="Dropdown arrow"
                    className={arrowClass(isTimeOpen)}
                  />
                </div>

                {/* Guests Dropdown */}
                <div className="relative flex-1">
                  <label className="block text-sm font-monts text-gray-400 mb-1">Guests</label>
                  <select
                    value={selectedGuests}
                    onChange={(e) => setSelectedGuests(Number(e.target.value))}
                    onFocus={() => setIsGuestsOpen(true)}
                    onBlur={() => setIsGuestsOpen(false)}
                    className="w-full text-white bg-transparent border-b border-gray-500 text-base font-light font-monts tracking-wide py-1 pr-6 appearance-none focus:outline-none focus:border-white"
                  >
                    {guests.map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  <img
                    src="/assets/drop.png"
                    alt="Dropdown arrow"
                    className={arrowClass(isGuestsOpen)}
                  />
                </div>
              </div>

              {/* Rest of your calendar and form unchanged */}
              <div className="grid grid-cols-7 font-monts text-center gap-1 text-base max-w-md pt-2 flex-grow">
                {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map(day => (
                  <div key={day} className="font-bold">{day}</div>
                ))}
                {Array.from({ length: emptyCellsCount }).map((_, i) => (
                  <div key={`empty-${i}`}></div>
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isSelected = day === selectedDay;
                  const past = isPast(day);

                  return (
                    <div
                      key={day}
                      onClick={() => !past && setSelectedDay(day)}
                      className={`py-1 rounded-full transition text-sm cursor-pointer ${
                        past
                          ? 'text-gray-600 cursor-not-allowed'
                          : isSelected
                          ? 'bg-red-700 text-white'
                          : 'hover:bg-white hover:text-black'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col justify-between flex-grow">
              <div className="mt-[85px]">
                <div className="mb-6 ">
                  <label className="block text-sm font-monts text-gray-400 mb-1">When</label>
                  <div className="border-b border-gray-400 pb-1 font-monts text-xs">
                    {`${months[selectedMonth]} ${selectedDay} (${getDayOfWeek(selectedDate)}), ${selectedTime}, ${selectedGuests} Guest${selectedGuests > 1 ? 's' : ''}`}
                  </div>
                </div>

                {/* Name - Only letters and space */}
                <div className="mb-4 ">
                  <label className="block text-sm font-monts text-gray-400 mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                      setName(value);
                    }}
                    className="w-full bg-transparent border-b border-gray-400 pb-1 text-xs font-monts outline-none "
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-monts text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-400 pb-1 text-xs font-monts outline-none"
                  />
                </div>

                {/* Phone - Only integers */}
                <div className="mb-8">
                  <label className="block text-sm font-monts text-gray-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setPhone(value);
                    }}
                    className="w-full bg-transparent border-b border-gray-400 pb-1 text-xs font-monts outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!formValid}
                className={`px-4 py-2 text-base font-monts shadow transition ${
                  formValid
                    ? 'bg-white text-black hover:bg-gray-500 cursor-pointer'
                    : 'bg-gray-500 text-gray-300 opacity-50 cursor-not-allowed'
                }`}
              >
                {formValid ? 'Book a Table' : 'Complete Reservation Details'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

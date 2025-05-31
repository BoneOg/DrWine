import { useState } from 'react';
import Layout from '@/components/layout';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';


export default function Reservation() {
  const today = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const timeSlots = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'];
  const guests = Array.from({ length: 10 }, (_, i) => i + 1);

  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [selectedGuests, setSelectedGuests] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const currentYear = today.getFullYear();
  const selectedDate = new Date(currentYear, selectedMonth, selectedDay);
  const daysInMonth = new Date(currentYear, selectedMonth + 1, 0).getDate();

  const getDayOfWeek = (date) =>
    date.toLocaleDateString('en-US', { weekday: 'long' });

  const firstDayOfWeek = new Date(currentYear, selectedMonth, 1).getDay();
  const emptyCellsCount = (firstDayOfWeek + 6) % 7;

  const isPast = (day) => {
    const date = new Date(currentYear, selectedMonth, day);
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  // Email validation regex pattern
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Validate form fields
  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!name.trim()) {
      errors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }

    // Email validation
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (phone.length < 10) {
      errors.phone = 'Please enter a valid phone number';
    }

    // Guest validation
    if (selectedGuests < 1) {
      errors.guests = 'Please select number of guests';
    }

    // Date validation
    if (isPast(selectedDay)) {
      errors.date = 'Please select a future date';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formValid =
    name.trim() !== '' &&
    email.trim() !== '' &&
    phone.trim() !== '' &&
    selectedGuests > 0 &&
    !isPast(selectedDay) &&
    emailPattern.test(email);


  useEffect(() => {
    const fetchAvailableTimes = async () => {
      try {
        const formattedDate = `${currentYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;

        const response = await fetch('/reservation/available-times', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
          },
          body: JSON.stringify({ date: formattedDate, size: selectedGuests }),
        });

        const data = await response.json();
        setAvailableTimes(data);
      } catch {
        setAvailableTimes([]);
      }
    };

    fetchAvailableTimes();
  }, [selectedMonth, selectedDay, selectedGuests]);


  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formattedDate = `${currentYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    const dateTime = `${formattedDate} ${selectedTime}`;

    try {
      // First availability check
      const response = await fetch('/reservation/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({
          date_time: dateTime,
          size: selectedGuests
        })
      });

      const result = await response.json();

      if (!result.available) {
        setError('Sorry, this time slot is no longer available.');
        return;
      }

      setError(null);
      setValidationErrors({});

      // Perform the Inertia POST request
      router.post('/reservation', {
        name,
        email,
        phone,
        size: selectedGuests,
        date_time: dateTime
      }, {
        onError: (errors) => {
          setValidationErrors(errors);
        }
      });

    } catch (err) {
      console.error('Reservation process failed:', err);
      setError('An error occurred during the reservation process. Please try again.');
    }
  };

  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  const arrowClass = (isOpen) =>
    `w-4 h-4 absolute right-1 top-1/2 pointer-events-none transition-transform duration-300 ease-in-out ${
      isOpen ? 'rotate-[180deg]' : 'rotate-0'
    }`;

  return (
    <Layout>
      <div className="min-h-screen bg-[#000C1C] text-white flex items-center justify-center px-10 pt-32 pb-32">
        <div className="transform scale-[1] sm:scale-[1.1] md:scale-[1.2] origin-top overflow-hidden">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-[4fr_2fr] gap-15 items-stretch">

            {/* Left column */}
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
                    className="w-full text-white bg-transparent border-b border-gray-500 text-base font-light font-monts tracking-wide py-1 pr-6 appearance-none focus:outline-none focus:border-[#CDAF7B]"
                  >
                    {months.map((month, index) => (
                      <option key={month} value={index}>{month}</option>
                    ))}
                  </select>
                  <img src="/assets/drop.png" alt="Dropdown arrow" className={arrowClass(isMonthOpen)} />
                </div>

                {/* Time Dropdown */}
                <div className="relative flex-1">
                  <label className="block text-sm font-monts text-gray-400 mb-1">Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    onFocus={() => setIsTimeOpen(true)}
                    onBlur={() => setIsTimeOpen(false)}
                    className="w-full text-white bg-transparent border-b border-gray-500 text-base font-light font-monts tracking-wide py-1 pr-6 appearance-none focus:outline-none focus:border-[#CDAF7B]"
                  >
                    {timeSlots.map((slot) => {
                      const isAvailable = availableTimes.includes(slot);

                      // Convert "13:00" → "1:00 PM"
                      const formatTime = (time24) => {
                        const [hour, minute] = time24.split(':').map(Number);
                        const suffix = hour >= 12 ? 'PM' : 'AM';
                        const hour12 = ((hour + 11) % 12) + 1;
                        return `${hour12}:${minute.toString().padStart(2, '0')} ${suffix}`;
                      };

                      return (
                        <option
                          key={slot}
                          value={slot}
                          disabled={!isAvailable}
                          className={!isAvailable ? 'text-gray-600' : ''}
                        >
                          {formatTime(slot)}
                        </option>
                      );
                    })}
                  </select>
                  <img src="/assets/drop.png" alt="Dropdown arrow" className={arrowClass(isTimeOpen)} />
                </div>

                {/* Guests Dropdown */}
                <div className="relative flex-1">
                  <label className="block text-sm font-monts text-gray-400 mb-1">Guests</label>
                  <select
                    value={selectedGuests}
                    onChange={(e) => setSelectedGuests(Number(e.target.value))}
                    onFocus={() => setIsGuestsOpen(true)}
                    onBlur={() => setIsGuestsOpen(false)}
                    className="w-full text-white bg-transparent border-b border-gray-500 text-base font-light font-monts tracking-wide py-1 pr-6 appearance-none focus:outline-none focus:border-[#CDAF7B]"
                  >
                    {guests.map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  <img src="/assets/drop.png" alt="Dropdown arrow" className={arrowClass(isGuestsOpen)} />
                </div>
              </div>

              {/* Calendar */}
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

            {/* Right column */}
            <div className="flex flex-col justify-between flex-grow">
              <div className="mt-[85px]">
                <div className="mb-6">
                  <label className="block text-sm font-monts text-gray-400 mb-1">When</label>
                  <div className="border-b border-gray-400 pb-1 font-monts text-xs">
                    {`${months[selectedMonth]} ${selectedDay} (${getDayOfWeek(selectedDate)}), ${selectedTime}, ${selectedGuests} Guest${selectedGuests > 1 ? 's' : ''}`}
                  </div>
                </div>

                {/* Name */}
                <div className="mb-4">
                  <label className="block text-sm font-monts text-gray-400 mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                    className={`w-full bg-transparent border-b ${
                      validationErrors.name ? 'border-red-500' : 'border-gray-400'
                    } pb-1 text-xs font-monts outline-none focus:border-[#CDAF7B]`}
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-monts text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-transparent border-b ${
                      validationErrors.email ? 'border-red-500' : 'border-gray-400'
                    } pb-1 text-xs font-monts outline-none focus:border-[#CDAF7B]`}
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="mb-8">
                  <label className="block text-sm font-monts text-gray-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className={`w-full bg-transparent border-b ${
                      validationErrors.phone ? 'border-red-500' : 'border-gray-400'
                    } pb-1 text-xs font-monts outline-none focus:border-[#CDAF7B]`}
                  />
                  {validationErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                  )}
                </div>

                {error && (
                  <div className="text-red-500 text-xs font-monts mb-3">{error}</div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={!formValid}
                className="px-4 py-2 min-w-[250px] text-base font-monts shadow bg-white text-black hover:bg-gray-500 transition cursor-pointer"
                style={{
                  opacity: formValid ? 1 : 0.5,
                  pointerEvents: formValid ? 'auto' : 'none',
                }}
              >
                Book a Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
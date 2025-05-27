import React from 'react';

export default function Reservation() {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const timeSlots = [
    '9:00', '11:00', '13:00',
    '15:00', '17:00', '19:00'
  ];

  const guests = Array.from({ length: 10 }, (_, i) => i + 1);

  const emptyCellsCount = 2; 

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12"> {/* Increased max-w to 6xl */}
        {/* Left Column - Calendar */}
        <div className="flex flex-col">
          <h1 className="text-6xl font-felix mb-8 tracking-wide">RESERVATION</h1>

          {/* Dropdowns with custom styling and increased width */}
          <div className="flex gap-8 mb-6 max-w-lg w-full"> {/* Changed max-w to lg, increased gap */}
            <div className="relative flex-1">
              <label htmlFor="month-select" className="block text-sm font-monts text-gray-400 mb-1">Month</label>
              <select
                id="month-select"
                className="w-full text-white text-left bg-transparent border-b border-gray-500 text-lg font-light font-monts  tracking-wide py-1.5 pr-6 appearance-none focus:outline-none focus:border-white"
              >
                {months.map((month) => (
                  <option key={month}>{month}</option>
                ))}
              </select>
              {/* Custom arrow icon for dropdown */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 mt-2 text-gray-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
              </div>
            </div>

            <div className="relative flex-1">
                <label htmlFor="time-select" className="block text-sm font-monts  text-gray-400 mb-1">Time</label>
                <select
                    id="time-select"
                    className="w-full text-white text-left bg-transparent border-b border-gray-500 text-lg font-light font-monts  tracking-wide py-1.5 pr-6 appearance-none focus:outline-none focus:border-white"
                >
                    {timeSlots.map((slot) => (
                        <option key={slot}>{slot}</option>
                    ))}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 mt-2 text-gray-400 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>

            <div className="relative flex-1">
                <label htmlFor="guests-select" className="block text-sm font-monts  text-gray-400 mb-1">Guests</label>
                <select
                    id="guests-select"
                    className="w-full text-white text-left bg-transparent border-b border-gray-500 text-lg font-light font-monts  tracking-wide py-1.5 pr-6 appearance-none focus:outline-none focus:border-white"
                >
                    {guests.map((num) => (
                        <option key={num}>{num}</option>
                    ))}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 mt-2 text-gray-400 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>
          </div>

          {/* Calendar Grid - now larger */}
          <div className="grid grid-cols-7 font-monts  text-center gap-2 text-lg max-w-lg pt-4 flex-grow"> {/* Increased max-w to lg, added pt-4 */}
            {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map(day => (
              <div key={day} className="font-extrabold">{day}</div>
            ))}
            {/* Empty divs for calendar start day alignment */}
            {Array.from({ length: emptyCellsCount }, (_, i) => <div key={`empty-${i}`}></div>)}
            {Array.from({ length: 31 }, (_, i) => ( // Display 31 days for March
              <div
                key={i}
                className={`py-1 rounded-full ${
                  i + 1 === 7 ? 'bg-green-600 text-white' : 'hover:bg-white hover:text-black'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="flex flex-col justify-between">
            {/* The top-most 'div' for form content. Margin-top calculated to align 'When' with dropdown content. */}
            {/* Fine-tune mt-[...] as needed */}
            <div className="mt-[100.5px]"> {/* Removed space-y-6 from here */}
                {/* Summary section */}
                <div className="mb-6"> {/* Added mb-6 for spacing */}
                    <label className="block text-sm font-monts  text-gray-400 mb-1">When</label>
                    <div className="border-b border-gray-400 pb-1 font-monts  text-lg">
                        April 7 (Sunday), 18:00, 2 guests
                    </div>
                </div>

                {/* Form fields - each with mb-6 */}
                <div className="mb-6">
                    <label className="block text-sm font-monts  text-gray-400 mb-1">Name</label>
                    <input
                        type="text"
                        placeholder="Linda Martin"
                        className="w-full bg-transparent border-b border-gray-400 pb-1 text-lg font-monts  outline-none"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-monts  text-gray-400 mb-1">Email</label>
                    <input
                        type="email"
                        placeholder="lindamartin@gmail.com"
                        className="w-full bg-transparent border-b border-gray-400 pb-1 text-lg font-monts  outline-none"
                    />
                </div>

                <div className="mb-12"> {/* Increased margin-bottom for the last input */}
                    <label className="block text-sm font-monts  text-gray-400 mb-1">Phone Number</label>
                    <input
                        type="text"
                        placeholder="123"
                        className="w-full bg-transparent border-b border-gray-400 pb-1 text-lg font-monts  outline-none"
                    />
                </div>
            </div>

            {/* Button - Reverted color, no rounding */}
            <button className="px-6 py-3 bg-white text-black text-lg font-monts shadow hover:bg-gray-100"> {/* Removed 'rounded' class */}
                Book a table
            </button>
        </div>
      </div>
    </div>
  );
}
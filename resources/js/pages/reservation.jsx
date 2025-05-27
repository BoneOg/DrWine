import React, { useState } from 'react';
import { router, Head } from '@inertiajs/react';
import axios from 'axios';
import Layout from '../Components/layout';

const Reservation = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    size: '',
  });

  const [availableTimes, setAvailableTimes] = useState([]);
  const [errors, setErrors] = useState({});

  const fixedTimes = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'];

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setForm({ ...form, date: selectedDate, time: '' });

    axios.post('/reservation/available-times', { date: selectedDate })
      .then(res => setAvailableTimes(res.data))
      .catch(() => setAvailableTimes([]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const fullDateTime = `${form.date} ${form.time}`;

    router.post('/reservation', {
      ...form,
      date_time: fullDateTime,
    }, {
      onError: setErrors,
    });
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const isFormComplete = form.name && form.phone && form.email && form.date && form.time && form.size;

  return (
    <Layout>
      <Head />

      <div className="min-h-screen bg-[#000000] pt-32 pb-12 px-4 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/assets/reserve.png" 
            alt="Background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#000000] opacity-50"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-fraunces font-light text-white mb-4">
              <span className="text-red-600">B</span>ook a Table
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Join us for an unforgettable dining experience. Reserve your table and let us prepare something special for you.
            </p>
          </div>

          {/* Form Container */}
          <div className="relative bg-white/5 backdrop-blur-xl rounded-none p-8 md:p-12 shadow-2xl 
          border border-white/10 before:absolute before:inset-0 before:bg-gradient-to-b 
          before:from-white/5 before:to-transparent before:rounded-none before:-z-10">
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-white/80 text-sm uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
                    placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 
                    focus:ring-red-500/50 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Your full name"
                  />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-white/80 text-sm uppercase tracking-wider">Phone</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]+"
                    value={form.phone}
                    onChange={e => {
                      const numbersOnly = e.target.value.replace(/\D/g, '');
                      setForm({ ...form, phone: numbersOnly });
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
                    placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 
                    focus:ring-red-500/50 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Your phone number"
                  />
                  {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-white/80 text-sm uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
                    placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 
                    focus:ring-red-500/50 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Your email address"
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Date */}
                <div className="space-y-2">
                  <label className="block text-white/80 text-sm uppercase tracking-wider">Date</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={handleDateChange}
                    min={minDate}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
                    placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 
                    focus:ring-red-500/50 transition-all duration-300 backdrop-blur-sm [color-scheme:dark]"
                  />
                  {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <label className="block text-white/80 text-sm uppercase tracking-wider">Time Slot</label>
                  <select
                    required
                    value={form.time}
                    onChange={e => setForm({ ...form, time: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
                    placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 
                    focus:ring-red-500/50 transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="" className="bg-[#0A121C]">Select Time</option>
                    {fixedTimes.map(time => (
                      <option
                        key={time}
                        value={time}
                        disabled={availableTimes.length > 0 && !availableTimes.includes(time)}
                        className="bg-[#0A121C]"
                      >
                        {time} - {String(Number(time.split(":")[0]) + 2).padStart(2, "0")}:00
                      </option>
                    ))}
                  </select>
                  {errors.time && <span className="text-red-500 text-sm">{errors.time}</span>}
                </div>

                {/* Party Size */}
                <div className="space-y-2">
                  <label className="block text-white/80 text-sm uppercase tracking-wider">Party Size</label>
                  <select
                    required
                    value={form.size}
                    onChange={e => setForm({ ...form, size: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
                    placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 
                    focus:ring-red-500/50 transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="" className="bg-[#0A121C]">Select Size</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1} className="bg-[#0A121C]">
                        {i + 1} {i === 0 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </select>
                  {errors.size && <span className="text-red-500 text-sm">{errors.size}</span>}
                </div>
              </div>

              {/* Submit Button - Full Width */}
              <div className="md:col-span-2 mt-6">
                <button
                  type="submit"
                  disabled={!isFormComplete}
                  className={`w-full bg-gradient-to-r from-red-600/80 to-red-700/80 hover:from-red-600 hover:to-red-700 
                  text-white font-medium rounded-lg transition-all duration-300 py-4 uppercase tracking-wider
                  shadow-lg hover:shadow-red-500/20 backdrop-blur-sm ${!isFormComplete && 'opacity-50 cursor-not-allowed'}`}
                >
                  {isFormComplete ? 'Confirm Reservation' : 'Please Fill All Fields'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reservation;

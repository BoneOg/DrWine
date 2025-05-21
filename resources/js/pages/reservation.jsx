import React, { useState } from 'react';
import { router, Head } from '@inertiajs/react';
import axios from 'axios';  // Make sure axios is imported
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

  const fixedTimes = [
    '09:00', '11:00', '13:00', '15:00', '17:00', '19:00'
  ];

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setForm({ ...form, date: selectedDate, time: '' });

    axios.post('/reservation/available-times', { date: selectedDate })
      .then(res => setAvailableTimes(res.data))
      .catch(() => setAvailableTimes([]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // clear previous errors

    router.post('/reservation', form, { onError: setErrors });
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <Layout>
      <Head title="Reserve a Table" />

      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
        <h1 className="text-2xl font-bold mb-4">Reserve a Table</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block">Name</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded p-2" />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>

          {/* Phone */}
          <div>
            <label className="block">Phone</label>
            <input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full border rounded p-2" />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
          </div>

          {/* Email */}
          <div>
            <label className="block">Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full border rounded p-2" />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

          {/* Date */}
          <div>
            <label className="block">Date</label>
            <input type="date" value={form.date} onChange={handleDateChange}
              min={minDate} className="w-full border rounded p-2" />
            {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
          </div>

          {/* Time Slot */}
          <div>
            <label className="block">Time Slot</label>
            <select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}
              className="w-full border rounded p-2">
              <option value="">Select Time</option>
              {fixedTimes.map(time => (
                <option
                  key={time}
                  value={time}
                  disabled={availableTimes.length > 0 && !availableTimes.includes(time)}
                >
                  {time} - {String(Number(time.split(":")[0]) + 2).padStart(2, "0")}:00
                </option>
              ))}
            </select>
            {errors.time && <span className="text-red-500 text-sm">{errors.time}</span>}
          </div>

          {/* Party Size */}
          <div>
            <label className="block">Party Size</label>
            <select value={form.size} onChange={e => setForm({ ...form, size: e.target.value })}
              className="w-full border rounded p-2">
              <option value="">Select Size</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            {errors.size && <span className="text-red-500 text-sm">{errors.size}</span>}
          </div>

          <button type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Reserve Table
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Reservation;

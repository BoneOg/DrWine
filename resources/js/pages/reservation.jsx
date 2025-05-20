import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/components/layout';

export default function Reservation() {
  const [form, setForm] = useState({
    name: '',
    date: '',
    time: '',
    size: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log(form);
  };

  return (
    <>
      <Head />
      <Layout>
        <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Book a Reservation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Party Size</label>
                <input
                  type="number"
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  min="1"
                  max="20"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
              >
                Reserve Table
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

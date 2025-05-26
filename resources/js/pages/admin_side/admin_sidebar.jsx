import { Link, router } from '@inertiajs/react';

export default function AdminSidebar() {
  const handleLogout = () => {
    router.post('/logout');
  };

  const goHome = () => {
    router.visit('/');
  };

  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-10">
        <img src="/assets/logo1.png" alt="Logo" className="h-16 mx-auto" />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4 text-gray-800 font-semibold">
        <Link href="/admin" className="hover:text-red-600 transition">Dashboard</Link>
        <Link href="/admin/users" className="hover:text-red-600 transition">Users</Link>
        <Link href="/admin/booking" className="hover:text-red-600 transition">Bookings</Link>
      </nav>

      {/* Action Buttons */}
      <div className="mt-auto space-y-2">
        <button
          onClick={goHome}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Home
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

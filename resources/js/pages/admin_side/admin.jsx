import { Head, router, Link } from '@inertiajs/react';

export default function AdminDashboard() {
  const handleLogout = () => {
    router.post('/logout');
  };

  const goHome = () => {
    router.visit('/');
  };

  return (
    <>
      <Head title="Admin Dashboard" />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
          {/* Logo */}
          <div className="mb-10">
            <img src="/assets/logo1.png" alt="Logo" className="h-16 mx-auto" />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 text-gray-800 font-semibold">
            <Link href="/admin" className="hover:text-red-600 transition">Dashboard</Link>
            <Link href="/admin/users" className="hover:text-red-600 transition">Users</Link>
            <Link href="/admin/bookings" className="hover:text-red-600 transition">Bookings</Link>
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

        {/* Main Content */}
        <main className="flex-1 p-10">
          <h1 className="text-3xl font-bold mb-4">Welcome, Admin!</h1>
          <p className="text-gray-600">Use the sidebar to manage your admin panel.</p>
        </main>
      </div>
    </>
  );
}

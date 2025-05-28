import { Link, router } from '@inertiajs/react';

export default function AdminSidebar() {
  const handleLogout = () => {
    router.post('/logout');
  };

  const goHome = () => {
    router.visit('/');
  };

  return (
    <aside
      className="w-64 bg-[#000C1C] border-r border-[rgba(205,175,123,0.4)] py-6 px-2 flex flex-col font-monts text-white"
      style={{
        boxShadow: `
          5px 0 16px -6px rgba(205, 175, 123, 0.22),
          5px 0 24px 2px rgba(205, 175, 123, 0.12),
          5px 0 35px 6px rgba(205, 175, 123, 0.05)
        `,
      }}
    >
      {/* Logo */}
      <div className="mb-10 text-center">
        <img src="/assets/logo2.png" alt="Logo" className="h-16 mx-auto" />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col font-monts text-xl space-y-4">
        <Link
          href="/admin"
          className="px-2 py-3 rounded text-white hover:bg-[#CDAF7B] hover:text-black transition text-left"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/users"
          className="px-2 py-3 rounded text-white hover:bg-[#CDAF7B] hover:text-black transition text-left"
        >
          Users
        </Link>
        <Link
          href="/admin/booking"
          className="px-2 py-3 rounded text-white hover:bg-[#CDAF7B] hover:text-black transition text-left"
        >
          Booking
        </Link>
      </nav>

      {/* Action Buttons */}
      <div className="mt-auto flex flex-col space-y-3 font-monts text-xl">
        <button
          onClick={goHome}
          className="w-full text-white px-2 py-3 rounded hover:bg-[#CDAF7B] hover:text-black transition text-left"
        >
          Home
        </button>
        <button
          onClick={handleLogout}
          className="w-full text-white px-2 py-3 rounded hover:bg-[#CDAF7B] hover:text-black transition text-left"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

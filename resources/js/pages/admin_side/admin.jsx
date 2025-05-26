import { Head, router } from '@inertiajs/react';

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
      <div className="min-h-screen flex flex-col items-center justify-center pt-10 space-y-4">
        <h1 className="text-4xl font-bold mb-6">Welcome, Admin!</h1>

        <button
          onClick={goHome}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </>
  );
}

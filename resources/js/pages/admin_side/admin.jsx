import { Head, router } from '@inertiajs/react';
import Layout from '@/components/layout';

export default function AdminDashboard() {
  const handleLogout = () => {
    router.post('/logout');
  };

  return (
    <>
      <Head title="Admin Dashboard" />
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center pt-10">
          <h1 className="text-4xl font-bold mb-6">Welcome, Admin!</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </Layout>
    </>
  );
}

import { Head } from '@inertiajs/react';
import AdminSidebar from './admin_sidebar';

export default function AdminDashboard() {
  return (
    <>
      <Head title="Admin Dashboard" />
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 p-10">
          <h1 className="text-3xl font-bold mb-4">Welcome, Admin!</h1>
          <p className="text-gray-600">Use the sidebar to manage your admin panel.</p>
        </main>
      </div>
    </>
  );
}

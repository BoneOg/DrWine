// resources/js/pages/admin_side/admin.jsx
import React from 'react';
import { Head, usePage } from '@inertiajs/react'; // Ensure usePage is imported if you use flash messages
import AdminSidebar from './admin_sidebar'; // Assuming admin_sidebar.jsx is in the same directory

export default function AdminLayout({ children }) {
  const { flash } = usePage().props; // Keep this if you have flash messages

  return (
    <div className="flex min-h-screen bg-gray-100"> {/* Removed the extra <> wrapper around Head, as Head goes inside the layout component's children */}
      <AdminSidebar />
      <main className="flex-1 p-10">
        {/* Optional: Flash messages display here */}
        {flash && flash.success && (
            <div className="alert alert-success">{flash.success}</div>
        )}
        {flash && flash.error && (
            <div className="alert alert-danger">{flash.error}</div>
        )}
        {children} {/* THIS IS WHERE THE SPECIFIC PAGE CONTENT (Dashboard, Users Index, etc.) WILL BE RENDERED */}
      </main>
    </div>
  );
}
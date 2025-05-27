import { Head } from '@inertiajs/react';
import AdminSidebar from './admin_sidebar'; // Adjust path if admin_sidebar.jsx is not in the same directory

export default function Dashboard({
    totalPendingReservations,
    totalConfirmedReservations,
    totalCancelledReservations,
    totalCompletedReservations,
    totalPendingTransactions,
    totalPaidTransactions,
    totalFailedTransactions,
    totalRefundedTransactions
}) {
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="flex min-h-screen bg-gray-100">
                <AdminSidebar /> {/* Assuming admin_sidebar.jsx is in the same directory */}
                <main className="flex-1 p-10">
                    <h1 className="text-3xl font-bold mb-4">Admin Dashboard Overview</h1>

                    <h3 className="text-xl font-semibold mb-3">Reservation Statuses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-blue-100 p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-blue-800 mb-2">Pending Bookings</h3>
                            <p className="text-4xl font-bold text-blue-600">{totalPendingReservations}</p>
                        </div>
                        <div className="bg-green-100 p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-green-800 mb-2">Confirmed Bookings</h3>
                            <p className="text-4xl font-bold text-green-600">{totalConfirmedReservations}</p>
                        </div>
                        <div className="bg-red-100 p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-red-800 mb-2">Cancelled Bookings</h3>
                            <p className="text-4xl font-bold text-red-600">{totalCancelledReservations}</p>
                        </div>
                        <div className="bg-purple-100 p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-purple-800 mb-2">Completed Bookings</h3>
                            <p className="text-4xl font-bold text-purple-600">{totalCompletedReservations}</p>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-3">Transaction Statuses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-yellow-100 p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Pending Payments</h3>
                            <p className="text-4xl font-bold text-yellow-600">{totalPendingTransactions}</p>
                        </div>
                        <div className="bg-lime-100 p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-lime-800 mb-2">Paid Transactions</h3>
                            <p className="text-4xl font-bold text-lime-600">{totalPaidTransactions}</p>
                        </div>
                        <div className="bg-orange-100 p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-orange-800 mb-2">Failed Payments</h3>
                            <p className="text-4xl font-bold text-orange-600">{totalFailedTransactions}</p>
                        </div>
                        <div className="bg-pink-100 p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-pink-800 mb-2">Refunded Payments</h3>
                            <p className="text-4xl font-bold text-pink-600">{totalRefundedTransactions}</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
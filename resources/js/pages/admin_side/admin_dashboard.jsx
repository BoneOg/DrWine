import { Head } from '@inertiajs/react';
import AdminSidebar from './admin_sidebar';

export default function Dashboard({
    totalPendingReservations,
    totalConfirmedReservations,
    totalCancelledReservations,
    totalCompletedReservations,
}) {
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="flex min-h-screen bg-[#000C1C] text-white">
                <AdminSidebar />
                <main className="flex-1 p-10">
                    <h1 className="text-5xl font-felix font- text-[#CDAF7B] mb-15 ">Admin Dashboard Overview</h1>

                    <h3 className="text-3xl mb-6 font-semi font-felix">Reservation Statuses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 font-monts">
                        <div className="border border-[#CDAF7B] p-6  text-white">
                            <h3 className="text-lg font-semi mb-2">Pending Bookings</h3>
                            <p className="text-4xl font-lmonts">{totalPendingReservations}</p>
                        </div>
                        <div className="border border-[#CDAF7B] p-6  text-white">
                            <h3 className="text-lg font-semi mb-2">Confirmed Bookings</h3>
                            <p className="text-4xl font-lmonts">{totalConfirmedReservations}</p>
                        </div>
                        <div className="border border-[#CDAF7B] p-6  text-white">
                            <h3 className="text-lg font-semi mb-2">Cancelled Bookings</h3>
                            <p className="text-4xl font-lmonts">{totalCancelledReservations}</p>
                        </div>
                        <div className="border border-[#CDAF7B] p-6  text-white">
                            <h3 className="text-lg font-semi mb-2">Completed Bookings</h3>
                            <p className="text-4xl font-lmonts">{totalCompletedReservations}</p>
                        </div>
                    </div>

                </main>
            </div>
        </>
    );
}

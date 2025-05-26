import { usePage } from "@inertiajs/react";
import AdminSidebar from "./admin_sidebar";

export default function Booking() {
  // Get props sent from backend via Inertia
  // Expecting data structure:
  // props.reservations: array of reservation objects with related customer, table, transaction data
  // props.counts: { pending, confirmed, cancelled, completed }

  const { reservations, counts } = usePage().props;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-6">
        {/* Status Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-yellow-200 rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Pending Reservation
            </h3>
            <p className="text-2xl font-bold">{counts.pending || 0}</p>
          </div>
          <div className="bg-green-200 rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Confirmed Reservation
            </h3>
            <p className="text-2xl font-bold">{counts.confirmed || 0}</p>
          </div>
          <div className="bg-red-200 rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Cancelled Reservation
            </h3>
            <p className="text-2xl font-bold">{counts.cancelled || 0}</p>
          </div>
          <div className="bg-blue-200 rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Completed Reservation
            </h3>
            <p className="text-2xl font-bold">{counts.completed || 0}</p>
          </div>
        </div>

        {/* Reservations List */}
        <div className="bg-white rounded-lg shadow p-6">
          {reservations.length === 0 ? (
            <p className="text-center text-gray-500">No reservations found.</p>
          ) : (
            reservations.map((res) => (
              <div
                key={res.reservationID}
                className="border-b border-gray-200 py-4 last:border-b-0"
              >
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <span className="font-semibold">Name: </span>
                    {res.customer?.name || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Phone Number: </span>
                    {res.customer?.phone || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Email: </span>
                    {res.customer?.email || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Table Number: </span>
                    {res.table?.table_number || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Date + Time: </span>
                    {new Date(res.date_time).toLocaleString() || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Status: </span>
                    {res.transaction?.status || res.status || "N/A"}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

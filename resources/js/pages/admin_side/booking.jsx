import { usePage, router } from "@inertiajs/react";
import { useState } from "react";
import AdminSidebar from "./admin_sidebar";

export default function Booking() {
  const { reservations, counts } = usePage().props;
  const [expanded, setExpanded] = useState(null);

  // Modal state
  const [modal, setModal] = useState({
    isOpen: false,
    reservationID: null,
    action: null,
  });

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  // Open modal with specific reservation and action
  const openModal = (reservationID, action) => {
    setModal({
      isOpen: true,
      reservationID,
      action,
    });
  };

  // Close modal
  const closeModal = () => {
    setModal({ isOpen: false, reservationID: null, action: null });
  };

  // Confirm the action in modal
  const confirmAction = () => {
    router.post("/admin/reservations/action", {
      reservationID: modal.reservationID,
      action: modal.action,
    });
    closeModal();
  };

  return (
    <div className="flex min-h-screen bg-[#f9f9f9] text-gray-800 font-sans relative">
      <AdminSidebar />

      <main className="flex-1 px-12 py-10">
        {/* Header Section */}
        <section className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-6">
            Booking Overview
          </h1>
          <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatusCard color="yellow" label="Pending" count={counts.pending} />
            <StatusCard color="green" label="Confirmed" count={counts.confirmed} />
            <StatusCard color="red" label="Cancelled" count={counts.cancelled} />
            <StatusCard color="blue" label="Completed" count={counts.completed} />
          </div>
        </section>

        {/* Parent container */}
        <div className="mx-6 bg-white rounded-2xl shadow-md border border-gray-100">
          {/* Filter Bar */}
          <div className="flex mb-4 flex-wrap justify-between items-center gap-4 px-6 pt-6">
            <div className="relative w-full sm:w-1/2 lg:w-1/3">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </div>

            <select className="py-2 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300">
              <option>All Status</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
              <option>Completed</option>
            </select>
          </div>

          {/* Header Row */}
          <div className="grid grid-cols-6 text-sm font-semibold text-gray-500 border-b border-gray-200 px-6 py-4 mr-6 ml-6 bg-gray-50">
            <span>Name</span>
            <span>Guests</span>
            <span>Table Number</span>
            <span>Status</span>
            <span>Date & Time</span>
            <span>Actions</span>
          </div>

          {/* Booking Rows */}
          <div className="relative max-h-[500px] overflow-y-auto my-0 rounded-b-2xl mr-6 ml-6 mb-4">
            <div className="pointer-events-none absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="overflow-x-auto divide-y divide-gray-200">
              {reservations.length === 0 ? (
                <p className="text-center text-gray-400 py-20">No reservations found.</p>
              ) : (
                reservations.map((res) => {
                  const isOpen = expanded === res.reservationID;
                  const isCompletedOrCancelled =
                    res.transaction?.status === "completed" || res.transaction?.status === "cancelled" || res.status === "completed" || res.status === "cancelled";
                  return (
                    <div
                      key={res.reservationID}
                      className="px-6 py-4 hover:bg-gray-50 transition duration-150 cursor-pointer"
                      onClick={() => toggleExpand(res.reservationID)}
                    >
                      {/* Row with 6 columns */}
                      <div className="grid grid-cols-6 text-sm text-gray-800 min-w-[800px]">
                        <span>{res.customer?.name || "N/A"}</span>
                        <span>{res.size || "N/A"}</span>
                        <span>{res.table?.table_number || "N/A"}</span>
                        <span><StatusBadge status={res.transaction?.status || res.status} /></span>
                        <span>{new Date(res.date_time).toLocaleString()}</span>
                        <span className="flex gap-2">
                          {!isCompletedOrCancelled && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openModal(res.reservationID, "confirm");
                                }}
                                className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openModal(res.reservationID, "cancel");
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </span>
                      </div>

                      {/* Expanded Details */}
                      {isOpen && (
                        <div className="mt-4 rounded-xl px-4 py-4">
                          <div className="grid grid-cols-6 text-sm text-gray-700 gap-y-4">
                            <div className="col-span-1 -ml-4"><Detail label="Phone" value={res.customer?.phone} /></div>
                            <div className="col-span-1 -ml-2"><Detail label="Email" value={res.customer?.email} /></div>
                            <div className="col-span-1 -ml-1.5"><Detail label="Payment" value={res.transaction?.payment_method} /></div>
                            <div className="col-span-2"><Detail label="Date Created" value={
                              res.transaction?.created_at
                                ? new Date(res.transaction.created_at).toLocaleString()
                                : "N/A"
                            } /></div>
                            <div className="col-span-1" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Custom Confirmation Modal */}
        {modal.isOpen && (
          <>
            {/* Background overlay with 10% black opacity */}
            <div
              className="fixed inset-0 bg-black/20 z-40"
              onClick={closeModal} // Close modal if clicked outside popup
            />

            {/* Popup box */}
            <div
              className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3
                          bg-white rounded-lg p-6 w-80 shadow-lg z-50"
            >
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                Are you sure you want to {modal.action} this reservation?
              </h2>
              <div className="flex justify-end gap-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                >
                  No
                </button>
                <button
                  onClick={confirmAction}
                  className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  Yes
                </button>
              </div>
            </div>
          </>
        )}
    </div>
  );
}

function StatusCard({ color, label, count }) {
  const colorMap = {
    yellow: "bg-yellow-50 text-yellow-800",
    green: "bg-green-50 text-green-800",
    red: "bg-red-50 text-red-800",
    blue: "bg-blue-50 text-blue-800",
  };

  return (
    <div className={`rounded-xl p-6 shadow-sm ${colorMap[color]} border border-gray-100`}>
      <h3 className="text-sm font-medium mb-2 tracking-wide">{label} Reservations</h3>
      <p className="text-3xl font-semibold">{count || 0}</p>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 uppercase font-medium mb-1 tracking-wide">{label}</p>
      <p className="text-gray-900">{value || "N/A"}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusMap = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800",
  };

  const normalizedStatus = status?.toLowerCase() || "unknown";
  const classes = statusMap[normalizedStatus] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium capitalize inline-block ${classes}`}
    >
      {normalizedStatus}
    </span>
  );
}
import { usePage, router } from "@inertiajs/react";
import { useState, useMemo } from "react";
import AdminSidebar from "./admin_sidebar";

export default function AdminUsers() {
  const { users = [], flash = {} } = usePage().props;

  const [modal, setModal] = useState({
    isOpen: false,
    userID: null,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ field: null, order: "asc" });

  // Sort + Filter users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((user) =>
        (user.username || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (user.email || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sort.field) {
      filtered = [...filtered].sort((a, b) => {
        let aVal, bVal;
        switch (sort.field) {
          case "username":
            aVal = a.username?.toLowerCase() || "";
            bVal = b.username?.toLowerCase() || "";
            break;
          case "email":
            aVal = a.email?.toLowerCase() || "";
            bVal = b.email?.toLowerCase() || "";
            break;
          case "role":
            aVal = a.role?.toLowerCase() || "";
            bVal = b.role?.toLowerCase() || "";
            break;
          case "date":
            aVal = a.created_at ? new Date(a.created_at).getTime() : 0;
            bVal = b.created_at ? new Date(b.created_at).getTime() : 0;
            break;
          default:
            aVal = "";
            bVal = "";
        }
        if (aVal < bVal) return sort.order === "asc" ? -1 : 1;
        if (aVal > bVal) return sort.order === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [users, searchTerm, sort]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setSort({ field: null, order: "asc" });
      return;
    }
    const [field, order] = value.split("-");
    setSort({ field, order });
  };

  const openModal = (userID) => {
    setModal({ isOpen: true, userID });
  };

  const closeModal = () => {
    setModal({ isOpen: false, userID: null });
  };

  const confirmDelete = () => {
    router.delete(`/admin/users/${modal.userID}`);
    closeModal();
  };

  return (
    <div className="flex min-h-screen bg-[#000C1C] text-white font-sans relative">
      <AdminSidebar />

      <main className="flex-1 px-12 py-10">
        {/* Header Section */}
        <section className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-[#CDAF7B] font-felix mb-6">
            User Management
          </h1>

          <div className="px-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6 max-w-xs">
            <StatusCard label="Registered Users" count={users.length} />
          </div>
        </section>

        {/* Users Table Container */}
        <div className="mx-6 bg-transparent rounded-2xl shadow-md border border-[#CDAF7B]">
          {/* Filter Bar */}
          <div className="flex mb-4 flex-wrap justify-between items-center gap-4 px-6 pt-6">
            {/* Sort dropdown */}
            <select
              className="py-2 px-3 text-sm border border-[#CDAF7B] rounded-lg bg-transparent text-white placeholder-[#CDAF7B] focus:outline-none focus:ring-2 focus:ring-[#CDAF7B]"
              value={sort.field ? `${sort.field}-${sort.order}` : ""}
              onChange={handleSortChange}
            >
              <option value="">Sort by...</option>
              <option value="username-asc">Username ↑</option>
              <option value="username-desc">Username ↓</option>
              <option value="email-asc">Email ↑</option>
              <option value="email-desc">Email ↓</option>
              <option value="role-asc">Role ↑</option>
              <option value="role-desc">Role ↓</option>
              <option value="date-asc">Date Created ↑</option>
              <option value="date-desc">Date Created ↓</option>
            </select>

            {/* Search input */}
            <div className="relative w-full sm:w-1/2 lg:w-1/3">
              <input
                type="text"
                placeholder="Search by username or email..."
                className="w-full py-2 pl-10 pr-4 text-sm border border-[#CDAF7B] rounded-lg bg-transparent text-white placeholder-[#CDAF7B] focus:outline-none focus:ring-2 focus:ring-[#CDAF7B]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-[#CDAF7B]"
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
          </div>

          {/* Header Row */}
          <div className="grid grid-cols-5 text-sm font-semibold text-[#CDAF7B] border-b border-[#CDAF7B] px-6 py-4 mr-6 ml-6 bg-transparent">
            <span>Username</span>
            <span>Email</span>
            <span>Role</span>
            <span>Date Created</span>
            <span>Actions</span>
          </div>

          {/* User Rows */}
          <div className="relative max-h-[500px] overflow-y-auto my-0 rounded-b-2xl mr-6 ml-6 mb-4">
            <div className="overflow-x-auto divide-y divide-[#CDAF7B]/30">
              {filteredAndSortedUsers.length === 0 ? (
                <p className="text-center text-[#CDAF7B] py-20">
                  No users found.
                </p>
              ) : (
                filteredAndSortedUsers.map((user) => (
                  <div
                    key={user.userID}
                    className="px-6 py-4 hover:bg-[#1A2533] transition duration-150"
                  >
                    <div className="grid grid-cols-5 text-sm text-white min-w-[800px] items-center">
                      <span>{user.username}</span>
                      <span>{user.email}</span>
                      <span className="capitalize">{user.role}</span>
                      <span>
                        {user.created_at
                          ? new Date(user.created_at).toLocaleString()
                          : "N/A"}
                      </span>
                      <span>
                        <button
                          onClick={() => openModal(user.userID)}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Flash Message */}
        {flash.success && (
          <div className="mt-4 flex justify-center">
            <div className="px-4 py-3 rounded bg-[#CDAF7B]/20 text-[#CDAF7B] max-w-xs w-full text-center">
              {flash.success}
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {modal.isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeModal}
          />

          <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 bg-[#0D1B2A] rounded-lg p-6 w-80 shadow-lg z-50 border border-[#CDAF7B]">
            <h2 className="text-lg font-semibold mb-4 text-[#CDAF7B]">
              Are you sure you want to delete this user?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded border border-[#CDAF7B] text-[#CDAF7B] hover:bg-[#CDAF7B]/10"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Updated StatusCard Component
function StatusCard({ label, count }) {
  return (
    <div className="rounded-xl p-6 border border-[#CDAF7B] bg-transparent text-[#CDAF7B] font-monts">
      <h3 className="text-sm font-medium mb-2 tracking-wide uppercase">{label}</h3>
      <p className="text-3xl font-semibold text-white">{count || 0}</p>
    </div>
  );
}


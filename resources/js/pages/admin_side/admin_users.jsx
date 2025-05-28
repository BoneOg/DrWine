import { usePage, router } from "@inertiajs/react";
import { useState, useMemo, useEffect } from "react";
import AdminSidebar from "./admin_sidebar";
import { motion } from 'framer-motion';
import { Head } from '@inertiajs/react';

export default function AdminUsers() {
  const { users = [], flash = {} } = usePage().props;

  const [modal, setModal] = useState({
    isOpen: false,
    userID: null,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ field: null, order: "asc" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <Head title="Admin Users" />
      <div className="min-h-screen bg-gradient-to-b from-[#000C1C] to-[#000C1C] text-white flex">
        <AdminSidebar />

        <main className="flex-1 px-6 sm:px-10 pt-16 md:pt-20">
          {/* Header Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-6"
                initial={{ width: 0 }}
                animate={{ width: isMobile ? 64 : 80 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-felix text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#CDAF7B] via-white to-[#CDAF7B]">
                User Management
              </h1>
              <motion.div
                className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-4"
                initial={{ width: 0 }}
                animate={{ width: isMobile ? 64 : 80 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.p
                className="text-[#CDAF7B] font-monts tracking-[0.3em] uppercase text-xs sm:text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                All Registered Users
              </motion.p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 font-monts mb-12"
            {...fadeIn}
          >
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 p-6 md:p-8 hover:bg-white/[0.04] transition-all duration-300">
              <h3 className="text-lg font-semibold text-[#CDAF7B] mb-2">Total Users</h3>
              <p className="text-4xl font-lmonts">{users.length}</p>
            </div>
            {/* You can add more user-related statistics here if needed,
                e.g., "Admin Users", "Regular Users" */}
          </motion.div>

          {/* Users Table Container */}
          <motion.div
            className="backdrop-blur-xl bg-white/[0.02] border border-white/10 shadow-md rounded-lg mb-8"
            {...fadeIn}
          >
            {/* Filter Bar */}
            <div className="flex mb-4 flex-wrap justify-between items-center gap-4 px-6 pt-6">
              {/* Sort dropdown */}
              <select
                className="py-2 px-3 text-sm border border-white/10 rounded-lg bg-white/[0.02] text-white placeholder-[#CDAF7B] focus:outline-none focus:ring-2 focus:ring-[#CDAF7B]"
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
                  className="w-full py-2 pl-10 pr-4 text-sm border border-white/10 rounded-lg bg-white/[0.02] text-white placeholder-[#CDAF7B] focus:outline-none focus:ring-2 focus:ring-[#CDAF7B]"
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
            <div className="grid grid-cols-5 text-sm font-semibold text-[#CDAF7B] border-b border-white/10 px-6 py-4 bg-white/[0.01]">
              <span>Username</span>
              <span>Email</span>
              <span>Role</span>
              <span>Date Created</span>
              <span>Actions</span>
            </div>

            {/* User Rows */}
            <div className="relative max-h-[500px] overflow-y-auto rounded-b-lg">
              <div className="overflow-x-auto divide-y divide-white/10">
                {filteredAndSortedUsers.length === 0 ? (
                  <p className="text-center text-[#CDAF7B] py-20">
                    No users found.
                  </p>
                ) : (
                  filteredAndSortedUsers.map((user) => (
                    <div
                      key={user.userID}
                      className="px-6 py-4 hover:bg-white/[0.03] transition duration-150"
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
                            className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition duration-150"
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
          </motion.div>

          {/* Flash Message */}
          {flash.success && (
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="px-4 py-3 rounded-lg bg-[#CDAF7B]/20 text-[#CDAF7B] max-w-xs w-full text-center border border-[#CDAF7B]/30">
                {flash.success}
              </div>
            </motion.div>
          )}
        </main>

        {/* Delete Confirmation Modal */}
        {modal.isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={closeModal}
            />

            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0D1B2A] rounded-lg p-6 w-80 shadow-lg z-50 border border-[#CDAF7B]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-semibold mb-4 text-[#CDAF7B]">
                Are you sure you want to delete this user?
              </h2>
              <div className="flex justify-end gap-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md border border-[#CDAF7B] text-[#CDAF7B] hover:bg-[#CDAF7B]/10 transition duration-150"
                >
                  No
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition duration-150"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </>
  );
}

// Removed StatusCard component as it's integrated into the main component's structure
import { usePage, router } from "@inertiajs/react";
import { useState, useMemo, useEffect } from "react";
import AdminSidebar from "../../components/adminSidebar";
import { motion } from 'framer-motion';
import { Head } from '@inertiajs/react';

export default function AdminUsers() {
  const { users = [], flash = {} } = usePage().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [modal, setModal] = useState({
    isOpen: false,
    userID: null,
    type: null, // 'delete', 'edit', or 'create'
  });

  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    role: '',
  });

  const [createForm, setCreateForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
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

  const openModal = (userID, type, userData = null) => {
    setModal({ isOpen: true, userID, type });
    if (type === 'edit' && userData) {
      setEditForm({
        username: userData.username,
        email: userData.email,
        role: userData.role,
      });
    }
  };

  const closeModal = () => {
    setModal({ isOpen: false, userID: null, type: null });
    setEditForm({ username: '', email: '', role: '' });
    setCreateForm({ username: '', email: '', password: '', role: 'user' });
  };

  const confirmDelete = () => {
    router.delete(`/admin/users/${modal.userID}`);
    closeModal();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    router.put(route('admin.users.update', modal.userID), editForm);
    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    router.post(route('admin.users.store'), createForm);
    closeModal();
  };

  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setCreateForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Add toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Head title="Admin Users" />
      <div className="min-h-screen bg-gradient-to-b from-[#000C1C] to-[#000C1C] text-white flex">
        {/* Sidebar */}
        <AdminSidebar />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 md:ml-64 w-full">
          {/* Header Section - Already responsive */}
          <motion.div className="mb-8 md:mb-12" {...fadeIn}>
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

          {/* Stats Cards - Updated grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 font-monts mb-8"
            {...fadeIn}
          >
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 p-4 md:p-6 hover:bg-white/[0.04] transition-all duration-300">
              <h3 className="text-base md:text-lg font-semibold text-[#CDAF7B] mb-2">Total Users</h3>
              <p className="text-2xl md:text-4xl font-lmonts">{users.length}</p>
            </div>
          </motion.div>

          {/* Users Table Container */}
          <motion.div
            className="backdrop-blur-xl font-monts bg-white/[0.02] border border-white/10 shadow-md rounded-lg mb-8 overflow-hidden"
            {...fadeIn}
          >
            {/* Filter Bar - Updated for better mobile layout */}
            <div className="p-4 md:p-6 space-y-4">
              <button
                onClick={() => openModal(null, 'create')}
                className="w-full sm:w-auto bg-green-800/20 text-green-400 border border-green-800 hover:bg-green-900 text-sm px-4 py-2 rounded transition duration-150"
              >
                Create New User
              </button>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <select
                  className="py-2 px-3 text-sm border border-white/10 rounded-lg bg-white/[0.02] text-white placeholder-[#CDAF7B] focus:outline-none focus:ring-2 focus:ring-[#CDAF7B] w-full sm:w-auto"
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

                <div className="relative flex-1">
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
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              {/* Table Header - Hidden on mobile */}
              <div className="hidden md:grid md:grid-cols-5 text-sm font-semibold text-[#CDAF7B] border-b border-white/10 px-6 py-4 bg-white/[0.01]">
                <span>Username</span>
                <span>Email</span>
                <span>Role</span>
                <span>Date Created</span>
                <span>Actions</span>
              </div>

              {/* User Rows */}
              <div className="divide-y divide-white/10">
                {filteredAndSortedUsers.length === 0 ? (
                  <p className="text-center text-[#CDAF7B] py-20">
                    No users found.
                  </p>
                ) : (
                  filteredAndSortedUsers.map((user) => (
                    <div
                      key={user.userID}
                      className="p-4 md:p-6 hover:bg-white/[0.03] transition duration-150"
                    >
                      {/* Mobile Layout */}
                      <div className="md:hidden space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-white">{user.username}</p>
                            <p className="text-sm text-[#CDAF7B]">{user.email}</p>
                          </div>
                          <span className="capitalize text-sm bg-white/[0.02] px-2 py-1 rounded">
                            {user.role}
                          </span>
                        </div>
                        <p className="text-xs text-[#CDAF7B]/70">
                          {user.created_at
                            ? new Date(user.created_at).toLocaleString()
                            : "N/A"}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => openModal(user.userID, 'edit', user)}
                            className="flex-1 bg-blue-800/20 text-blue-400 border border-blue-800 hover:bg-blue-900 text-xs px-3 py-1 rounded transition duration-150"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openModal(user.userID, 'delete')}
                            className="flex-1 bg-red-800/20 text-red-400 border border-red-800 hover:bg-red-900 text-xs px-3 py-1 rounded transition duration-150"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:grid md:grid-cols-5 text-sm text-white items-center">
                        <span>{user.username}</span>
                        <span>{user.email}</span>
                        <span className="capitalize">{user.role}</span>
                        <span>
                          {user.created_at
                            ? new Date(user.created_at).toLocaleString()
                            : "N/A"}
                        </span>
                        <span className="flex gap-2">
                          <button
                            onClick={() => openModal(user.userID, 'edit', user)}
                            className="bg-blue-800/20 text-blue-400 border border-blue-800 hover:bg-blue-900 text-xs px-3 py-1 rounded transition duration-150"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openModal(user.userID, 'delete')}
                            className="bg-red-800/20 text-red-400 border border-red-800 hover:bg-red-900 text-xs px-3 py-1 rounded transition duration-150"
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
              className="mt-8 flex justify-center px-4"
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

        {/* Modal (Delete, Edit, or Create) */}
        {modal.isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-40">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={closeModal}
            />

            <motion.div
              className="relative bg-[#0D1B2A] rounded-lg p-6 w-full max-w-[24rem] shadow-lg z-50 border border-[#CDAF7B] mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {modal.type === 'delete' ? (
                <>
                  <h2 className="text-lg font-monts mb-4 text-white">
                    Are you sure you want to delete this user?
                  </h2>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 font-monts rounded-md bg-green-800/20 text-green-400 border border-green-800 hover:bg-green-900 transition duration-150"
                    >
                      No
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="px-4 py-2 font-monts rounded-md bg-red-800/20 text-red-400 border border-red-800 hover:bg-red-900 transition duration-150"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </>
              ) : modal.type === 'create' ? (
                <>
                  <h2 className="text-lg font-monts mb-4 text-white">
                    Create New User
                  </h2>
                  <form onSubmit={handleCreateSubmit} className="space-y-4 font-monts">
                    <div>
                      <label className="block text-sm font-medium text-[#CDAF7B] mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={createForm.username}
                        onChange={handleCreateInputChange}
                        className="w-full py-2 px-3 text-sm border border-white/10 rounded-lg bg-white/[0.02] text-white placeholder-[#CDAF7B] focus:outline-none focus:ring-2 focus:ring-[#CDAF7B]"
                        required
                        placeholder="Enter username"
                      />
                      <p className="text-xs text-[#CDAF7B]/70 mt-1">
                        This will be used as the initial display name
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#CDAF7B] mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={createForm.email}
                        onChange={handleCreateInputChange}
                        className="w-full py-2 px-3 text-sm border border-white/10 rounded-lg bg-white/[0.02] text-white placeholder-[#CDAF7B] focus:outline-none focus:ring-2 focus:ring-[#CDAF7B]"
                        required
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#CDAF7B] mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={createForm.password}
                        onChange={handleCreateInputChange}
                        className="w-full py-2 px-3 text-sm border border-white/10 rounded-lg bg-white/[0.02] text-white placeholder-[#CDAF7B] focus:outline-none focus:ring-2 focus:ring-[#CDAF7B]"
                        required
                        minLength={8}
                        placeholder="Enter password (min. 8 characters)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#CDAF7B] mb-1">
                        Role
                      </label>
                      <select
                        name="role"
                        value={createForm.role}
                        onChange={handleCreateInputChange}
                        className="w-full py-2 px-3 text-sm border border-white/10 rounded-lg bg-white/[0.02] text-white placeholder-[#CDAF7B] focus:outline-none focus:ring-2 focus:ring-[#CDAF7B]"
                        required
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="mt-6">
                      <p className="text-sm text-[#CDAF7B]/70">
                        Note: The user will be able to update their profile information after logging in.
                      </p>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 rounded-md bg-red-800/20 text-red-400 border border-red-800 hover:bg-red-900 transition duration-150"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-green-800/20 text-green-400 border border-green-800 hover:bg-green-900 transition duration-150"
                      >
                        Create User
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-monts mb-4 text-white">
                    Edit User Information
                  </h2>
                  <form onSubmit={handleEditSubmit} className="space-y-4 font-monts">
                    <div>
                      <label className="block text-sm font-medium text-[#CDAF7B] mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={editForm.username}
                        onChange={handleInputChange}
                        className="w-full py-2 px-3 text-sm border border-white/10 rounded-lg bg-white/[0.02] text-white placeholder-[#CDAF7B] focus:outline-none focus:ring-2 focus:ring-[#CDAF7B]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#CDAF7B] mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleInputChange}
                        className="w-full py-2 px-3 text-sm border border-white/10 rounded-lg bg-white/[0.02] text-white placeholder-[#CDAF7B] focus:outline-none focus:ring-2 focus:ring-[#CDAF7B]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#CDAF7B] mb-1">
                        Role
                      </label>
                      <select
                        name="role"
                        value={editForm.role}
                        onChange={handleInputChange}
                        className="w-full py-2 px-3 text-sm border border-white/10 rounded-lg bg-white/[0.02] text-white placeholder-[#CDAF7B] focus:outline-none focus:ring-2 focus:ring-[#CDAF7B]"
                        required
                      >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 font-monts rounded-md bg-red-800/20 text-red-400 border border-red-800 hover:bg-red-900 transition duration-150"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 font-monts rounded-md bg-green-800/20 text-green-400 border border-green-800 hover:bg-green-900 transition duration-150"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}

// Removed StatusCard component as it's integrated into the main component's structure
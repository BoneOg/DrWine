// AdminSidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function AdminSidebar() {
  const { url, auth } = usePage().props;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    username: auth.user.username,
    name: auth.user.name || '',
    email: auth.user.email || '',
    phone: auth.user.phone || '',
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    router.post('/logout'); 
  };

  const goHome = () => {
    router.visit('/');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    router.post('/admin/profile/update', editForm, {
      onSuccess: () => {
        setIsEditModalOpen(false);
        setEditForm(prev => ({
          ...prev,
          current_password: '',
          new_password: '',
          new_password_confirmation: ''
        }));
        setErrors({});
      },
      onError: (errors) => {
        setErrors(errors);
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const navLinks = [
    { 
      name: 'Dashboard', 
      path: '/admin',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    { 
      name: 'Users', 
      path: '/admin/users',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      name: 'Booking', 
      path: '/admin/booking',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#000C1C] border border-white/10 text-white hover:bg-white/5 transition-colors duration-200"
      >
        <svg
          className="w-6 h-6 text-[#CDAF7B]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#000C1C] border-r border-white/10 
          flex flex-col font-monts text-white shadow-xl z-40
          transform transition-transform duration-300 ease-in-out
          ${isMobile ? (isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        `}
        style={{
          boxShadow: `
            5px 0 16px -6px rgba(205, 175, 123, 0.22),
            5px 0 24px 2px rgba(205, 175, 123, 0.12),
            5px 0 35px 6px rgba(205, 175, 123, 0.05)
          `,
        }}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10">
          <img src="/assets/logo2.png" alt="Logo" className="h-16 md:h-20 mx-auto" />
        </div>

        {/* Welcome Section */}
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-[#CDAF7B] font-monts text-sm tracking-wider uppercase">Welcome Back</h2>
          <p className="text-white font-felix text-xl mt-1">{auth.user?.name || auth.user?.username}</p>
          <p className="text-white/60 font-monts text-xs tracking-wide mt-1">Administrator</p>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="mt-3 w-full text-left text-[#CDAF7B] hover:text-[#E5C992] text-xs tracking-wider font-monts transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Profile
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 py-6 px-4">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const isActive = url === link.path;
              return (
                <div key={link.name}>
                  <Link
                    href={link.path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#CDAF7B]/20 text-[#CDAF7B]' 
                        : 'text-white/80 hover:bg-[#CDAF7B]/10 hover:text-[#CDAF7B]'
                    }`}
                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                    preserveScroll
                    preserveState
                  >
                    <span className={`${isActive ? 'text-[#CDAF7B]' : 'text-white/60'}`}>
                      {link.icon}
                    </span>
                    <span className="font-medium tracking-wide text-sm">
                      {link.name}
                    </span>
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Action Buttons Section */}
        <div className="p-4 border-t border-white/10">
          <div className="space-y-2">
            {/* Home Button */}
            <button
              onClick={() => {
                goHome();
                isMobile && setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#CDAF7B] to-[#E5C992] text-black font-medium text-sm tracking-wide hover:from-[#E5C992] hover:to-[#CDAF7B] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              HOME
            </button>

            {/* Logout Button */}
            <button
              onClick={() => {
                handleLogout();
                isMobile && setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/30 text-red-400 font-medium text-sm tracking-wide hover:bg-red-500/10 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              LOGOUT
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" aria-hidden="true" onClick={() => setIsEditModalOpen(false)} />
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
            <div className="relative w-full max-w-lg">
              <div className="relative backdrop-blur-xl bg-[#000C1C]/90 border border-[#CDAF7B]/20 rounded-none px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:p-6">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div>
                  <h3 className="text-2xl font-felix text-white mb-6">Edit Admin Profile</h3>
                  <form onSubmit={handleEditSubmit} className="space-y-4 font-monts">
                    <div>
                      <label htmlFor="username" className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Username</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={editForm.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                        placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                        focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                      />
                      {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={editForm.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                        placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                        focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                        placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                        focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                        placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                        focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div className="border-t border-white/10 mt-6 pt-6">
                      <h4 className="text-white font-felix text-lg mb-4">Change Password</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="current_password" className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Current Password</label>
                          <input
                            type="password"
                            id="current_password"
                            name="current_password"
                            value={editForm.current_password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                            placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                            focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                          />
                          {errors.current_password && <p className="text-red-400 text-xs mt-1">{errors.current_password}</p>}
                        </div>

                        <div>
                          <label htmlFor="new_password" className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">New Password</label>
                          <input
                            type="password"
                            id="new_password"
                            name="new_password"
                            value={editForm.new_password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                            placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                            focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                          />
                          {errors.new_password && <p className="text-red-400 text-xs mt-1">{errors.new_password}</p>}
                        </div>

                        <div>
                          <label htmlFor="new_password_confirmation" className="block text-xs tracking-wider text-[#CDAF7B] uppercase mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            id="new_password_confirmation"
                            name="new_password_confirmation"
                            value={editForm.new_password_confirmation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                            placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                            focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsEditModalOpen(false)}
                        className="px-4 py-2 font-monts text-sm tracking-wider text-[#CDAF7B] border border-[#CDAF7B]/30 hover:bg-[#CDAF7B]/10 transition-colors duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="group relative px-6 py-2 overflow-hidden border border-[#CDAF7B]/30"
                      >
                        <span className="relative z-10 text-black font-monts font-bold text-sm tracking-wider">
                          Save Changes
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#CDAF7B] to-[#E5C992]"></div>
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-[#E5C992] via-white/10 to-[#CDAF7B] opacity-0 
                          group-hover:opacity-100 transition-all duration-500 scale-x-[102%] scale-y-[110%]"
                        ></div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
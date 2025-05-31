// StaffSidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion'; // Keep if you use it for animations

export default function StaffSidebar() {
  const { url } = usePage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    router.post('/logout'); // No need for onSuccess callback with window.location.href
  };

  const goHome = () => {
    router.visit('/');
  };

  const navLinks = [
    {
      name: 'Dashboard',
      path: '/staff', // Adjusted path for staff dashboard
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    // Removed the 'Users' link for staff
    {
      name: 'Booking',
      path: '/staff/booking', // Adjusted path for staff booking
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
                        : 'text-white/80 hover:bg-white/5 hover:text-white'
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
    </>
  );
}
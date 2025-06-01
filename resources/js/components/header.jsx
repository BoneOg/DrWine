// Header.jsx
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const { url, props } = usePage();
    const user = props.auth?.user; // Access the authenticated user object

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Effect for handling scroll to change header background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effect for handling body scroll lock when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    }, [isMobileMenuOpen]);

    // **UPDATED: Determine the dashboard route based on user role**
    const dashboardRoute = user
<<<<<<< Updated upstream
        ? (user.role === 'admin'
            ? route('admin.dashboard')
            : (user.role === 'staff'
                ? route('staff.dashboard') // New: explicit staff dashboard
                : route('user.dashboard') // Default for regular users
              )
          )
        : route('login'); // Redirect to login if not authenticated
=======
        ? user.role === 'admin' ? route('admin.dashboard') : user.role === 'staff' ? route('staff.dashboard') : route('user.dashboard')
    : route('login');
>>>>>>> Stashed changes

    // Define navigation links
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Account', path: dashboardRoute }, // Points to staff/user/admin dashboard or login
    ];

    return (
        <>
            <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#000C1C]/80 backdrop-blur' : 'bg-transparent'}`}>
                <div className="container mx-auto px-6 lg:px-10">
                    <div className="flex items-center h-16 sm:h-18 md:h-20 relative">
                        {/* Logo */}
                        <div className="flex items-center flex-1 ml-2 justify-start">
                            <Link href="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-110">
                                <img
                                    src="/assets/logo2.png"
                                    alt="DrWine Logo"
                                    className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain transition-all duration-300"
                                />
                            </Link>
                        </div>

                        {/* Center Nav (Desktop) */}
                        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 space-x-8 xl:space-x-10">
                            {navLinks.map((link) => {
                                // Determine if the link is active based on the current URL
                                const isActive = url === link.path ||
                                                 (link.name === 'Account' && user && (
                                                     (user.role === 'admin' && url.startsWith(route('admin.dashboard', [], false))) ||
                                                     (user.role === 'staff' && url.startsWith(route('staff.dashboard', [], false))) || // New: Staff dashboard check
                                                     (user.role === 'user' && url.startsWith(route('user.dashboard', [], false)))
                                                 ));
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.path}
                                        className={`relative text-white transition-all duration-300 text-sm font-monts tracking-wider group ${isActive ? 'font-semibold' : ''}`}
                                    >
                                        <span className="relative inline-block">
                                            {link.name}
                                            <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-[#CDAF7B] nav-link-underline ${isActive ? 'w-full' : 'group-hover:w-full'}`} />
                                        </span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right Reservation + Mobile Button */}
                        <div className="flex items-center flex-1 justify-end mr-2">
                            <Link
                                href={route('reservation')}
                                className="hidden lg:inline-flex items-center px-6 xl:px-6 py-2 xl:py-3 border-[0.5px] border-[#CDAF7B] text-sm xl:text-base text-white transition-all duration-300 hover:bg-[#CDAF7B] hover:scale-105 uppercase tracking-wider"
                            >
                                Make a Reservation
                            </Link>

                            {/* Mobile Toggle Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-1.5 sm:p-2 text-white focus:outline-none"
                                aria-label="Toggle Menu"
                            >
                                <div className="w-5 sm:w-6 flex flex-col items-end space-y-1 sm:space-y-1.5">
                                    <span className={`block h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'w-full -rotate-45 translate-y-1.5' : 'w-full'}`}></span>
                                    <span className={`block h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-3/4'}`}></span>
                                    <span className={`block h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'w-full rotate-45 -translate-y-1.5' : 'w-full'}`}></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* === MOBILE MENU === */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="fixed inset-0 bg-[#000C1C] z-40 px-6 py-8 flex flex-col lg:hidden"
                        style={{ top: '64px' }}
                    >
                        {/* Nav Links */}
                        <nav className="flex flex-col font-monts text-xl space-y-6 mt-4">
                            {navLinks.map((link) => {
                                // Determine if the link is active based on the current URL for mobile menu
                                const isActive = url === link.path ||
                                                 (link.name === 'Account' && user && (
                                                     (user.role === 'admin' && url.startsWith(route('admin.dashboard', [], false))) ||
                                                     (user.role === 'staff' && url.startsWith(route('staff.dashboard', [], false))) || // New: Staff dashboard check
                                                     (user.role === 'user' && url.startsWith(route('user.dashboard', [], false)))
                                                 ));
                                return (
                                    <motion.div key={link.name} whileHover={{ scale: 1.03 }}>
                                        <Link
                                            href={link.path}
                                            className={`block px-2 py-2 rounded-md transition-colors duration-300 ${
                                                isActive ? 'text-[#CDAF7B]' : 'text-white hover:text-[#CDAF7B]'
                                            }`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>

                        {/* Action Buttons */}
                        <div className="mt-auto pt-8 space-y-4 font-monts">
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Link
                                    href={route('reservation')}
                                    className="w-full group relative px-6 py-3 text-sm tracking-wider overflow-hidden rounded-md flex justify-center items-center"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="relative z-10 text-black font-semibold">
                                        MAKE A RESERVATION
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#CDAF7B] to-[#E5C992] group-hover:scale-105 transition-transform duration-300 rounded-md" />
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Link
                                    href={dashboardRoute}
                                    className="w-full group relative px-6 py-3 border border-white/10 text-sm tracking-wider text-white rounded-md hover:text-[#CDAF7B] transition-colors duration-300 flex justify-center items-center"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {user ? 'MY ACCOUNT' : 'LOGIN'}
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
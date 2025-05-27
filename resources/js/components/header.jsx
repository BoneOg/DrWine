import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

export default function Header() {
    const { url, props } = usePage();
    const user = props.auth?.user;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'Reservation', path: route('reservation') },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <header className={`fixed w-full z-50 transition-all duration-300 overflow-hidden ${isScrolled ? 'bg-black/95' : 'bg-black/80'}`}>
                <div className="container mx-auto">
                    <div className="flex items-center h-16 sm:h-18 md:h-20 relative px-4 lg:px-6 header-element">
                        {/* Logo */}
                        <div className="pl-0 md:pl-40 header-element">
                            <Link href="/" className="flex-shrink-0 block transition-transform duration-300 hover:scale-110">
                                <img
                                    src="/assets/logo.png"
                                    alt="DrWine Logo"
                                    className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-full object-cover border border-white transition-all duration-300 hover:border-red-500 hover:border-2 header-element"
                                />
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 space-x-6 xl:space-x-8 header-element">
                            {navLinks.map((link) => {
                                const isActive = url === link.path || (link.path.includes('reservation') && url.includes('reservation'));
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.path}
                                        className={`relative text-white transition-all duration-300 text-sm xl:text-base uppercase tracking-wider group ${isActive ? 'font-medium' : ''}`}
                                    >
                                        <span className="relative inline-block header-element">
                                            {link.name}
                                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 nav-link-underline ${isActive ? 'w-full' : 'group-hover:w-full'}`} />
                                        </span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right Section */}
                        <div className="flex items-center space-x-2 sm:space-x-4 ml-auto header-element">
                            <Link
                                href={route('reservation')}
                                className="hidden lg:inline-flex items-center px-4 xl:px-6 py-2 xl:py-2.5 border border-red-600 text-sm xl:text-base text-white transition-all duration-300 hover:bg-red-600 hover:scale-105 uppercase tracking-wider header-element"
                            >
                                Make a Reservation
                            </Link>

                            <Link
                                href={user ? route('user.dashboard') : route('login')}
                                className="p-1.5 sm:p-2 text-white transition-all duration-300 hover:text-red-500 hover:scale-110 header-element"
                                aria-label="User Account"
                            >
                                <FaUser className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-1.5 sm:p-2 text-white focus:outline-none header-element"
                                aria-label="Toggle Menu"
                            >
                                <div className="w-5 sm:w-6 flex flex-col items-end space-y-1 sm:space-y-1.5">
                                    <span className={`block h-0.5 bg-white hamburger-line ${isMobileMenuOpen ? 'w-full -rotate-45 translate-y-1.5' : 'w-full'}`}></span>
                                    <span className={`block h-0.5 bg-white hamburger-line ${isMobileMenuOpen ? 'opacity-0' : 'w-3/4'}`}></span>
                                    <span className={`block h-0.5 bg-white hamburger-line ${isMobileMenuOpen ? 'w-full rotate-45 -translate-y-1.5' : 'w-full'}`}></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-0 bg-black/95 backdrop-blur-sm mobile-menu lg:hidden ${
                        isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
                    }`}
                    style={{ top: '64px' }}
                >
                    <div className="flex flex-col h-full p-4 sm:p-6">
                        <nav className="flex flex-col space-y-4 sm:space-y-6 pt-4 sm:pt-6">
                            {navLinks.map((link) => {
                                const isActive = url === link.path || (link.path.includes('reservation') && url.includes('reservation'));
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.path}
                                        className={`text-white text-xl sm:text-2xl md:text-3xl font-light tracking-wider transition-colors duration-300 header-element ${
                                            isActive ? 'text-red-500' : 'hover:text-red-500'
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-auto pb-6 sm:pb-8 space-y-4">
                            <Link
                                href={route('reservation')}
                                className="block w-full text-center px-4 sm:px-6 py-2.5 sm:py-3 border border-red-600 text-sm sm:text-base text-white transition-all duration-300 hover:bg-red-600 uppercase tracking-wider header-element"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Make a Reservation
                            </Link>

                            <Link
                                href={user ? route('user.dashboard') : route('login')}
                                className="block text-center text-white text-lg hover:text-red-500 transition header-element"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {user ? 'My Account' : 'Login'}
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

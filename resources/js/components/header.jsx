import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

export default function Header() {
    const { url } = usePage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'Reservation', path: route('reservation') },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
            <div className="container mx-auto">
                <div className="flex items-center h-20 relative">
                    {/* Logo */}
                    <div className="pl-40">
                        <Link href="/" className="flex-shrink-0 block transition-transform duration-300 hover:scale-110">
                            <img
                                src="/assets/logo.png"
                                alt="DrWine Logo"
                                className="h-14 w-14 rounded-full object-cover border border-white transition-all duration-300 hover:border-red-500 hover:border-2"
                            />
                        </Link>
                    </div>

                    {/* Navigation Links - Centered */}
                    <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-8">
                        {navLinks.map((link) => {
                            const isActive = url === link.path ||
                                (link.path.includes('reservation') && url.includes('reservation'));
                            
                            return (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className={`relative text-white transition-all duration-300 text-sm uppercase tracking-wider group ${
                                        isActive ? 'font-medium' : ''
                                    }`}
                                >
                                    <span className="relative inline-block">
                                        {link.name}
                                        <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 ${isActive ? 'w-full' : 'group-hover:w-full'}`} />
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4 ml-auto pr-6">
                        <Link
                            href={route('reservation')}
                            className="hidden md:inline-flex items-center px-6 py-2.5 border border-red-600 text-sm text-white transition-all duration-300 hover:bg-red-600 hover:scale-105 uppercase tracking-wider"
                        >
                            Make a Reservation
                        </Link>
                        <Link
                            href="/login"
                            className="p-2 text-white transition-all duration-300 hover:text-red-500 hover:scale-110"
                            aria-label="User Account"
                        >
                            <FaUser className="w-5 h-5" />
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-white focus:outline-none transition-colors duration-300 hover:text-red-500"
                            aria-label="Toggle Menu"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-95 md:hidden">
                    <div className="flex flex-col h-full pt-20 px-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-4 right-4 p-2 text-white transition-colors duration-300 hover:text-red-500"
                            aria-label="Close Menu"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        <nav className="flex flex-col space-y-4">
                            {navLinks.map((link) => {
                                const isActive = url === link.path ||
                                    (link.path.includes('reservation') && url.includes('reservation'));
                                
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.path}
                                        className={`text-white text-lg uppercase tracking-wider transition-colors duration-300 hover:text-red-500 ${
                                            isActive ? 'text-red-500' : ''
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-8 flex flex-col space-y-4">
                            <Link
                                href={route('reservation')}
                                className="px-4 py-2 border border-red-600 text-white text-center transition-all duration-300 hover:bg-red-600 hover:scale-105 uppercase tracking-wider"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Make a Reservation
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
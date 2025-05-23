import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Header() {
    const { url } = usePage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Menu', href: '/menu' },
        { label: 'Reservation', href: route('reservation') },
        { label: 'Contact', href: '/contact' },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-black/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between md:px-12">
                {/* Logo */}
                <Link href="/" className="shrink-0">
                    <img
                        src="/assets/logo.png"
                        alt="DrWine Logo"
                        className="h-10 w-10 object-cover rounded-full border border-white md:h-14 md:w-14"
                    />
                </Link>

                {/* Hamburger Icon (Mobile) */}
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Desktop Nav */}
                <div className="hidden items-center space-x-6 md:flex">
                    <nav className="flex space-x-6 text-white">
                        {navItems.map((item) => {
                            const isActive =
                                url === item.href ||
                                (item.href.includes('reservation') && url.includes('reservation'));

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`relative pb-1 transition duration-300 hover:text-red-500 ${isActive ? 'font-bold text-white' : 'text-white'}`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-red-600 transition-all duration-300" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Reservation Button (Desktop) */}
                    <button className="rounded-sm border border-red-600 px-3 py-1 font-bold text-white transition duration-300 hover:bg-red-600 hover:text-white md:px-4 md:py-2 md:text-base">
                        Make a Reservation
                    </button>

                    {/* Login Icon */}
                    <Link href="/login" className="flex items-center">
                        <img 
                            src="/assets/account.svg" 
                            alt="My Account" 
                            className="w-8 h-8 transition duration-300 hover:opacity-75"
                        />
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 flex flex-col items-center justify-start pt-24 px-6 space-y-6 bg-black/80 backdrop-blur-lg transition-all duration-300 md:hidden">
                    {/* Close Button */}
                    <button onClick={toggleMobileMenu} className="absolute right-4 top-4 text-3xl text-white focus:outline-none">
                        &times;
                    </button>

                    <nav className="flex flex-col items-center space-y-6 text-xl text-white">
                        {navItems.map((item) => {
                            const isActive =
                                url === item.href ||
                                (item.href.includes('reservation') && url.includes('reservation'));

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={toggleMobileMenu}
                                    className={`relative pb-1 transition duration-300 hover:text-red-500 ${isActive ? 'font-bold text-white' : 'text-white'}`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-red-600 transition-all duration-300" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Reservation Button (Mobile) */}
                    <button className="rounded-sm border border-red-600 px-6 py-3 text-lg font-bold text-white transition duration-300 hover:bg-red-600 hover:text-white">
                        Make a Reservation
                    </button>

                    {/* Login Icon (Mobile) */}
                    <Link
                        href="/login"
                        onClick={toggleMobileMenu}
                        className="flex items-center"
                    >
                        <img 
                            src="/assets/account.svg" 
                            alt="My Account" 
                            className="w-8 h-8 transition duration-300 hover:opacity-75"
                        />
                    </Link>
                </div>
            )}
        </header>
    );
}

import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { User } from 'lucide-react';

export default function Header() {
    const { url } = usePage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Menu', href: '/menu' },
        { label: 'Reservation', href: route('reservation') },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="absolute top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-sm">
            {/* Removed px-5 md:px-8 from here to eliminate padding on the edges */}
            <div className="relative max-w-5xl mx-auto py-4 flex items-center justify-between w-full">
                {/* Left: Logo */}
                <div className="flex items-center shrink-0">
                    <Link href="/" className="shrink-0">
                        <img
                            src="/assets/logo.png"
                            alt="DrWine Logo"
                            className="h-10 w-10 object-cover rounded-full border border-white md:h-14 md:w-14"
                        />
                    </Link>
                </div>

                {/* Center: Nav Items (absolutely centered for larger screens) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <nav className="flex space-x-6 text-white">
                        {navItems.map((item) => {
                            const isActive =
                                url === item.href ||
                                (item.href && item.href.includes('reservation') && url && url.includes('reservation'));

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`relative pb-1 transition duration-300 hover:text-red-500 ${
                                        isActive ? 'font-bold text-white' : 'text-white'
                                    }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-red-600 transition-all duration-300" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Right: Reservation Button + Account Icon */}
                <div className="hidden md:flex items-center space-x-4 ml-auto">
                    <Link
                        href={route('reservation')}
                        className="rounded-sm border border-red-600 px-3 py-1 font-bold text-white transition duration-300 hover:bg-red-600 hover:text-white md:px-4 md:py-2 md:text-base"
                    >
                        Make a Reservation
                    </Link>

                    <Link href="/login" className="text-white hover:opacity-75">
                        <User className="w-8 h-8" />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 flex flex-col items-center justify-start pt-24 px-6 space-y-6 bg-black/80 backdrop-blur-lg transition-all duration-300 md:hidden">
                    <button onClick={toggleMobileMenu} className="absolute right-4 top-4 text-3xl text-white focus:outline-none">
                        &times;
                    </button>

                    <nav className="flex flex-col items-center space-y-6 text-xl text-white">
                        {navItems.map((item) => {
                            const isActive =
                                url === item.href ||
                                (item.href && item.href.includes('reservation') && url && url.includes('reservation'));

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={toggleMobileMenu}
                                    className={`relative pb-1 transition duration-300 hover:text-red-500 ${
                                        isActive ? 'font-bold text-white' : 'text-white'
                                    }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-red-600 transition-all duration-300" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <Link
                        href={route('reservation')}
                        onClick={toggleMobileMenu}
                        className="rounded-sm border border-red-600 px-6 py-3 text-lg font-bold text-white transition duration-300 hover:bg-red-600 hover:text-white"
                    >
                        Make a Reservation
                    </Link>

                    <Link href="/login" onClick={toggleMobileMenu} className="flex items-center text-white hover:opacity-75">
                         <User className="w-8 h-8" />
                    </Link>
                </div>
            )}
        </header>
    );
}
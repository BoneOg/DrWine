import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

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

    const dashboardRoute = user
        ? (user.role === 'admin' ? route('admin.dashboard') : route('user.dashboard'))
        : route('login');

    // Update navLinks to include dashboardRoute for Account
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Account', path: dashboardRoute },
    ];

    return (
        <>
            <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur' : 'bg-transparent'}`}>
                <div className="container mx-auto px-6 lg:px-10"> {/* added px-6 lg:px-10 for balanced padding */}
<div className="flex items-center h-16 sm:h-18 md:h-20 relative">
    {/* Left: Logo */}
    <div className="flex items-center flex-1 ml-2 justify-start">
        <Link href="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-110">
            <img
                src="/assets/logo.png"
                alt="DrWine Logo"
                className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-full object-cover border border-[#CDAF7B] transition-all duration-300 hover:[#CDAF7B] hover:border-2"
            />
        </Link>
    </div>

    {/* Center: Nav Links */}
    <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 space-x-8 xl:space-x-10">
        {navLinks.map((link) => {
            const isActive = url === link.path;
            return (
                <Link
                    key={link.name}
                    href={link.path}
                    className={`relative text-white transition-all duration-300 text-sm font-monts  tracking-wider group ${isActive ? 'font-monts' : ''}`}
                >
                    <span className="relative inline-block">
                        {link.name}
                        <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#CDAF7B] nav-link-underline ${isActive ? 'w-full' : 'group-hover:w-full'}`} />
                    </span>
                </Link>
            );
        })}
    </nav>

    {/* Right: Reservation only */}
    <div className="flex items-center flex-1 justify-end mr-2">
        <Link
            href={route('reservation')}
            className="hidden lg:inline-flex items-center px-6 xl:px-6 py-2 xl:py-3 border border-[#CDAF7B] text-sm xl:text-base text-white transition-all duration-300 hover:bg-[#CDAF7B] hover:scale-105 uppercase tracking-wider"
        >
            Make a Reservation
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
    isActive ? 'text-[#CDAF7B]' : 'hover:text-[#CDAF7B]'
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
                                className="block w-full text-center px-4 sm:px-6 py-2.5 sm:py-3 border border-[#CDAF7B] text-sm sm:text-base text-white transition-all duration-300 hover:bg-[#CDAF7B] uppercase tracking-wider header-element"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Make a Reservation
                            </Link>

                            <Link
                                href={dashboardRoute}
                                className="block text-center text-white text-lg hover:text-[#CDAF7B] transition header-element"
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
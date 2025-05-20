import { Link } from '@inertiajs/react';

export default function Header() {
    return (
        <header className="bg-transparent shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo on the left */}
                <h1 className="text-2xl font-bold text-gray-800">DrWine</h1>

                {/* Nav links centered */}
                <nav className="flex-1 flex justify-center space-x-6">
                    <Link href="/" className="text-gray-700 hover:text-red-600">Home</Link>
                    <Link href="/reservation" className="text-gray-700 hover:text-red-600">Reservation</Link>
                    <Link href="/menu" className="text-gray-700 hover:text-red-600">Menu</Link>
                    <Link href="/contact" className="text-gray-700 hover:text-red-600">Contact Us</Link>
                    <Link href="/about" className="text-gray-700 hover:text-red-600">About Us</Link>
                </nav>

                {/* Buttons on the right */}
                <div className="flex items-center space-x-4">
                    <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Book a Table
                    </button>
                    <Link href="/login" className="flex items-center">
                        <img
                            src="/assets/account.svg"
                            alt="My Account"
                            className="w-8 h-8"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}

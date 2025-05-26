import React from 'react';
import { Link } from '@inertiajs/react'; 

export default function Footer() {
    // Google Maps URL for "DrWine BGC Forbestown"
    const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=DrWine+BGC+Forbestown";

    return (
        <footer className="bg-[#0A121C] text-white py-12 px-4"> 
            <div className="max-w-6xl mx-auto">

                {/* Top Section: Logo with horizontal lines */}
                <div className="relative flex items-center justify-center mb-8">
                    <hr className="absolute left-0 right-0 border-t border-gray-700 w-full" />
                    <img
                        src="/assets/logo.png"
                        alt="DrWine Logo"
                        className="relative z-10 h-24 w-24 object-cover rounded-full bg-[#0A121C] p-2" 
                    />
                </div>

                {/* Main Content: Three Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left mb-12">
                    {/* Column 1: Opening Hours */}
                    <div className="md:pl-25">
                        <p className="font-fraunces text-lg mb-4">Opening Hours</p>
                        <div className="space-y-2">
                            <p className="text-sm md:text-base flex justify-center md:justify-start">
                                <span className="w-24 shrink-0">Monday - Friday</span> <span>7:00 am - 11:30 pm</span>
                            </p>
                            <p className="text-sm md:text-base flex justify-center md:justify-start">
                                <span className="w-24 shrink-0">Saturday</span> <span>8:30 am - 10:00 pm</span>
                            </p>
                            <p className="text-sm md:text-base flex justify-center md:justify-start">
                                <span className="w-24 shrink-0">Sunday</span> <span>Closed</span>
                            </p>
                        </div>
                    </div>

                    {/* Column 2: Navigation Links */}
                    <div>
                        <p className="flex flex-col items-center font-fraunces text-lg mb-4">Navigation</p>
                        <nav className="flex flex-col items-center space-y-2">
                            <Link href="/" className="hover:text-red-500 transition-colors duration-200">Home</Link>
                            <Link href="/menu" className="hover:text-red-500 transition-colors duration-200">Menu</Link>
                            <Link href={route('reservation')} className="hover:text-red-500 transition-colors duration-200">Reservation</Link>
                            <Link href="/about" className="hover:text-red-500 transition-colors duration-200">About</Link>
                            <Link href="/contact" className="hover:text-red-500 transition-colors duration-200">Contact</Link>
                        </nav>
                    </div>

                    {/* Column 3: Contact Information */}
                    <div>
                        <p className="font-fraunces text-lg mb-4">Contact Us</p>
                        <div className="space-y-2">
                            {/* Make Phone Number Clickable */}
                            <p className="text-sm md:text-base">
                                <a href="tel:+639177152807" className="hover:text-red-500 transition-colors duration-200">
                                    0917 715 2807
                                </a>
                            </p>
                            {/* Make Email Clickable and direct to Gmail */}
                            <p className="text-sm md:text-base">
                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=reservation.drwinebgc@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-red-500 transition-colors duration-200"
                                >
                                    reservation.drwinebgc@gmail.com
                                </a>
                            </p>
                            {/* Make Address Clickable and direct to Google Maps */}
                            <p className="text-sm md:text-base">
                                <a
                                    href={googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-red-500 transition-colors duration-200"
                                >
                                    Forbestown, BGC
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright and Bottom Line */}
                <hr className="border-t border-gray-700 mb-4" />
                <p className="text-sm text-center">© DrWine. All rights reserved.</p>
            </div>
        </footer>
    );
}
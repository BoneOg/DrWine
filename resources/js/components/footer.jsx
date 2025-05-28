import React from 'react';
import { Link } from '@inertiajs/react'; 

export default function Footer() {
    // Google Maps URL for "DrWine BGC Forbestown"
    const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=DrWine+BGC+Forbestown";

    return (
        <>
            <footer className="bg-[#000C1C] text-white py-8 sm:py-10 md:py-12 px-4 footer-element overflow-hidden"> 
                <div className="max-w-6xl mx-auto">
                    {/* Top Section: Logo with horizontal lines */}
                    <div className="relative flex items-center justify-center mb-6 sm:mb-8 md:mb-10 footer-element">
                        <hr className="absolute left-0 right-0 border-t border-[#CDAF7B]/30 w-full" />
                        <div className="relative z-10 bg-[#000C1C] p-2">
                            <img
                                src="/assets/logo.png"
                                alt="DrWine Logo"
                                className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-cover rounded-full footer-logo" 
                            />
                        </div>
                    </div>

                    {/* Main Content: Three Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center md:text-left mb-8 sm:mb-10 md:mb-12 footer-element">
                        {/* Column 1: Opening Hours */}
                        <div className="md:pl-4 lg:pl-8">
                            <h3 className="font-fraunces text-[#CDAF7B] text-base sm:text-lg mb-3 sm:mb-4 footer-element">Opening Hours</h3>
                            <div className="space-y-1.5 sm:space-y-2">
                                <p className="text-xs sm:text-sm md:text-base flex flex-col sm:flex-row items-center md:items-start footer-element">
                                    <span className="w-full sm:w-24 shrink-0 mb-1 sm:mb-0 text-[#CDAF7B]/80">Monday - Friday</span>
                                    <span className="text-gray-300">7:00 am - 11:30 pm</span>
                                </p>
                                <p className="text-xs sm:text-sm md:text-base flex flex-col sm:flex-row items-center md:items-start footer-element">
                                    <span className="w-full sm:w-24 shrink-0 mb-1 sm:mb-0 text-[#CDAF7B]/80">Saturday</span>
                                    <span className="text-gray-300">8:30 am - 10:00 pm</span>
                                </p>
                                <p className="text-xs sm:text-sm md:text-base flex flex-col sm:flex-row items-center md:items-start footer-element">
                                    <span className="w-full sm:w-24 shrink-0 mb-1 sm:mb-0 text-[#CDAF7B]/80">Sunday</span>
                                    <span className="text-gray-300">Closed</span>
                                </p>
                            </div>
                        </div>

                        {/* Column 2: Navigation Links */}
                        <div>
                            <h3 className="font-fraunces text-[#CDAF7B] text-base flex flex-col items-center sm:text-lg mb-3 sm:mb-4 footer-element">Navigation</h3>
                            <nav className="flex flex-col items-center space-y-1.5 sm:space-y-2">
                                <Link href="/" className="text-xs sm:text-sm md:text-base hover:text-[#CDAF7B] transition-colors duration-300">Home</Link>
                                <Link href="/menu" className="text-xs sm:text-sm md:text-base hover:text-[#CDAF7B] transition-colors duration-300">Menu</Link>
                                <Link href={route('reservation')} className="text-xs sm:text-sm md:text-base hover:text-[#CDAF7B] transition-colors duration-300">Reservation</Link>
                                <Link href="/about" className="text-xs sm:text-sm md:text-base hover:text-[#CDAF7B] transition-colors duration-300">About</Link>
                                <Link href="/contact" className="text-xs sm:text-sm md:text-base hover:text-[#CDAF7B] transition-colors duration-300">Contact</Link>
                            </nav>
                        </div>

                        {/* Column 3: Contact Information */}
                        <div>
                            <h3 className="font-fraunces text-[#CDAF7B] text-base sm:text-lg mb-3 sm:mb-4 footer-element">Contact Us</h3>
                            <div className="space-y-1.5 sm:space-y-2">
                                {/* Phone Number */}
                                <p className="text-xs sm:text-sm md:text-base footer-element">
                                    <a href="tel:+639177152807" className="hover:text-[#CDAF7B] transition-colors duration-300">
                                        0917 715 2807
                                    </a>
                                </p>
                                {/* Email */}
                                <p className="text-xs sm:text-sm md:text-base footer-element">
                                    <a
                                        href="https://mail.google.com/mail/?view=cm&fs=1&to=reservation.drwinebgc@gmail.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-[#CDAF7B] transition-colors duration-300"
                                    >
                                        reservation.drwinebgc@gmail.com
                                    </a>
                                </p>
                                {/* Address */}
                                <p className="text-xs sm:text-sm md:text-base footer-element">
                                    <a
                                        href={googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-[#CDAF7B] transition-colors duration-300"
                                    >
                                        Forbestown, BGC
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Copyright and Bottom Line */}
                    <hr className="border-t border-[#CDAF7B]/30 mb-3 sm:mb-4" />
                    <p className="text-xs sm:text-sm text-center text-[#CDAF7B]/60 footer-element">© DrWine. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}
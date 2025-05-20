// resources/js/Components/Navbar.jsx

import React from 'react';
import { Link } from '@inertiajs/react'; // Import Link for Inertia-powered navigation

export default function Navbar() {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between', // Puts space between logo/brand and navigation links
            alignItems: 'center',
            padding: '20px 40px', // More padding on sides
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent dark background
            color: 'white',
            position: 'absolute', // Position it on top of the hero section
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 10, // Ensure it's above other content
            boxSizing: 'border-box' // Include padding in width calculation
        }}>
            {/* Restaurant Name / Logo (Left Side) */}
            <div style={{ fontSize: '1.8em', fontWeight: 'bold' }}>
                <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>Dr. Wine</Link>
            </div>

            {/* Navigation Links (Right Side) */}
            <div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center' }}>
                    <li style={{ marginRight: '20px' }}>
                        <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
                    </li>
                    <li style={{ marginRight: '20px' }}>
                        <Link href="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link>
                    </li>
                    <li style={{ marginRight: '20px' }}>
                        <Link href="/menu" style={{ color: 'white', textDecoration: 'none' }}>Menu</Link>
                    </li>
                    <li style={{ marginRight: '20px' }}>
                        <Link href="/gallery" style={{ color: 'white', textDecoration: 'none' }}>Gallery</Link>
                    </li>
                    <li style={{ marginRight: '20px' }}>
                        <Link href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</Link>
                    </li>
                    <li>
                        {/* Book a Table button (styled as a link for navigation) */}
                        <Link href="/book-a-table" style={{ marginLeft: '20px', padding: '10px 20px', border: '1px solid #e0e0e0', borderRadius: '5px', textDecoration: 'none', color: '#e0e0e0', transition: 'background-color 0.3s, color 0.3s' }}>BOOK A TABLE</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
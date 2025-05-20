// resources/js/Components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Determine the scroll threshold.
            // A good starting point is often the height of the hero section
            // or a fixed pixel value, like 100px.
            const scrollThreshold = 100; // Adjust this value as needed

            const offset = window.scrollY;
            if (offset > scrollThreshold) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 40px',
            backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            // Key change: Use 'fixed' always, and potentially adjust 'top' if it's initially part of a hero.
            // If the navbar is meant to start *at the very top* of the page, 'fixed' is often better from the start.
            // If it's *within* a hero and only becomes fixed after scrolling past the hero, 'absolute' might be okay
            // but often leads to this problem. Let's start with fixed and adjust.
            position: 'fixed', // Keep it fixed at the top
            top: 0, // Always start from the very top
            left: 0,
            width: '100%',
            zIndex: 10,
            boxSizing: 'border-box',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease', // No position transition needed if always fixed
            boxShadow: scrolled ? '0 2px 5px rgba(0,0,0,0.2)' : 'none'
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
                        <Link href="/book-a-table" style={{ marginLeft: '20px', padding: '10px 20px', border: '1px solid #e0e0e0', borderRadius: '5px', textDecoration: 'none', color: '#e0e0e0', transition: 'background-color 0.3s, color 0.3s' }}>BOOK A TABLE</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
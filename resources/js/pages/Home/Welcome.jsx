// resources/js/Pages/Home/Welcome.jsx

import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';

export default function Welcome() {
    const restaurantName = "Dr. Wine";
    const slogan = "Wine Bar & French Bistro";
    const heroDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Repudiandae repellendus enim velit consequatur nemo, porro inventore dignissimos, atque laboriosam aspernatur eum deleniti sit explicabo culpa, voluptates saepe. Voluptates, exercitationem, est.";

    const aboutUsHeading = "About us";
    const aboutUsSlogan = "Wine Bar & French Bistro";
    const aboutUsDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    const menuHeading = "Menu";
    const menuDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    const contactHeading = "Contact Us";
    const contactFacebook = "Dr. Wine BGC";
    const contactInstagram = "drwine.bgc";
    const contactPhone = "09177152807";
    const contactEmail = "reservation.drwineBGC@gmail.com";


    return (
        <>
            <Head title="Welcome to DrWine" />

            <Navbar />

            {/* ===== HERO SECTION START ===== */}
            <div style={{
                backgroundImage: 'url("/images/hero-background.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                paddingLeft: '10%',
                paddingRight: '10%',
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: -1,
                }}></div>

                <div style={{
                    padding: '20px',
                    zIndex: 1,
                    maxWidth: '500px',
                    textAlign: 'left',
                }}>
                    <h1 style={{
                        fontSize: '3em',
                        marginBottom: '10px',
                        fontFamily: 'Playfair Display, serif',
                        color: '#ffcc00',
                    }}>
                        Dr. Wine
                    </h1>
                    <h3 style={{
                        fontSize: '1.5em',
                        marginBottom: '20px',
                        fontFamily: 'Montserrat, sans-serif',
                    }}>
                        {slogan}
                    </h3>
                    <p style={{
                        fontSize: '1em',
                        lineHeight: '1.6',
                        margin: '0 0 30px 0',
                        fontFamily: 'Roboto, sans-serif',
                    }}>
                        {heroDescription}
                    </p>
                    <button style={{
                        backgroundColor: 'transparent',
                        border: '2px solid white',
                        color: 'white',
                        padding: '10px 20px',
                        marginRight: '20px',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontSize: '1em',
                        transition: 'background-color 0.3s, color 0.3s',
                        '&:hover': {
                            backgroundColor: 'white',
                            color: 'black',
                        }
                    }}>See Menu</button>
                    <button style={{
                        backgroundColor: 'white',
                        border: '2px solid white',
                        color: 'black',
                        padding: '10px 20px',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontSize: '1em',
                        transition: 'background-color 0.3s, color 0.3s',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            color: 'white',
                        }
                    }}>Book a Table</button>
                </div>
            </div>
            {/* ===== HERO SECTION END ===== */}

            {/* ===== ABOUT US SECTION START ===== */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '80px 0',
                backgroundColor: 'black',
                color: 'white',
                minHeight: '80vh',
            }}>
                {/* Left Side: Images */}
                <div style={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridTemplateRows: 'auto auto',
                    gap: '10px',
                    paddingLeft: '10%',
                    paddingRight: '20px',
                }}>
                    <img src="/images/about-us-chef.jpg" alt="Chef working" style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        gridColumn: '1 / span 1',
                        gridRow: '1 / span 1',
                        borderRadius: '5px',
                        transform: 'scale(1.05)',
                        zIndex: 2,
                        position: 'relative',
                    }} />

                    <img src="/images/about-us-interior.jpg" alt="Restaurant Interior" style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        gridColumn: '1 / span 2',
                        gridRow: '2 / span 1',
                        borderRadius: '5px',
                        marginTop: '-30px',
                        zIndex: 1,
                        position: 'relative',
                    }} />

                    <img src="/images/about-us-team.jpg" alt="Restaurant Team" style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        gridColumn: '2 / span 1',
                        gridRow: '1 / span 2',
                        borderRadius: '5px',
                        marginLeft: '-50px',
                        marginTop: '30px',
                        zIndex: 3,
                        position: 'relative',
                    }} />
                </div>

                {/* Right Side: Text Content */}
                <div style={{
                    flex: 1,
                    paddingRight: '10%',
                    paddingLeft: '20px',
                    maxWidth: '600px',
                    textAlign: 'left',
                }}>
                    <h2 style={{
                        fontSize: '3em',
                        marginBottom: '10px',
                        fontFamily: 'Playfair Display, serif',
                        color: '#B22222',
                        fontStyle: 'italic',
                    }}>
                        {aboutUsHeading}
                    </h2>
                    <h4 style={{
                        fontSize: '1.2em',
                        marginBottom: '20px',
                        fontFamily: 'Montserrat, sans-serif',
                    }}>
                        {aboutUsSlogan}
                    </h4>
                    <p style={{
                        fontSize: '0.95em',
                        lineHeight: '1.8',
                        marginBottom: '30px',
                        fontFamily: 'Roboto, sans-serif',
                    }}>
                        {aboutUsDescription}
                    </p>
                    <button style={{
                        backgroundColor: 'transparent',
                        border: '2px solid white',
                        color: 'white',
                        padding: '12px 25px',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontSize: '1em',
                        transition: 'background-color 0.3s, color 0.3s',
                        borderRadius: '5px',
                        '&:hover': {
                            backgroundColor: 'white',
                            color: 'black',
                        }
                    }}>View More</button>
                </div>
            </div>
            {/* ===== ABOUT US SECTION END ===== */}

            {/* ===== MENU SECTION START ===== */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '80px 0',
                backgroundColor: 'black',
                color: 'white',
                minHeight: '80vh',
            }}>
                {/* Left Side: Text Content */}
                <div style={{
                    flex: 1,
                    paddingLeft: '10%',
                    paddingRight: '20px',
                    maxWidth: '600px',
                    textAlign: 'left',
                }}>
                    <h2 style={{
                        fontSize: '3em',
                        marginBottom: '10px',
                        fontFamily: 'Playfair Display, serif',
                        color: '#B22222',
                        fontStyle: 'italic',
                    }}>
                        {menuHeading}
                    </h2>
                    <p style={{
                        fontSize: '0.95em',
                        lineHeight: '1.8',
                        marginBottom: '30px',
                        fontFamily: 'Roboto, sans-serif',
                    }}>
                        {menuDescription}
                    </p>
                    <button style={{
                        backgroundColor: 'transparent',
                        border: '2px solid white',
                        color: 'white',
                        padding: '12px 25px',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontSize: '1em',
                        transition: 'background-color 0.3s, color 0.3s',
                        borderRadius: '5px',
                        '&:hover': {
                            backgroundColor: 'white',
                            color: 'black',
                        }
                    }}>View Menu</button>
                </div>

                {/* Right Side: Images */}
                <div style={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gridTemplateRows: 'auto auto',
                    gap: '10px',
                    paddingRight: '10%',
                    paddingLeft: '20px',
                }}>
                    <img src="/images/menu-main-food.jpg" alt="Main Food Item" style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        borderRadius: '5px',
                        gridColumn: '1 / span 1',
                        gridRow: '1 / span 1',
                        zIndex: 1,
                    }} />

                    <img src="/images/menu-appetizer.jpg" alt="Appetizer" style={{
                        width: '70%',
                        height: 'auto',
                        objectFit: 'cover',
                        borderRadius: '5px',
                        gridColumn: '1 / span 1',
                        gridRow: '1 / span 1',
                        alignSelf: 'start',
                        justifySelf: 'end',
                        marginTop: '20px',
                        marginRight: '20px',
                        zIndex: 2,
                    }} />
                </div>
            </div>
            {/* ===== MENU SECTION END ===== */}

            {/* ===== CONTACT US SECTION START ===== */}
            <div style={{
                backgroundImage: 'url("/images/contact-background.jpg")', // Assuming you have a background image for contact
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start', // Align content to the left
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                paddingLeft: '10%',
                paddingRight: '10%',
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay
                    zIndex: -1,
                }}></div>

                <div style={{
                    padding: '20px',
                    zIndex: 1,
                    maxWidth: '500px',
                    textAlign: 'left',
                }}>
                    <h2 style={{
                        fontSize: '3em',
                        marginBottom: '30px',
                        fontFamily: 'Playfair Display, serif',
                        color: '#ffcc00', // A golden/yellow color for emphasis
                    }}>
                        {contactHeading}
                    </h2>
                    <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                        <img src="/images/icons/facebook.png" alt="Facebook Icon" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                        <p style={{ fontSize: '1.1em', fontFamily: 'Roboto, sans-serif' }}>
                            {contactFacebook}
                        </p>
                    </div>
                    <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                        <img src="/images/icons/instagram.png" alt="Instagram Icon" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                        <p style={{ fontSize: '1.1em', fontFamily: 'Roboto, sans-serif' }}>
                            {contactInstagram}
                        </p>
                    </div>
                    <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                        <img src="/images/icons/phone.png" alt="Phone Icon" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                        <p style={{ fontSize: '1.1em', fontFamily: 'Roboto, sans-serif' }}>
                            {contactPhone}
                        </p>
                    </div>
                    <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                        <img src="/images/icons/email.png" alt="Email Icon" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                        <p style={{ fontSize: '1.1em', fontFamily: 'Roboto, sans-serif' }}>
                            {contactEmail}
                        </p>
                    </div>
                </div>
                {/* The right side of the contact section has an image, but it's part of the background, so no need for a separate div here. */}
                {/* The square outline in the image could be achieved with a border on the main container or an absolutely positioned div. */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10%',
                    transform: 'translateY(-50%)',
                    width: '350px', // Adjust size as needed
                    height: '450px', // Adjust size as needed
                    border: '2px solid white',
                    borderRadius: '10px',
                    zIndex: 0, // Behind the text content
                    pointerEvents: 'none', // Allow clicks to pass through
                }}></div>
            </div>
            {/* ===== CONTACT US SECTION END ===== */}
        </>
    );
}
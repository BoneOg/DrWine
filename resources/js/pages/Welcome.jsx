// resources/js/Pages/Welcome.jsx

import { Head, Link } from '@inertiajs/react';
import Layout from '@/components/layout';
import ContactSection from '@/components/Contact';

export default function Welcome() {
    // --- Hero Section Content ---
    const heroRestaurantName = "Dr. Wine";

    const heroSloganPart1 = "WHERE FOOD";
    const heroSloganPart2 = "MEETS ROYALTY";

    // --- About Us Section Content ---
    const aboutUsHeading = "About us";
    const aboutUsSlogan = "Wine Bar & French Bistro";
    const aboutUsDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    // --- Menu Section Content ---
    const menuHeading = "Menu";
    const menuDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    return (
        <Layout>
            <Head title="Dr. Wine" />

            {/* ===== HERO SECTION START ===== */}
            <div
                className="relative flex items-center justify-start w-screen min-h-screen text-white bg-center pt-[YOUR_HEADER_HEIGHT_IN_PX] z-10"
                style={{
                    backgroundImage: "url('/assets/heroimage.jpg')",
                    backgroundSize: "120%",
                }}
            >
                <div className="absolute inset-0 bg-black opacity-60"></div>

                <div className="z-10 w-full max-w-5xl mx-auto text-left p-5 pl-8 md:pl-20">
                    <h1 className="mb-2 font-arizonia text-white text-8xl md:text-9xl lg:text-[10rem]">
                        Dr. W<span className="text-red-500">i</span>ne
                    </h1>
                    <h3 className="mb-8 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider text-white font-cardo leading-tight">
                        {heroSloganPart1} <br /> {heroSloganPart2}
                    </h3>
                    <div className="flex justify-start">
                        <Link
                            href="/reservation"
                            className="px-8 py-3 text-lg border-2 border-white bg-transparent text-white rounded-full transition-colors duration-300 hover:bg-white hover:text-black hover:border-transparent font-semibold"
                        >
                            Make a Reservation
                        </Link>
                    </div>
                </div>
            </div>
            {/* ===== HERO SECTION END ===== */}

            {/* ===== ABOUT US SECTION START ===== */}
            <div className="w-screen bg-black min-h-screen overflow-hidden relative z-10 flex items-center">
                <img
                    src="/assets/about-us-winesplash.png"
                    alt="Wine splash decoration"
                    className="absolute top-0 left-0 w-[25%] h-auto z-0 opacity-80"
                />
                <img
                    src="/assets/about-us-winesplash.png"
                    alt="Wine splash decoration"
                    className="absolute top-0 right-0 w-[25%] h-auto z-0 opacity-80 transform scale-x-[-1]"
                />

                <div className="max-w-6xl mx-auto px-5 md:px-20 flex flex-col md:flex-row items-center justify-between text-white relative z-20">
                    {/* Single image for About Us section album */}
                    <div className="md:flex-1 w-full relative h-[600px] md:h-[700px] md:mr-16 mb-16 md:mb-0 flex justify-center items-center">
                        <img
                            src="/assets/about-us-album.png"
                            alt="About Us Collage"
                            className="w-full h-full object-cover rounded-lg shadow-2xl"
                        />
                    </div>

                    <div className="md:flex-1 max-w-xl text-left mt-16 md:mt-0 md:ml-16">
                        {/* INCREASED HEADING SIZE HERE */}
                        <h2 className="mb-4 font-arizonia text-white text-7xl md:text-8xl">
                            {aboutUsHeading}
                        </h2>
                        <h4 className="mb-6 text-xl md:text-2xl font-semibold text-red-500">
                            {aboutUsSlogan}
                        </h4>
                        <p className="mb-10 text-base leading-relaxed text-gray-300">
                            {aboutUsDescription}
                        </p>
                        <Link
                            href='/about'
                            className="px-8 py-3 font-cardo text-base border-2 border-white bg-transparent text-white rounded-full transition-colors duration-300 hover:bg-white hover:text-black hover:border-transparent font-semibold"
                        >
                            View More
                        </Link>
                    </div>
                </div>
            </div>
            {/* ===== ABOUT US SECTION END ===== */}

            {/* ===== MENU SECTION START ===== */}
            <div
                className="w-screen py-20 min-h-[80vh] overflow-hidden relative z-10 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/assets/menu-section-background.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black opacity-60"></div>

                <div className="max-w-6xl mx-auto px-5 md:px-20 flex flex-col md:flex-row items-center justify-between text-white relative z-20">
                    <div className="md:flex-1 max-w-xl text-left mb-16 md:mb-0 md:mr-16">
                        {/* INCREASED HEADING SIZE HERE */}
                        <h2 className="mb-4 font-arizonia text-white text-7xl md:text-8xl">
                            {menuHeading}
                        </h2>
                        <p className="mb-10 text-base leading-relaxed text-gray-300">
                            {menuDescription}
                        </p>
                        <Link
                            href="/menu"
                            className="px-8 py-3 font-cardo text-base border-2 border-white bg-transparent text-white rounded-full transition-colors duration-300 hover:bg-white hover:text-black hover:border-transparent font-semibold"
                        >
                            View Menu
                        </Link>
                    </div>

                    {/* Adjusted to contain only one image */}
                    <div className="md:flex-1 flex justify-center items-center max-w-lg md:max-w-none w-full md:ml-16">
                        <img
                            src="/assets/menu-bread.jpg"
                            alt="Menu Item"
                            className="w-full h-auto object-cover rounded-md shadow-lg"
                        />
                    </div>
                </div>
            </div>
            {/* ===== MENU SECTION END ===== */}

            {/* ===== CONTACT US SECTION START ===== */}
            <ContactSection />
            {/* ===== CONTACT US SECTION END ===== */}
        </Layout>
    );
}
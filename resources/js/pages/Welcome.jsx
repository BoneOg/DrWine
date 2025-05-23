import { Head, Link } from '@inertiajs/react';
import Layout from '@/components/layout';
import ContactSection from '@/components/Contact';

export default function Welcome() {
    // --- Hero Section Content ---
    const heroRestaurantName = "Dr. Wine";
    const heroSlogan = "WHERE FOOD MEETS ROYALTY";

    // --- About Us Section Content ---
    const aboutUsHeading = "About us";
    const aboutUsSlogan = "Wine Bar & French Bistro";
    const aboutUsDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    // --- Menu Section Content ---
    const menuHeading = "Menu";
    const menuDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    return (
        <Layout>
            <Head title="Dr. Wine" />

            {/* ===== HERO SECTION START ===== */}
            <div
                className="relative flex items-center justify-center w-screen min-h-screen text-white bg-center pt-24 md:pt-32" // ADDED pt-24 (mobile) and md:pt-32 (desktop)
                style={{
                    backgroundImage: "url('/assets/heroimage.jpg')",
                    backgroundSize: "120%",
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-60"></div>

                <div className="z-10 w-full max-w-5xl mx-auto text-center p-5">
                    <h1 className="mb-2 font-arizonia text-white text-7xl md:text-8xl lg:text-9xl">
                        {heroRestaurantName}
                    </h1>
                    <h3 className="mb-8 text-xl md:text-2xl font-semibold tracking-wider text-white">
                        {heroSlogan}
                    </h3>
                    <div className="flex justify-center">
                        <Link
                            href="/reservation"
                            className="px-8 py-3 text-lg border-2 border-white bg-transparent text-white rounded-full transition-colors duration-300 hover:bg-white hover:text-black hover:border-transparent font-medium"
                        >
                            Make a Reservation
                        </Link>
                    </div>
                </div>
            </div>
            {/* ===== HERO SECTION END ===== */}

            {/* ===== ABOUT US SECTION START ===== */}
            <div className="w-screen bg-black py-20 min-h-[80vh] overflow-hidden"> {/* Outer div for full-width background and vertical padding */}
                <div className="max-w-6xl mx-auto px-5 md:px-20 flex flex-col md:flex-row items-center justify-between text-white"> {/* New inner content container */}
                    <div className="md:flex-1 grid grid-cols-2 grid-rows-2 gap-4 max-w-lg md:max-w-none w-full md:mr-16">
                        <img
                            src="/images/about-us-chef.jpg"
                            alt="Chef working"
                            className="w-full h-auto object-cover rounded-md transform scale-105 z-20 shadow-lg"
                        />
                        <img
                            src="/images/about-us-interior.jpg"
                            alt="Restaurant Interior"
                            className="w-full h-auto object-cover rounded-md col-span-2 mt-4 relative z-10 shadow-lg"
                        />
                        <img
                            src="/images/about-us-team.jpg"
                            alt="Restaurant Team"
                            className="w-full h-auto object-cover rounded-md -ml-8 mt-4 relative z-30 row-span-2 shadow-lg"
                        />
                    </div>

                    <div className="md:flex-1 max-w-xl text-left mt-16 md:mt-0 md:ml-16">
                        <h2 className="mb-4 font-arizonia text-white text-6xl md:text-7xl">
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
                            className="px-8 py-3 text-base border-2 border-white bg-transparent text-white rounded-full transition-colors duration-300 hover:bg-white hover:text-black hover:border-transparent font-medium"
                        >
                            View More
                        </Link>
                    </div>
                </div>
            </div>
            {/* ===== ABOUT US SECTION END ===== */}

            {/* ===== MENU SECTION START ===== */}
            <div className="w-screen bg-black py-20 min-h-[80vh] overflow-hidden"> {/* Outer div for full-width background and vertical padding */}
                <div className="max-w-6xl mx-auto px-5 md:px-20 flex flex-col md:flex-row items-center justify-between text-white"> {/* New inner content container */}
                    <div className="md:flex-1 max-w-xl text-left mb-16 md:mb-0 md:mr-16">
                        <h2 className="mb-4 font-arizonia text-white text-6xl md:text-7xl">
                            {menuHeading}
                        </h2>
                        <p className="mb-10 text-base leading-relaxed text-gray-300">
                            {menuDescription}
                        </p>
                        <Link
                            href="/menu"
                            className="px-8 py-3 text-base border-2 border-white bg-transparent text-white rounded-full transition-colors duration-300 hover:bg-white hover:text-black hover:border-transparent font-medium"
                        >
                            View Menu
                        </Link>
                    </div>

                    <div className="md:flex-1 grid grid-rows-2 gap-4 max-w-lg md:max-w-none w-full md:ml-16">
                        <img
                            src="/images/menu-main-food.jpg"
                            alt="Main Food Item"
                            className="w-full h-auto object-cover rounded-md shadow-lg"
                        />
                        <img
                            src="/images/menu-appetizer.jpg"
                            alt="Appetizer"
                            className="w-[70%] h-auto object-cover rounded-md justify-self-end mt-4 mr-4 shadow-lg"
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
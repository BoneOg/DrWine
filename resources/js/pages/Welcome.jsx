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
                className="relative flex items-center justify-start w-screen min-h-screen text-white bg-center bg-cover sm:bg-fixed pt-16 sm:pt-0 z-10"
                style={{
                    backgroundImage: "url('/assets/heroimage.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black opacity-60"></div>

                <div className="z-10 w-full max-w-5xl mx-auto text-left p-5 md:pl-20">
                    <h1 className="mb-2 font-arizonia text-white text-7xl sm:text-8xl md:text-9xl lg:text-[10rem]">
                        Dr. W<span className="text-red-500">i</span>ne
                    </h1>
                    <h3 className="mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider text-white font-cardo leading-tight">
                        {heroSloganPart1} <br /> {heroSloganPart2}
                    </h3>
                    <div className="flex justify-start">
                        <Link
                            href="/reservation"
                            className="px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg border-2 border-white bg-transparent text-white rounded-full transition-colors duration-300 hover:bg-white hover:text-black hover:border-transparent font-semibold"
                        >
                            Make a Reservation
                        </Link>
                    </div>
                </div>
            </div>
            {/* ===== HERO SECTION END ===== */}

            {/* ===== ABOUT US SECTION START ===== */}
            <div className="w-screen bg-black min-h-screen overflow-hidden relative z-10 flex items-center py-16 md:py-24">
                {/* Wine splash decorations - Adjusted sizes for responsiveness */}
                <img
                    src="/assets/about-us-winesplash.png"
                    alt="Wine splash decoration"
                    className="absolute top-0 left-0 w-1/3 md:w-1/4 lg:w-[25%] h-auto z-0 opacity-80"
                />
                <img
                    src="/assets/about-us-winesplash.png"
                    alt="Wine splash decoration"
                    className="absolute top-0 right-0 w-1/3 md:w-1/4 lg:w-[25%] h-auto z-0 opacity-80 transform scale-x-[-1]"
                />

                <div className="max-w-6xl mx-auto px-5 md:px-10 lg:px-20 flex flex-col md:flex-row items-center justify-between text-white relative z-20">
                    {/* Image container for About Us section album */}
                    <div className="md:flex-1 w-full relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] md:mr-16 mb-12 md:mb-0 flex justify-center items-center">
                        <img
                            src="/assets/about-us-album.png"
                            alt="About Us Collage"
                            className="w-full h-full object-contain rounded-lg shadow-2xl"
                        />
                    </div>

                    <div className="md:flex-1 max-w-full md:max-w-xl text-center md:text-left mt-0 md:ml-16">
                        <h2 className="mb-4 font-arizonia text-white text-6xl sm:text-7xl md:text-8xl">
                            {aboutUsHeading}
                        </h2>
                        <h4 className="mb-6 text-lg sm:text-xl md:text-2xl font-semibold text-red-500">
                            {aboutUsSlogan}
                        </h4>
                        <p className="mb-10 text-sm sm:text-base leading-relaxed text-gray-300 px-2 md:px-0">
                            {aboutUsDescription}
                        </p>
                        <Link
                            href='/about'
                            className="px-6 py-2 sm:px-8 sm:py-3 font-cardo text-sm sm:text-base border-2 border-white bg-transparent text-white rounded-full transition-colors duration-300 hover:bg-white hover:text-black hover:border-transparent font-semibold"
                        >
                            View More
                        </Link>
                    </div>
                </div>
            </div>
            {/* ===== ABOUT US SECTION END ===== */}

            {/* ===== MENU SECTION START ===== */}
            {/* ===== MENU SECTION START ===== */}
<div className="w-screen min-h-screen flex flex-col items-center justify-start bg-[#001127] text-white py-16">
    {/* Headings */}
    <div className="text-center mb-12">
        <p className="font-arizonia text-2xl mb-2 italic">Dr. Wine's Best</p>
        <h2 className="font-cormorant-upright text-6xl sm:text-7xl md:text-8xl">
            Menu
        </h2>
    </div>

    {/* Image Grid */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mb-16">
        {/* Menu Item 1 */}
        <div className="relative overflow-hidden group aspect-w-1 aspect-h-1">
            <img
                src="/assets/menu-item1.jpg"
                alt="Smoked Salmon Platter"
                className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-90"
            />
            <div className="absolute inset-0 flex items-end justify-start p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <div className="text-left">
                    <p className="font-semibold text-lg sm:text-xl md:text-2xl mb-1">Smoked Salmon Platter</p>
                    <p className="text-sm sm:text-base mb-1">Delicately smoked salmon with fresh herbs.</p>
                    <p className="text-lg sm:text-xl font-bold">$28.00</p>
                </div>
            </div>
        </div>

        {/* Menu Item 2 */}
        <div className="relative overflow-hidden group aspect-w-1 aspect-h-1">
            <img
                src="/assets/menu-item2.jpg"
                alt="Seared Scallops"
                className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-90"
            />
            <div className="absolute inset-0 flex items-end justify-start p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <div className="text-left">
                    <p className="font-semibold text-lg sm:text-xl md:text-2xl mb-1">Seared Scallops</p>
                    <p className="text-sm sm:text-base mb-1">Perfectly seared scallops on a bed of risotto.</p>
                    <p className="text-lg sm:text-xl font-bold">$35.00</p>
                </div>
            </div>
        </div>

        {/* Menu Item 3 */}
        <div className="relative overflow-hidden group aspect-w-1 aspect-h-1">
            <img
                src="/assets/heroimage.jpg"
                alt="Signature Seafood Boil"
                className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-90"
            />
            <div className="absolute inset-0 flex items-end justify-start p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <div className="text-left">
                    <p className="font-semibold text-lg sm:text-xl md:text-2xl mb-1">Signature Seafood Boil</p>
                    <p className="text-sm sm:text-base mb-1">A rich medley of fresh seafood and spices.</p>
                    <p className="text-lg sm:text-xl font-bold">$55.00</p>
                </div>
            </div>
        </div>

        {/* Menu Item 4 */}
        <div className="relative overflow-hidden group aspect-w-1 aspect-h-1">
            <img
                src="/assets/about-food.jpg"
                alt="Braised Beef Cheeks"
                className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-90"
            />
            <div className="absolute inset-0 flex items-end justify-start p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <div className="text-left">
                    <p className="font-semibold text-lg sm:text-xl md:text-2xl mb-1">Braised Beef Cheeks</p>
                    <p className="text-sm sm:text-base mb-1">Tender beef braised to perfection with root vegetables.</p>
                    <p className="text-lg sm:text-xl font-bold">$42.00</p>
                </div>
            </div>
        </div>
    </div>

    {/* View Menu Button */}
    <Link
        href="/menu"
        className="px-8 py-3 border-2 border-white text-white uppercase tracking-wider transition-colors duration-300 hover:bg-white hover:text-[#0A192F] font-semibold"
    >
        View Menu
    </Link>
</div>
{/* ===== MENU SECTION END ===== */}

            {/* ===== MENU SECTION END ===== */}

            {/* ===== CONTACT US SECTION START ===== */}
            <ContactSection />
            {/* ===== CONTACT US SECTION END ===== */}
        </Layout>
    );
}
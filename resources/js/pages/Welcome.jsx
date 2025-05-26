// resources/js/Pages/Welcome.jsx

import { Head, Link } from '@inertiajs/react';
import Layout from '@/components/layout';
import ContactSection from '@/components/Contact';

export default function Welcome() {
    // --- Hero Section Content ---
    const heroSloganPart1 = "WHERE FOOD";
    const heroSloganPart2 = "MEETS ROYALTY";

    // --- About Us Section Content ---
    const aboutUsHeading = "Our Essence: A French Bistro Experience Rooted in Wine, Culture, and Craft";
    const aboutUsDescription = "Nestled in the heart of the city, Dr. Wine offers an elevated dining experience where fine wine, classic French cuisine, and relaxed elegance come together. Whether you're here for a casual evening or a special celebration, our bistro captures the charm of France with every plate and pour.";

    return (
        <Layout>
            <Head title="Dr. Wine" />

            {/* ===== HERO SECTION START ===== */}
            <div
<<<<<<< Updated upstream
                className="relative flex items-center justify-start w-screen min-h-screen text-white bg-center bg-cover sm:bg-fixed pt-16 sm:pt-0 z-10 overflow-hidden"
                style={{
                    backgroundImage: "url('/assets/heroimage.jpg')",
                }}
            >
=======
                className="relative flex items-center justify-start w-screen min-h-screen text-white bg-center bg-cover pt-16 sm:pt-0 z-10" style={{backgroundImage: "url('/assets/herosection.png')",}}>
>>>>>>> Stashed changes
                <div className="absolute inset-0 bg-black opacity-60"></div>

                <div className="z-10 max-w-5xl pl-12">
                    <h3 className="pt-16 text-6xl text-white" style={{ fontFamily: 'TAN' }}>
                    <span>{heroSloganPart1}</span>
                    <br/>
                    <span className="mt-6 inline-block">{heroSloganPart2}</span>
                    </h3>
                    <div className="flex justify-start pt-8">
                        <Link
                            href="/reservation"
                            className="sm:px-10 sm:py-2 text-base border-t border-b border-white bg-transparent text-red/80 transition-colors duration-300 hover:bg-red-500 hover:text-white hover:border-transparent"
                        >
                            BOOK A TABLE
                        </Link>
                    </div>
                </div>
            </div>
            {/* ===== HERO SECTION END ===== */}

<<<<<<< Updated upstream
            {/* ===== MENU SECTION START ===== */}
            <div className="w-screen min-h-screen flex flex-col items-center justify-start bg-[#001127] text-white py-16 overflow-hidden">
                {/* Headings */}
                <div className="text-center mb-12">
                    <p className="font-fraunces font-light text-2xl mb-2 italic">Dr. Wine's Best</p>
                    <h2 className="font-fraunces font-light text-6xl sm:text-7xl md:text-8xl">
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
=======
 {/* ===== ABOUT US SECTION START ===== */}
<div className="w-screen bg-black py-16 px-4 flex flex-col md:flex-row items-center md:items-stretch justify-center text-white gap-12">
  {/* Image on the left */}
  <div className="w-full md:w-1/2 h-96 md:h-auto max-w-none">
    <img
      src="/assets/people2.jpg"
      alt="About Us"
      className="w-full h-full object-cover"
    />
  </div>
>>>>>>> Stashed changes

  {/* Text on the right */}
  <div className="w-full md:w-1/2 text-left flex flex-col justify-center">
    <p className="text-sm uppercase tracking-widest text-gray-300 font-cardo mb-2">
      Story of Every Bite
    </p>
    <h2
      className="text-2xl mt-6 text-white leading-relaxed"
      style={{ fontFamily: 'TAN' }}
    >
      The language of love, spoken in sauces and vintages — curated for those who dine with soul.
    </h2>
    <p className="text-white font-xs mt-6">{aboutUsDescription}</p>

    <div className="mt-10">
      <Link
        href="/about"
        className="px-6 py-2 border-white text-white border-t border-b text-sm transition duration-300 hover:bg-white hover:text-black"
      >
        LEARN MORE
      </Link>
    </div>
  </div>
</div>
{/* ===== ABOUT US SECTION END ===== */}

<<<<<<< Updated upstream
=======

<div className="relative h-75 text-white bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/assets/oyster.png')" }}>
  <div className="absolute inset-0 bg-black opacity-40"></div>
</div>


{/* ===== MENU SECTION START ===== */}
<div className="w-screen bg-black py-16 px-4 flex flex-col items-center text-white">
    <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-gray-300 font-cardo mb-2">Dr. Wine’s Best</p>
        <h2 className="text-3xl mt-6 text-white" style={{ fontFamily: 'TAN' }}>Menu</h2>
    </div>

    {/* Image Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full max-w-6xl">
  <img
    src="/assets/herosection.png"
    alt="Dish 1"
    className="w-full h-[200px] object-cover rounded-md shadow-md"
  />
  <img
    src="/assets/aglio.jpg"
    alt="Dish 2"
    className="w-full h-[200px] object-cover rounded-md shadow-md"
  />
  <img
    src="/assets/steak.jpg"
    alt="Dish 3"
    className="w-full h-[200px] object-cover rounded-md shadow-md"
  />
  <img
    src="/assets/lasagna.jpg"
    alt="Dish 4"
    className="w-full h-[200px] object-cover rounded-md shadow-md"
  />
</div>


    {/* Button */}
    <div className="mt-10">
        <Link
            href="/menu"
            className="px-6 py-2 border-white text-white border-t border-b text-sm transition duration-300 hover:bg-white hover:text-black"
        >
            VIEW MENU
        </Link>
    </div>
</div>
{/* ===== MENU SECTION END ===== */}

>>>>>>> Stashed changes

            {/* ===== CONTACT US SECTION START ===== */}
            <ContactSection />
            {/* ===== CONTACT US SECTION END ===== */}
        </Layout>
    );
}
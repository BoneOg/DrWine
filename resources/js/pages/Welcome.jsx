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
                className="relative flex items-center justify-start w-screen min-h-screen text-white bg-center bg-cover pt-16 sm:pt-0 z-10" style={{backgroundImage: "url('/assets/herosection.png')",}}>
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

 {/* ===== ABOUT US SECTION START ===== */}
<div className="w-screen bg-black py-16 px-4 flex flex-col md:flex-row items-center md:items-stretch justify-center text-white gap-12">
  {/* Image on the left */}
  <div className="w-full md:w-1/2 h-96 md:h-auto max-w-none">
    <img
      src="/assets/people2.jpg"
      alt="About Us"
      className="w-full h-auto object-cover"
    />
  </div>

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


            {/* ===== CONTACT US SECTION START ===== */}
            <ContactSection />
            {/* ===== CONTACT US SECTION END ===== */}
        </Layout>
    );
}
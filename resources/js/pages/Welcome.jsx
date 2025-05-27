// resources/js/Pages/Welcome.jsx

import { Head, Link } from '@inertiajs/react';
import Layout from '@/components/layout';
import ContactSection from '@/components/Contact';

export default function Welcome() {
    const heroSloganPart1 = "WHERE FOOD";
    const heroSloganPart2 = "MEETS ROYALTY";

    const aboutUsDescription = "Nestled in the heart of the city, Dr. Wine offers an elevated dining experience where fine wine, classic French cuisine, and relaxed elegance come together. Whether you're here for a casual evening or a special celebration, our bistro captures the charm of France with every plate and pour.";

    return (
        <Layout>
            <Head title="Dr. Wine" />

            {/* ===== HERO SECTION ===== */}
            <div
                className="relative min-h-screen pt-16 sm:pt-0 bg-center bg-cover text-white"
                style={{ backgroundImage: "url('/assets/herosection.png')" }}
            >
                <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 flex items-center min-h-screen">
                    <div>
                        <h3 className="mt-12 text-4xl sm:text-5xl md:text-7xl font-felix">
                            <span>{heroSloganPart1}</span>
                            <br />
                            <span className="mt-6 inline-block">{heroSloganPart2}</span>
                        </h3>
                        <div className="pt-8">
                            <Link
                                href="/reservation"
                                className="sm:px-10 sm:py-2 text-base border-t border-b border-white bg-transparent text-red/80 transition-colors duration-300 hover:bg-red-500 hover:text-white hover:border-transparent"
                            >
                                BOOK A TABLE
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== ABOUT US SECTION ===== */}
            <div className="bg-black py-10 md:py-16 px-4 md:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 text-white">
                    <div className="w-full md:w-1/2">
                        <img
                            src="/assets/people2.jpg"
                            alt="About Us"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <p className="text-sm uppercase tracking-widest text-gray-300 mb-2">
                            Story of Every Bite
                        </p>
                        <h2 className="text-2xl mt-4 font-felix leading-relaxed">
                            The language of love, spoken in sauces and vintages — curated for those who dine with soul.
                        </h2>
                        <p className="mt-6 text-sm">{aboutUsDescription}</p>
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
            </div>

            {/* ===== MENU SECTION (FULL WIDTH) ===== */}
            <div className="w-screen bg-black py-16 flex flex-col items-center text-white">
                <div className="text-center mb-12">
                    <p className="text-sm uppercase tracking-widest text-gray-300">Dr. Wine’s Best</p>
                    <h2 className="text-3xl mt-4 font-felix">Menu</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full">
                    <img src="/assets/herosection.png" alt="Dish 1" className="w-full h-[250px] object-cover shadow-md" />
                    <img src="/assets/aglio.jpg" alt="Dish 2" className="w-full h-[250px] object-cover shadow-md" />
                    <img src="/assets/steak.jpg" alt="Dish 3" className="w-full h-[250px] object-cover shadow-md" />
                    <img src="/assets/lasagna.jpg" alt="Dish 4" className="w-full h-[250px] object-cover shadow-md" />
                </div>

                <div className="mt-16">
                    <Link
                        href="/menu"
                        className="px-6 py-2 border-white text-white border-t border-b text-sm transition duration-300 hover:bg-white hover:text-black"
                    >
                        VIEW MENU
                    </Link>
                </div>
            </div>

            {/* ===== CONTACT US SECTION ===== */}
            <ContactSection />
        </Layout>
    );
}

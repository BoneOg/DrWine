import { Head } from '@inertiajs/react';
import Layout from '@/components/layout';

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
        <Layout>
            <Head />

            {/* ===== HERO SECTION START ===== */}
            <div className="relative flex flex-col items-start justify-center w-screen min-h-screen text-black bg-gray-100 overflow-hidden">
                <div className="z-10 max-w-md text-left p-5">
                    <h1 className="mb-2 text-5xl font-serif font-playfair text-yellow-400">
                        {restaurantName}
                    </h1>
                    <h3 className="mb-5 text-xl font-sans font-montserrat">
                        {slogan}
                    </h3>
                    <p className="mb-7 text-base leading-relaxed font-roboto">
                        {heroDescription}
                    </p>
                    <button
                        className="mr-5 px-5 py-2 text-base border-2 border-black bg-transparent text-black cursor-pointer rounded transition-colors duration-300 hover:bg-black hover:text-white"
                    >
                        See Menu
                    </button>
                    <button
                        className="px-5 py-2 text-base border-2 border-black bg-black text-white cursor-pointer rounded transition-colors duration-300 hover:bg-transparent hover:text-black"
                    >
                        Book a Table
                    </button>
                </div>
            </div>
            {/* ===== HERO SECTION END ===== */}

            {/* ===== ABOUT US SECTION START ===== */}
            <div className="flex flex-col md:flex-row items-center w-screen min-h-[80vh] py-20 bg-black text-white px-5 md:px-20">
                {/* Left Side: Images */}
                <div className="md:flex-1 grid grid-cols-2 grid-rows-2 gap-2">
                    <img
                        src="/images/about-us-chef.jpg"
                        alt="Chef working"
                        className="w-full h-auto object-cover rounded-md scale-[1.05] relative z-20"
                    />
                    <img
                        src="/images/about-us-interior.jpg"
                        alt="Restaurant Interior"
                        className="w-full h-auto object-cover rounded-md col-span-2 -mt-8 relative z-10"
                    />
                    <img
                        src="/images/about-us-team.jpg"
                        alt="Restaurant Team"
                        className="w-full h-auto object-cover rounded-md -ml-12 mt-8 relative z-30 row-span-2"
                    />
                </div>

                {/* Right Side: Text Content */}
                <div className="md:flex-1 max-w-xl text-left mt-10 md:mt-0">
                    <h2 className="mb-2 text-5xl font-serif font-playfair italic text-red-800">
                        {aboutUsHeading}
                    </h2>
                    <h4 className="mb-5 text-lg font-sans font-montserrat">
                        {aboutUsSlogan}
                    </h4>
                    <p className="mb-8 text-sm leading-relaxed font-roboto">
                        {aboutUsDescription}
                    </p>
                    <button
                        className="px-6 py-3 text-base border-2 border-white bg-transparent text-white cursor-pointer rounded transition-colors duration-300 hover:bg-white hover:text-black"
                    >
                        View More
                    </button>
                </div>
            </div>
            {/* ===== ABOUT US SECTION END ===== */}

            {/* ===== MENU SECTION START ===== */}
            <div className="flex flex-col md:flex-row items-center w-screen min-h-[80vh] py-20 bg-black text-white px-5 md:px-20">
                {/* Left Side: Text Content */}
                <div className="md:flex-1 max-w-xl text-left">
                    <h2 className="mb-2 text-5xl font-serif font-playfair italic text-red-800">
                        {menuHeading}
                    </h2>
                    <p className="mb-8 text-sm leading-relaxed font-roboto">
                        {menuDescription}
                    </p>
                    <button
                        className="px-6 py-3 text-base border-2 border-white bg-transparent text-white cursor-pointer rounded transition-colors duration-300 hover:bg-white hover:text-black"
                    >
                        View Menu
                    </button>
                </div>

                {/* Right Side: Images */}
                <div className="md:flex-1 grid grid-rows-2 gap-2">
                    <img
                        src="/images/menu-main-food.jpg"
                        alt="Main Food Item"
                        className="w-full h-auto object-cover rounded-md row-span-1 z-10"
                    />
                    <img
                        src="/images/menu-appetizer.jpg"
                        alt="Appetizer"
                        className="w-[70%] h-auto object-cover rounded-md justify-self-end mt-5 mr-5 row-span-1 z-20 self-start"
                    />
                </div>
            </div>
            {/* ===== MENU SECTION END ===== */}

            {/* ===== CONTACT US SECTION START ===== */}
            <div
                className="relative flex items-center justify-start w-screen min-h-[80vh] px-10 text-white bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: 'url("/images/contact-background.jpg")' }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60 -z-10"></div>

                <div className="z-10 max-w-md p-5 text-left">
                    <h2 className="mb-8 text-5xl font-serif font-playfair text-yellow-400">
                        {contactHeading}
                    </h2>

                    <div className="flex items-center mb-4">
                        <img
                            src="/images/icons/facebook.png"
                            alt="Facebook Icon"
                            className="w-6 h-6 mr-3"
                        />
                        <p className="text-lg font-roboto">{contactFacebook}</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <img
                            src="/images/icons/instagram.png"
                            alt="Instagram Icon"
                            className="w-6 h-6 mr-3"
                        />
                        <p className="text-lg font-roboto">{contactInstagram}</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <img
                            src="/images/icons/phone.png"
                            alt="Phone Icon"
                            className="w-6 h-6 mr-3"
                        />
                        <p className="text-lg font-roboto">{contactPhone}</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <img
                            src="/images/icons/email.png"
                            alt="Email Icon"
                            className="w-6 h-6 mr-3"
                        />
                        <p className="text-lg font-roboto">{contactEmail}</p>
                    </div>
                </div>

                {/* This is your updated container for the form */}
                <div
                    className="absolute top-1/2 right-10 w-[350px] h-[450px]
                               bg-black/40 border border-white/30 rounded-md p-8
                               backdrop-blur-sm -translate-y-1/2 z-10"
                >
                    {/* BEGIN: INSERTED FORM CONTENT HERE */}
                    <form className="contact-form">
                        <div className="form-row">
                            <input type="text" placeholder="Name" className="form-input" />
                            <input type="text" placeholder="Phone number" className="form-input" />
                        </div>
                        <div className="form-row">
                            <input type="email" placeholder="Email" className="form-input full-width" />
                        </div>
                        <div className="form-row">
                            <textarea placeholder="Please enter your message" className="form-input full-width message-box"></textarea>
                        </div>
                        <div className="form-row">
                            <button type="submit" className="send-message-button">Send Message</button>
                        </div>
                    </form>
                    {/* END: INSERTED FORM CONTENT HERE */}
                </div>
            </div>
            {/* ===== CONTACT US SECTION END ===== */}
        </Layout>
    );
}
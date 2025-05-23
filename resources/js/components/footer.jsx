export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white p-4 text-center
                           h-[120px] md:h-[180px] // Responsive height: 120px on small, 180px on md and up
                           flex flex-col items-center justify-center">
            {/* Logo on top of the text - Responsive Sizing */}
            <img
                src="/assets/logo.png"
                alt="DrWine Logo"
                className="h-12 w-12 object-cover rounded-full mb-2 md:h-20 md:w-20 md:mb-4"
            />
            {/* Copyright Text - Responsive Sizing */}
            <p className="text-xs md:text-base">© DrWine. All rights reserved.</p>
        </footer>
    );
}
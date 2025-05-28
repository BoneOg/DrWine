import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function NotFound() {
    return (
        <>
            <Head title="404 - Page Not Found" />
            <div className="min-h-screen relative bg-[#000C1C] overflow-hidden flex items-center justify-center">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <img 
                        src="/assets/404.png" 
                        alt="Background" 
                        className="w-full h-full object-cover opacity-20 scale-105 transform hover:scale-100 transition-transform duration-[2s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#000C1C]/70 to-[#000C1C]"></div>
                </div>

                {/* Animated Circles */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#CDAF7B]/20 to-transparent"
                        style={{ filter: 'blur(80px)' }}
                        animate={{
                            x: [-200, 200],
                            y: [-100, 100],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                    <motion.div
                        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#E5C992]/10 to-transparent"
                        style={{ filter: 'blur(60px)' }}
                        animate={{
                            x: [200, -200],
                            y: [200, -100],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex flex-col items-center">
                            <motion.div 
                                className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-8"
                                initial={{ width: 0 }}
                                animate={{ width: "5rem" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            />
                            
                            <h1 className="text-[120px] md:text-[180px] font-felix leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#CDAF7B] via-white to-[#CDAF7B] mb-4">
                                404
                            </h1>
                            
                            <motion.div 
                                className="w-24 md:w-32 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-8"
                                initial={{ width: 0 }}
                                animate={{ width: "8rem" }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            />

                            <p className="text-[#CDAF7B] font-monts tracking-[0.3em] uppercase text-sm md:text-base mb-12">
                                Page Not Found
                            </p>

                            <Link
                                href="/"
                                className="group relative inline-flex items-center px-8 py-3 overflow-hidden"
                            >
                                <span className="relative z-10 text-black font-monts text-sm tracking-wider uppercase font-medium">
                                    Return Home
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#CDAF7B] to-[#E5C992] transform group-hover:scale-105 transition-transform duration-300"></div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

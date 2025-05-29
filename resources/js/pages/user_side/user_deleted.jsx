import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function UserDeleted({ message }) {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <>
      <Head title="Account Deleted" />
      <div className="min-h-screen bg-gradient-to-b from-[#000C1C] to-[#000C1C] text-white ">
        <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center">
          <h1 className="text-5xl font-felix mb-10">Account Deleted Successfully</h1>

          {/* Gradient Animation */}
          <motion.div
            className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-6 md:mb-8"
            initial={{ width: 0 }}
            animate={{ width: isMobile ? 64 : 150 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <Link
            href={route('register')}
            className="inline-block bg-[#CDAF7B] text-black font-monts px-6 py-3 hover:bg-[#B69A6B] 
                        transition-all duration-300 text-sm uppercase tracking-widest"
          >
            Back to Register
          </Link>
        </div>
      </div>
    </>
  );
}

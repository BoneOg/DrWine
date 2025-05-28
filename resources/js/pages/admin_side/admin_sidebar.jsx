import { Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion'; // Import motion for animations

export default function AdminSidebar() {
  const handleLogout = () => {
    router.post('/logout');
  };

  const goHome = () => {
    router.visit('/');
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const linkVariants = {
    hover: { scale: 1.03, originX: 0, transition: { type: "spring", stiffness: 300 } },
    initial: { backgroundColor: "transparent", color: "#FFFFFF" }
  };

  // Button variants for standard Framer Motion animations (no longer directly used for the complex styles)
  const simpleButtonVariants = {
    hover: { scale: 1.02, transition: { type: "spring", stiffness: 300 } },
    tap: { scale: 0.98 }
  };

  return (
    <motion.aside
      className="w-64 bg-[#000C1C] border-r border-white/10 py-6 px-2 flex flex-col font-monts text-white shadow-xl"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      style={{
        boxShadow: `
          5px 0 16px -6px rgba(205, 175, 123, 0.22),
          5px 0 24px 2px rgba(205, 175, 123, 0.12),
          5px 0 35px 6px rgba(205, 175, 123, 0.05)
        `,
      }}
    >
      {/* Logo */}
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <img src="/assets/logo2.png" alt="Logo" className="h-25 mx-auto" />
      </motion.div>

      {/* Navigation Links */}
      <nav className="flex flex-col font-monts text-xl space-y-4">
        <motion.div variants={linkVariants} whileHover="hover">
          <Link
            href="/admin"
            className="px-2 py-3 text-white hover:bg-[#CDAF7B]/20 transition text-left block"
          >
            Dashboard
          </Link>
        </motion.div>
        <motion.div variants={linkVariants} whileHover="hover">
          <Link
            href="/admin/users"
            className="px-2 py-3 text-white hover:bg-[#CDAF7B]/20 transition text-left block"
          >
            Users
          </Link>
        </motion.div>
        <motion.div variants={linkVariants} whileHover="hover">
          <Link
            href="/admin/booking"
            className="px-2 py-3 text-white hover:bg-[#CDAF7B]/20 transition text-left block"
          >
            Booking
          </Link>
        </motion.div>
      </nav>

      {/* Action Buttons */}
      <div className="mt-auto flex flex-col space-y-3 font-monts text-xl px-2">
        {/* Home Button (Styled like SIGN OUT) */}
        <motion.button
          onClick={goHome}
          className="w-full group relative px-6 md:px-8 py-3 md:py-4 font-monts text-sm tracking-wider overflow-hidden rounded-md" // Added rounded-md here
          variants={simpleButtonVariants} // Still apply simple Framer Motion effects
          whileHover="hover"
          whileTap="tap"
        >
          <span className="relative z-10 text-black font-medium">
            HOME
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#CDAF7B] to-[#E5C992] transform group-hover:scale-105 transition-transform duration-300 rounded-md"></div> {/* Added rounded-md here too */}
        </motion.button>

        {/* Logout Button (Styled like DELETE ACCOUNT) */}
        <motion.button
          onClick={handleLogout}
          className="w-full group relative px-6 md:px-8 py-3 md:py-4 font-monts text-sm tracking-wider overflow-hidden rounded-md border border-red-500/30 text-red-400 hover:text-red-300 transition-colors duration-300"
          variants={simpleButtonVariants} // Still apply simple Framer Motion effects
          whileHover="hover"
          whileTap="tap"
        >
          LOGOUT
        </motion.button>
      </div>
    </motion.aside>
  );
}
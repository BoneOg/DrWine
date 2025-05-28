import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Register() {
    const [form, setForm] = useState({
        username: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/register', form);
            window.location.href = '/login';
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                console.error('Registration error:', error);
                setErrors({ general: 'An unexpected error occurred. Please try again.' });
            }
        }
    };

    return (
        <>
            <Head title="Register - Dr. Wine" />
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#000C1C]">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/assets/login-register-bg.png"
                        alt="Background"
                        className="h-full w-full object-cover opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#000C1C]/70 to-[#000C1C]"></div>
                </div>

                {/* Animated Gradient Circles */}
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

                {/* Main Content */}
                <motion.div 
                    className="relative z-10 w-full max-w-xl px-6 py-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Logo and Welcome Text */}
                    <div className="text-center mb-8">
                        <img 
                            src="/assets/logo2.png" 
                            alt="Dr. Wine Logo" 
                            className="h-30 w-70 mx-auto mb-8 object-contain"
                        />
                        <motion.div 
                            className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mx-auto mb-6"
                            initial={{ width: 0 }}
                            animate={{ width: "5rem" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        />
                        <h2 className="text-4xl md:text-5xl font-felix text-white tracking-wider mb-2">
                            CREATE ACCOUNT
                        </h2>
                    </div>

                    {/* Register Form */}
                    <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 p-8 md:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                                    placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                                    focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                                    required
                                />
                                {errors.username && (
                                    <p className="text-[#CDAF7B] text-xs mt-2">{errors.username}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                                    placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                                    focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                                />
                                {errors.name && (
                                    <p className="text-[#CDAF7B] text-xs mt-2">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                                    placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                                    focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-[#CDAF7B] text-xs mt-2">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number (Optional)"
                                    className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                                    placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                                    focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                                />
                                {errors.phone && (
                                    <p className="text-[#CDAF7B] text-xs mt-2">{errors.phone}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                                    placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                                    focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                                    required
                                />
                                {errors.password && (
                                    <p className="text-[#CDAF7B] text-xs mt-2">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={form.password_confirmation}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    className="w-full px-4 py-3 bg-black/20 border border-[#CDAF7B]/30 rounded-none text-white 
                                    placeholder:text-[#CDAF7B]/60 focus:outline-none focus:border-[#CDAF7B] focus:ring-1 
                                    focus:ring-[#CDAF7B]/50 transition-all duration-300 font-monts text-sm"
                                    required
                                />
                                {errors.password_confirmation && (
                                    <p className="text-[#CDAF7B] text-xs mt-2">{errors.password_confirmation}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full group relative px-6 py-3 overflow-hidden mt-8 border border-[#CDAF7B]/30"
                            >
                                <span className="relative z-10 text-black font-monts font-bold text-md tracking-wider uppercase group-hover:text-black transition-colors duration-300">
                                    Register
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#CDAF7B] to-[#E5C992]"></div>
                                <div 
                                    className="absolute inset-0 bg-gradient-to-r from-[#E5C992] via-white/10 to-[#CDAF7B] opacity-0 
                                    group-hover:opacity-100 transition-all duration-500 scale-x-[102%] scale-y-[110%]"
                                ></div>
                            </button>
                            {errors.general && (
                                <p className="text-[#CDAF7B] text-xs mt-4 text-center">{errors.general}</p>
                            )}
                        </form>

                        <div className="mt-8 text-center space-y-4">
                            <p className="text-[#CDAF7B]/80 font-monts text-sm">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="text-[#CDAF7B] font-bold font-monts hover:text-white transition-colors duration-300"
                                >
                                    Login here!
                                </Link>
                            </p>
                            <Link
                                href="/"
                                className="inline-block text-[#CDAF7B]/60 font-monts text-sm hover:text-[#CDAF7B] transition-colors duration-300"
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

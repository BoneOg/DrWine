// resources/js/pages/Auth/Register.jsx
import { Head, Link } from '@inertiajs/react'; // Removed Layout import as it's not used in the reference Login structure
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [form, setForm] = useState({
        username: '',
        email: '',
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
            // On successful registration, redirect to login as per the screenshot's implication
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
            <Head title="Register" />
            <div className="min-h-screen flex bg-white relative overflow-hidden">
                {/* Background Wine Glass - Copied directly from Login.jsx */}
                <div className="hidden md:block fixed left-0 top-0 bottom-0 w-3/5">
                    <img
                        src="/assets/login-image.png" // Ensure this path is correct: public/assets/login-image.png
                        alt="Wine Glass"
                        className="h-full w-full object-cover object-right"
                    />
                </div>

                {/* Main Content Container (for the form) - Copied directly from Login.jsx */}
                <div className="w-full md:w-2/5 md:ml-auto flex items-center justify-center px-6 py-12 relative z-10">
                    <div className="w-full max-w-md space-y-8">
                        {/* Logo and Slogan - Copied directly from Login.jsx */}
                        <div className="text-center mb-6">
                            <img
                                src="/assets/logo1.png" // Ensure this path is correct: public/assets/logo1.png
                                alt="Dr. Wine Logo"
                                className="h-24 md:h-28 mx-auto mb-4"
                            />
                            <p className="text-xl md:text-2xl font-fraunces text-[#0A121C]">
                                where food meets royalty
                            </p>
                        </div>

                        {/* Register Form Container - Adapted from Login.jsx's black box */}
                        <div className="bg-black rounded-2xl p-8 md:p-10 backdrop-blur-sm shadow-2xl">
                            {/* Title - Adapted from Login.jsx's "Welcome back!" */}
                            <h2 className="text-3xl md:text-5xl font-fraunces font-light text-center text-white mb-8">
                                <span className="text-red-600">R</span>egister
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Username Field */}
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        placeholder="Username" // Matches Login input style
                                        className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg text-white
                                        placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:ring-1
                                        focus:ring-red-500 transition-all duration-300"
                                        required
                                    />
                                    {errors.username && (
                                        <p className="text-red-500 text-sm">{errors.username}</p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="space-y-1">
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Email Address" // Matches Login input style
                                        className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg text-white
                                        placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:ring-1
                                        focus:ring-red-500 transition-all duration-300"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm">{errors.email}</p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="space-y-1">
                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Password" // Matches Login input style
                                        className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg text-white
                                        placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:ring-1
                                        focus:ring-red-500 transition-all duration-300"
                                        required
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm">{errors.password}</p>
                                    )}
                                </div>

                                {/* Confirm Password Field */}
                                <div className="space-y-1">
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        value={form.password_confirmation}
                                        onChange={handleChange}
                                        placeholder="Confirm Password" // Matches Login input style
                                        className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg text-white
                                        placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:ring-1
                                        focus:ring-red-500 transition-all duration-300"
                                        required
                                    />
                                    {errors.password_confirmation && (
                                        <p className="text-red-500 text-sm">{errors.password_confirmation}</p>
                                    )}
                                </div>

                                {/* Submit Button - Copied directly from Login.jsx */}
                                <button
                                    type="submit"
                                    // Removed `processing` as it's not part of the `useState` in this component
                                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800
                                    text-white font-medium rounded-lg transition-all duration-300 py-3 uppercase tracking-wider
                                    shadow-lg hover:shadow-red-500/20"
                                >
                                    Register
                                </button>
                            </form>

                            {/* "Already have an account?" Link - Copied directly from Login.jsx */}
                            <p className="mt-6 text-center text-gray-400 text-sm">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="text-red-500 hover:text-red-400 transition-colors duration-300"
                                >
                                    Login here!
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
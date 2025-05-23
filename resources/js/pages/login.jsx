import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Login() {
    const [form, setForm] = useState({ usernameOrEmail: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Attempting login with:', form);
    };

    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
                <div className="flex flex-col md:flex-row w-full h-full md:h-screen">
                    {/* Left Side: Wine Image */}
                    <div className="w-full md:w-1/2 flex items-end justify-center relative h-100 md:h-auto">
                        <img
                            src="/assets/login-image.png"
                            alt="Wine Glass"
                            className="max-h-full md:max-h-[95%] w-auto object-contain absolute bottom-0"
                        />
                    </div>

                    {/* Right Side: Login Card */}
                    <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
                        <div className="bg-black rounded-lg p-6 md:p-10 w-full max-w-md shadow-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-white">
                                <span className="text-red-500">W</span>elcome back!
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <input
                                    type="text"
                                    name="usernameOrEmail"
                                    value={form.usernameOrEmail}
                                    onChange={handleChange}
                                    placeholder="Email or Username"
                                    className="w-full px-4 md:px-5 py-3 md:py-4 bg-black border border-white rounded-md text-white placeholder-gray-400 text-base md:text-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full px-4 md:px-5 py-3 md:py-4 bg-black border border-white rounded-md text-white placeholder-gray-400 text-base md:text-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-3 md:py-4 px-4 border border-white rounded-md text-lg font-semibold hover:bg-gray-900 transition-colors duration-200"
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Logo and Slogan */}
                <div className="absolute bottom-24 md:bottom-20 left-1/2 transform -translate-x-1/2 text-center text-gray-800 z-10 px-4">
                    <img src="/assets/logo1.png" alt="Le Bistrot du Dr. Wine" className="mx-auto h-16 md:h-24 mb-2 md:mb-3" />
                    <p className="text-lg md:text-2xl font-serif">where food meets royalty</p>
                </div>
            </div>
        </>
    );
}

import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Login() {
    const [form, setForm] = useState({ usernameOrEmail: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend for authentication
        console.log('Attempting login with:', form);
        // Example: Inertia.post('/login', form);
    };

    return (
        <>
            <Head title="Login" />

            <div
                className="relative min-h-screen bg-cover bg-center flex justify-end items-start p-12"
                style={{ backgroundImage: "url('/images/wine-background.png')" }} // Adjust path to your wine glass image
            >
                {/* Overlay for the Dr. Wine logo and slogan */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center text-gray-800">
                    <img src="/images/dr-wine-logo.png" alt="Le Bistrot du Dr. Wine" className="mx-auto h-24 mb-2" /> {/* Adjust path to your logo */}
                    <p className="text-lg font-serif">where food meets royalty</p>
                </div>

                <div className="bg-black border-2 border-blue-500 rounded-md p-6 w-80 text-white shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        <span className="text-red-500">W</span>elcome back!
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <input
                                type="text"
                                name="usernameOrEmail"
                                value={form.usernameOrEmail}
                                onChange={handleChange}
                                placeholder="Email or Username"
                                className="w-full px-4 py-3 bg-black border border-white rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full px-4 py-3 bg-black border border-white rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 px-4 border border-white rounded-md text-lg font-semibold hover:bg-gray-900 transition-colors duration-200"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
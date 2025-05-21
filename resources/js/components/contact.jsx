import React from 'react';

export default function ContactSection() {
  return (
    <section
      className="relative py-20 md:py-32 bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/contact-background.jpg')" }} /* IMPORTANT: Verify this path */
    >
      {/* Overlay to darken background image and make text more readable */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Contact Us Title */}
        {/* Note: The image uses a custom font and red highlight for "Us".
            You'll need to define 'font-contact-us' in your tailwind.config.js
            and potentially import the font globally if you want to match this.
            Otherwise, it will use a default font.
        */}
        <h2 className="text-6xl md:text-7xl font-contact-us text-center mb-16">
          Contact <span className="text-red-500">Us</span>
        </h2>

        {/* This is the main content wrapper for the two columns (Info/Hours and Form) */}
        {/* It will be max-width and aligned to the right on large screens */}
        <div className="flex flex-col lg:flex-row lg:max-w-4xl lg:ml-auto mx-auto items-start justify-between gap-12">
          {/* Left Column: Contact Info & Opening Hours */}
          <div className="lg:w-1/2 flex flex-col items-start space-y-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-3xl font-semibold mb-6">Contact Info</h3>
              <ul className="space-y-4 text-xl">
                <li>
                  <a href="https://facebook.com/drwine.bgc" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-red-500 transition-colors duration-300">
                    <span className="mr-3 text-2xl w-6">FB</span> {/* Placeholder for Facebook icon */}
                    https://www.facebook.com/drwine.bgc
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/drwine.bgc/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-red-500 transition-colors duration-300">
                    <span className="mr-3 text-2xl w-6">IG</span> {/* Placeholder for Instagram icon */}
                    https://www.instagram.com/drwine.bgc/
                  </a>
                </li>
                <li>
                  <a href="tel:09177152807" className="flex items-center hover:text-red-500 transition-colors duration-300">
                    <span className="mr-3 text-2xl w-6">📞</span> {/* Placeholder for Phone icon */}
                    0917 715 2807
                  </a>
                </li>
                <li>
                  <a href="mailto:reservation.drwinebgc@gmail.com" className="flex items-center hover:text-red-500 transition-colors duration-300">
                    <span className="mr-3 text-2xl w-6">✉️</span> {/* Placeholder for Email icon */}
                    reservation.drwinebgc@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="text-3xl font-semibold mb-6">Opening Hours</h3>
              <ul className="space-y-2 text-xl">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>7:00 am - 11:30 pm</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>8:30 am - 10:00 pm</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full lg:w-1/2 bg-white bg-opacity-5 p-8 rounded-lg shadow-xl border border-white border-opacity-20 backdrop-filter backdrop-blur-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <input
                  type="text"
                  placeholder="Name"
                  className="p-4 bg-transparent border border-white border-opacity-50 rounded-lg focus:outline-none focus:border-red-500 placeholder-gray-300"
                />
                {/* Phone Number Field */}
                <input
                  type="text"
                  placeholder="Phone number"
                  className="p-4 bg-transparent border border-white border-opacity-50 rounded-lg focus:outline-none focus:border-red-500 placeholder-gray-300"
                />
              </div>
              {/* Email Field */}
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 bg-transparent border border-white border-opacity-50 rounded-lg focus:outline-none focus:border-red-500 placeholder-gray-300"
              />
              {/* Message Textarea */}
              <textarea
                placeholder="Please enter your message"
                rows="6"
                className="w-full p-4 bg-transparent border border-white border-opacity-50 rounded-lg focus:outline-none focus:border-red-500 placeholder-gray-300 resize-none"
              ></textarea>
              {/* Send Message Button */}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
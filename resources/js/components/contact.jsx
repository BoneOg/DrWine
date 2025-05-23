import React from 'react';
import { FaFacebookF, FaInstagram, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function ContactSection() {
  return (
    <section
      className="relative py-10 md:py-12 bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('/assets/contactsection.jpg'), url('/images/contact-background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 container mx-auto px-4" style={{ maxWidth: '1200px' }}>
        {/* Fluid font size for heading */}
        <h2
          className="font-arizonia italic text-center mb-10 md:mb-16"
          style={{
            fontSize: 'clamp(3rem, 8vw, 10rem)', // Adjust these as needed
          }}
        >
          Contact <span className="text-[#FF0000]">U</span>s
        </h2>



        <div className="flex flex-col lg:flex-row mx-auto items-start justify-between gap-8 md:gap-12 lg:gap-20">
          {/* Left Column */}
          <div className="lg:w-2/5 flex flex-col items-start space-y-6 md:space-y-8">
            <div>
              <h3
                className="font-semibold mb-3 pb-2 border-b border-white border-opacity-30"
                style={{ fontSize: 'clamp(1.125rem, 2vw, 1.875rem)' }}
              >
                Contact Info
              </h3>
              <ul className="space-y-3 md:space-y-4" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.25rem)' }}>
                {[
                  {
                    href: 'https://facebook.com/drwine.bgc',
                    icon: <FaFacebookF />,
                    text: 'drwine.bgc',
                  },
                  {
                    href: 'https://instagram.com/drwine.bgc/',
                    icon: <FaInstagram />,
                    text: 'drwine.bgc',
                  },
                  {
                    href: 'tel:09177152807',
                    icon: <FaPhone />,
                    text: '0917 715 2807',
                  },
                  {
                    href: 'mailto:reservation.drwinebgc@gmail.com',
                    icon: <MdEmail />,
                    text: 'reservation.drwinebgc@gmail.com',
                    isEmail: true, // add a flag to identify the email item
                  },
                ].map(({ href, icon, text, isEmail }) => {
                // If it's the email, override href with Gmail compose URL:
                const gmailHref = 'https://mail.google.com/mail/?view=cm&fs=1&to=reservation.drwinebgc@gmail.com';

                return (
                  <li key={text}>
                    <a
                      href={isEmail ? gmailHref : href}
                      target={href.startsWith('http') || isEmail ? '_blank' : undefined}
                      rel={href.startsWith('http') || isEmail ? 'noopener noreferrer' : undefined}
                      className="flex items-center hover:text-red-500 transition-colors duration-300"
                      style={{ fontSize: 'inherit' }}
                    >
                      <span style={{ marginRight: '0.75rem', fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>{icon}</span>
                      {text}
                    </a>
                  </li>
                );
              })}
            </ul>
            </div>

            <div>
              <h3
                className="font-semibold mb-3 pb-2 border-b border-white border-opacity-30"
                style={{ fontSize: 'clamp(1.125rem, 2vw, 1.875rem)' }}
              >
                Opening Hours
              </h3>
              <ul className="space-y-2" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.25rem)' }}>
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

          {/* Right Column */}
          <div
            className="w-full lg:w-3/5 bg-none bg-opacity-10 p-6 md:p-8 rounded-lg shadow-xl border border-white border-opacity-20 backdrop-filter backdrop-blur-sm"
            style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
          >
            <form className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { type: 'text', placeholder: 'Name' },
                  { type: 'text', placeholder: 'Phone number' },
                ].map(({ type, placeholder }) => (
                  <input
                    key={placeholder}
                    type={type}
                    placeholder={placeholder}
                    className="bg-transparent border border-white border-opacity-50 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-300 text-white"
                    style={{ padding: 'clamp(0.5rem, 1vw, 1rem)', fontSize: 'inherit' }}
                  />
                ))}
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border border-white border-opacity-50 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-300 text-white"
                style={{ padding: 'clamp(0.5rem, 1vw, 1rem)', fontSize: 'inherit' }}
              />
              <textarea
                placeholder="Please enter your message"
                rows="6"
                className="w-full bg-transparent border border-white border-opacity-50 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-300 resize-none text-white"
                style={{ padding: 'clamp(0.5rem, 1vw, 1rem)', fontSize: 'inherit' }}
              />
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-colors duration-300 uppercase"
                style={{ padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2.5rem)' }}
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

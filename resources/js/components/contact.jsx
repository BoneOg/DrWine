import React from 'react';
import { FaFacebookF, FaInstagram, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function ContactSection() {
  return (
    <section
      className="relative py-16 md:py-20 lg:py-24 bg-cover bg-center text-white overflow-hidden"
      style={{
        backgroundImage: `url('/assets/contactsection.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative container z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 xl:gap-20">
          {/* Left Column */}
          <div className="lg:w-1/2 space-y-8 sm:space-y-10">
            <h2
              className="font-felix text-4xl font-light leading-tight">
              Contact Us
            </h2>

            <div>
              <h3
                className="mb-4 sm:mb-6 border-b border-white border-opacity-30 pb-2">
                Contact Info
              </h3>
              <ul
                className="space-y-4 sm:space-y-5 text-white"
                style={{ fontSize: 'clamp(0.95rem, 1.15vw, 1.25rem)' }}
              >
                {[
                  {
                    href: 'https://www.facebook.com/drwine.bgc',
                    icon: <FaFacebookF />,
                    text: 'https://www.facebook.com/drwine.bgc',
                  },
                  {
                    href: 'https://www.instagram.com/drwine.bgc/',
                    icon: <FaInstagram />,
                    text: 'https://www.instagram.com/drwine.bgc/',
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
                    isEmail: true,
                  },
                ].map(({ href, icon, text, isEmail }) => {
                  const gmailHref =
                    'https://mail.google.com/mail/?view=cm&fs=1&to=reservation.drwinebgc@gmail.com';
                  return (
                    <li key={text} className="flex items-center gap-3 sm:gap-4">
                      <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-white bg-opacity-90 transition-transform duration-300 hover:-translate-y-1">
                        <span className="text-black text-lg sm:text-xl">{icon}</span>
                      </span>
                      <a
                        href={isEmail ? gmailHref : href}
                        target={href.startsWith('http') || isEmail ? '_blank' : undefined}
                        rel={href.startsWith('http') || isEmail ? 'noopener noreferrer' : undefined}
                        className="hover:text-red-500 break-all transition-colors duration-300"
                      >
                        {text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

{/* Right Column */}
<div className="lg:w-1/2 w-full max-w-md mx-auto lg:mx-0 border border-white border-opacity-40 backdrop-blur-sm p-4 sm:p-5 md:p-6">
  <form className="space-y-3 sm:space-y-4 text-white text-sm sm:text-base">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <input
        type="text"
        placeholder="Name"
        className="w-full bg-transparent border border-white border-opacity-60 rounded-md px-3 py-2 placeholder-gray-300 focus:outline-none focus:border-red-500 transition-colors"
      />
      <input
        type="text"
        placeholder="Phone number"
        className="w-full bg-transparent border border-white border-opacity-60 rounded-md px-3 py-2 placeholder-gray-300 focus:outline-none focus:border-red-500 transition-colors"
      />
    </div>
    <input
      type="email"
      placeholder="Email"
      className="w-full bg-transparent border border-white border-opacity-60 rounded-md px-3 py-2 placeholder-gray-300 focus:outline-none focus:border-red-500 transition-colors"
    />
    <textarea
      rows="4"
      placeholder="Please enter your message"
      className="w-full bg-transparent border border-white border-opacity-60 rounded-md px-3 py-2 placeholder-gray-300 resize-none focus:outline-none focus:border-red-500 transition-colors"
    />
    <button
      type="submit"
      className="w-full bg-transparent border border-white border-opacity-60 py-2 rounded-md hover:bg-red-700 transition-colors uppercase tracking-wide text-sm"
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

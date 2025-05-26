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
        <div className="flex flex-col lg:flex-row mx-auto items-start justify-between gap-8 md:gap-12 lg:gap-20">
          {/* Left Column */}
          <div className="lg:w-3/6 flex flex-col items-start space-y-5 md:space-y-10">
            <h2
              className="font-fraunces font-thin text-left mb-8"
              style={{
                fontSize: 'clamp(3rem, 4vw, 5rem)',
                fontWeight: 400,
                letterSpacing: '0.02em',
              }}
            >
              Contact Us
            </h2>
            <div>
              <h3
                className="font-semibold mb-3 pb-2 border-b border-white border-opacity-30"
                style={{ fontSize: 'clamp(1.125rem, 2vw, 1.875rem)' }}
              >
                Contact Info
              </h3>
              <ul className="space-y-4 md:space-y-5" style={{ fontSize: 'clamp(0.95rem, 1.15vw, 1.25rem)' }}>
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
                  // If it's the email, override href with Gmail compose URL:
                  const gmailHref = 'https://mail.google.com/mail/?view=cm&fs=1&to=reservation.drwinebgc@gmail.com';
                  return (
                    <li key={text} className="flex items-center gap-4">
                      <span className="flex items-center justify-center bg-white bg-opacity-90 rounded-md" style={{ width: 36, height: 36 }}>
                        <span style={{ color: '#222', fontSize: '1.3rem' }}>{icon}</span>
                      </span>
                      <a
                        href={isEmail ? gmailHref : href}
                        target={href.startsWith('http') || isEmail ? '_blank' : undefined}
                        rel={href.startsWith('http') || isEmail ? 'noopener noreferrer' : undefined}
                        className="hover:text-red-500 transition-colors duration-300 break-all"
                        style={{ fontSize: 'inherit' }}
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
          {/* Right Column */}
          <div
            className="w-full lg:w-3/5 max-w-xl p-4 md:p-6 rounded-none border border-white border-opacity-40 backdrop-filter backdrop-blur-sm bg-none bg-opacity-5 self-stretch flex flex-col justify-between"
            style={{ fontSize: 'clamp(0.85rem, 1vw, 1rem)' }}
          >
            <form className="space-y-3 md:space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { type: 'text', placeholder: 'Name' },
                    { type: 'text', placeholder: 'Phone number' },
                  ].map(({ type, placeholder }) => (
                    <input
                      key={placeholder}
                      type={type}
                      placeholder={placeholder}
                      className="bg-transparent border border-white border-opacity-60 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-200 text-white"
                      style={{ padding: '0.5rem 0.75rem', fontSize: 'inherit' }}
                    />
                  ))}
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border border-white border-opacity-60 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-200 text-white"
                  style={{ padding: '0.5rem 0.75rem', fontSize: 'inherit' }}
                />
                <textarea
                  placeholder="Please enter your message"
                  rows="4"
                  className="w-full bg-transparent border border-white border-opacity-60 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-200 resize-none text-white"
                  style={{ padding: '0.5rem 0.75rem', fontSize: 'inherit' }}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-none bg-opacity-20 hover:bg-red-700 text-white font-medium rounded-sm transition-colors duration-300 uppercase border border-white border-opacity-40 shadow"
                style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}
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

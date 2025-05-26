import Layout from '@/components/layout';
import { Head } from '@inertiajs/react';
import { FaFacebookF, FaInstagram, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Contact() {
  return (
    <>
      <Head title="Contact Us" />
      <Layout>
        <section
          className="relative min-h-screen flex flex-col justify-center items-center bg-cover bg-center text-white py-16 md:py-20 lg:py-24" // Changed to min-h-screen, added responsive vertical padding
          style={{
            backgroundImage: `url('/assets/contact-bg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Black overlay for better text visibility */}
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12" style={{ maxWidth: '1200px' }}> {/* Adjusted horizontal padding for various screens */}
            <h2
              className="font-arizonia italic text-center mb-10 md:mb-16" // Retained margin from ContactSection
              style={{
                fontSize: 'clamp(3rem, 8vw, 10rem)',
              }}
            >
              Contact <span className="text-[#FF0000]">U</span>s
            </h2>

            <div className="flex flex-col lg:flex-row mx-auto items-start justify-between gap-8 md:gap-12 lg:gap-20">
              {/* Left Column */}
              <div className="w-full lg:w-2/5 flex flex-col items-start space-y-6 md:space-y-8"> {/* Added w-full for small screens */}
                <div>
                  <h3
                    className="font-semibold mb-3 pb-2 border-b border-white border-opacity-30 text-xl md:text-2xl lg:text-3xl" // Added responsive font sizes
                    // clamp already handles fluid sizing for specific range, these provide breakpoints for specific text sizes.
                    // style={{ fontSize: 'clamp(1.125rem, 2vw, 1.875rem)' }} // Retained font size - can keep this or rely on utility classes
                  >
                    Contact Info
                  </h3>
                  <ul className="space-y-3 md:space-y-4 text-base md:text-lg lg:text-xl"> 
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
                        isEmail: true,
                      },
                    ].map(({ href, icon, text, isEmail }) => {
                      const gmailHref = 'https://mail.google.com/mail/?view=cm&fs=1&to=reservation.drwinebgc@gmail.com';

                      return (
                        <li key={text}>
                          <a
                            href={isEmail ? gmailHref : href}
                            target={href.startsWith('http') || isEmail ? '_blank' : undefined}
                            rel={href.startsWith('http') || isEmail ? 'noopener noreferrer' : undefined}
                            className="flex items-center hover:text-red-500 transition-colors duration-300"
                          >
                            <span className="mr-3 text-xl md:text-2xl"> {/* Responsive icon size */}
                                {icon}
                            </span>
                            {text}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <h3
                    className="font-semibold mb-3 pb-2 border-b border-white border-opacity-30 text-xl md:text-2xl lg:text-3xl" // Added responsive font sizes
                    // style={{ fontSize: 'clamp(1.125rem, 2vw, 1.875rem)' }} // Retained font size
                  >
                    Opening Hours
                  </h3>
                  <ul className="space-y-2 text-base md:text-lg lg:text-xl"> {/* Added responsive font sizes */}
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

              {/* Right Column (Contact Form) */}
              <div
                className="w-full lg:w-3/5 bg-none bg-opacity-10 p-6 md:p-8 rounded-lg shadow-xl border border-white border-opacity-20 backdrop-filter backdrop-blur-sm"
                // style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }} // Can rely on utility classes instead for consistency
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
                        className="bg-transparent border border-white border-opacity-50 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-300 text-white text-base py-3 px-4" // Added explicit text size and padding
                        // style={{ padding: 'clamp(0.5rem, 1vw, 1rem)', fontSize: 'inherit' }} // Prefer explicit classes here
                      />
                    ))}
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-transparent border border-white border-opacity-50 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-300 text-white text-base py-3 px-4" // Added explicit text size and padding
                    // style={{ padding: 'clamp(0.5rem, 1vw, 1rem)', fontSize: 'inherit' }} // Prefer explicit classes here
                  />
                  <textarea
                    placeholder="Please enter your message"
                    rows="6"
                    className="w-full bg-transparent border border-white border-opacity-50 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-300 resize-none text-white text-base py-3 px-4" // Added explicit text size and padding
                    // style={{ padding: 'clamp(0.5rem, 1vw, 1rem)', fontSize: 'inherit' }} // Prefer explicit classes here
                  />
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-colors duration-300 uppercase py-3 md:py-4 text-lg" // Added responsive padding and text size
                    // style={{ padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2.5rem)' }} // Can rely on utility classes here
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
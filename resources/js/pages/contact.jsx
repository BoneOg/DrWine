import Layout from '@/components/layout';
import { Head, Link } from '@inertiajs/react';
import { FaFacebookF, FaInstagram, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Contact() {
  return (
    <>
      <Head title="Contact Us" />
      <Layout>
        {/* Map Section */}
        <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-black pointer-events-none"></div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.8022644974257!2d121.04533147585727!3d14.55073908092726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8f8a749d3c3%3A0xc94c818043b55657!2sDr.%20Wine!5e0!3m2!1sen!2sph!4v1709697436044!5m2!1sen!2sph"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

        <section
          className="relative flex flex-col justify-center items-center text-white py-10 md:py-14 lg:py-16 overflow-hidden bg-[#000C1C]"
        >
          <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
            <div className="max-w-[1400px] mx-auto">
              {/* Main Heading */}
              <div className="text-center mb-8 md:mb-10 lg:mb-12">
                <h2 className="font-felix text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2">
                  Contact Us
                </h2>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                  We'd love to hear from you. Get in touch with us for reservations, inquiries, or just to say hello.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row mx-auto items-start justify-between gap-8 lg:gap-12 xl:gap-20">
                {/* Left Column */}
                <div className="w-full lg:w-1/4 flex flex-col items-start space-y-6 md:space-y-8">
                  {/* Contact Info Section */}
                  <div className="w-full">
                    <h3 className="font-fraunces text-lg sm:text-xl mb-4 pb-2 border-b border-white/30">
                      Contact Info
                    </h3>
                    <ul className="space-y-3">
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
                        {
                          href: 'https://maps.google.com/?q=DrWine+BGC+Forbestown',
                          icon: <FaMapMarkerAlt />,
                          text: 'Forbestown Road, BGC, Taguig',
                        },
                      ].map(({ href, icon, text, isEmail }) => {
                        const gmailHref = 'https://mail.google.com/mail/?view=cm&fs=1&to=reservation.drwinebgc@gmail.com';

                        return (
                          <li key={text}>
                            <a
                              href={isEmail ? gmailHref : href}
                              target={href.startsWith('http') || isEmail ? '_blank' : undefined}
                              rel={href.startsWith('http') || isEmail ? 'noopener noreferrer' : undefined}
                              className="flex items-center group"
                            >
                              <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300 mr-3">
                                <span className="text-base group-hover:scale-110 transition-transform duration-300">
                                  {icon}
                                </span>
                              </span>
                              <span className="text-sm group-hover:text-red-400 transition-colors duration-300">
                                {text}
                              </span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Opening Hours Section */}
                  <div className="w-full">
                    <h3 className="font-fraunces text-lg sm:text-xl mb-4 pb-2 border-b border-white/30">
                      Opening Hours
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between items-center">
                        <span className="text-gray-300">Monday - Friday</span>
                        <span>7:00 am - 11:30 pm</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-gray-300">Saturday</span>
                        <span>8:30 am - 10:00 pm</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-gray-300">Sunday</span>
                        <span>Closed</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Column (Contact Form) */}
                <div className="w-full lg:w-[70%] backdrop-blur-md bg-black/20 p-5 sm:p-6 lg:p-8 rounded-2xl border border-white/10 shadow-2xl">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300">Full Name</label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          required
                          className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 
                          focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="Enter your phone number"
                          required
                          className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 
                          focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300">Email Address</label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          required
                          className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 
                          focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300">Preferred Contact Method</label>
                        <select
                          className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm text-gray-300
                          focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                        >
                          <option value="" className="bg-gray-900">Select contact method</option>
                          <option value="email" className="bg-gray-900">Email</option>
                          <option value="phone" className="bg-gray-900">Phone</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Section */}
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300">Subject</label>
                        <input
                          type="text"
                          placeholder="Enter message subject"
                          required
                          className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 
                          focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300">Message</label>
                        <textarea
                          placeholder="Please enter your message"
                          rows="4"
                          required
                          className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 
                          focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300 resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                      text-white font-semibold rounded-lg transition-all duration-300 py-2.5 text-sm uppercase tracking-wider
                      shadow-lg hover:shadow-red-500/20"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Book a Table Section */}
        <section className="relative bg-[#0A121C] py-20 md:py-24 lg:py-28 overflow-hidden">
          {/* Image Grid Background */}
          <div className="absolute inset-0 grid grid-cols-4 gap-1 opacity-20">
            <div className="relative h-full">
              <img src="/assets/menu-item1.jpg" alt="" className="object-cover w-full h-full" />
            </div>
            <div className="relative h-full">
              <img src="/assets/menu-item2.jpg" alt="" className="object-cover w-full h-full" />
            </div>
            <div className="relative h-full">
              <img src="/assets/heroimage.jpg" alt="" className="object-cover w-full h-full" />
            </div>
            <div className="relative h-full">
              <img src="/assets/about-food.jpg" alt="" className="object-cover w-full h-full" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
            <div className="max-w-[1600px] mx-auto">
              <div className="flex flex-col items-center justify-center text-center">
                <h2 className="font-fraunces font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                  BOOK A TABLE
                </h2>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8">
                  Simply fill out the reservation form on our website
                  or give us a call to reserve your table today.
                </p>
                <Link
                  href={route('reservation')}
                  className="inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-4 
                  border-2 border-white text-white hover:bg-white hover:text-[#0A121C] 
                  transition-all duration-300 text-sm sm:text-base uppercase tracking-wider font-medium"
                >
                  Make a Reservation
                </Link>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
                <div className="relative aspect-[4/3] overflow-hidden group">
                  <img 
                    src="/assets/menu-item1.jpg" 
                    alt="Restaurant Ambiance" 
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden group">
                  <img 
                    src="/assets/menu-item2.jpg" 
                    alt="Fine Dining" 
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden group">
                  <img 
                    src="/assets/heroimage.jpg" 
                    alt="Wine Selection" 
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden group">
                  <img 
                    src="/assets/about-food.jpg" 
                    alt="Signature Dish" 
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
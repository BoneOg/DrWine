import Layout from '@/components/layout';
import { Head } from '@inertiajs/react';
import { FaFacebookF, FaInstagram, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const formRef = useRef();
  const iconSize = "1.2em";

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_xdu3624',
      'template_2k3twwh',
      formRef.current,
      'FvPitcDCCMIJ1KzMO'
    ).then(
      (result) => {
        console.log('Email sent:', result.text);
        alert('Message sent successfully!');
      },
      (error) => {
        console.error('Error sending email:', error.text);
        alert('Failed to send message. Please try again.');
      }
    );

    e.target.reset();
  };

  return (
    <>
      <Head title="Contact Us" />
      <Layout>
        {/* Hero Section */}
        <div className="relative h-[50vh] bg-[#000C1C] overflow-hidden">
          <img
            src="/assets/menu-section-background.png"
            alt="Menu Hero"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-/70 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-felix text-white tracking-wider pt-16 mb-4">
              CONTACT US
            </h1>
            {/* Updated decorative line */}
            <div className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-4 md:mb-6"></div>
          </div>
        </div>

        {/* Contact Section */}
        <section className="relative flex flex-col justify-center items-center text-white py-10 md:py-14 lg:py-16 overflow-hidden bg-[#000C1C]">
          <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex flex-col font-monts lg:flex-row mx-auto items-start justify-between gap-8 lg:gap-12 xl:gap-20">
                {/* Left Column */}
                <div className="w-full lg:w-1/4 flex flex-col items-start space-y-6 md:space-y-8">
                  {/* Contact Info Section */}
                  <div className="w-full">
                    <h3 className="font-felix text-lg sm:text-xl mb-4 pb-2 border-b border-white/30">
                      Contact Info
                    </h3>
                    <ul className="space-y-3">
                      {[
                        {
                          href: 'https://facebook.com/drwine.bgc',
                          icon: <FaFacebookF size={iconSize} />,
                          text: 'drwine.bgc',
                        },
                        {
                          href: 'https://instagram.com/drwine.bgc/',
                          icon: <FaInstagram size={iconSize} />,
                          text: 'drwine.bgc',
                        },
                        {
                          href: 'tel:09177152807',
                          icon: <FaPhone size={iconSize} />,
                          text: '0917 715 2807',
                        },
                        {
                          href: 'mailto:reservation.drwinebgc@gmail.com',
                          icon: <MdEmail size={iconSize} />,
                          text: 'reservation.drwinebgc@gmail.com',
                          isEmail: true,
                        },
                        {
                          href: 'https://maps.google.com/?q=DrWine+BGC+Forbestown',
                          icon: <FaMapMarkerAlt size={iconSize} />,
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
                              <span className="flex items-center justify-center w-8 h-8 bg-white/10 group-hover:bg-[#CDAF7B] transition-all duration-300 mr-3">
                                <span className="text-white group-hover:text-black group-hover:scale-110 transition-all duration-300">
                                  {icon}
                                </span>
                              </span>
                              <span className="text-sm text-white group-hover:text-[#CDAF7B] transition-colors duration-300">
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
                    <h3 className="font-felix text-lg sm:text-xl mb-4 pb-2 border-b border-white/30">
                      Opening Hours
                    </h3>
                    <ul className="space-y-2 font-monts text-sm">
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
                <div className="w-full lg:w-[70%] backdrop-blur-md bg-black/20 p-5 sm:p-6 lg:p-8 border border-white/10 shadow-2xl">
                  <form className="space-y-6" ref={formRef} onSubmit={sendEmail}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300">Full Name</label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          required
                          name="user_name"
                          className="w-full bg-white/5 border border-white/20 rounded-none px-3 py-2 text-sm placeholder:text-gray-400 
                          focus:outline-none focus:border-[#CDAF7B] focus:ring-1 focus:ring-[#CDAF7B] transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="Enter your phone number"
                          required
                          name="user_phone"
                          className="w-full bg-white/5 border border-white/20 rounded-none px-3 py-2 text-sm placeholder:text-gray-400 
                          focus:outline-none focus:border-[#CDAF7B] focus:ring-1 focus:ring-[#CDAF7B] transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300">Email Address</label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          required
                          name="user_email"
                          className="w-full bg-white/5 border border-white/20 rounded-none px-3 py-2 text-sm placeholder:text-gray-400 
                          focus:outline-none focus:border-[#CDAF7B] focus:ring-1 focus:ring-[#CDAF7B] transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300">Preferred Contact Method</label>
                        <select
                          name="preferred_method" required className="w-full bg-white/5 border border-white/20 rounded-none px-3 py-2 text-sm text-gray-300
                          focus:outline-none focus:border-[#CDAF7B] focus:ring-1 focus:ring-[#CDAF7B] transition-all duration-300"
                        >
                          <option value="" className="bg-gray-900">Select contact method</option>
                          <option value="email" className="bg-gray-900">Email</option>
                          <option value="phone" className="bg-gray-900">Phone</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300">Subject</label>
                        <input
                          type="text"
                          placeholder="Enter message subject"
                          required
                          name="subject"
                          className="w-full bg-white/5 border border-white/20 rounded-none px-3 py-2 text-sm placeholder:text-gray-400 
                          focus:outline-none focus:border-[#CDAF7B] focus:ring-1 focus:ring-[#CDAF7B] transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300">Message</label>
                        <textarea
                          placeholder="Please enter your message"
                          rows="4"
                          required
                          name="message"
                          className="w-full bg-white/5 border border-white/20 rounded-none px-3 py-2 text-sm placeholder:text-gray-400 
                          focus:outline-none focus:border-[#CDAF7B] focus:ring-1 focus:ring-[#CDAF7B] transition-all duration-300 resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#CDAF7B] hover:bg-[#B69A6B] text-black font-monts rounded-none 
                      transition-all duration-300 py-3 text-md font-bold uppercase tracking-wider"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

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
      </Layout>
    </>
  );
}
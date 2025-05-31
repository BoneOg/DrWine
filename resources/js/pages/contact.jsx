import React, { useRef, useState } from 'react';
import Layout from '@/components/layout';
import { Head, Link } from '@inertiajs/react';
import { FaFacebookF, FaInstagram, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import emailjs from '@emailjs/browser';

export default function Contact() {
  // Ref for the contact form to be used with EmailJS
  const formRef = useRef();
  // State to manage the visibility and content of the message box
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: string }
  // Size for the social media and contact icons
  const iconSize = "1.2em";

  /**
   * Handles the submission of the contact form.
   * Sends the form data using EmailJS and displays a success or error message.
   * @param {Event} e - The form submission event.
   */
  const sendEmail = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Send form data using EmailJS
    emailjs.sendForm(
      'service_xdu3624', // Your EmailJS service ID
      'template_2k3twwh', // Your EmailJS template ID
      formRef.current,    // The form element to send
      'FvPitcDCCMIJ1KzMO'  // Your EmailJS public key
    ).then(
      (result) => {
        // Log success and display a success message
        console.log('Email sent:', result.text);
        setMessage({ type: 'success', text: 'Message sent successfully!' });
        e.target.reset(); // Reset the form fields
        // Automatically hide the message after 5 seconds
        setTimeout(() => setMessage(null), 5000);
      },
      (error) => {
        // Log error and display an error message
        console.error('Error sending email:', error.text);
        setMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
        // Automatically hide the message after 5 seconds
        setTimeout(() => setMessage(null), 5000);
      }
    );
  };

  return (
    <>
      {/* Head component for SEO and page title */}
      <Head title="Contact Us" />
      <Layout>
        {/* Message box for success/error feedback */}
        {message && (
          <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
            message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {message.text}
            <button onClick={() => setMessage(null)} className="ml-4 font-bold">X</button>
          </div>
        )}

        {/* Hero Section - Retained from Contact Version 1 */}
        <div className="relative h-[50vh] bg-[#000C1C] overflow-hidden">
          <img
            src="/assets/menu-section-background.png"
            alt="Menu Hero"
            className="w-full h-full object-cover opacity-30"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/10 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-felix text-white tracking-wider pt-16 mb-4">
              CONTACT US
            </h1>
            {/* Decorative line */}
            <div className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-4 md:mb-6"></div>
          </div>
        </div>

        {/* Main Contact Section */}
        <section
          className="relative flex flex-col justify-center items-center text-white py-10 md:py-14 lg:py-16 overflow-hidden bg-[#000C1C]"
        >
          <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex flex-col font-monts lg:flex-row mx-auto items-start justify-between gap-8 lg:gap-12 xl:gap-20">
                {/* Left Column: Contact Info & Opening Hours */}
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
                          href: 'https://www.google.com/maps/place/Forbestown+Road,+Taguig,+Metro+Manila,+Philippines/',
                          icon: <FaMapMarkerAlt size={iconSize} />,
                          text: 'Forbestown Road, BGC, Taguig',
                        },
                      ].map(({ href, icon, text, isEmail }) => {
                        // Special handling for Gmail link to open in new tab
                        const gmailHref = 'https://mail.google.com/mail/?view=cm&fs=1&to=reservation.drwinebgc@gmail.com';

                        return (
                          <li key={text}>
                            <a
                              href={isEmail ? gmailHref : href}
                              target={href.startsWith('http') || isEmail ? '_blank' : undefined}
                              rel={href.startsWith('http') || isEmail ? 'noopener noreferrer' : undefined}
                              className="flex items-center group"
                            >
                              <span className="flex items-center justify-center w-8 h-8 bg-white/10 group-hover:bg-[#CDAF7B] transition-all duration-300 mr-3 rounded-full">
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
                    <h3 className="font-fraunces text-lg sm:text-xl mb-4 pb-2 border-b border-white/30">
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

                {/* Right Column: Contact Form */}
                <div className="w-full lg:w-[70%] backdrop-blur-md bg-black/20 p-5 sm:p-6 lg:p-8 rounded-2xl border border-white/10 shadow-2xl">
                  <form className="space-y-6" ref={formRef} onSubmit={sendEmail}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="fullName" className="text-xs text-gray-300">Full Name</label>
                        <input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          required
                          name="user_name" // Name attribute for EmailJS
                          className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 
                          focus:outline-none focus:border-[#CDAF7B] focus:ring-1 focus:ring-[#CDAF7B] transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="phoneNumber" className="text-xs text-gray-300">Phone Number</label>
                        <input
                          id="phoneNumber"
                          type="tel"
                          placeholder="Enter your phone number"
                          required
                          name="user_phone" // Name attribute for EmailJS
                          className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 
                          focus:outline-none focus:border-[#CDAF7B] focus:ring-1 focus:ring-[#CDAF7B] transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="emailAddress" className="text-xs text-gray-300">Email Address</label>
                        <input
                          id="emailAddress"
                          type="email"
                          placeholder="Enter your email"
                          required
                          name="user_email" // Name attribute for EmailJS
                          className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 
                          focus:outline-none focus:border-[#CDAF7B] focus:ring-1 focus:ring-[#CDAF7B] transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="contactMethod" className="text-xs text-gray-300">Preferred Contact Method</label>
                        <select
                          id="contactMethod"
                          name="preferred_method" // Name attribute for EmailJS
                          required
                          className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2 text-sm text-gray-300
                          focus:outline-none focus:border-[#CDAF7B] focus:ring-1 focus:ring-[#CDAF7B] transition-all duration-300"
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
                        <label htmlFor="subject" className="text-xs text-gray-300">Subject</label>
                        <input
                          id="subject"
                          type="text"
                          placeholder="Enter message subject"
                          required
                          name="subject" // Name attribute for EmailJS
                          className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 
                          focus:outline-none focus:border-[#CDAF7B] focus:ring-1 focus:ring-[#CDAF7B] transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="message" className="text-xs text-gray-300">Message</label>
                        <textarea
                          id="message"
                          placeholder="Please enter your message"
                          rows="4"
                          required
                          name="message" // Name attribute for EmailJS
                          className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 
                          focus:outline-none focus:border-[#CDAF7B] focus:ring-1 focus:ring-[#CDAF7B] transition-all duration-300 resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#CDAF7B] hover:bg-[#B69A6B] text-black font-monts rounded-md 
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

        {/* Map Section - Moved after Contact Form */}
        <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden bg-[#000C1C]">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-black pointer-events-none"></div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.769974578146!2d121.04719031484055!3d14.55106198982361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8f9479b1897%3A0x60b0e5d0f1a4a4d6!2sForbestown%20Road%2C%20Taguig%2C%20Metro%20Manila%2C%20Philippines!5e0!3m2!1sen!2sus!4v1678888888888!5m2!1sen!2sus"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="DrWine Location Map"
          ></iframe>
        </section>

        {/* Book a Table Section - Placed after Map Section */}
        <section className="relative bg-[#0A121C] py-20 md:py-24 lg:py-28 overflow-hidden">
          {/* Image Grid Background */}
          <div className="absolute inset-0 grid grid-cols-4 gap-1 opacity-20">
            <div className="relative h-full">
              <img src="/assets/menu-item1.jpg" alt="Background image 1" className="object-cover w-full h-full" />
            </div>
            <div className="relative h-full">
              <img src="/assets/menu-item2.jpg" alt="Background image 2" className="object-cover w-full h-full" />
            </div>
            <div className="relative h-full">
              <img src="/assets/heroimage.jpg" alt="Background image 3" className="object-cover w-full h-full" />
            </div>
            <div className="relative h-full">
              <img src="/assets/about-food.jpg" alt="Background image 4" className="object-cover w-full h-full" />
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
                  border-2 border-[#CDAF7B] text-[#CDAF7B] hover:bg-[#CDAF7B] hover:text-black 
                  transition-all duration-300 text-sm sm:text-base uppercase tracking-wider font-medium group rounded-md"
                >
                  <span className="group-hover:scale-105 transition-transform duration-300">Make a Reservation</span>
                </Link>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
                <div className="relative aspect-[4/3] overflow-hidden group rounded-lg">
                  <img 
                    src="/assets/menu-item1.jpg" 
                    alt="Restaurant Ambiance" 
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden group rounded-lg">
                  <img 
                    src="/assets/menu-item2.jpg" 
                    alt="Fine Dining" 
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden group rounded-lg">
                  <img 
                    src="/assets/heroimage.jpg" 
                    alt="Wine Selection" 
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden group rounded-lg">
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

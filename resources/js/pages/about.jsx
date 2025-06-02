import React, { useEffect } from 'react';
import Layout from '@/components/layout';
import { Head } from '@inertiajs/react';

export default function About() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      observer.disconnect();
    };
  }, []);

  return (
    <Layout>
      <Head>
        <title>About Us - Dr. Wine</title>
        <meta
          name="description"
          content="Learn about Dr. Wine's story, our passion for wine and culinary excellence, and our commitment to creating extraordinary dining experiences."
        />
      </Head>

      {/* Hero Section */}
      <div className="relative h-[50vh] bg-[#000C1C] overflow-hidden">
        <img
          src="/assets/menu-section-background.png"
          alt="Menu Hero"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000C1C]/70 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-felix text-white tracking-wider pt-16 mb-4">
            ABOUT US
          </h1>
          <div className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#CDAF7B] to-transparent mb-4 md:mb-6"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#000C1C] text-[#CDAF7B] p-6 md:p-16 font-sans">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side (Image + Small Text) */}
          <div className="space-y-6 max-w-full px-4 md:px-0">
            <img
              src="/assets/people1.png"
              alt="People at Dr. Wine"
              className="w-full h-auto object-contain max-w-full mx-auto"
            />
            <p className="text-xs font-monts text-gray-300 leading-relaxed max-w-full break-words">
              Candlelight dances on deep mahogany tables as laughter lingers in the air—Dr. Wine is a place where time slows, and every moment is savored like a final sip.
            </p>
          </div>

          {/* Right Side (Heading + Our Process) */}
          <div className="space-y-8 max-w-full px-4 md:px-0">
            <h2 className="text-[1.5rem] md:text-[1.75rem] font-felix leading-tight text-white tracking-tight break-words">
              Dr. Wine is where stories are poured and flavors composed, blending warmth and elegance in the heart of BGC.
            </h2>
            <div>
              <h3 className="text-lg mb-4 uppercase tracking-wider text-[#CDAF7B]">Our Goal</h3>
              <ul className="space-y-4 text-xs font-monts md:text-sm text-gray-300 list-none text-left break-words">
                <li>
                  To offer exceptional dining experiences by harmonizing world-class wines with thoughtfully crafted dishes.
                </li>
                <li>
                  To provide a sophisticated yet welcoming space for intimate dinners and special celebrations.
                </li>
                <li>
                  To establish Dr. Wine as a go-to spot for wine lovers and food enthusiasts seeking refined taste and storytelling through cuisine.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Behind The Dishes Section */}
      <div className="bg-[#000C1C] px-6 md:px-8 py-12">
        <h3 className="text-white font-felix text-center text-[1.5rem] md:text-[1.75rem] mb-12 break-words">
          BEHIND THE DISHES
        </h3>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
          {/* Profile 1 */}
          <div className="backdrop-blur-xl bg-white/[0.02] border border-[#CDAF7B]/40 p-4 space-y-4 hover:bg-white/[0.04] transition-all duration-300">
            <img
              src="/assets/chef theo.jpg"
              alt="Chef Theo"
              className="w-full object-contain max-w-full"
            />
            <div className="text-white leading-relaxed break-words">
              <h4 className="text-[#CDAF7B] text-md font-semibold font-felix mb-1">Chef Theo</h4>
              <p className="text-sm font-monts">
                With a quiet grace and unwavering precision, Chef Theo approaches each dish as a canvas—layering textures, flavors, and colors into artful compositions. His culinary style is rooted in restraint and refinement, letting the ingredients speak with clarity and purpose.
              </p>
            </div>
          </div>

          {/* Profile 2 */}
          <div className="backdrop-blur-xl bg-white/[0.02] border border-[#CDAF7B]/40 p-4 space-y-4 hover:bg-white/[0.04] transition-all duration-300">
            <img
              src="/assets/chef marc.jpg"
              alt="Chef Marc"
              className="w-full object-contain max-w-full"
            />
            <div className="text-white leading-relaxed break-words">
              <h4 className="text-[#CDAF7B] text-md font-semibold font-felix mb-1">Chef Marc</h4>
              <p className="text-sm font-monts">
                Bold yet grounded, Chef Marc brings a fearless creativity to the kitchen. His technique is shaped by tradition, but his passion lies in reinventing the familiar. Each plate he creates is a journey—rich with contrast, depth, and the unexpected joy of discovery.
              </p>
            </div>
          </div>

          {/* Profile 3 */}
          <div className="backdrop-blur-xl bg-white/[0.02] border border-[#CDAF7B]/40 p-4 space-y-4 hover:bg-white/[0.04] transition-all duration-300">
            <img
              src="/assets/chef gema.jpg"
              alt="Chef Gema"
              className="w-full object-contain max-w-full"
            />
            <div className="text-white leading-relaxed break-words">
              <h4 className="text-[#CDAF7B] text-md font-semibold mb-1 font-felix">Chef Gema</h4>
              <p className="text-sm font-monts">
                Chef Gema cooks with intuition and heart, drawing inspiration from family traditions and the warmth of home. Her dishes are soulful, vibrant, and layered with memory—designed to evoke comfort, connection, and a sense of celebration in every bite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

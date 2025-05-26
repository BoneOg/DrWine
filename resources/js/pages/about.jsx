import React, { useEffect } from 'react';
import Layout from '@/components/layout';
import { Head } from '@inertiajs/react';
import ContactSection from '@/components/Contact';

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
        <meta name="description" content="Learn about Dr. Wine's story, our passion for wine and culinary excellence, and our commitment to creating extraordinary dining experiences." />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center animate-on-scroll overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/assets/about-page-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="font-fraunces text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-8 pt-8">
              About Us
            </h1>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4 md:mb-6 text-gray-200 max-w-3xl mx-auto">
              Welcome to Dr. Wine, where passion for wine meets culinary excellence. 
              Our journey began with a simple vision: to create an extraordinary dining 
              experience that celebrates the perfect pairing of exceptional wines with 
              exquisite cuisine.
            </p>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-200 max-w-3xl mx-auto">
              We take pride in offering a carefully curated selection of wines from 
              around the world, complemented by our chef's innovative creations that 
              bring out the best in every glass and plate.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20">
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="/assets/lobster.png" 
                  alt="Our Story" 
                  className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] object-cover transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-8">
                Our Story
              </h2>
              <div className="space-y-4 md:space-y-6 text-gray-700">
                <p className="text-base sm:text-lg leading-relaxed">
                  Dr. Wine was born from a deep appreciation for the art of wine 
                  and its ability to elevate the dining experience. Our founder's 
                  extensive travels through the world's finest wine regions inspired 
                  the creation of this unique establishment.
                </p>
                <p className="text-base sm:text-lg leading-relaxed">
                  We believe that every bottle of wine tells a story, and every 
                  dish we serve is crafted to complement these stories. Our 
                  sommeliers and chefs work in harmony to create perfect pairings 
                  that delight and surprise our guests.
                </p>
                <p className="text-base sm:text-lg leading-relaxed">
                  Located in the heart of BGC, our restaurant has become a 
                  destination for wine enthusiasts and food lovers alike. We've 
                  created an atmosphere that combines sophistication with warmth, 
                  making it the perfect setting for both intimate dinners and 
                  celebratory gatherings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Dishes Section */}
      <section className="bg-black py-12 sm:py-16 md:py-24 px-4 text-white overflow-hidden">
        <div className="container mx-auto">
          <h2 className="font-fraunces font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center mb-12 sm:mb-16 md:mb-20 animate-on-scroll">
            Behind the Dishes
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 max-w-7xl mx-auto">
            
            {/* Chef Theo */}
            <div className="space-y-4 sm:space-y-6 animate-on-scroll text-center lg:text-left">
              <img 
                src="/assets/chef theo.jpg" 
                alt="Chef Theo" 
                className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover mb-4 transition-all duration-300"
              />
              <h3 className="font-fraunces text-xl sm:text-2xl">Chef Theo</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae repellendus 
                enim velit consequatur nemo, porro inventore dignissimos, atque laboriosam 
                aspernatur eum deleniti sit explicabo culpa, voluptas saepe. Voluptates, 
                exercitationem, est.
              </p>
            </div>

            {/* Chef Marc */}
            <div className="space-y-4 sm:space-y-6 animate-on-scroll text-center lg:mt-20">
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae repellendus 
                enim velit consequatur nemo, porro inventore dignissimos, atque laboriosam 
                aspernatur eum deleniti sit explicabo culpa, voluptas saepe. Voluptates, 
                exercitationem, est.
              </p>
              <h3 className="font-fraunces text-xl sm:text-2xl">Chef Marc</h3>
              <img 
                src="/assets/chef marc.jpg" 
                alt="Chef Marc" 
                className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover mt-4 transition-all duration-300"
              />
            </div>

            {/* Chef Gema */}
            <div className="space-y-4 sm:space-y-6 animate-on-scroll text-center lg:text-right">
              <img 
                src="/assets/chef gema.jpg" 
                alt="Chef Gema" 
                className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover mb-4 transition-all duration-300"
              />
              <h3 className="font-fraunces text-xl sm:text-2xl">Chef Gema</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae repellendus 
                enim velit consequatur nemo, porro inventore dignissimos, atque laboriosam 
                aspernatur eum deleniti sit explicabo culpa, voluptas saepe. Voluptates, 
                exercitationem, est.
              </p>
            </div>

          </div>
        </div>
      </section>

      <ContactSection />
    </Layout>
  );
}

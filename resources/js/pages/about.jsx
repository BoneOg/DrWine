import Layout from '@/components/layout';
import { Head } from '@inertiajs/react';
import Contact from '@/components/Contact';

export default function About() {
  return (
    <>
      <Head title="About Us" />

      <Layout>
        {/* Unified About Us Hero Section */}
        <section
          className="relative min-h-[700px] py-16 md:py-24 lg:py-32 flex flex-col items-center justify-start text-center bg-cover bg-center"
          style={{ backgroundImage: "url('/images/your-bar-background.jpg')" }}
        >
          {/* Overlay to darken background image for better text readability */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Content Wrapper for the Hero Section */}
          <div className="relative z-10 container mx-auto px-4 text-white">
            {/* About Us Title - prominently displayed */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-12">
              About Us
            </h1>

            {/* Main content of the About Us hero - flex container for side-by-side layout */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Images container */}
              <div className="md:w-1/2 flex flex-col items-center justify-center">
                <img
                  src="/images/your-food-image.jpg"
                  alt="Delicious food"
                  className="w-full h-auto max-w-md rounded-lg shadow-lg"
                />
                <img
                  src="/images/your-drink-image.jpg"
                  alt="Refreshing drink"
                  className="w-2/3 h-auto max-w-xs rounded-lg shadow-lg -mt-24 ml-auto -mr-12 relative z-10"
                />
              </div>

              {/* Description text */}
              <div className="md:w-1/2 text-lg leading-relaxed text-left md:text-justify">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Repudandae repellendus enim velit consequatur nemo, porro inventore dignissimos. atque laboriosam aspernatur eum deleniti sit explicabo culpa, voluptas saepe. Voluptates, exercitationem, est. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae repellendus enim velit consequatur nemo, porro inventore dignissimos. atque laboriosam aspernatur eum deleniti sit explicabo culpa, voluptas saepe. Voluptates, exercitationem, est.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Behind the Dishes Section */}
        <section className="bg-black py-16 px-4 text-white">
          <div className="container mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
              Behind the Dishes
            </h2>

            {/* Chef Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Chef Theo */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                <img src="/images/chef-theo.jpg" alt="Chef Theo" className="w-full h-64 object-cover rounded-lg mb-4" />
                <h3 className="text-3xl font-semibold mb-2">Chef Theo</h3>
                <p className="text-gray-300 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Repudandae repellendus enim velit consequatur nemo, porro inventore dignissimos atque laboriosam aspernatur eum deleniti sit explicabo culpa, voluptas saepe.</p>
              </div>
              {/* Chef Marc */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                <img src="/images/chef-marc.jpg" alt="Chef Marc" className="w-full h-64 object-cover rounded-lg mb-4" />
                <h3 className="text-3xl font-semibold mb-2">Chef Marc</h3>
                <p className="text-gray-300 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Repudandae repellendus enim velit consequatur nemo, porro inventore dignissimos atque laboriosam aspernatur eum deleniti sit explicabo culpa, voluptas saepe.</p>
              </div>
              {/* Chef Gema */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                <img src="/images/chef-gema.jpg" alt="Chef Gema" className="w-full h-64 object-cover rounded-lg mb-4" />
                <h3 className="text-3xl font-semibold mb-2">Chef Gema</h3>
                <p className="text-gray-300 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Repudandae repellendus enim velit consequatur nemo, porro inventore dignissimos atque laboriosam aspernatur eum deleniti sit explicabo culpa, voluptas saepe.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Integrate the reusable ContactSection component */}
        <Contact />
      </Layout>
    </>
  );
}
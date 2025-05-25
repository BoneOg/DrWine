import Layout from '@/components/layout';
import { Head } from '@inertiajs/react';
import ContactSection from '@/components/Contact';

export default function About() {
  return (
    <>
      <Head title="About Us" />

      <Layout>
        {/* Hero Section with images and text */}
        <section
          className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat text-white py-16 md:py-20 lg:py-24" // Added responsive vertical padding
          style={{ backgroundImage: "url('/assets/about-page-bg.jpg')" }}
        >
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black opacity-75"></div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"> {/* Adjusted horizontal padding for smaller screens */}
            {/* About Us Title - centered */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-10 md:mb-12 lg:mb-16 font-[Cardo] pt-8 md:pt-12 lg:pt-16"> {/* Adjusted bottom and top margins for better spacing */}
              About Us
            </h1>

            {/* Content row - images on left, text on right */}
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-12 xl:gap-16"> {/* Adjusted gaps */}
              {/* Images container - left side */}
              <div className="w-full lg:w-1/2 relative flex justify-center items-center h-[300px] sm:h-[400px] md:h-[500px] lg:h-[400px] xl:h-[500px] mb-8 lg:mb-0"> {/* Flex for centering, responsive height, bottom margin for mobile */}
                {/* Main food image - responsive width and max-width */}
                <img
                  src="/assets/about-food.jpg"
                  alt="Delicious food"
                  className="w-4/5 sm:w-3/5 md:w-1/2 lg:w-4/5 max-w-sm mx-auto rounded-none shadow-lg object-contain h-full" // Adjusted width, max-width, and added object-contain for better scaling
                />
                {/* Overlapping drink image - responsive positioning and size */}
                <img
                  src="/assets/about-drink.jpg"
                  alt="Refreshing drink"
                  className="absolute right-0 top-1/2 w-2/5 sm:w-1/3 md:w-1/4 lg:w-2/5 max-w-[150px] sm:max-w-[200px] md:max-w-[250px] transform -translate-y-1/2 rounded-none shadow-xl" // Adjusted width and max-width for responsiveness
                />
              </div>

              {/* Text content - right side with increased spacing */}
              <div className="w-full lg:w-1/2 text-base sm:text-lg leading-relaxed text-center lg:text-left px-4 sm:px-0 lg:pl-10 xl:pl-16"> {/* Adjusted base text size, text alignment, and horizontal padding */}
                <p className="mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudlandae repellendus enim velit consequatur nemo, porro inventore dignissimos, atque laboriosam aspernatur eum deleniti sit explicabo culpa, voluptas saepe.
                </p>
                <p>
                  Voluptates, exercitationem, est. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudlandae repellendus enim velit consequatur nemo, porro inventore dignissimos, atque laboriosam aspernatur eum deleniti sit explicabo culpa, voluptas saepe.
                  Voluptates, exercitationem, est.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Behind the Dishes Section */}
        <section className="bg-black min-h-screen flex items-center px-4 py-16 md:py-20 lg:py-24 text-white"> {/* Added vertical padding */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Adjusted horizontal padding for smaller screens */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-10 md:mb-12 lg:mb-16 font-[Cardo]"> {/* Adjusted font sizes and bottom margin */}
              Behind the Dishes
            </h2>

            {/* Chef Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"> {/* Adjusted gaps */}
              {/* Chef Theo */}
              <div className="bg-none p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                <img src="/assets/chef theo.jpg" alt="Chef Theo" className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-lg mb-4" /> {/* Responsive height */}
                <h3 className="text-2xl sm:text-3xl font-semibold mb-2">Chef Theo</h3> {/* Responsive font size */}
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed px-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Repudandae repellendus enim velit consequatur nemo, porro inventore dignissimos atque laboriosam aspernatur eum deleniti sit explicabo culpa, voluptas saepe.</p> {/* Responsive font size and horizontal padding */}
              </div>

              {/* Chef Marc */}
              <div className="bg-none p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 px-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Repudandae repellendus enim velit consequatur nemo, porro inventore dignissimos atque laboriosam aspernatur eum deleniti sit explicabo culpa, voluptas saepe.</p> {/* Responsive font size and horizontal padding */}
                <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Chef Marc</h3> {/* Responsive font size */}
                <img
                  src="/assets/chef marc.jpg"
                  alt="Chef Marc"
                  className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-lg" // Responsive height
                />
              </div>

              {/* Chef Gema */}
              <div className="bg-none p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                <img src="/assets/chef gema.jpg" alt="Chef Gema" className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-lg mb-4" /> {/* Responsive height */}
                <h3 className="text-2xl sm:text-3xl font-semibold mb-2">Chef Gema</h3> {/* Responsive font size */}
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed px-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Repudandae repellendus enim velit consequatur nemo, porro inventore dignissimos atque laboriosam aspernatur eum deleniti sit explicabo culpa, voluptas saepe.</p> {/* Responsive font size and horizontal padding */}
              </div>
            </div>
          </div>
        </section>

        {/* ContactSection component */}
        <ContactSection />
      </Layout>
    </>
  );
}
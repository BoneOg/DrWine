import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/components/layout'; // Adjust path if needed

// Dummy data for demonstration. In a real app, this would come from props/API.
const menuData = {
    heroImage: '/images/menu-hero-placeholder.jpg', // Placeholder image for menu hero
    sections: [
        {
            name: 'Breakfast',
            // For the Breakfast section, we'll use a specific grid layout
            // The items will be placed into the grid implicitly or explicitly
            items: [
                {
                    name: 'CROQUE-MADAME',
                    description: 'OPEN FACE SANDWICH, CRUSTY SOURDOUGH BREAD, EMMENTAL & GRUYERE BECHAMEL, ORGANIC FREE RANGE EGG, CHARCOAL GRILLED CANADIAN HAM, FRENCH FRIES, MIXED GREEN SALAD',
                    price: 620,
                    image: null // No image
                },
                {
                    name: 'AVOCADO SALMON TARTINE',
                    description: 'OPEN FACE SOURDOUGH, CRUSTY SOURDOUGH BREAD, HOMEMADE NORWEGIAN SALMON GRAVLAX, SMASHED AVOCADO SPREAD, FRESH CHERRY TOMATOES, RADISH, ARUGULA LEAVES, BREAKFAST MARBLE POTATOES',
                    price: 620,
                    image: null // No image
                },
                {
                    name: 'LOBSTER ROLLS',
                    description: 'LOBSTER DRENCHED IN BUTTER, ESPELETTE MAYONNAISE, CHIVES, LUMPISH ROE OVER TOASTED BRIOCHE BUN',
                    price: 1490,
                    image: '/images/lobster-rolls.jpg' // This will be the image on the right, spanning 2 rows
                },
                {
                    name: 'SAVOURY CREPE',
                    description: 'BUCKWHEAT FLOUR CREPE, FOREST HAM, SHITAKE MUSHROOMS, GREEN ASPARAGUS, GRUYERE CHEESE, SERVED WITH DRY VERMOUTH MANCINO SAUCE, SUNNY SIDE UP EGG',
                    price: 520,
                    image: null // No image
                },
            ],
        },
        // For the second 'Breakfast' section that looks identical in Figma
        // You might want to make this dynamic or just copy the section if it's always the same
        {
          name: 'Breakfast 2', // This section will have image on LEFT, text on RIGHT
          items: [
              {
                  name: 'CROQUE-MADAME',
                  description: 'OPEN FACE SANDWICH, CRUSTY SOURDOUGH BREAD, EMMENTAL & GRUYERE BECHAMEL, ORGANIC FREE RANGE EGG, CHARCOAL GRILLED CANADIAN HAM, FRENCH FRIES, MIXED GREEN SALAD',
                  price: 620,
                  image: null
              },
              {
                  name: 'AVOCADO SALMON TARTINE',
                  description: 'OPEN FACE SOURDOUGH, CRUSTY SOURDOUGH BREAD, HOMEMADE NORWEGIAN SALMON GRAVLAX, SMASHED AVOCADO SPREAD, FRESH CHERRY TOMATOES, RADISH, ARUGULA LEAVES, BREAKFAST MARBLE POTATOES',
                  price: 620,
              },
              {
                  name: 'LOBSTER ROLLS', // Re-using name/image for demo, you'd have different data
                  description: 'LOBSTER DRENCHED IN BUTTER, ESPELETTE MAYONNAISE, CHIVES, LUMPISH ROE OVER TOASTED BRIOCHE BUN',
                  price: 1490,
                  image: '/images/lobster-rolls.jpg' // Image for this section
              },
              {
                  name: 'SAVOURY CREPE',
                  description: 'BUCKWHEAT FLOUR CREPE, FOREST HAM, SHITAKE MUSHROOMS, GREEN ASPARAGUS, GRUYERE CHEESE, SERVED WITH DRY VERMOUTH MANCINO SAUCE, SUNNY SIDE UP EGG',
                  price: 520,
              },
          ],
      },
  ],
};

export default function Menu({ menuSections = menuData.sections }) {
  return (
      <Layout>
          <Head title="Menu - Dr. Wine" />

          {/* Hero Section for Menu */}
          <div
              className="relative w-screen h-[40vh] md:h-[50vh] bg-cover bg-center flex items-center justify-center text-white"
              style={{ backgroundImage: `url(${menuData.heroImage})` }}
          >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <h1 className="z-10 text-6xl md:text-7xl font-serif font-playfair italic text-white uppercase">
                  Menu
              </h1>
          </div>

          {/* Main Menu Content Area */}
          <div className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
              {menuSections.map((section, sectionIndex) => {
                  // Determine the grid layout based on the section name or index
                  const isBreakfast2Section = section.name === 'Breakfast 2';
                  const gridColsClass = isBreakfast2Section
                      ? 'md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr]' // Image Left, Text Right
                      : 'md:grid-cols-[1fr_200px] lg:grid-cols-[1fr_250px]'; // Text Left, Image Right

                  return (
                      <div key={section.name + sectionIndex} className="max-w-4xl mx-auto mb-16">
                          {/* Section Title */}
                          <h2 className="text-4xl font-serif font-playfair text-red-800 text-center mb-10 border-b border-gray-700 pb-4">
                              {section.name.toUpperCase()}
                          </h2>

                          {/* Menu Items Container - Conditional Grid Layout */}
                          <div className={`grid grid-cols-1 ${gridColsClass} gap-x-12 gap-y-10`}>
                              {section.items.map((item, itemIndex) => {
                                  const hasImage = item.image;
                                  const isLobsterRolls = item.name === 'LOBSTER ROLLS'; // Assuming only Lobster Rolls has image for now

                                  // Determine column and justification based on section type
                                  let imageColStart = '';
                                  let textColStart = '';
                                  let imageJustify = '';

                                  if (isBreakfast2Section) {
                                      // For "Breakfast 2": Image on Left (col-start-1), Text on Right (col-start-2)
                                      imageColStart = 'md:col-start-1';
                                      textColStart = 'md:col-start-2';
                                      imageJustify = 'justify-self-start';
                                  } else {
                                      // For "Breakfast" (original): Text on Left (col-start-1), Image on Right (col-start-2)
                                      imageColStart = 'md:col-start-2';
                                      textColStart = 'md:col-start-1';
                                      imageJustify = 'justify-self-end';
                                  }

                                  if (hasImage && isLobsterRolls) { // Only render image if it exists and is Lobster Rolls
                                      return (
                                          <img
                                              key={item.name}
                                              src={item.image}
                                              alt={item.name}
                                              className={`
                                                  w-full h-[300px] object-cover rounded-lg shadow-lg
                                                  ${imageColStart} md:row-start-1 md:row-span-2 md:w-[200px] lg:w-[250px]
                                                  ${imageJustify} mt-4 md:mt-0
                                              `}
                                          />
                                      );
                                  } else {
                                      // Render text items in the appropriate column
                                      return (
                                          <div key={item.name} className={`${textColStart} flex flex-col gap-2`}>
                                              <div className="flex justify-between items-baseline">
                                                  <h3 className="text-xl font-sans font-montserrat font-semibold text-yellow-400">
                                                      {item.name}
                                                  </h3>
                                                  <span className="text-xl font-roboto text-gray-300 ml-4">
                                                      ₱{item.price}
                                                  </span>
                                              </div>
                                              <p className="text-sm font-roboto leading-relaxed text-gray-400">
                                                  {item.description}
                                              </p>
                                          </div>
                                      );
                                  }
                              })}
                          </div>
                      </div>
                  );
              })}
          </div>
      </Layout>
  );
}
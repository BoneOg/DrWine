import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/components/layout';

const menuData = {
    categories: [
        { name: 'Food Menu', key: 'foodMenu' },
        { name: 'Breakfast', key: 'breakfast' },
        { name: 'Lunch', key: 'lunch' },
        { name: 'Wine', key: 'wine' },
        { name: 'Seafood Platter', key: 'seafoodPlatter' },
    ],
    sections: {
        breakfast: {
            description: '(All inclusive of coffee or tea)',
            subsections: [
                {
                    name: 'Les Oeufs (Eggs)',
                    items: [
                        { name: 'American Breakfast', description: 'Two eggs any style with bacon, sausage, and toast', price: 640.00 },
                        { name: 'Oeufs Benedictines', description: 'Poached eggs on English muffin with hollandaise sauce', price: 520.00 },
                        { name: 'Omelette', description: 'Three egg omelette with your choice of fillings', price: 620.00 },
                    ],
                    image: '/assets/menu-egg.jpg',
                    imagePosition: 'right',
                },
                {
                    name: 'Tartines etc',
                    items: [
                        { name: 'Croque-Madame', description: 'Classic French sandwich with ham, cheese, and fried egg', price: 620.00 },
                        { name: 'Avocado Salmon Tartine', description: 'Smashed avocado with smoked salmon on sourdough', price: 620.00 },
                        { name: 'Lobster Rolls', description: 'Fresh lobster with herbs and butter on brioche', price: 1490.00 },
                    ],
                    image: '/assets/menu-tartine1.jpg',
                    imagePosition: 'left',
                },
                {
                    name: 'Dr. Sweet',
                    items: [
                        { name: 'Tres Chocolate Waffles', description: 'Fluffy waffles with rich chocolate sauce and fresh berries.', price: 490.00 },
                        { name: 'Fluffy Pancake', description: 'Golden brown pancakes served with maple syrup and butter.', price: 450.00 },
                        { name: 'Fresh Croissant Toast Suzette', description: 'Buttery croissant French toast with zesty orange Suzette sauce.', price: 450.00 },
                    ],
                    image: '/assets/menu-drsweet.jpg',
                    imagePosition: 'right',
                },
                {
                    name: 'Agahan in Dr. Wine',
                    items: [
                        { name: 'Tapa Rice Bowl', description: 'Marinated beef tapa served with garlic rice and fried egg.', price: 495.00 },
                        { name: 'Pork Rice Bowl', description: 'Savory pork adobo flakes with garlic rice and pickled vegetables.', price: 495.00 },
                        { name: 'Daing Pompano Fresh', description: 'Crispy fried pompano fish with vinegar dip and garlic rice.', price: 495.00 },
                    ],
                    image: '/assets/menu-tapa.jpg',
                    imagePosition: 'left',
                },
            ],
        },
        lunch: {
            description: '(all inclusive of coffee, juice, or tea)',
            priceOptions: '2 Course - 790.00 Php | 3 Course - 890.00 PHP',
            subsections: [
                {
                    name: 'Appetizer',
                    items: [
                        { name: 'Beetroot Carpaccio', description: 'Thinly sliced beetroot with goat cheese and walnuts.' },
                        { name: 'Zucchini Veloute', description: 'Creamy zucchini soup with a hint of fresh herbs.' },
                        { name: 'Mushroom Fricassee Tartine', description: 'Wild mushrooms in a rich cream sauce on toasted sourdough.' },
                    ],
                    image: '/assets/menu-appetizer.avif',
                    imagePosition: 'right',
                },
                {
                    name: 'Main Course',
                    items: [
                        { name: 'Pan-seared White Snapper', description: 'Fresh snapper fillet with lemon butter sauce and seasonal vegetables.' },
                        { name: 'Steak Frites "Dr. Wine Style"', description: 'Grilled steak with crispy frites and Dr. Wine\'s special sauce.' },
                        { name: 'Roasted Cauliflower Steak', description: 'Hearty roasted cauliflower with a smoky paprika glaze.' },
                    ],
                    image: '/assets/menu-main-course.jpg',
                    imagePosition: 'left',
                },
                {
                    name: 'Dessert',
                    items: [
                        { name: 'Vile Flottante', description: 'Light meringue "floating island" on a bed of creme anglaise.' },
                    ],
                    image: '/assets/menu-flotantte.jpg',
                    imagePosition: 'right',
                },
            ],
        },
        wine: {
            subsections: [
                {
                    name: 'White Wines',
                    items: [
                        { name: 'Pelissero Moscato D`Asti, Moscato (Sweet Wine)', description: 'Aromatic and sweet with notes of peach and orange blossom.', price: 500.00 },
                        { name: 'Domaine De Mauperthuis, Petit Chablis, Chardonnay', description: 'Crisp and dry with mineral notes and a hint of green apple.', price: 550.00 },
                        { name: 'E. Guigal, Viognier | Roussanne | Marsanne | Clairette', description: 'Full-bodied with stone fruit aromas and a creamy finish.', price: 520.00 },
                    ],
                    image: '/assets/white-wine.png',
                    imagePosition: 'right',
                },
                {
                    name: 'Red Wines',
                    items: [
                        { name: 'Bread & Butter, Cabernet Sauvignon', description: 'Bold and rich with dark fruit flavors and a hint of vanilla.', price: 550.00 },
                        { name: 'Finca El Origen Single Vineyard Grand Reserva, Malbec', description: 'Deep and intense with plum and chocolate notes.', price: 550.00 },
                        { name: 'Map Maker, Pinot Noir', description: 'Elegant and earthy with red berry fruit and subtle spice.', price: 490.00 },
                    ],
                    image: '/assets/red-wine.png',
                    imagePosition: 'left',
                },
                {
                    name: 'Champagne',
                    items: [
                        { name: 'Moet & Chandon, Pinot Noir | Chardonnay | Pinot Meunier', description: 'Classic and celebratory with bright fruit and brioche notes.', price: { '750ml': 6500.00, '1500ml': 14000.00, '3000ml': 50000.00 } },
                        { name: 'Duval Leroy, Pinot Noir | Chardonnay | Pinot Meunier', description: 'Elegant and structured with fine bubbles and a fresh finish.', price: { '750ml': 5900.00, '1500ml': 10800.00 } },
                        { name: 'Veuve Clicquot Yellow Label, Pinot Noir | Chardonnay | Pinot Meunier', description: 'Vibrant and full-bodied with notes of white fruit and vanilla.', price: 7200.00 },
                        { name: 'Ruinart Blanc De Blancs, Chardonnay', description: 'Pure and luminous, made exclusively from Chardonnay grapes.', price: 18000.00 },
                        { name: 'Dom Pérignon, Pinot Noir | Chardonnay | Pinot Meunier', description: 'Prestigious vintage champagne known for complexity and longevity.', price: { '750ml (Vintage 2013)': 29000.00, '1500ml (Vintage 2012)': 55000.00 } },
                    ],
                    image: '/assets/champagne.png',
                    imagePosition: 'right',
                },
            ],
        },
        seafoodPlatter: {
            subsections: [
                {
                    name: 'Seafood Platter on Ice',
                    items: [
                        { name: 'Assorted Fresh Seafood', description: 'A bountiful selection of fresh oysters, prawns, mussels, and more, served on a bed of ice.' },
                        { name: 'Oysters (Half Dozen)', description: 'Freshly shucked oysters, served with mignonette and lemon.' },
                        { name: 'King Prawns (Per Piece)', description: 'Succulent king prawns, perfect for a luxurious treat.' },
                    ],
                    image: '/assets/herosection.png',
                    imagePosition: 'right',
                },
                {
                    name: 'Unlimited Seafood Platter',
                    items: [
                        { name: 'All-You-Can-Eat Selection', description: 'Indulge in an endless array of our finest seafood, prepared to your liking.' },
                    ],
                    image: '/assets/menu-seafood2.jpg',
                    imagePosition: 'left',
                },
            ],
        },
        foodMenu: {
            subsections: [
                {
                    name: 'Deli Counter',
                    items: [
                        { name: 'Jamón Iberico DW Bellota Guijuelo (60gr)', description: 'Exquisite cured ham from acorn-fed Iberian pigs.', price: 1600.00 },
                        { name: 'Mezze Platter (To Share)', description: 'A selection of Mediterranean dips, olives, and warm pita bread.', price: 1190.00 },
                        { name: 'The Doctor\'s Platter (To Share)', description: 'Chef\'s curated selection of cheeses, cold cuts, and accompaniments.', price: 1980.00 },
                        { name: 'Pâté Croûte', description: 'Traditional French pâté baked in a pastry crust.', price: 680.00 },
                        { name: 'Salmon Rillettes', description: 'Light and creamy salmon spread with fresh herbs, served with crostini.', price: 495.00 },
                    ],
                    image: '/assets/deli-counter.jpg',
                    imagePosition: 'right',
                },
                {
                    name: 'Starters',
                    items: [
                        { name: 'Foie Gras Au Torchon', description: 'Luxurious duck foie gras prepared in a classic French torchon style.', price: 490.00 },
                        { name: 'Salmon Trout Duo', description: 'Smoked and fresh salmon trout preparations with dill and capers.', price: 990.00 },
                        { name: 'Baked Brie', description: 'Warm baked brie with honey, nuts, and cranberry compote.', price: 690.00 },
                        { name: 'Pizza Tarte Flambèe', description: 'Thin crust Alsatian pizza with crème fraîche, onions, and bacon.', price: 490.00 },
                        { name: 'Grilled Australian Octopus', description: 'Grilled tender Australian octopus with Mediterranean spices.', price: 890.00 },
                    ],
                    image: '/assets/menu-item1.jpg',
                    imagePosition: 'left',
                },
                {
                    name: 'Salads',
                    items: [
                        { name: 'Sexy Burrata 4.0', description: 'Creamy burrata cheese with heirloom tomatoes, basil, and balsamic glaze.', price: 860.00 },
                        { name: 'Mr. Seguin\'s Goat Cheese Salad 2.0', description: 'Warm goat cheese on toast with mixed greens and honey vinaigrette.', price: 780.00 },
                        { name: 'Salade Cèsar Du Chef', description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan.', price: 480.00 },
                    ],
                    image: '/assets/salad-sexy-buratta.jpg',
                    imagePosition: 'right',
                },
                {
                    name: 'Soups',
                    items: [
                        { name: 'La Soupe À L Oignon Gratinée', description: 'Classic French onion soup with melted Gruyère cheese toast.', price: 590.00 },
                        { name: 'Tiger Prawn Bisque', description: 'Rich and creamy bisque made with roasted tiger prawns.', price: 590.00 },
                        { name: 'Velouté De Champignon', description: 'Velvety mushroom cream soup with truffle oil.', price: 590.00 },
                    ],
                    image: '/assets/menu-soup.jpg',
                    imagePosition: 'left',
                },
                {
                    name: 'Main Course',
                    items: [
                        { name: 'Australian Fresh Rock Lobster Pasta', description: 'Fresh rock lobster tossed in a luxurious pasta with seafood sauce.', price: 2900.00 },
                        { name: 'Filet Mignon Rossini', description: 'Tender filet mignon topped with foie gras and truffle sauce.', price: 2880.00 },
                        { name: 'Airflown Tasmanian Salmon', description: 'Pan-seared Tasmanian salmon with roasted vegetables and lemon-dill sauce.', price: 1280.00 },
                        { name: 'Vegetable Lasagna Maghreb Style', description: 'Layers of fresh pasta with Mediterranean vegetables and rich tomato sauce.', price: 720.00 },
                    ],
                    image: '/assets/about-food.jpg',
                    imagePosition: 'right',
                },
                {
                    name: 'JY Firebrick Open Charcoal Grill',
                    items: [
                        { name: 'Tomahawk 1.5 kg Australian Sir Harry Wagyu MB2-3 (To Share)', description: 'Perfectly grilled Tomahawk steak, ideal for sharing.', price: 9800.00 },
                        { name: 'Grilled Australian Whole Rock Lobster', description: 'Whole grilled rock lobster, seasoned to perfection.', price: 5900.00 },
                        { name: 'Blue Ribbon USDA - Car Ribeye', description: 'Premium USDA Ribeye, grilled to your desired doneness.', price: 2880.00 },
                    ],
                    image: '/assets/lobster.png',
                    imagePosition: 'left',
                },
                {
                    name: 'Dessert',
                    items: [
                        { name: 'Paris Breast', description: 'Classic choux pastry filled with praline cream, shaped like a wheel.', price: 390.00 },
                        { name: 'Crème Brûlée (Vanilla Or Matcha)', description: 'Rich custard with a caramelized sugar topping, available in vanilla or matcha.', price: 350.00 },
                        { name: 'Coulant Au Chocolat', description: 'Warm molten chocolate cake with a gooey center.', price: 350.00 },
                        { name: 'Tarte Tatin Mille-Feuille', description: 'Caramelized apple tart with crispy puff pastry layers.', price: 480.00 },
                        { name: 'Fruit Platter', description: 'A refreshing assortment of seasonal fresh fruits.', price: 550.00 },
                    ],
                    image: '/assets/menu-dessert.jpg',
                    imagePosition: 'right',
                },
            ],
        }
    },
};

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState('foodMenu');
    const currentSection = menuData.sections[activeCategory];

    const MenuSection = ({ section }) => (
        <div className="relative mb-32">
            {/* Section Title */}
            {section.name && (
                <div className="absolute -left-8 top-8 transform -translate-x-full -rotate-90 origin-top-right">
                    <h2 className="text-3xl font-felix text-[#CDAF7B] whitespace-nowrap tracking-wider">
                        {section.name}
                    </h2>
                </div>
            )}

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${
                section.imagePosition === 'right' ? 'lg:grid-flow-col' : 'lg:grid-flow-col-dense'
            }`}>
                {/* Menu Items */}
                <div className="space-y-8 pl-10 lg:pl-10">
                    <div className="bg-black/40 backdrop-blur-sm p-8 rounded-none border border-[#CDAF7B]/20">
                        {section.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="mb-8 last:mb-0 group">
                                <div className="flex items-baseline justify-between">
                                    <h3 className="text-white text-xl font-felix tracking-wide group-hover:text-[#CDAF7B] transition-colors duration-300">
                                        {item.name}
                                    </h3>
                                    <div className="flex-1 mx-4 border-b border-dotted border-[#CDAF7B]/30 group-hover:border-[#CDAF7B] transition-colors duration-300"></div>
                                    {item.price && (
                                        <span className="text-[#CDAF7B] text-lg font-felix whitespace-nowrap">
                                            {typeof item.price === 'object' ? (
                                                Object.entries(item.price).map(([key, value], idx) => (
                                                    <div key={idx} className="text-right">
                                                        <span className="text-sm text-gray-400">{key}</span>
                                                        <span className="ml-2">₱{value.toLocaleString()}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                `₱${item.price.toLocaleString()}`
                                            )}
                                        </span>
                                    )}
                                </div>
                                {item.description && (
                                    <p className="text-gray-400 text-sm mt-2 leading-relaxed font-monts">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section Image */}
                {section.image && (
                    <div className={`${section.imagePosition === 'right' ? 'lg:order-last' : 'lg:order-first'}`}>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-[#CDAF7B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none"></div>
                            <div className="overflow-hidden rounded-none shadow-xl">
                                <img
                                    src={section.image}
                                    alt={section.name}
                                    className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <Layout>
            <Head title="Menu - Dr. Wine" />
            
            {/* Hero Section */}
            <div className="relative h-[50vh] bg-black overflow-hidden">
                <img
                    src="/assets/menu-section-background.png"
                    alt="Menu Hero"
                    className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h1 className="text-7xl font-felix text-white tracking-wider pt-16 mb-4">
                        Our Menu
                    </h1>
                    <div className="w-24 h-[1px] bg-[#CDAF7B]"></div>
                </div>
            </div>

            {/* Menu Categories */}
            <div className="bg-black text-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    {/* Category Navigation */}
                    <nav className="flex justify-center mb-16">
                        <div className="inline-flex items-center space-x-1 p-1 bg-black/50 backdrop-blur-sm rounded-none border border-[#CDAF7B]/20">
                            {menuData.categories.map((category) => (
                                <button
                                    key={category.key}
                                    onClick={() => setActiveCategory(category.key)}
                                    className={`px-6 py-3 text-lg font-felix tracking-wide rounded- transition-all duration-300
                                        ${activeCategory === category.key
                                            ? 'bg-[#CDAF7B] shadow-lg'
                                            : 'text-white hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* Section Content */}
                    <div className="max-w-6xl mx-auto">
                        {currentSection && (
                            <>
                                {currentSection.description && (
                                    <p className="text-center text-[#CDAF7B] text-xl mb-8 font-light italic">
                                        {currentSection.description}
                                    </p>
                                )}
                                {currentSection.priceOptions && (
                                    <div className="text-center mb-16">
                                        <p className="text-2xl font-serif text-white mb-2">Prix Fixe</p>
                                        <p className="text-[#CDAF7B] text-xl font-light">
                                            {currentSection.priceOptions}
                                        </p>
                                    </div>
                                )}
                                {currentSection.subsections.map((subsection, index) => (
                                    <MenuSection key={index} section={subsection} />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
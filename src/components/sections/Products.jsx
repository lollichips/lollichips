import React from 'react';

const products = [
  {
    name: 'Sparkling Sodas',
    description: 'A fizzy, flavorful experience that brings life to any gathering.',
    image: 'https://images.unsplash.com/photo-1623934199716-dc28818a6ec7?auto=format&fit=crop&q=80' // Generic carbonated drink
  },
  {
    name: 'Fruit Juices',
    description: '100% pure, cold-pressed juices made from the finest fruits.',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80'
  },
  {
    name: 'Infused Waters',
    description: 'Light, refreshing, and perfect for keeping you hydrated in style.',
    image: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&q=80'
  },
  {
    name: 'Energy Elixirs',
    description: 'Natural ingredients to energize your body and mind.',
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&q=80'
  }
];

export default function Products() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Premium Collection</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our range of refreshing beverages, crafted with premium ingredients and innovative flavors.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.name} className="group relative overflow-hidden rounded-xl shadow-lg hover-scale">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-200">{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
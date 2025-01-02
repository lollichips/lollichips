import React from 'react';

const features = [
  {
    title: 'Premium Quality',
    desc: 'We use only the finest ingredients, ensuring every sip is perfect.',
    image: 'https://images.unsplash.com/photo-1482012792084-a0c3725f289f?auto=format&fit=crop&q=80'
  },
  {
    title: 'Eco-Friendly',
    desc: 'Committed to sustainable practices and environmental responsibility.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80'
  },
  {
    title: 'Innovation',
    desc: 'Constantly developing new flavors and exciting combinations.',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80'
  },
  {
    title: 'Health Conscious',
    desc: 'Carefully balanced formulas for your well-being.',
    image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&q=80'
  },
  {
    title: 'Local Impact',
    desc: 'Supporting local communities through various initiatives.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80'
  },
  {
    title: 'Customer First',
    desc: 'Your satisfaction is our top priority.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80'
  }
];

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why Choose FizzBurst?</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="group relative overflow-hidden rounded-xl shadow-lg hover-scale">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-200">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
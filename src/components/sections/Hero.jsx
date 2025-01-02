import React from 'react';

export default function Hero() {
  return (
    <section className="hero-gradient relative min-h-screen flex items-center justify-center pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 mix-blend-multiply"></div>
        <img 
          src="https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-8 leading-tight drop-shadow-lg">
            FizzBurst Beverages
            <span className="block text-indigo-200 mt-4">The Spark of Refreshment!</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow mb-12">
            Experience a refreshing explosion of taste with every sip. Our carefully crafted beverages 
            are designed to ignite your senses and elevate your refreshment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })} 
                    className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-colors">
              Explore Our Products
            </button>
            <button onClick={() => document.getElementById('campaign').scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors">
              Join Lucky Draw
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
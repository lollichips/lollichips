import React from 'react';

const steps = [
  {
    title: 'Purchase a Bottle',
    desc: 'Choose your favorite FizzBurst beverage from any store.',
    icon: '🛍️'
  },
  {
    title: 'Find the QR Code',
    desc: 'Look under the bottle cap to discover your unique QR code.',
    icon: '🔍'
  },
  {
    title: 'Scan & Check',
    desc: 'Use your smartphone to scan the code and instantly check if you have won.',
    icon: '📱'
  },
  {
    title: 'Claim Your Prize',
    desc: 'Winners can easily claim their prizes through our secure platform.',
    icon: '🎁'
  }
];

export default function Campaign() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80"
          alt="Campaign Background" 
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Lucky Draw Campaign
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our exciting campaign and stand a chance to win amazing prizes!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover-scale">
              <div className="text-4xl mb-6">{step.icon}</div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xl mb-6">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
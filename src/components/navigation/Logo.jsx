import React from 'react';

export default function Logo({ isScrolled }) {
  return (
    <div className="flex items-center space-x-2">
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center
        ${isScrolled ? 'bg-indigo-600' : 'bg-white'}
      `}>
        <span className={`text-xl font-bold ${isScrolled ? 'text-white' : 'text-indigo-600'}`}>
          F
        </span>
      </div>
      <span className={`
        text-xl font-extrabold tracking-tight
        ${isScrolled ? 'text-indigo-600' : 'text-white'}
        transition-colors duration-300
      `}>
        FizzBurst
      </span>
    </div>
  );
}
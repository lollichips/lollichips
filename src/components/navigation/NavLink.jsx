import React from 'react';

export default function NavLink({ label, onClick, isScrolled }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-md font-medium transition-all duration-300
        ${isScrolled 
          ? 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50' 
          : 'text-white hover:text-white/90 hover:bg-white/10'
        }
      `}
    >
      {label}
    </button>
  );
}
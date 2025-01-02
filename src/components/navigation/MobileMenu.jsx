import React from 'react';
import NavLink from './NavLink';

export default function MobileMenu({ isOpen, navItems, onItemClick, isScrolled }) {
  return (
    <div className={`
      md:hidden transition-all duration-300 overflow-hidden
      ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}
    `}>
      <div className={`
        py-2 space-y-1 rounded-lg shadow-lg
        ${isScrolled ? 'bg-white' : 'bg-gray-900/95 backdrop-blur-sm'}
      `}>
        {navItems.map((item) => (
          <div key={item.id} className="px-2">
            <NavLink
              label={item.label}
              onClick={() => onItemClick(item.id)}
              isScrolled={isScrolled}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
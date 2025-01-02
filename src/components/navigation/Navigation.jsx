import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import NavLink from './NavLink';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';
import { useScrollPosition } from '../../hooks/useScrollPosition';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrollPosition(20);

  const navItems = [
    { id: 'products', label: 'Our Products' },
    { id: 'campaign', label: 'Lucky Draw' },
    { id: 'features', label: 'Why Choose Us' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`
      fixed w-full z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' 
        : 'bg-transparent py-4'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Logo isScrolled={isScrolled} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                label={item.label}
                onClick={() => scrollToSection(item.id)}
                isScrolled={isScrolled}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenuButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              isScrolled={isScrolled}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          navItems={navItems}
          onItemClick={scrollToSection}
          isScrolled={isScrolled}
        />
      </div>
    </nav>
  );
}
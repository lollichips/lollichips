import React, { useState, useEffect } from 'react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'products', label: 'Our Products' },
    { id: 'campaign', label: 'Lucky Draw' },
    { id: 'features', label: 'Why Choose Us' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className={`text-2xl font-extrabold ${
              isScrolled ? 'text-indigo-600' : 'text-gray-900'
            } transition-colors duration-300`}>
              FizzBurst
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  px-4 py-2 rounded-md font-medium transition-all duration-300
                  ${isScrolled 
                    ? 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50' 
                    : 'text-gray-800 hover:text-gray-900 hover:bg-white/10'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
              }`}
            >
              <span className="sr-only">Open menu</span>
              {!isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden transition-all duration-300 overflow-hidden
          ${isMobileMenuOpen ? 'max-h-56 mt-4' : 'max-h-0'}
        `}>
          <div className={`
            py-2 space-y-1 ${isScrolled ? 'bg-white/95 backdrop-blur-sm' : 'bg-transparent'}
          `}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  w-full text-left px-4 py-2 rounded-md font-medium transition-all duration-300
                  ${isScrolled 
                    ? 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50' 
                    : 'text-gray-800 hover:text-gray-900 hover:bg-white/10'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
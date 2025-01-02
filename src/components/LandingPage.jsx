import React from 'react';
import Navigation from './Navigation';
import Hero from './sections/Hero';
import Products from './sections/Products';
import Campaign from './sections/Campaign';
import Features from './sections/Features';
import Footer from './sections/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <div id="products">
        <Products />
      </div>
      <div id="campaign">
        <Campaign />
      </div>
      <div id="features">
        <Features />
      </div>
      <Footer />
    </div>
  );
}
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FizzBurst Beverages</h3>
            <p className="text-gray-400">Refresh your day, one burst at a time!</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">info@fizzburst.com</p>
            <p className="text-gray-400">+251 911 234 567</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            <p className="text-gray-400">Addis Ababa, Ethiopia</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <p className="text-gray-400">Mon-Fri: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-400">Sat: 9:00 AM - 1:00 PM</p>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-400">© 2024 FizzBurst Beverages. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
// Carousel.js
import React from 'react';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image1 from '../../../../assets/image1.jpg';
import image2 from '../../../../assets/image3.jpg';
import image3 from '../../../../assets/image4.jpg';
import image4 from '../../../../assets/image2.avif';

export default function Carousel() {
  return (
    <div className="relative rounded-lg shadow-lg h-auto">
      <ReactCarousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        className="h-auto"
      >
        <div className="relative">
          <img src={image1} alt="Carousel Item 1" className="w-full h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-transparent p-8 flex items-center">
            <div className="text-white max-w-md">
              <h2 className="text-3xl font-bold mb-4">Fruits & Vegetables</h2>
              <p className="mb-4">
                Don’t miss these opportunities... We have prepared special discounts for you on grocery. Get the best quality products at the lowest prices.
              </p>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src={image2} alt="Carousel Item 2" className="w-full h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-transparent p-8 flex items-center">
            <div className="text-white max-w-md">
              <h2 className="text-3xl font-bold mb-4">Beverages</h2>
              <p className="mb-4">
                Don’t miss these opportunities... We have prepared special discounts for you on grocery. Get the best quality products at the lowest prices.
              </p>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src={image3} alt="Carousel Item 3" className="w-full h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-transparent p-8 flex items-center">
            <div className="text-white max-w-md">
              <h2 className="text-3xl font-bold mb-4">Bakery & Dairy</h2>
              <p className="mb-4">
                Don’t miss these opportunities... We have prepared special discounts for you on grocery. Get the best quality products at the lowest prices.
              </p>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src={image4} alt="Carousel Item 4" className="w-full h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-transparent p-8 flex items-center">
            <div className="text-white max-w-md">
              <h2 className="text-3xl font-bold mb-4">Healthcare</h2>
              <p className="mb-4">
                Don’t miss these opportunities... We have prepared special discounts for you on grocery. Get the best quality products at the lowest prices.
              </p>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </ReactCarousel>
    </div>
  );
}

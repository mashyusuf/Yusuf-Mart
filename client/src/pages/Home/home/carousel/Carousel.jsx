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
          <div className="absolute top-0 left-0 w-1/2 p-10 bg-gradient-to-r from-purple-500 to-transparent">
            <span className="text-green-600 font-semibold">Weekend Discount</span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-4">
              Get the best quality products at the lowest prices
            </h2>
            <p className="text-white mb-4">
              We have prepared special discounts for you on grocery products. Don’t miss these opportunities...
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition">
                Shop Now
              </button>
              <div className="text-3xl font-bold text-red-700">
                $27.99 <span className="text-gray-700 line-through text-xl ml-2">$56.67</span>
              </div>
            </div>
            <p className="text-gray-700 text-sm mt-2">Don't miss this limited-time offer.</p>
          </div>
        </div>

        <div className="relative">
          <img src={image2} alt="Carousel Item 2" className="w-full h-96 object-cover" />
          <div className="absolute top-0 left-0 w-1/2 p-10  bg-gradient-to-r from-purple-500 to-transparent">
            <span className="text-green-600 font-semibold">Weekend Discount</span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-4">
              Get the best quality products at the lowest prices
            </h2>
            <p className="text-white mb-4">
              We have prepared special discounts for you on grocery products. Don’t miss these opportunities...
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition">
                Shop Now
              </button>
              <div className="text-3xl font-bold text-red-700">
                $27.99 <span className="text-gray-700 line-through text-xl ml-2">$56.67</span>
              </div>
            </div>
            <p className="text-gray-700 text-sm mt-2">Don't miss this limited-time offer.</p>
          </div>
        </div>

        <div className="relative">
          <img src={image3} alt="Carousel Item 3" className="w-full h-96 object-cover" />
          <div className="absolute top-0 left-0 w-1/2 p-10  bg-gradient-to-r from-purple-500 to-transparent">
            <span className="text-green-600 font-semibold">Weekend Discount</span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-4">
              Get the best quality products at the lowest prices
            </h2>
            <p className="text-white mb-4">
              We have prepared special discounts for you on grocery products. Don’t miss these opportunities...
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition">
                Shop Now
              </button>
              <div className="text-3xl font-bold text-red-700">
                $27.99 <span className="text-gray-700 line-through text-xl ml-2">$56.67</span>
              </div>
            </div>
            <p className="text-gray-700 text-sm mt-2">Don't miss this limited-time offer.</p>
          </div>
        </div>

        <div className="relative">
          <img src={image4} alt="Carousel Item 4" className="w-full h-96 object-cover" />
          <div className="absolute top-0 left-0 w-1/2 p-8  bg-opacity-80">
            <span className="text-green-600 font-semibold">Weekend Discount</span>
            <h2 className="text-4xl font-bold text-purple-700 mt-4 mb-4">
              Get the best quality products at the lowest prices
            </h2>
            <p className="text-gray-700 mb-4">
              We have prepared special discounts for you on grocery products. Don’t miss these opportunities...
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition">
                Shop Now
              </button>
              <div className="text-3xl font-bold text-red-500">
                $27.99 <span className="text-gray-500 line-through text-xl ml-2">$56.67</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-2">Don't miss this limited-time offer.</p>
          </div>
        </div>
      </ReactCarousel>
    </div>
  );
}

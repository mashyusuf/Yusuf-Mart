import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';
import appstoreImg from '../../../assets/app (1).png';
import googleStoreImg from '../../../assets/google.png';

export default function Footer() {
  return (
    <footer className="bg-gray-100 p-8">
      {/* Newsletter section */}
      <div className="max-w-7xl mx-auto text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-gray-300">
          <h2 className="text-lg font-semibold mb-4 md:mb-0">
            Join our newsletter for £10 offs
          </h2>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring focus:border-blue-400"
            />
            <button className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700">
              SEND
            </button>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 py-8 text-sm">
        <div>
          <h3 className="font-semibold mb-4">Do You Need Help?</h3>
          <p>Autobusesen syg. Nek fenadra fibonoma. Nár snijod kynodra nyst. Pressa fibonoma.</p>
          <p className="mt-2">
            <span className="font-semibold">Monday-Friday:</span> 9am-5pm
          </p>
          <p>0800-300-353</p>
          <p className="mt-2">info@example.com</p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Make Money with Us</h3>
          <ul>
            <li><a href="#" className="hover:text-purple-600">Sell on Grogin</a></li>
            <li><a href="#" className="hover:text-purple-600">Sell Your Services on Grogin</a></li>
            <li><a href="#" className="hover:text-purple-600">Sell on Grogin Business</a></li>
            <li><a href="#" className="hover:text-purple-600">Become an Affiliate</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Let Us Help You</h3>
          <ul>
            <li><a href="#" className="hover:text-purple-600">Accessibility Statement</a></li>
            <li><a href="#" className="hover:text-purple-600">Your Orders</a></li>
            <li><a href="#" className="hover:text-purple-600">Returns & Replacements</a></li>
            <li><a href="#" className="hover:text-purple-600">Terms and Conditions</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Get to Know Us</h3>
          <ul>
            <li><a href="#" className="hover:text-purple-600">Careers for Grogin</a></li>
            <li><a href="#" className="hover:text-purple-600">Investor Relations</a></li>
            <li><a href="#" className="hover:text-purple-600">Grogin Devices</a></li>
            <li><a href="#" className="hover:text-purple-600">Social Responsibility</a></li>
          </ul>
        </div>
      </div>

      {/* App Download Links and Social Media */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-8 border-t border-gray-300">
        <div className="flex items-center space-x-4">
          <a href="#"><img src={googleStoreImg} alt="Google Play" className="h-12" /></a>
          <a href="#"><img src={appstoreImg} alt="App Store" className="h-12" /></a>
        </div>
        <div className="mt-4 md:mt-0">
          <h3 className="font-semibold mb-2">Follow us on social media:</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-500"><FaFacebook size={20} /></a>
            <a href="#" className="text-blue-400"><FaTwitter size={20} /></a>
            <a href="#" className="text-blue-600"><FaLinkedin size={20} /></a>
            <a href="#" className="text-pink-600"><FaInstagram size={20} /></a>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-200 py-4 text-center text-xs text-gray-500">
        <h3 className="font-semibold mb-2">We accept:</h3>
        <div className="flex justify-center space-x-4">
          <FaCcVisa size={24} className="text-blue-500" />
          <FaCcPaypal size={24} className="text-blue-400" />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-200 text-center py-4 text-xs text-gray-500">
        <p>Copyright © 2024 @store WooCommerce WordPress Theme. All rights reserved. Powered by Blackfire Themes.</p>
      </div>
    </footer>
  );
}

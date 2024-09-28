import React, { useState } from 'react';
import { FaHeart, FaUserAlt, FaShoppingCart, FaSearch, FaMapMarkerAlt, FaBars } from 'react-icons/fa';
import logo from '../../../assets/logo.png'; // Use a fake logo image or replace with your own logo
import { IoSearchOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { FaUserSecret } from "react-icons/fa6";
import { Link } from 'react-router-dom';
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white shadow-md">
      {/* Main Section: Logo, Delivery, Search Bar, and Icons */}
      <div className="flex justify-between items-center px-4 py-4">
        {/* Logo and Delivery on Left */}
        <div className="flex items-center lg:w-1/4 md:w-1/4 w-1/2">
          <Link to={'/'}><img src={logo} alt="Logo" className="w-20 h-16" /></Link>
          <div className="hidden md:flex items-center ml-4">
            <FaMapMarkerAlt className="text-gray-700 mr-2" />
            <span className="text-sm">Deliver to all</span>
          </div>
        </div>

        {/* Search Bar in Center */}
        <div className="hidden md:flex items-center lg:w-2/4 md:w-2/4 w-full">
          <input
            type="text"
            className="border rounded-md w-full p-2"
            placeholder="Search for products, categories, or brands..."
          />
          <IoSearchOutline className="ml-2 text-black text-xl cursor-pointer" />
        </div>

        {/* Icons on Right */}
        <div className="flex items-center lg:w-1/4 md:w-1/4 w-1/2 justify-end space-x-4">
          <Link to={'/login'}>
          <div className="flex items-center space-x-2">
            <FaUserSecret className="text-xl text-gray-700 cursor-pointer" />
            <span className="text-sm cursor-pointer">Sign In<br />Account</span>
          </div>
          </Link>
          <FiHeart className="text-xl text-gray-700 cursor-pointer" />
          <FaShoppingCart className="text-xl text-gray-700 cursor-pointer" />
          {/* Menu icon for small devices */}
          <FaBars className="text-2xl lg:hidden cursor-pointer" onClick={toggleMenu} />
        </div>
      </div>

      {/* Responsive Search Bar for Small Devices */}
      <div className="flex md:hidden items-center px-4 pb-2">
        <input
          type="text"
          className="border rounded-md w-full p-2"
          placeholder="Search for products, categories, or brands..."
        />
        <IoSearchOutline className="ml-2 text-gray-500 text-xl cursor-pointer" />
      </div>

      {/* Responsive Menu Section for Small Devices */}
      {isMenuOpen && (
        <div className="bg-white lg:hidden">
          <ul className="p-4 space-y-2">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/fruits-vegetables">Fruits & Vegetables</Link></li>
            <li><Link to="/beverages">Beverages</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/trending">Trending Products</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
}

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaCarrot, FaWineGlassAlt, FaNewspaper, FaPhoneAlt, FaHotjar } from 'react-icons/fa';
import { ActiveLinkContext } from '../../../activeLink/ActiveLink';

export default function Pages() {
  const { activeLink, setActiveLink } = useContext(ActiveLinkContext);

  const handleClick = (linkName) => {
    setActiveLink(linkName); // Update active link globally on click
  };

  const linkClasses = (linkName) =>
    activeLink === linkName
      ? 'text-orange-600 font-extrabold scale-100' // Active link: orange color, bold
      : 'text-gray-700 hover:text-purple-600 hover:scale-105 transition-transform duration-200'; // Normal link: gray, hover purple

  return (
    <div>
      {/* Navigation Links with Icons */}
      <div className="hidden lg:flex justify-between pb-4">
        <Link 
          to="/" 
          className={`flex items-center ${linkClasses('home')}`} 
          onClick={() => handleClick('home')}
        >
          <FaHome className="mr-2" /> Home
        </Link>
        <Link 
          to="/shop" 
          className={`flex items-center ${linkClasses('shop')}`} 
          onClick={() => handleClick('shop')}
        >
          <FaShoppingBag className="mr-2" /> Shop
        </Link>
        <Link 
          to="/fruits-vegetables" 
          className={`flex items-center ${linkClasses('fruits-vegetables')}`} 
          onClick={() => handleClick('fruits-vegetables')}
        >
          <FaCarrot className="mr-2" /> Fruits & Vegetables
        </Link>
        <Link 
          to="/beverages" 
          className={`flex items-center ${linkClasses('beverages')}`} 
          onClick={() => handleClick('beverages')}
        >
          <FaWineGlassAlt className="mr-2" /> Beverages
        </Link>
        <Link 
          to="/blog" 
          className={`flex items-center ${linkClasses('blog')}`} 
          onClick={() => handleClick('blog')}
        >
          <FaNewspaper className="mr-2" /> Blog
        </Link>
        <Link 
          to="/contact" 
          className={`flex items-center ${linkClasses('contact')}`} 
          onClick={() => handleClick('contact')}
        >
          <FaPhoneAlt className="mr-2" /> Contact
        </Link>
      </div>
    </div>
  );
}

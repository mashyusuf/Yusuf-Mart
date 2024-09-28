import React, { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { FaCarrot, FaFish, FaBreadSlice, FaCoffee, FaFirstAid, FaHome, FaBaby } from 'react-icons/fa';
import Carousel from '../../Home/home/carousel/Carousel';
import { Link } from 'react-router-dom';
import { MdOutlinePets } from "react-icons/md";
import { GiFrozenOrb } from "react-icons/gi";
import { GiPopcorn } from "react-icons/gi";
import Pages from '../Pages/Pages';
export default function CategorySection({ onSelectCategory }) {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 640);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(true);

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 640);
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const toggleCategoriesVisibility = () => {
    setIsCategoriesVisible(prev => !prev);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row container mx-auto">
      {/* Sidebar with Categories */}
      <div className={`w-full lg:w-1/4 bg-gray-100 py-4 ${isMobileView ? 'block' : 'hidden lg:block'}`}>
        {isMobileView ? (
          <Menu>
            <MenuButton
              onClick={toggleMenu}
              className="flex justify-between items-center rounded-md border-2 border-purple-400 py-1.5 px-3 text-sm font-semibold text-black shadow-inner focus:outline-none w-full"
            >
              All Categories
              {isMenuOpen ? (
                <ChevronUpIcon className="h-5 w-5 text-black/60" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-black/60" />
              )}
            </MenuButton>
            <MenuItems className={`mt-2 w-full origin-top-right rounded-md border border-gray-200 bg-white shadow-lg ${isMenuOpen ? 'block' : 'hidden'}`}>
              {[
                { icon: <FaCarrot className="text-orange-500" />, label: "Fruits and Vegetables" },
                { icon: <FaFish className="text-purple-500" />, label: "Meats and Seafood" },
                { icon: <FaBreadSlice className="text-yellow-500" />, label: "Bakery and Dairy" },
                { icon: <FaCoffee className="text-brown-500" />, label: "Beverages" },
                { icon: <FaFirstAid className="text-red-500" />, label: "Healthcare" },
                { icon: <FaHome className="text-green-500" />, label: "Household Needs" },
                { icon: <FaBaby className="text-pink-500" />, label: "Baby and Pregnancy" },
                { icon: <MdOutlinePets className="text-black" />, label: "Pet Supplies" },
                { icon: <GiFrozenOrb className="text-sky-500" />, label: "Frozen Foods" },
                { icon: <GiPopcorn className="text-yellow-500" />, label: "Snacks and Confectionery" }
              ].map((item, index) => (
                <MenuItem key={index}>
                  <div className="flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer text-purple-600">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        ) : (
          <div>
            <div className="flex justify-between items-center">
              <button
                onClick={toggleCategoriesVisibility}
                className="text-lg font-bold border-2 px-6 rounded-md py-2 border-purple-400 flex items-center space-x-2"
              >
                <span>All Categories</span>
                <ChevronDownIcon className={`h-5 w-5 ${isCategoriesVisible ? 'transform rotate-180' : ''}`} />
              </button>
            </div>
            {/* Sidebar categories for medium and large devices */}
            <ul className={`mt-2 space-y-0 ${isCategoriesVisible ? 'block' : 'hidden'}`}>
              {[
                { icon: <FaCarrot className="text-orange-500" />, label: "Fruits and Vegetables" },
                { icon: <FaFish className="text-purple-500" />, label: "Meats and Seafood" },
                { icon: <FaBreadSlice className="text-yellow-500" />, label: "Bakery and Dairy" },
                { icon: <FaCoffee className="text-brown-500" />, label: "Beverages" },
                { icon: <FaFirstAid className="text-red-500" />, label: "Healthcare" },
                { icon: <FaHome className="text-green-500" />, label: "Household Needs" },
                { icon: <FaBaby className="text-pink-500" />, label: "Baby and Pregnancy" },
                { icon: <MdOutlinePets className="text-black" />, label: "Pet Supplies" },
                { icon: <GiFrozenOrb className="text-sky-500" />, label: "Frozen Foods" },
                { icon: <GiPopcorn className="text-yellow-500" />, label: "Snacks and Confectionery" }
              ].map((item, index) => (
                <li key={index} className="flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer text-purple-600" onClick={() => onSelectCategory(item.label)}>
                  {item.icon}
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Carousel Section */}
      <div className="w-full lg:w-3/4 p-4">
        <Pages />
        <Carousel />
      </div>
    </div>
  );
}

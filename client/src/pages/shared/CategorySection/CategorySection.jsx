import React, { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { FaCarrot, FaFish, FaBreadSlice, FaCoffee, FaFirstAid, FaHome, FaBaby } from 'react-icons/fa';
import Carousel from '../../Home/home/carousel/Carousel';

export default function CategorySection() {
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
      <div
        className={`w-full lg:w-1/4 bg-gray-100 p-4 ${isMobileView ? 'block' : 'hidden lg:block'}`}
      >
        {isMobileView ? (
          <>
            <Menu>
              <MenuButton
                onClick={toggleMenu}
                className="inline-flex justify-between w-full items-center rounded-md border-2 border-purple-400 py-1.5 px-3 text-sm font-semibold text-black shadow-inner focus:outline-none"
              >
                All Categories
                {isMenuOpen ? (
                  <ChevronUpIcon className="h-5 w-5 text-black/60" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-black/60" />
                )}
              </MenuButton>
              <MenuItems
                className={`mt-2 w-full origin-top-right rounded-md border border-gray-200 bg-white shadow-lg ${isMenuOpen ? 'block' : 'hidden'}`}
              >
                <MenuItem>
                  <div className="flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer text-purple-600">
                    <FaCarrot className="text-orange-500" />
                    <span>Fruits & Vegetables</span>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className="flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer text-purple-600">
                    <FaFish className="text-blue-500" />
                    <span>Meats & Seafood</span>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className="flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer text-purple-600">
                    <FaBreadSlice className="text-yellow-500" />
                    <span>Bakery & Dairy</span>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className="flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer text-purple-600">
                    <FaCoffee className="text-brown-500" />
                    <span>Beverages</span>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className="flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer text-purple-600">
                    <FaFirstAid className="text-red-500" />
                    <span>Healthcare</span>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className="flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer text-purple-600">
                    <FaHome className="text-green-500" />
                    <span>Household Needs</span>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className="flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer text-purple-600">
                    <FaBaby className="text-pink-500" />
                    <span>Baby & Pregnancy</span>
                  </div>
                </MenuItem>
              </MenuItems>
            </Menu>
          </>
        ) : (
          <>
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
            <ul className={`mt-4 space-y-2 ${isCategoriesVisible ? 'block' : 'hidden'}`}>
              <li className="hover:bg-gray-200 p-2 rounded-md cursor-pointer flex items-center space-x-2 text-purple-600">
                <FaCarrot className="text-orange-500" />
                <span>Fruits & Vegetables</span>
              </li>
              <li className="hover:bg-gray-200 p-2 rounded-md cursor-pointer flex items-center space-x-2 text-purple-600">
                <FaFish className="text-blue-500" />
                <span>Meats & Seafood</span>
              </li>
              <li className="hover:bg-gray-200 p-2 rounded-md cursor-pointer flex items-center space-x-2 text-purple-600">
                <FaBreadSlice className="text-yellow-500" />
                <span>Bakery & Dairy</span>
              </li>
              <li className="hover:bg-gray-200 p-2 rounded-md cursor-pointer flex items-center space-x-2 text-purple-600">
                <FaCoffee className="text-brown-500" />
                <span>Beverages</span>
              </li>
              <li className="hover:bg-gray-200 p-2 rounded-md cursor-pointer flex items-center space-x-2 text-purple-600">
                <FaFirstAid className="text-red-500" />
                <span>Healthcare</span>
              </li>
              <li className="hover:bg-gray-200 p-2 rounded-md cursor-pointer flex items-center space-x-2 text-purple-600">
                <FaHome className="text-green-500" />
                <span>Household Needs</span>
              </li>
              <li className="hover:bg-gray-200 p-2 rounded-md cursor-pointer flex items-center space-x-2 text-purple-600">
                <FaBaby className="text-pink-500" />
                <span>Baby & Pregnancy</span>
              </li>
            </ul>
          </>
        )}
      </div>

      {/* Carousel Section */}
      <div className="w-full lg:w-3/4 p-4">
        <Carousel />
      </div>
    </div>
  );
}

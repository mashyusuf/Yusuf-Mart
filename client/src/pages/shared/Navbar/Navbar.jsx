import React, { useContext, useState, useEffect } from "react";
import { GiTechnoHeart } from "react-icons/gi";
import {
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaUserSecret,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../../../assets/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { authContext } from "../../../providers/AuthProviders";
import useAddToCart from "../../../hooks/useAddToCart";
import useAddToHeart from "../../../hooks/useAddToHeart";
import "./nav.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(authContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const navigate = useNavigate();
  const [cartItem] = useAddToCart();
  const [heartItem] = useAddToHeart();

  // Handle scroll event to fix the navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarFixed(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const handleModalToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/shop?search=${searchQuery}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={`bg-white shadow-md mb-4 ${
        isNavbarFixed ? "fixed top-0 w-full z-50" : ""
      } transition-all duration-300`}
    >
      <div className="flex justify-between items-center px-4 py-4">
        <div className="flex items-center lg:w-1/4 md:w-1/4 w-1/2">
          <Link to={"/"}>
            <img src={logo} alt="Logo" className="w-20 h-16" />
          </Link>
          <div className="hidden md:flex items-center ml-4">
            <FaMapMarkerAlt className="text-gray-700 mr-2" />
            <div className="text-sm overflow-hidden relative">
              Deliver to all
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center lg:w-2/4 md:w-2/4 w-full">
          <input
            type="text"
            className="border rounded-md w-full p-2"
            placeholder="Search for products, categories, or brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <IoSearchOutline
            className="ml-2 text-black text-xl cursor-pointer"
            onClick={handleSearch}
          />
        </div>

        {/* User Icons */}
        <div className="flex items-center lg:w-1/4 md:w-1/4 w-1/2 justify-end space-x-10">
          {user ? (
            <div
              onClick={handleLogout}
              className="flex items-center space-x-1 cursor-pointer"
            >
              <FaUserSecret className="text-xl text-gray-700 hover:scale-105 hover:text-orange-600" />
              <span className="text-sm text-gray-700 hover:text-orange-600 hover:font-extrabold">
                Logout
              </span>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-1 cursor-pointer"
            >
              <FaUserSecret className="text-xl text-gray-700 hover:scale-105 hover:text-orange-600" />
              <span className="text-sm text-gray-700 hover:text-orange-600 hover:font-extrabold">
                Sign In
                <br />
                Account
              </span>
            </Link>
          )}

          {/* Heart Icon */}
          <div className="relative">
            <button
              className={`relative ${heartItem.length > 0 ? "icon-pulse" : ""}`}
            >
              <GiTechnoHeart
                className={`text-2xl cursor-pointer ${
                  heartItem.length > 0
                    ? "text-red-500"
                    : "text-gray-700 hover:text-red-500"
                } transition-all duration-500`}
              />
              <div className="absolute -top-1 -right-2 bg-purple-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {heartItem.length}
              </div>
            </button>
          </div>

          {/* Cart Icon */}
          <div className="relative">
            <button
              className={`relative ${cartItem.length > 0 ? "icon-pulse" : ""}`}
            >
              <FaShoppingCart
                className={`text-2xl cursor-pointer ${
                  cartItem.length > 0
                    ? "text-gray-700 hover:text-green-600"
                    : "text-gray-700 hover:text-green-500"
                } transition-all duration-500`}
              />
              <div className="absolute -top-1 -right-2 bg-purple-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartItem.length}
              </div>
            </button>
          </div>
          {/* Mobile Menu */}

          <div
            tabIndex={0}
            role="button"
            onClick={handleModalToggle}
            className="btn btn-ghost lg:hidden"
          >
            <AiOutlineMenuUnfold className="h-6 w-6 text-gray-700" />{" "}
            {/* Updated with React Icon */}
          </div>

          {/* Modal */}
          {isOpen && (
            <div
              className="fixed inset-0 z-50 bg-black bg-opacity-30"
              onClick={handleClose} // Close modal when clicking outside
            >
              {/* Menu Content */}
              <div
                className="fixed left-0 top-0 h-full w-64 bg-gradient-to-r from-purple-600 to-purple-400 shadow-lg p-5 transition-transform transform translate-x-0"
                onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside the menu
              >
                {/* Close Button */}
                <button
                  className="text-white font-bold text-xl absolute top-5 right-5"
                  onClick={handleModalToggle}
                >
                  &times;
                </button>

                {/* Menu Items */}
                <ul className="menu p-4 space-y-4 text-white">
                  <li>
                    <Link
                      to="/"
                      className="menu-item text-lg hover:text-gray-200"
                    >
                      🏠 Home
                    </Link>
                  </li>
                  <hr className="menu-divider border-gray-400" />
                  <li>
                    <Link
                      to="/shop"
                      className="menu-item text-lg hover:text-gray-200"
                    >
                      🛒 Shop
                    </Link>
                  </li>
                  <hr className="menu-divider border-gray-400" />
                  <li>
                    <Link
                      to="/fruits-vegetables"
                      className="menu-item text-lg hover:text-gray-200"
                    >
                      🍎 Fruits & Vegetables
                    </Link>
                  </li>
                  <hr className="menu-divider border-gray-400" />
                  <li>
                    <Link
                      to="/beverages"
                      className="menu-item text-lg hover:text-gray-200"
                    >
                      🥤 Beverages
                    </Link>
                  </li>
                  <hr className="menu-divider border-gray-400" />
                  <li>
                    <Link
                      to="/blog"
                      className="menu-item text-lg hover:text-gray-200"
                    >
                      📖 Blog
                    </Link>
                  </li>
                  <hr className="menu-divider border-gray-400" />
                  <li>
                    <Link
                      to="/contact"
                      className="menu-item text-lg hover:text-gray-200"
                    >
                      📞 Contact
                    </Link>
                  </li>
                  <hr className="menu-divider border-gray-400" />
                  <li>
                    <Link
                      to="/trending"
                      className="menu-item text-lg hover:text-gray-200"
                    >
                      🔥 Trending Products
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="flex md:hidden items-center px-4 pb-2">
        <input
          type="text"
          className="border rounded-md w-full p-2"
          placeholder="Search for products, categories, or brands..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <IoSearchOutline
          className="ml-2 text-gray-500 text-xl cursor-pointer"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}

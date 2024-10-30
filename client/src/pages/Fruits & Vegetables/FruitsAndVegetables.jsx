import React, { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Loading from '../../hooks/Loading';
import { useQuery } from '@tanstack/react-query';
import { LiaShoppingCartSolid } from "react-icons/lia";
import { GiFruitBowl } from 'react-icons/gi';
import { RiHeartAddLine } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Error from '../../hooks/Error';
import { Link } from 'react-router-dom';
import Pages from '../shared/Pages/Pages';
import useClickToCart from '../../hooks/useClickToCart';
import useClickToHeart from '../../hooks/useClickToHeart';

export default function FruitsAndVegetables() {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Show 5 items per page
  const [heartStates, setHeartStates] = useState({}); // Track heart icon states
  const [handleAddToCart] = useClickToCart();
  const [handleAddToHeart] = useClickToHeart();

  // Fetch fruits and vegetables data
  const { data: fruits = [], isError, isLoading } = useQuery({
    queryKey: ['fruitsVegetables'],
    queryFn: async () => {
      try {
        const res = await axiosPublic('/FruitsAndVegetables');
        return res.data;
      } catch (err) {
        console.log('Error Here:', err);
      }
    }
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  // Pagination calculations
  const totalPages = Math.ceil(fruits.length / itemsPerPage);
  const currentItems = fruits.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Function to toggle heart state
  const toggleHeart = (id) => {
    setHeartStates((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle heart state for the clicked item
    }));
  };

  return (
    <div>
      <div className='mx-auto container flex flex-col sm:flex-row justify-between items-center mt-5 mb-10'>
        <div className="flex flex-col sm:flex-row items-center">
          <Link to={"/"}>
            <h1 className="text-base sm:text-lg text-gray-300 hover:text-gray-500 flex items-center">
              Home
            </h1>
          </Link>
          <p className="text-base sm:text-lg text-black flex items-center mt-1 sm:mt-0">
            <span className='text-gray-300'>
              <FaChevronRight />
            </span>
            Fruits & Vegetables
          </p>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-center mt-3 sm:mt-0">
          Fruits and Vegetables Total Available: {fruits.length}
        </h2>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {currentItems.map((product) => (
            <div 
              key={product._id} 
              className="relative p-4 bg-gradient-to-r from-red-300 to-red-500 rounded-lg shadow-md text-center group hover:shadow-lg transition-all duration-300"
            >
              {/* Image with Heart Icon */}
              <div className="relative">
                {product.image && (
                  <img src={product.image} alt={product.name} className="w-full h-52 object-cover rounded-md mb-4" />
                )}
                <RiHeartAddLine 
                  className={`absolute right-2 top-2 text-2xl transition-transform duration-300 opacity-0 group-hover:opacity-100
                    ${heartStates[product._id] ? 'text-red-600 scale-105' : 'text-red-500'}
                  `}
                  onClick={() => {
                    toggleHeart(product._id);  // Toggle heart state
                    handleAddToHeart(product); // Add to heart functionality
                  }}
                  onMouseEnter={() => setHeartStates((prev) => ({ ...prev, [product._id]: true }))}
                  onMouseLeave={() => setHeartStates((prev) => ({ ...prev, [product._id]: false }))}
                />
              </div>
              
              {/* Product Details */}
              <div className="bg-gradient-to-r from-green-300 to-green-400 p-1 rounded-md mb-4">
                <h3 className="text-base font-semibold flex items-center justify-center text-gray-800">
                  <GiFruitBowl className="mr-2 text-yellow-600" /> {product.name}
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">Category: <span className="text-gray-800 font-bold">{product.category}</span></p>
              <p className="text-sm font-medium text-gray-600 mb-1">Available: <span className="text-green-700 text-lg">{product.available}</span></p>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Discount: <span className="line-through text-lg text-red-500">{product.discount}</span>
              </p>
              <p className="text-yellow-500 font-semibold mb-2">Rating: {product.rating} ⭐</p>
              <p className="text-gray-600 mb-4 text-sm">{product.description.split(" ").slice(0, 6).join(" ")}</p> {/* Display first 6 words of description */}

              {/* Add to Cart Button */}
              <button onClick={() => handleAddToCart(product)} className="border-purple-600 border text-purple-600 py-2 px-4 rounded flex items-center justify-center w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-purple-700 hover:text-white">
                <LiaShoppingCartSolid className='text-xl' /> Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="border border-purple-600 text-purple-600 px-3 py-1 rounded-l-lg hover:bg-purple-600 hover:text-white transition-all"
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`border border-purple-600 text-purple-600 px-3 py-1 mx-1 rounded-lg transition-all ${currentPage === page ? 'bg-purple-700 text-white' : 'hover:bg-purple-600 hover:text-white'}`}
            >
              {page}
            </button>
          ))}

          <button 
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="border border-purple-600 text-purple-600 px-3 py-1 rounded-r-lg hover:bg-purple-600 hover:text-white transition-all"
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

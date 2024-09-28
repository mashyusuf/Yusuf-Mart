import React, { useEffect, useState } from "react";
import { FaFilterCircleDollar } from "react-icons/fa6";

export default function  Filter  ({
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  applyFilter,
  specialOffer,
  setSpecialOffer,
  setSortOrder,
}) {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  // Update the price range when minPrice or maxPrice change
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  // Handle price range changes from the slider
  const handlePriceRangeChange = (e) => {
    const newValue = Number(e.target.value);
    setMaxPrice(newValue);
  };

  return (
    <div className="w-1/4 p-4 bg-slate-200 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4 text-black">Widget price filter</h2>

      {/* Category Filter */}
      <div className="mb-4">
        <h3 className="font-semibold text-black flex items-center">
          Categories <span className="ml-2" role="img" aria-label="category">📦</span>
        </h3>
        <hr className="my-2 border-purple-600" />
        <select
          className="mt-1 block w-full p-2 border border-green-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)} 
        >
          <option value="">All</option>
          <option value="Fruits and Vegetables">🍏 Fruits & Vegetables</option>
          <option value="Bakery and Dairy">🍞 Bakery & Dairy</option>
          <option value="Meats and Seafood">🍖 Meats & Seafood</option>
          <option value="Beverages">🥤 Beverages</option>
          <option value="Household Needs">🏠 Household Needs</option>
          <option value="Baby and Pregnancy">👶 Baby & Pregnancy</option>
          <option value="Pet Supplies">🐾 Pet Supplies</option>
          <option value="Snacks and Confectionery">🍬 Snacks & Confectionery</option>
          <option value="Frozen Foods">❄️ Frozen Foods</option>
          <option value="Healthcare">💊 Healthcare</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <h3 className="font-semibold text-black flex items-center">
          Price Range <span className="ml-2" role="img" aria-label="money">💰</span>
        </h3>
        <hr className="my-2 border-purple-600" />
        <div className="flex items-center justify-between space-x-2 mb-4">
          <input
            type="number"
            placeholder="Min Price"
            value={priceRange[0]}
            onChange={(e) => {
              const newMinPrice = Math.max(0, Number(e.target.value)); // Ensure min price is not negative
              setMinPrice(newMinPrice);
              setPriceRange([newMinPrice, priceRange[1]]);
            }}
            className="mt-1 w-1/2 p-2 border border-green-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={priceRange[1]}
            onChange={(e) => {
              const newMaxPrice = Math.min(100, Number(e.target.value)); // Ensure max price does not exceed $30
              setMaxPrice(newMaxPrice);
              setPriceRange([priceRange[0], newMaxPrice]);
            }}
            className="mt-1 w-1/2 p-2 border border-purple-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price Range Display */}
        <div className="text-black text-center">
          Price: ${priceRange[0]} — ${priceRange[1]}
        </div>

        {/* Price Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={priceRange[1]} // Set to max price
          onChange={handlePriceRangeChange}
          step="1"
          className="w-full mt-2 accent-purple-600"
        />
        <div className="flex justify-between text-black">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Sort Order Filter */}
      <div className="mb-4">
        <h3 className="font-semibold text-black flex items-center">
          Sort By Price<span className="ml-2" role="img" aria-label="sort">🔄</span>
        </h3>
        <hr className="my-2 border-purple-600" />
        <select
          className="mt-1 block w-full p-2 border border-green-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSortOrder(e.target.value)} // Set sort order on change
          defaultValue="default" // Set default value for the select
        >
          <option value="default">Default</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="lowToHigh">Price: Low to High</option>
        </select>
      </div>

      {/* Special Offers */}
      <div className="mb-4 mt-4">
        <h3 className="font-semibold text-black flex items-center">
          Special Offers <span className="ml-2" role="img" aria-label="tag">🏷️</span>
        </h3>
        <hr className="my-2 border-purple-600" />
        <select
        value={specialOffer}
        onChange={(e) => setSpecialOffer(e.target.value)}
        className="mt-1 block w-full p-2 border border-green-600 rounded"
      >
        <option value="">All Offers</option>
        <option value="Only for this Week">🔥 Only for this Week</option>
        <option value="New Arrival">🆕 New Arrival</option>
        <option value="Best Seller">🏆 Best Seller</option>
        <option value="Trending Product">📈 Trending Product</option>
      </select>
      </div>
      {/* Filter Button */}
      <button
        onClick={applyFilter}
        className="w-full flex items-center justify-center border border-green-600 text-green-600 py-2 rounded-full hover:bg-green-700 hover:text-white transition-all"
      >
        <FaFilterCircleDollar className="text-base mr-2" />
        Filter
      </button>
    </div>
  );
}

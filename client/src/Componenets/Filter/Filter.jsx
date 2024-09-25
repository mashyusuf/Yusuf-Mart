import React from "react";

const categories = [
  "Household Needs",
  "Baby & Pregnancy",
  "Snacks & Confectionery",
  "Frozen Foods",
  "Pet Supplies",
  "Fruits & Vegetables",
  "Meats & Seafood",
];

const Filter = ({ onCategoryChange, onAvailableChange, onSpecialChange }) => {
  return (
    <div className="w-1/4 p-4 border-r border-gray-300">
      <h2 className="text-lg font-bold mb-2">Filters</h2>

      <h3 className="text-md font-semibold">Categories</h3>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => onCategoryChange(category)}
              className="block text-blue-500 hover:text-blue-700"
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      <h3 className="text-md font-semibold mt-4">Availability</h3>
      <button
        onClick={() => onAvailableChange("In Stock")}
        className="block text-blue-500 hover:text-blue-700"
      >
        In Stock
      </button>
      <button
        onClick={() => onAvailableChange("Out of Stock")}
        className="block text-blue-500 hover:text-blue-700"
      >
        Out of Stock
      </button>

      <h3 className="text-md font-semibold mt-4">Special Offers</h3>
      <button
        onClick={() => onSpecialChange("Package Deal")}
        className="block text-blue-500 hover:text-blue-700"
      >
        Package Deal
      </button>
      <button
        onClick={() => onSpecialChange("Trending Product")}
        className="block text-blue-500 hover:text-blue-700"
      >
        Trending Product
      </button>
    </div>
  );
};

export default Filter;

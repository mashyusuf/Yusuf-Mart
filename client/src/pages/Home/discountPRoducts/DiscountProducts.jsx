import React, { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../hooks/Loading";
import Error from "../../../hooks/Error";
import { FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
export default function DiscountProducts() {
  const axiosPublic = useAxiosPublic();
  const {
    data: featureProducts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featureProducts"],
    queryFn: async () => {
      try {
        const res = await axiosPublic("/featureProducts");
        return res.data;
      } catch (err) {
        console.log("Error fetching data", err);
      }
    },
  });

  const [showAll, setShowAll] = useState(false); // State to toggle view

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  // Determine the number of products to display
  const productsToShow = showAll
    ? featureProducts
    : featureProducts.slice(0, 6);

  return (
    <div className="p-5">
      <div className="md:flex text-center md:ml-4 items-center gap-2">
        <h2 className="text-xl font-bold text-black mb-1">Featured Products</h2>
        <p className="text-sm text-gray-500">
          Do not miss the current offers until the end of March.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsToShow.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded-lg shadow-md flex"
          >
            {/* Product Image */}
            <div className="w-1/3 flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-80 h-72 object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="w-2/3 pl-4 relative">
              {/* Discount Label */}
              <div className="bg-red-600 items-center rounded-xl ml-4 text-white px-2 py-1 absolute top-0 left-0 text-sm">
                {product.discount}% OFF
              </div>
              {/* Product Name and Description */}
              <div className="mb-2 pt-8">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
              {/* Price Section */}
              <div className="flex items-center justify-around mb-2">
                <span className="text-gray-500 line-through">
                  PRICE: ${product.originalPrice}
                </span>
                <span className="text-red-600 text-lg">
                  NOW PRICE: ${product.nowPrice}
                </span>
              </div>
              {/* Star Rating */}
              <div className="flex text-sm items-center mb-4">
                RATING:
                {[...Array(5)].map((_, index) => {
                  if (index < Math.floor(product.rating)) {
                    return (
                      <FaStar key={index} className="ml-1 text-yellow-500" />
                    );
                  } else if (
                    index === Math.floor(product.rating) &&
                    product.rating % 1 >= 0.5
                  ) {
                    return (
                      <FaStar key={index} className="ml-1 text-yellow-500" />
                    );
                  } else {
                    return (
                      <FaStar key={index} className="ml-1 text-gray-300" />
                    );
                  }
                })}
              </div>
              {/* Add to Cart Button */}
              <button className="w-full border border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-700 hover:text-white transition duration-300 flex items-center justify-center gap-2">
                <GrWorkshop className="text-lg" /> {/* Add the icon here */}
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center justify-center gap-2 border border-purple-600 text-purple-600 bg-white hover:bg-purple-600 hover:text-white px-4 py-2 rounded transition duration-200"
        >
          {showAll ? <FaChevronUp /> : <FaChevronDown />} {/* Arrow icon */}
          <span>{showAll ? "View Less" : "View All"}</span>
        </button>
      </div>
    </div>
  );
}

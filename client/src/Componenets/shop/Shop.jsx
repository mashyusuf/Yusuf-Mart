import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaShoppingBag } from "react-icons/fa"; // Icons for buy and rating
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../hooks/Loading";
import Error from "../../hooks/Error";
import Filter from "../Filter/Filter";
import { BsShop } from "react-icons/bs";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableFilter, setAvailableFilter] = useState("");
  const [specialFilter, setSpecialFilter] = useState("");
  const axiosPublic = useAxiosPublic();

  const {
    data: allProducts = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["allProducts", selectedCategory, availableFilter, specialFilter],
    queryFn: async () => {
      try {
        const res = await axiosPublic(
          `/allData?category=${selectedCategory}&available=${availableFilter}&special=${specialFilter}`
        );
        return res.data;
      } catch (err) {
        console.log("Error fetching all data", err);
      }
    },
  });

  const handleCategoryChange = (category) => setSelectedCategory(category);
  const handleAvailableChange = (availability) => setAvailableFilter(availability);
  const handleSpecialChange = (special) => setSpecialFilter(special);

  const truncate = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length <= wordLimit ? text : words.slice(0, wordLimit).join(" ") + " ...";
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="container mx-auto mt-5 mb-5 flex">
      {/* Left Sidebar for Filters */}
      <Filter 
        onCategoryChange={handleCategoryChange} 
        onAvailableChange={handleAvailableChange} 
        onSpecialChange={handleSpecialChange} 
      />

      {/* Products Section */}
      <div className="w-3/4 px-2">
        <div className="md:flex text-center md:ml-4 items-center gap-2">
          <h1 className="text-xl font-bold text-black mb-1">Shop All Products</h1>
          <p className="text-sm text-gray-500">
            Explore our wide range of categories and find the best deals!
          </p>
        </div>

        {/* Grid Layout for Products */}
        <div className="grid grid-cols-2 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
          {allProducts.map((product) => {
            // Determine background color and emoji based on product category
            let badgeClass = "";
            let emoji = "";

            switch (product.category) {
              case "Fruits & Vegetables":
                badgeClass = "bg-gradient-to-r from-red-300 to-red-500";
                emoji = "🍎🥦";
                break;
              case "Bakery & Dairy":
                badgeClass = "bg-gradient-to-r from-yellow-300 to-yellow-500";
                emoji = "🍞🥛";
                break;
              case "Grocery":
                badgeClass = "bg-gradient-to-r from-green-300 to-green-500";
                emoji = "🛒";
                break;
              case "Beverages":
                badgeClass = "bg-gradient-to-r from-yellow-300 to-yellow-500";
                emoji = "🥤";
                break;
              case "Organic":
                badgeClass = "bg-gradient-to-r from-green-300 to-green-500";
                emoji = "🌱";
                break;
              case "Pantry Staples":
                badgeClass = "bg-gradient-to-r from-yellow-300 to-yellow-500";
                emoji = "🌽";
                break;
              case "Household Needs":
                badgeClass = "bg-gradient-to-r from-yellow-300 to-yellow-500";
                emoji = "🧺🧹";
                break;
              case "Healthcare":
                badgeClass = "bg-gradient-to-r from-blue-300 to-blue-500";
                emoji = "💉🩺";
                break;
              case "Baby & Pregnancy":
                badgeClass = "bg-gradient-to-r from-purple-300 to-purple-500";
                emoji = "🤰👶";
                break;
              case "Meats & Seafood":
                badgeClass = "bg-gradient-to-r from-orange-300 to-orange-500";
                emoji = "🍖🥩";
                break;
              case "Meat":
                badgeClass = "bg-gradient-to-r from-red-400 to-red-600";
                emoji = "🥩";
                break;
              case "Pet Supplies":
                badgeClass = "bg-gradient-to-r from-pink-400 to-pink-600";
                emoji = "🐶🐱";
                break;
              case "Snacks & Confectionery":
                badgeClass = "bg-gradient-to-r from-yellow-400 to-yellow-600";
                emoji = "🍿";
                break;
              case "Frozen Foods":
                badgeClass = "bg-gradient-to-r from-cyan-400 to-cyan-600";
                emoji = "❄️";
                break;
              default:
                badgeClass = "bg-gray-500";
            }

            return (
              <div key={product._id} className="card bg-white shadow-xl rounded-lg overflow-hidden">
                <figure>
                  <img src={product.image} alt={product.name} className="h-56 w-full object-cover" />
                </figure>
                <div className="card-body p-4">
                  <div className={`badge ${badgeClass} text-white mb-2 flex items-center`}>
                    {product.category} {emoji}
                  </div>
                  <h2 className="card-title text-lg font-bold text-gray-800 mb-1">
                    {truncate(product.name, 3)}
                  </h2>
                  <p className="text-sm text-slate-500 mb-1">
                    {truncate(product.description, 6)}
                  </p>
                  <div className="flex items-center justify-evenly mb-1">
                    <p className="text-2xl font-extrabold text-red-600">${product.price}</p>
                    <p className="text-xl font-bold line-through text-gray-500">${product.discount}</p>
                  </div>

                  {/* Rating & Stock Information */}
                  <div className="flex items-center mb-1">
                    <p className="flex items-center text-xl text-yellow-500">
                      <span className="text-gray-600 text-base"> Rating</span>: {product.rating} ⭐
                    </p>
                    <p className={`ml-3 ${product.available === "In Stock" ? "text-green-600" : "text-red-600"}`}>
                      {product.available === "In Stock" ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>

                  <div className="card-actions">
                    {/* Buy Now Button */}
                    <button className="w-full flex items-center justify-center border border-green-600 text-green-600 py-2 rounded-full hover:bg-green-700 hover:text-white transition-all">
                      <BsShop className="inline mr-1" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

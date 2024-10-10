import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../hooks/Loading";
import Error from "../../hooks/Error";
import Filter from "../Filter/Filter";
import { BsShop } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importing icons for pagination
import { GoArrowLeft } from "react-icons/go";
import { Link, useSearchParams } from "react-router-dom";
export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0); 
  const [maxPrice, setMaxPrice] = useState(100);
  const [specialOffer, setSpecialOffer] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const axiosPublic = useAxiosPublic();

  const { data: { products = [], totalPages = 1 } = {}, isError, isLoading } = useQuery({
    queryKey: ["allProducts", selectedCategory, minPrice, maxPrice, specialOffer, sortBy, searchTerm, currentPage],
    queryFn: async () => {
      try {
        const res = await axiosPublic(
          `/allData?category=${selectedCategory}&minPrice=${minPrice}&maxPrice=${maxPrice}&specialOffer=${specialOffer}&sortBy=${sortBy}&search=${searchTerm}&page=${currentPage}&limit=12`
        );
        return res.data;
      } catch (err) {
        console.log("Error fetching all data", err);
      }
    },
  });
  
  // Rest of the Shop component code
  const applyFilter = () => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setSpecialOffer(specialOffer);
    setSortBy(sortBy);
    setCurrentPage(1); 
  };

  const truncate = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length <= wordLimit ? text : words.slice(0, wordLimit).join(" ") + " ...";
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="container mx-auto mt-5 mb-5 flex ">
     
      <Filter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        applyFilter={applyFilter}
        specialOffer={specialOffer}
        setSpecialOffer={setSpecialOffer}
        setSortOrder={setSortBy}
      />
      <div className="w-3/4 px-2">
        <div className="md:flex justify-between text-center md:ml-4 items-center gap-2">
          <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-black mb-1">Shop All Products </h1>
          <p className="text-sm text-gray-500">
            Explore our wide range of categories and find the best deals!
          </p>
          </div>
         <div>
         <Link to={'/'}> <button className="flex items-center border border-purple-600 text-purple-600 px-3 py-1 mx-1 rounded-lg transition-all"> <GoArrowLeft />Home </button></Link>
         
         </div>
        </div>

        <div className="grid grid-cols-2 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
          {products.map((product) => {
            /// Determine background color and emoji based on product category
           let badgeClass = "";
           let emoji = "";

           switch (product.category) {
             case "Fruits and Vegetables":
               badgeClass = "bg-gradient-to-r from-red-300 to-red-500";
               emoji = "🍎";
               break;
             case "Bakery and Dairy":
               badgeClass = "bg-gradient-to-r from-yellow-300 to-yellow-500";
               emoji = "🍞🥛";
               break;
             case "Beverages":
               badgeClass = "bg-gradient-to-r from-yellow-300 to-yellow-500";
               emoji = "🥤";
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
             case "Baby and Pregnancy":
               badgeClass = "bg-gradient-to-r from-purple-300 to-purple-500";
               emoji = "🤰👶";
               break;
             case "Meats and Seafood":
               badgeClass = "bg-gradient-to-r from-orange-300 to-orange-500";
               emoji = "🍖🥩";
               break;
             case "Pet Supplies":
               badgeClass = "bg-gradient-to-r from-pink-400 to-pink-600";
               emoji = "🐶🐱";
               break;
             case "Snacks and Confectionery":
               badgeClass = "bg-gradient-to-r from-yellow-400 to-yellow-600";
               emoji = "";
               break;
             case "Frozen Foods":
               badgeClass = "bg-gradient-to-r from-cyan-400 to-cyan-600";
               emoji = "❄️";
               break;
             default:
               badgeClass = "bg-gray-500";
           }
            return (
              <div key={product._id} className="card bg-white shadow-xl rounded-lg overflow-hidden relative">
                <figure className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-56 w-full object-cover"
                  />
                  {product.special && (
                    <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 rounded-lg flex items-center text-xs font-bold">
                      <span>✨</span>
                      <p className="ml-1">{product.special}</p>
                    </div>
                  )}
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
                    <p className="text-2xl font-extrabold text-red-600">
                      ${product.price}
                    </p>
                    <p className="text-xl font-bold line-through text-gray-500">
                      ${product.discount}
                    </p>
                  </div>

                  <div className="flex items-center mb-1">
                    <p className="flex items-center text-xl text-yellow-500">
                      <span className="text-gray-600 text-base">Rating</span>: {product.rating} ⭐
                    </p>
                    <p className={`ml-3 ${product.available === "In Stock" ? "text-green-600" : "text-red-600"}`}>
                      {product.available === "In Stock" ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>

                  <div className="card-actions">
                  <Link className="w-full" to={`/shopNow/${product._id}`}>
                    <button className="w-full flex items-center justify-center border border-green-600 text-green-600 py-2 rounded-full hover:bg-green-700 hover:text-white transition-all">
                      <BsShop className="inline mr-1" />
                      Shop Now
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Product Display */}
        <div className="grid grid-cols-2 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
          {products.map((product) => (
            // Map over your product display logic
            <div key={product._id} className="card bg-white shadow-xl rounded-lg overflow-hidden relative">
              {/* Product card content */}
            </div>
          ))}
        </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
          <button 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="border border-purple-600 text-purple-600 px-3 py-1 rounded-l-lg hover:bg-purple-600 hover:text-white transition-all"
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>

          {/* Page Numbers */}
          {(() => {
            const pageNumbers = [];
            const totalPagesToShow = 4; // Default pages to show
            let startPage = Math.max(1, currentPage - Math.floor(totalPagesToShow / 2));
            let endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);

            // Adjust startPage if endPage is at the totalPages
            if (endPage === totalPages) {
              startPage = Math.max(1, totalPages - totalPagesToShow + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
              pageNumbers.push(
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`border border-purple-600 text-purple-600 px-3 py-1 mx-1 rounded-lg transition-all ${currentPage === i ? 'bg-purple-700 text-white' : 'hover:bg-purple-600 hover:text-white'}`}
                >
                  {i}
                </button>
              );
            }

            return pageNumbers;
          })()}

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
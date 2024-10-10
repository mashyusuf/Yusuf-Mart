import React, { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../hooks/Loading";
import Error from "../../../hooks/Error";
import { FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAddToCart from "../../../hooks/useAddToCart";
export default function DiscountProducts() {
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const [,refetch] = useAddToCart()
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

  //---Handle Add TO Cart
  const handleAddToCart =(cart)=>{
    if(user && user.email){
      //We Add To cart In Database----
      const cartItem ={
        email:user.email,
        cart
      }
      axiosSecure.post(`/addToCart`,cartItem)
      .then(res =>{
        if(res.data.insertedId){
          Swal.fire({
            position: "center",
            icon: "success", // Keeping success icon for visual feedback
            title: `${cart.name} Added To The Cart Successfully! 🛒`, // Added emoji for more visual appeal
            text: "You can continue shopping or proceed to checkout.",
            imageUrl: `${cart.imageUrl}`, // Adding the product image
            imageWidth: 100, // Adjust the image size as needed
            imageAlt: `${cart.name}`, // Alt text for the product image
            showConfirmButton: false,
            timer: 2000 // Increased timer for more visibility
          });
          //Refetch The Cart---
          refetch()
        }
      })
    }
    else{
      Swal.fire({
        title: "⚠️ Hey! Why are you not logged in?",
        text: "You need to be logged in to continue. Please log in to proceed.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Go to Login", 
        cancelButtonText: "Cancel" 
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Redirecting...",
            text: "Taking you to the login page now.",
            icon: "info",
            showConfirmButton: false, // Hides confirm button
            timer: 1500, // Adds a timer to close the alert automatically
            willClose: () => {
              // Redirect to login page after the alert closes
              navigate('/login', { state: { from: location } });
            }
          });
        }
      });      
      
    }
  }

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
              <button onClick={()=> handleAddToCart(product)} className="w-full border border-purple-600 text-purple-600 py-2 rounded-full hover:bg-purple-700 hover:text-white transition duration-300 flex items-center justify-center gap-2">
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

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaHandLizard, FaShoppingCart } from "react-icons/fa"; // Importing React Icons
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Arrow icons
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../hooks/Loading";
import { useLocation, useNavigate } from 'react-router-dom';
import Error from "../../../hooks/Error";
import useAuth from "../../../hooks/useAuth";
import Swal from 'sweetalert2'
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAddToCart from "../../../hooks/useAddToCart";
export default function NewArrivals() {
  const {user} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [,refetch] = useAddToCart()
  const {
    data: newProducts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await axiosPublic("/newArrivals");
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
            imageUrl: `${cart.image}`, // Adding the product image
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
  const productsToShow = showAll ? newProducts : newProducts.slice(0, 5);

  return (
    <div className="container mx-auto mt-5 mb-5">
      <div className="md:flex text-center md:ml-4 items-center gap-2">
        <h1 className="text-xl font-bold text-black mb-1">New Arrivals</h1>
        <p className="text-sm text-gray-500">
          Don't miss this opportunity at a special discount just for this week.
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-2 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-6">
        {/* Map Data For All Products */}
        {productsToShow.map((product) => {
          // Determine background color for the badge based on category
          let badgeClass = "";
          let emoji = "";

          switch (product.category) {
            case "Organic":
              badgeClass = "bg-gradient-to-r from-green-300 to-green-500";
              emoji = "🌱"; // Leaf emoji
              break;
            case "Cold Sale":
              badgeClass = "bg-gradient-to-r from-sky-300 to-sky-500";
              emoji = "❄️"; // Cold emoji
              break;
            case "Beverages":
              badgeClass = "bg-gradient-to-r from-yellow-300 to-yellow-500";
              emoji = "🥤"; // Beverage emoji
              break;
            default:
              badgeClass = "bg-gray-500"; // Default badge color
          }

          return (
            <div
              key={product._id}
              className="card bg-white shadow-xl rounded-lg overflow-hidden"
            >
              <figure>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <div
                  className={`badge ${badgeClass} text-white mb-2 flex items-center`}
                >
                  {product.category} {emoji}
                </div>
                <h2 className="card-title text-lg font-bold text-gray-800 mb-1">
                  {product.name}
                </h2>
                <p className="text-sm text-slate-500 mb-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xl font-extrabold text-red-600">
                    ${product.price}
                  </p>
                  <p className="text-base font-bold line-through text-gray-500">
                    ${product.discount}
                  </p>
                </div>
                <div className="card-actions">
                  {/* Add to Cart Button with Icon */}
                  <button onClick={()=> handleAddToCart(product)} className="w-full border border-purple-600 text-purple-600 py-2 rounded-full hover:bg-purple-700 hover:text-white transition duration-300 flex items-center justify-center">
                    <FaShoppingCart className="mr-2" />{" "}
                    {/* Add margin for spacing */}
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="flex justify-end mt-4 mr-2">
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center justify-center gap-2 border border-purple-600 text-purple-600 bg-white hover:bg-purple-600 hover:text-white px-4 py-2 rounded transition duration-200"
        >
          {showAll ? <FaChevronUp /> : <FaChevronDown />}{" "}
          {/* Change icon based on state */}
          <span>View All</span>
        </button>
      </div>
    </div>
  );
}

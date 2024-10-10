import React from 'react';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'; // Import icons
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Loading from '../../../hooks/Loading';
import Error from '../../../hooks/Error';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAddToCart from '../../../hooks/useAddToCart';
import Swal from 'sweetalert2';
import useAddToHeart from '../../../hooks/useAddToHeart';

export default function BestSelles() {
  const axiosPublic = useAxiosPublic();
  const {user}= useAuth();
  const axiosSecure = useAxiosSecure();
  const [, refetchCart] = useAddToCart();
  const [, refetchHeart] = useAddToHeart();
  

  const { data: bestSelles = [], isError, isLoading } = useQuery({
    queryKey: ['bestSelles'],
    queryFn: async () => {
      try {
        const res = await axiosPublic('/bestSelles');
        return res.data;
      } catch (err) {
        console.log('Error Here:', err);
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
          refetchCart()
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
  //---Handle Add TO Cart
  const handleAddToHeart =(cart)=>{
    if(user && user.email){
      //We Add To cart In Database----
      const cartItem ={
        email:user.email,
        cart
      }
      axiosSecure.post(`/addToHeart`,cartItem)
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
          refetchHeart()
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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="grid lg:grid-cols-5 sm:grid-cols-2 gap-4 p-4">
      {bestSelles.map((product, index) => (
        <div
          key={product._id}
          className={`relative border rounded-lg shadow-lg p-4 flex flex-col ${
            product.category === 'This Week Only' && (index === 2 || index === 7) ? 'flex-col-reverse' : ''
          }`}
        >
          {/* Only show discount and love icon if the category is NOT 'This Week Only' */}
          {product.category !== 'This Week Only' && (
            <div className="flex items-center justify-between pb-2">
              <h1 className="text-white text-center bg-red-600 px-2 py-2 rounded-full">
                {product.discount_percentage}%
              </h1>
              <button onClick={()=> handleAddToHeart(product)} className="flex items-center text-black hover:text-red-500">
                <AiOutlineHeart className="mr-2 text-2xl" />
              </button>
            </div>
          )}

          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="h-48 object-cover mb-4"
          />

          {/* Product Name - Break after 3 words */}
          <h2 className="text-xl font-bold mb-2">
            {product.name.split(' ').slice(0, 3).join(' ')}<br />
            {product.name.split(' ').slice(3).join(' ')}
          </h2>

          {/* Conditional Category with different styles for 'This Week Only' */}
          <p
            className={`${
              product.category === 'This Week Only'
                ? 'text-sm absolute top-0 left-0 text-purple-600 bg-gray-200 p-1 rounded'
                : product.category === 'Organic'
                ? 'text-green-600'
                : product.category === 'Cold Sale'
                ? 'text-sky-500'
                : 'text-blue-500'
            } flex items-center`}
          >
            {product.category === 'This Week Only'
              ? '🔥'
              : product.category === 'Organic'
              ? '🌿'
              : product.category === 'Cold Sale'
              ? '❄️'
              : ''}{' '}
            {product.category}
          </p>

          {/* Description (First 6 words only) */}
          <p className="text-gray-500 mb-1">
            {product.description.split(' ').slice(0, 6).join(' ')}...
          </p>

          {/* Rating */}
          <div className="flex items-center">
            <span className="text-yellow-500">★ {product.rating}</span>
          </div>

          {/* Discount and Prices */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-red-600 font-bold text-2xl">
                ${product.discounted_price}
              </span>
              <span className="text-sm line-through text-gray-400 ml-2">
                ${product.price}
              </span>
            </div>
          </div>

          {/* Conditional Button */}
          <div className="mt-auto">
            {product.category === 'This Week Only' ? (
              <button className="border-purple-600 border text-purple-600 py-2 px-4 rounded flex items-center justify-center w-full mb-4 hover:bg-purple-700 hover:text-white">
                <AiOutlineShoppingCart className="mr-2" /> Shop Now
              </button>
            ) : (
              <button onClick={()=> handleAddToCart(product)} className="border-purple-600 border text-purple-600 py-2 px-4 rounded flex items-center justify-center w-full hover:bg-purple-700 hover:text-white">
                <AiOutlineShoppingCart className="mr-2" /> Add to Cart
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

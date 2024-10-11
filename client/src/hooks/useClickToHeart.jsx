import React from 'react'
import Swal from 'sweetalert2';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import useAddToHeart from './useAddToHeart';

export default function useClickToHeart() {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const [, refetchHeart] = useAddToHeart();
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
  return [handleAddToHeart]
}

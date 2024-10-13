// hooks/useClickToCart.js
import React from 'react';
import useAddToCart from './useAddToCart';
import Swal from 'sweetalert2';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

export default function useIncreseAndDesAddToCart() {
    const [, refetch] = useAddToCart();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    //---Handle Add TO Cart
    const handleAddToCart2 = (cart, quantity) => {
        if (user && user.email) {
            const cartItems = Array.from({ length: quantity }, () => ({
                email: user.email,
                cart
            }));

            // Use Promise.all to send multiple requests
            Promise.all(
                cartItems.map(item =>
                    axiosSecure.post(`/addToCart`, item)
                )
            )
            .then(responses => {
                const insertedIds = responses.map(res => res.data.insertedId);
                if (insertedIds.some(id => id)) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${cart.name} Added To The Cart Successfully! 🛒`,
                        text: `You have added ${quantity} of ${cart.name} to your cart.`,
                        imageUrl: `${cart.image || cart.imageUrl}`,
                        imageWidth: 100,
                        imageAlt: `${cart.name}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    // Refetch The Cart
                    refetch();
                }
            })
            .catch(error => {
                console.error("Error adding to cart: ", error);
                Swal.fire({
                    title: "Error",
                    text: "There was an issue adding the items to your cart. Please try again.",
                    icon: "error",
                });
            });
        } else {
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
                        showConfirmButton: false,
                        timer: 1500,
                        willClose: () => {
                            navigate('/login', { state: { from: location } });
                        }
                    });
                }
            });
        }
    }

    return [handleAddToCart2];
}

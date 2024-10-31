import React, { useState } from "react";
import useAddToCart from "../../hooks/useAddToCart";
import cartImage from "../../assets/cartLogo.png";
import Pages from "../../pages/shared/Pages/Pages";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaCheckCircle, FaTimesCircle, FaTrashAlt } from "react-icons/fa";
import { PiRocketLaunchBold } from "react-icons/pi";
import useHandleAddToCartDelete from "../../hooks/useHandleAddToCartDelete";
import { Helmet } from "react-helmet-async";

export default function MyAddToCart() {
  const [cartItems, isLoading, isError] = useAddToCart();
  const { user } = useAuth();
  const [handleDelete] = useHandleAddToCartDelete();

  // Calculate total price with a guard clause
  const totalPrice = cartItems.reduce((total, item) => {
    // Check if item.cart and item.cart.price are defined
    if (item.cart && item.cart.price) {
      return total + item.cart.price;
    }
    return total; // If not defined, return the current total
  }, 0);

  return (
    <div className="container mx-auto">
      <Pages />
      <Helmet>
                <title>My Cart </title>
            </Helmet>
      {/* If user is not logged in */}
      {!user ? (
        <div className="h-screen flex flex-col justify-center items-center py-10">
          <div className="flex flex-col items-center">
            <img src={cartImage} alt="Cart" className="mb-10" />
            <h1 className="text-xl text-red-600 mb-5">
              Please log in to see your cart.
            </h1>
            <Link to={"/login"}>
              <button className="btn text-base border-0 btn-neutral">
                Login
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* If user is logged in but cart is empty */}
          {cartItems.length === 0 ? (
            <div className="h-screen flex flex-col justify-center items-center py-10">
              <div className="flex flex-col items-center">
                <img src={cartImage} alt="Cart" className="mb-10" />
                <h1 className="text-xl text-red-600 mb-5">
                  Your cart is currently empty.
                </h1>
                <Link to={"/shop"}>
                  <button className="btn text-base border-0 btn-neutral">
                    Return to shop
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            // If user is logged in and has items in the cart
            <>
              <div className="flex mt-5 justify-between items-center mb-10">
                <div className="text-xl text-black">
                  Your Total Cart: {cartItems.length}
                </div>
                <div className="text-xl text-black">
                  Your Total Price: ${totalPrice.toFixed(2)}
                </div>
                <div className="flex items-center">
                  <Link to={'/checkout'}><button
                    className={`btn border text-lg ${
                      cartItems.length === 0
                        ? "border-gray-400 text-gray-400 cursor-not-allowed"
                        : "border-purple-600 text-purple-600 hover:bg-purple-700 hover:text-white"
                    }`}
                    disabled={cartItems.length === 0}
                  >
                    <PiRocketLaunchBold /> Checkout Now
                  </button></Link>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="table-auto w-full text-base border-collapse">
                  {/* Table Head */}
                  <thead className="bg-gradient-to-r from-green-700 to-indigo-700 text-white">
                    <tr>
                      <th className="px-6 py-3 text-xl font-bold text-left">
                        #
                      </th>
                      <th className="px-6 py-3 text-xl font-bold text-left">
                        🛍️ Name
                      </th>
                      <th className="px-6 py-3 text-xl font-bold text-left">
                        📦 Category
                      </th>
                      <th className="px-6 py-3 text-xl font-bold text-center">
                        ✅ Available
                      </th>
                      <th className="px-6 py-3 text-xl font-bold text-center">
                        ⭐ Special
                      </th>
                      <th className="px-6 py-3 text-xl font-bold text-center">
                        💲 Price
                      </th>
                      <th className="px-6 py-3 text-xl font-bold text-center">
                        🗑️ Delete
                      </th>
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody>
                    {cartItems.map((item, itemIndex) => (
                      <React.Fragment key={item._id}>
                        <tr className="border-b border-purple-300 hover:bg-purple-100 transition-colors">
                          <td className="px-6 py-4 font-bold text-lg text-center">
                            {itemIndex + 1}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                  <img
                                    src={
                                      item.cart?.image || item.cart?.imageUrl
                                    }
                                    alt={item.cart?.name}
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold text-lg">
                                  {item.cart?.name || "Unknown Product"}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Rating: {item.cart?.rating}⭐
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-lg font-semibold text-left">
                            {item.cart?.category || "Unknown Category"}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {item.cart?.available ? (
                              <span className="flex items-center justify-center text-green-500 text-2xl">
                                <FaCheckCircle /> In Stock
                              </span>
                            ) : (
                              <span className="flex items-center justify-center text-red-500 text-2xl">
                                <FaTimesCircle /> Not Available
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {item.cart?.special || "No Offer"}
                          </td>
                          <td className="px-6 py-4 text-center font-bold text-purple-700">
                            {item.cart?.price || item.cart.discounted_price}$
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="btn bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center gap-2"
                            >
                              <FaTrashAlt /> Delete
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="7">
                            <hr className="border-purple-600" />
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

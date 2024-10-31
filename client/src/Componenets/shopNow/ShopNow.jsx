import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../hooks/Loading";
import Error from "../../hooks/Error";
import { LiaShoppingBasketSolid } from "react-icons/lia";

import {
  FaStar,
  FaHeart,
  FaShareAlt,
  FaExchangeAlt,
  FaMinus,
  FaPlus,
  FaWhatsapp,
} from "react-icons/fa";
import { LiaOpencart } from "react-icons/lia";
import Pages from "../../pages/shared/Pages/Pages";
import useClickToHeart from "../../hooks/useClickToHeart";
import RelatedProduct from "./relatedProduct";
import useAuth from "../../hooks/useAuth";
import PaymentAndWarannty from "../staticTexts/PaymentAndWarannty";
import useIncreseAndDesAddToCart from "../../hooks/useIncreseAndDesAddToCart";
import { Helmet } from "react-helmet-async";
export default function ShopNow() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [handleAddToCart2] = useIncreseAndDesAddToCart();
  const [handleAddToHeart] = useClickToHeart();
  const { user } = useAuth();
  const {
    data: { product = {}, relatedProducts = [] } = {}, // Fetch both product and related products
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["shop", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allProducts/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  // Quantity increase/decrease functions
  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="container mx-auto p-6">
      <Helmet>
                <title>Shop Now {product.name}</title>
            </Helmet>
      <Pages />
      {/* Main Section */}
      <div className="flex flex-col items-center lg:flex-row gap-8">
        {/* Left Side: Product Image */}
        <div className="lg:w-1/2">
          <img
            src={product.image || product.imageUrl}
            alt={product.name}
            className="w-[1000px] h-[1000px] object-cover"
          />
          <div className="flex space-x-4 mt-4">
            {product.thumbnails?.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumbnail ${index}`}
                className="w-16 h-16 object-cover border rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="lg:w-1/2 space-y-4 text-center lg:text-left">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          {/* Rating Section */}
          <div className="flex items-center justify-center lg:justify-start space-x-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < product.rating ? "text-yellow-400" : "text-gray-300"
                }
              />
            ))}
            <span className="text-gray-600">({product.rating || 0})</span>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700">{product.description}</p>

          {/* Price Section */}
          <div className="flex items-center justify-center lg:justify-start space-x-4">
            <span className="text-3xl font-bold text-green-600">
              ${product.price}
            </span>
            {product.discount ? (
              <>
                <span className="text-2xl line-through text-black">
                  ${product.discount}
                </span>
              </>
            ) : (
              <span className="text-xl text-red-500">
                No Discount on this product
              </span>
            )}
          </div>

          {/* Order on WhatsApp Section */}
          <div className="mt-2 mb-2 flex justify-center md:justify-start">
            <button className="btn text-white hover:bg-green-700 flex items-center justify-center space-x-1 bg-green-600 text-lg">
              <FaWhatsapp className="text-2xl" />
              <a
                href="https://wa.me/01729804092"
                target="_blank"
                rel="noopener noreferrer"
                className=" flex items-center space-x-1"
              >
                <p>Order on WhatsApp</p>
              </a>
            </button>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center justify-center lg:justify-start space-x-4">
            <div className="flex items-center space-x-2 border border-gray-300 p-2 rounded">
              <button onClick={decreaseQty} className="p-1">
                <FaMinus />
              </button>
              <span>{quantity}</span>
              <button onClick={increaseQty} className="p-1">
                <FaPlus />
              </button>
            </div>

            <button
              onClick={() => handleAddToCart2(product, quantity)} // Pass quantity here
              className="bg-green-600 hover:bg-green-700 flex items-center text-white px-6 py-2 rounded-md"
            >
              <LiaShoppingBasketSolid className="text-xl mr-2" /> Add to Cart
            </button>

            {/* Link to Checkout with Product Details */}
            <Link
              to={`/checkout`}
              state={{ product, quantity }} // Pass product and quantity
            >
              <button className="bg-orange-500 hover:bg-orange-700 flex items-center text-white px-6 py-2 rounded-md">
                <LiaOpencart className="text-xl mr-2" /> Shop Now
              </button>
            </Link>
          </div>
          {/* Wishlist, Share, Compare */}
          <div className="flex justify-center lg:justify-start space-x-6 mt-6 text-gray-500">
            <button
              onClick={() => handleAddToHeart(product)}
              className="flex items-center space-x-2 hover:text-red-500"
            >
              <FaHeart /> <span>Add to Wishlist</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <FaShareAlt /> <span>Share this Product</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-green-500">
              <FaExchangeAlt /> <span>Compare</span>
            </button>
          </div>
          {/* Payment Section */}
          <PaymentAndWarannty />
        </div>
      </div>

      {/* Tab Navigation for Description & Reviews */}
      <div className="mt-12 border-b border-gray-300">
        <div className="flex justify-center space-x-12">
          <button
            className={`pb-2 ${
              activeTab === "description" ? "border-b-2 border-green-500" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`pb-2 ${
              activeTab === "reviews" ? "border-b-2 border-green-500" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>
      </div>

      {/* Content Switcher for Description & Reviews */}
      {activeTab === "description" && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold">Description</h2>
          <p className="text-gray-700 mt-4">
            {product.description || "No detailed description available."}
          </p>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold">Reviews</h2>
          {product.reviews?.length ? (
            product.reviews.map((review, index) => (
              <div key={index} className="mt-4 border-b pb-4">
                <div className="flex items-center space-x-2">
                  <FaStar className="text-yellow-400" />
                  <span>{review.rating} stars</span>
                </div>
                <p className="text-gray-600 mt-2">{review.comment}</p>
                <span className="text-gray-400 text-sm">- {review.user}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-4">
              No reviews yet. Be the first to review!
            </p>
          )}
        </div>
      )}
      <RelatedProduct
        relatedProducts={relatedProducts}
        handleAddToHeart={handleAddToHeart}
        user={user}
      />
    </div>
  );
}

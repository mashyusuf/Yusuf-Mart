import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../hooks/Loading";
import Error from "../../hooks/Error";
import { LiaShoppingBasketSolid } from "react-icons/lia";
import { GiGlassHeart } from "react-icons/gi";
import { PiShoppingBagFill } from "react-icons/pi";
import {
  FaStar,
  FaHeart,
  FaShareAlt,
  FaExchangeAlt,
  FaMinus,
  FaPlus,
  FaWhatsapp,
  FaCreditCard,
} from "react-icons/fa";
import { LiaOpencart } from "react-icons/lia";
import { GiSlashedShield } from "react-icons/gi";
export default function ShopNow() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description"); // For tab switching

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
            {product.discount && (
              <span className="text-2xl line-through text-black">
                ${product.discount}
              </span>
            )}
          </div>
          {/* Order on WhatsApp Section */}
          <div className="mt-2 mb-2 flex justify-center md:justify-start">
            <button className="btn text-white hover:bg-green-700  flex items-center justify-center space-x-1 bg-green-600 text-lg">
              <FaWhatsapp className="text-2xl" />
              <p>
                Order on WhatsApp
                <a
                  href="https://wa.me/01729804092"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                ></a>
              </p>
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
            <button className="bg-green-600 hover:bg-green-700 flex items-center text-white px-6 py-2 rounded-md">
              <LiaShoppingBasketSolid className="text-xl mr-2" /> Add to Cart
            </button>
            <button className="bg-orange-500 hover:bg-orange-700 flex items-center text-white px-6 py-2 rounded-md">
              <LiaOpencart className="text-xl mr-2" /> Shop Now
            </button>
          </div>
          {/* Wishlist, Share, Compare */}
          <div className="flex justify-center lg:justify-start space-x-6 mt-6 text-gray-500">
            <button className="flex items-center space-x-2 hover:text-red-500">
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
          <div className="mt-8 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-base  flex items-center font-bold mb-4">
                <FaCreditCard className="text-green-600 mr-2" /> Payment
              </h3>

              <div className="flex flex-col space-y-2">
                <span className="flex items-center">
                  <span className="mr-2">•</span> Payment upon receipt of goods
                </span>
                <span className="flex items-center">
                  <span className="mr-2">•</span> Payment by card in the
                  department
                </span>
                <span className="flex items-center">
                  <span className="mr-2">•</span> Google Pay
                </span>
                <span className="flex items-center">
                  <span className="mr-2">•</span> Online Card - 5% discount in
                  case of payment
                </span>
              </div>

              <h3 className="text-base flex items-center font-bold mt-4 mb-2">
                <GiSlashedShield className="text-gray-700 mr-2" />
                Warranty
              </h3>
              <p className="text-sm text-gray-600 text-center lg:text-left">
                The Consumer Protection Act does not provide for the return of
                this product of proper quality.
              </p>
            </div>
          </div>
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
       <div className="mt-8">
  <h2 className="text-2xl font-bold">Related Products</h2>
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
    {relatedProducts.map((relatedProduct) => (
      <div key={relatedProduct._id} className="border p-4 rounded-lg relative shadow-lg">
        {/* Discount badge on the right */}
        <span className="absolute top-2 right-2 rounded-full bg-red-500 text-white text-xs font-bold px-2 py-1 ">
          {relatedProduct.discount ? `${relatedProduct.discount}% OFF` : ''}
        </span>

        {/* Heart Icon on the left */}
        <span className="absolute  top-2 left-2 text-gray-500 hover:text-red-500 cursor-pointer">
          <GiGlassHeart  size={30} />
        </span>

        {/* Product Image */}
        <img
          src={relatedProduct.image || relatedProduct.imageUrl}
          alt={relatedProduct.name}
          className="w-full h-48 object-cover rounded"
        />

        {/* Product Name */}
        <h3 className="text-lg font-bold mt-2">
          {relatedProduct.name}
        </h3>

        {/* Reviews */}
        <div className="flex items-center mt-2 text-yellow-500">
          <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
          <span className="ml-2 text-gray-500">{relatedProduct.rating}</span> {/* Customize based on product data */}
        </div>

        {/* Price and Discount */}
        <div className="flex items-center gap-2 mt-2">
          <p className="text-green-600 font-bold">${relatedProduct.price}</p>
          {relatedProduct.discount && (
            <p className="line-through text-gray-500">
              ${(relatedProduct.price / (1 - relatedProduct.discount / 100)).toFixed(2)}
            </p>
          )}
        </div>

        {/* View Product Button */}
        <Link to={`/shopNow/${relatedProduct._id}`}>
  <button className="border-2 border-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white text-green-600 px-4 py-2 rounded-md mt-4 w-full">
    <PiShoppingBagFill className="mr-2" /> Shop Now
  </button>
</Link>

      </div>
    ))}
  </div>
</div>
    </div>
  );
}

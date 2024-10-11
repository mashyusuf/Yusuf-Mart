import React from 'react';
import { GiGlassHeart } from "react-icons/gi";
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { PiShoppingBagFill } from "react-icons/pi";
export default function RelatedProduct({ relatedProducts = [], handleAddToHeart, user }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">Related Products</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct._id}
              className="border p-4 rounded-lg relative shadow-lg"
            >
              {/* Discount badge on the right */}
              {relatedProduct.discount && (
                <span className="absolute top-2 right-2 rounded-full bg-red-500 text-white text-xs font-bold px-2 py-1">
                  {relatedProduct.discount}% OFF
                </span>
              )}

              {/* Heart Icon on the left */}
              <span
                onClick={() => handleAddToHeart(relatedProduct)}
                className="absolute top-2 left-2 text-gray-500 hover:text-red-500 cursor-pointer"
              >
                <GiGlassHeart size={30} />
              </span>

              {/* Product Image */}
              <img
                src={relatedProduct.image || relatedProduct.imageUrl}
                alt={relatedProduct.name}
                className="w-full h-48 object-cover rounded"
              />

              {/* Product Name */}
              <h3 className="text-lg font-bold mt-2">{relatedProduct.name}</h3>

              {/* Reviews */}
              <div className="flex items-center mt-2 text-yellow-500">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className={index < relatedProduct.rating ? "text-yellow-400" : "text-gray-300"} />
                ))}
                <span className="ml-2 text-gray-500">{relatedProduct.rating}</span>
              </div>

              {/* Price and Discount */}
              <div className="flex items-center gap-2 mt-2">
                <p className="text-green-600 text-xl font-bold">${relatedProduct.price}</p>
                {relatedProduct.discount && (
                  <span className="line-through text-gray-500">${relatedProduct.discount}%</span>
                )}
              </div>
              {/* View Product Button */}
              <Link to={`/shopNow/${relatedProduct._id}`}>
                <button className="border-2 border-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white text-green-600 px-4 py-2 rounded-md mt-4 w-full">
                  <PiShoppingBagFill className="mr-2" /> Shop Now
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No related products available.</p>
        )}
      </div>
    </div>
  );
}

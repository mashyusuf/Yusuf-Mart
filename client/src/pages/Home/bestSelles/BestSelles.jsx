import React from 'react';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'; // Import icons
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Loading from '../../../hooks/Loading';
import Error from '../../../hooks/Error';
import useClickToCart from '../../../hooks/useClickToCart';
import useClickToHeart from '../../../hooks/useClickToHeart';
import { Link } from 'react-router-dom';

export default function BestSelles() {
  const axiosPublic = useAxiosPublic();
  const [handleAddToHeart] = useClickToHeart();
  const [handleAddToCart] = useClickToCart();

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
              <button onClick={() => handleAddToHeart(product)} className="flex items-center text-black hover:text-red-500">
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
          <div className="flex gap-4 items-center">
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

          {/* Availability Status */}
          <p className={`text-lg font-semibold ${product.available === 'In Stock' ? 'text-green-500' : 'text-red-500'}`}>
            {product.available}
          </p>

          {/* Conditional Button */}
          <div className="mt-auto">
            {product.available === 'In Stock' ? (
              <>
                {product.category === 'This Week Only' ? (
                  <Link to={`/shopNow/${product.name}`}>
                    <button className="border-purple-600 border text-purple-600 py-2 px-4 rounded flex items-center justify-center w-full mb-4 hover:bg-purple-700 hover:text-white">
                      <AiOutlineShoppingCart className="mr-2" /> Shop Now
                    </button>
                  </Link>
                ) : (
                  <button onClick={() => handleAddToCart(product)} className="border-purple-600 border text-purple-600 py-2 px-4 rounded flex items-center justify-center w-full hover:bg-purple-700 hover:text-white">
                    <AiOutlineShoppingCart className="mr-2" /> Add to Cart
                  </button>
                )}
              </>
            ) : (
              <button disabled className="border-gray-400 border text-gray-400 py-2 px-4 rounded flex items-center justify-center w-full cursor-not-allowed">
                <AiOutlineShoppingCart className="mr-2" /> Not In Stock
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

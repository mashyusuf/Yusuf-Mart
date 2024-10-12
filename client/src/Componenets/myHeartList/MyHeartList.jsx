
import cartImage from '../../assets/cartLogo.png';
import Pages from '../../pages/shared/Pages/Pages';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAddToHeart from '../../hooks/useAddToHeart';
import {  FaShoppingCart } from 'react-icons/fa';
import { GiCrossMark } from "react-icons/gi";
import { LiaVaadin } from "react-icons/lia"; 
import { GiCavalry } from "react-icons/gi"; 
import { MdOutlineDone } from "react-icons/md"; 
import { PiRocketLaunchLight } from "react-icons/pi"
export default function MyHeartList() {
const [heartItem] = useAddToHeart();
const { user } = useAuth();
  

  return (
    <div className="container mx-auto">
      <Pages />

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
          {heartItem.length === 0 ? (
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
            /* If user is logged in and has items in the cart */
           

<div className="py-10">
  <h1 className="text-2xl mb-5">
    Your Total Cart Items: {heartItem.length} ❤️
  </h1>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {heartItem.map((item, index) => (
      <div key={index} className="border p-3 rounded shadow relative">
        {/* Delete Icon */}
        <button className="absolute top-2 right-2 text-red-600 hover:text-red-800">
          <GiCrossMark className="text-xl" />
        </button>

        {/* Product Image */}
        <img
          src={item.cart.image || item.cart.imageUrl}
          alt={item.cart.name}
          className="object-cover w-full h-28 mb-2 rounded"
        />

        <div className="flex flex-col gap-2">
          {/* Product Name */}
          <h2 className="text-xl font-bold text-purple-600 truncate">
            {item.cart.name}
          </h2>

          {/* Product Description */}
          <p className="text-gray-600 text-sm truncate">
            {item.cart.description}
          </p>

          {/* Category */}
          <p className="text-md text-gray-700 flex items-center gap-1">
            <LiaVaadin className="text-blue-500 hover:text-blue-700" />
            <span>
              <span className="font-bold">Category:</span>{" "}
              <span className="text-blue-500">{item.cart.category}</span>
            </span>
          </p>

          {/* Special Offer */}
          <p className="text-md text-gray-700 flex items-center gap-1">
            <GiCavalry className="text-green-500 hover:text-green-700" />
            <span>
              <span className="font-bold">Special:</span>{" "}
              <span className="text-yellow-500">
                {item.cart.special ? item.cart.special : "No"}
              </span>
            </span>
          </p>

          {/* Price */}
          <p className="text-md font-bold text-gray-700 flex items-center gap-1">
            <MdOutlineDone className="text-gray-600 hover:text-gray-800" />
            <span>
              <span className="font-bold">Price:</span>{" "}
              <span className="text-green-600">
                ${item.cart.discounted_price || item.cart.price}
              </span>
            </span>
          </p>

          {/* Discount */}
          {item.cart.discount && (
            <p className="text-md text-red-500 flex items-center gap-1">
              <PiRocketLaunchLight className="text-red-600 hover:text-red-800" />
              <span>-{item.cart.discount}%</span>
            </p>
          )}

          {/* Availability */}
          <p className="text-md text-gray-700 flex items-center gap-1">
            <span className="font-bold">Available:</span>{" "}
            {item.cart.available ? 'In Stock 🟢' : 'Out of Stock 🔴'}
          </p>
        </div>

        {/* Add to Cart Button */}
        <div className="flex flex-col mt-4">
          <button className="btn border border-purple-600 text-purple-600 hover:bg-purple-700 hover:text-white w-full">
            <FaShoppingCart className="text-lg" />
            Add To Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

          )}
        </>
      )}
    </div>
  );
}

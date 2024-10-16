import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaShoppingCart } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import Loading from "../../../hooks/Loading";

const responsive = {
  superLarge: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  large: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  medium: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  small: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CustomLeftArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-purple-600 text-white p-2 rounded-full"
  >
    &lt;
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-purple-600 text-white p-2 rounded-full"
  >
    &gt;
  </button>
);

export default function ThisWeekProducts() {
  const axiosPublic = useAxiosPublic();

  // Fetching Data from MongoDB
  const {
    data: thisWeekProducts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["thisWeekProducts"],
    queryFn: async () => {
      try {
        const res = await axiosPublic("/thisWeakProducts");
        return res.data;
      } catch (err) {
        console.error("Error fetching data", err);
        throw err;
      }
    },
  });

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-xl font-bold mb-6 text-purple-600">
          This Week's Special Products
        </h1>
      </div>

      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        containerClass="carousel-container gap-x-6"
        itemClass="px-2"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {thisWeekProducts.map((product) => (
          <div
            key={product._id}
            className="relative rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-30" />

            {/* Special: This Week Badge */}
            <div className="absolute top-0 right-0 text-orange-600 font-bold py-1 px-3 rounded-full shadow-lg text-sm sm:text-xs">
              {product.special || "This Week Only"} {/* Fallback text */}
            </div>

            {/* Card Details */}
            <div className="absolute left-0 bottom-0 p-4 text-white bg-gradient-to-t from-black via-transparent to-transparent">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="mb-2">
                {product.description.split(" ").slice(0, 8).join(" ")}...
              </p>
              <p className="font-bold text-yellow-500 mb-4">
                Discount: {product.discount ? `${product.discount}%` : "No Discount"}
              </p>
              <Link to={`/shopNow/${product._id}`}>
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-full flex items-center transition-transform transform hover:scale-105">
                  <FaShoppingCart className="mr-2" /> Shop Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

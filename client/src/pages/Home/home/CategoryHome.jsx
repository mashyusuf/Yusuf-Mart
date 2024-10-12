import React from 'react'
import { HiMiniShoppingCart } from 'react-icons/hi2';

export default function CategoryHome({categoryProducts,truncate}) {
  return (
    <div className="grid container mx-auto grid-cols-2 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
          {categoryProducts.map((product) => {
            /// Determine background color and emoji based on product category
           let badgeClass = "";
           let emoji = "";

           switch (product.category) {
             case "Fruits and Vegetables":
               badgeClass = "bg-gradient-to-r from-red-300 to-red-500";
               emoji = "🍎";
               break;
             case "Bakery and Dairy":
               badgeClass = "bg-gradient-to-r from-yellow-300 to-yellow-500";
               emoji = "🍞🥛";
               break;
             case "Beverages":
               badgeClass = "bg-gradient-to-r from-yellow-300 to-yellow-500";
               emoji = "🥤";
               break;
             case "Pantry Staples":
               badgeClass = "bg-gradient-to-r from-yellow-300 to-yellow-500";
               emoji = "🌽";
               break;
             case "Household Needs":
               badgeClass = "bg-gradient-to-r from-yellow-300 to-yellow-500";
               emoji = "🧺🧹";
               break;
             case "Healthcare":
               badgeClass = "bg-gradient-to-r from-blue-300 to-blue-500";
               emoji = "💉🩺";
               break;
             case "Baby and Pregnancy":
               badgeClass = "bg-gradient-to-r from-purple-300 to-purple-500";
               emoji = "🤰👶";
               break;
             case "Meats and Seafood":
               badgeClass = "bg-gradient-to-r from-orange-300 to-orange-500";
               emoji = "🍖🥩";
               break;
             case "Pet Supplies":
               badgeClass = "bg-gradient-to-r from-pink-400 to-pink-600";
               emoji = "🐶🐱";
               break;
             case "Snacks and Confectionery":
               badgeClass = "bg-gradient-to-r from-yellow-400 to-yellow-600";
               emoji = "";
               break;
             case "Frozen Foods":
               badgeClass = "bg-gradient-to-r from-cyan-400 to-cyan-600";
               emoji = "❄️";
               break;
             default:
               badgeClass = "bg-gray-500";
           }
            return (
              <div key={product._id} className="card bg-white shadow-xl rounded-lg overflow-hidden relative">
                <figure className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-56 w-full object-cover"
                  />
                  {product.special && (
                    <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 rounded-lg flex items-center text-xs font-bold">
                      <span>✨</span>
                      <p className="ml-1">{product.special}</p>
                    </div>
                  )}
                </figure>
                <div className="card-body p-4"> {categoryProducts.length}
                  <div className={`badge ${badgeClass} text-white mb-2 flex items-center`}>
                    {product.category} {emoji}
                  </div>
                  <h2 className="card-title text-lg font-bold text-gray-800 mb-1">
                    {truncate(product.name, 3)}
                  </h2>
                  <p className="text-sm text-slate-500 mb-1">
                    {truncate(product.description, 6)}
                  </p>
                  <div className="flex items-center justify-evenly mb-1">
                    <p className="text-2xl font-extrabold text-red-600">
                      ${product.price}
                    </p>
                    <p className="text-xl font-bold line-through text-gray-500">
                      ${product.discount}
                    </p>
                  </div>

                  <div className="flex items-center mb-1">
                    <p className="flex items-center text-xl text-yellow-500">
                      <span className="text-gray-600 text-base">Rating</span>: {product.rating} ⭐
                    </p>
                    <p className={`ml-3 ${product.available === "In Stock" ? "text-green-600" : "text-red-600"}`}>
                      {product.available === "In Stock" ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>

                  <div className="card-actions">
                    <button className="w-full flex items-center justify-center border border-green-600 text-green-600 py-2 rounded-full hover:bg-green-700 hover:text-white transition-all">
                      <HiMiniShoppingCart className="inline mr-1" />
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
  )
}

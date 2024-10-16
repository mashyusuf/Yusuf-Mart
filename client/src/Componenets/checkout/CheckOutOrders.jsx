import React from 'react';

export default function CheckOutOrders({ cartItems, showAll, product, setShowAll }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span>Product: {product?.name}</span>
        <span>Subtotal</span>
      </div>

      {cartItems.slice(0, showAll ? cartItems.length : 3).map((item, index) => (
        <div key={item.id || index} className="border-t pt-4">
          <div className="flex justify-between">
            <span>{item.cart?.name}</span>
            <span>${item.cart?.price}</span>
          </div>
        </div>
      ))}

      {!showAll && cartItems.length > 3 && (
        <button
          className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400 transition duration-300 mt-4"
          onClick={() => setShowAll(true)}
        >
          Show More
        </button>
      )}

      {/* Subtotal and Total Price */}
      <div className="border-t pt-4">
        <div className="flex justify-between">
          <span>Total Price: </span>
          <span>${cartItems.reduce((sum, item) => sum + item.cart.price, 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

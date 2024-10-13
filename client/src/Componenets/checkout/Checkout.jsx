import React, { useState } from 'react';
import useAddToCart from '../../hooks/useAddToCart';
import { Link } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";
export default function Checkout() {
  const [cartItems] = useAddToCart();
  const [showAll, setShowAll] = useState(false); // State to toggle between showing all or few items
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); // State to manage payment selection

  // Function to handle payment method change
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  return (
    <div className="container mx-auto py-10">
        <div className='flex space-x-2 '>
            <Link to={'/'}><h1 className='flex items-center text-lg text-gray-300'>Home <FaChevronRight /></h1></Link>
            <p className='text-lg text-black'>Checkout</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side: Billing details */}
        <div className="lg:col-span-2 bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name"
                className="border border-purple-600 p-3 w-full rounded"
                required
              />
              <input
                type="text"
                placeholder="Last name"
                className="border border-purple-600 p-3 w-full rounded"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Company name (optional)"
              className="border border-purple-600 p-3 w-full rounded"
            />
            <input
              type="text"
              placeholder="Country / Region"
              className="border border-purple-600 p-3 w-full rounded"
              required
            />
            <input
              type="text"
              placeholder="Street address"
              className="border border-purple-600 p-3 w-full rounded"
              required
            />
            <input
              type="text"
              placeholder="Town / City"
              className="border border-purple-600 p-3 w-full rounded"
              required
            />
            <input
              type="text"
              placeholder="State / County"
              className="border border-purple-600 p-3 w-full rounded"
              required
            />
            <input
              type="text"
              placeholder="ZIP / Postal code"
              className="border border-purple-600 p-3 w-full rounded"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              className="border border-purple-600 p-3 w-full rounded"
              required
            />
            <input
              type="email"
              placeholder="Email address"
              className="border border-purple-600 p-3 w-full rounded"
              required
            />

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="terms"
                className="mr-2"
                required
              />
              <label htmlFor="terms">
                I have read and agree to the website <a href="#" className="text-purple-600">terms and conditions</a> *
              </label>
            </div>
          </form>
        </div>

        {/* Right side: Order summary */}
        <div className="bg-gray-100 p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-6">
            Your order: <span className="ml-1">{cartItems.length}</span>
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Product</span>
              <span>Subtotal</span>
            </div>

            {cartItems.slice(0, showAll ? cartItems.length : 3).map((product) => (
              <div key={product.id} className="border-t pt-4">
                <div className="flex justify-between">
                  <span>{product.cart.name}</span>
                  <span>{product.cart.price}</span>
                </div>
              </div>
            ))}

            {/* Show More Button */}
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
                <span>Total Price : </span>
                <span>${cartItems.reduce((sum, product) => sum + product.cart.price, 0).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Payment Method</h3>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="checkPayment"
                name="payment"
                value="Check Payments"
                checked={selectedPaymentMethod === 'Check Payments'}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="checkPayment">Check Payments</label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="cod"
                name="payment"
                value="Cash on Delivery"
                checked={selectedPaymentMethod === 'Cash on Delivery'}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="cod">Cash on Delivery</label>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="mt-6">
            <button
              disabled={!selectedPaymentMethod}
              className={`w-full py-3 rounded text-white transition duration-300 ${
                selectedPaymentMethod ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Place order
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-600">
            Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}

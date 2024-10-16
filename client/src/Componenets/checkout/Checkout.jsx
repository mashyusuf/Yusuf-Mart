import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight, FaSpinner } from "react-icons/fa"; 
import useAddToCart from '../../hooks/useAddToCart';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../form/CheckoutFrom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import CheckOutOrders from './CheckOutOrders';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

export default function Checkout() {
  const location = useLocation(); 
  const { product, quantity } = location.state || {}; 
  const [cartItems] = useAddToCart(); 
  const [showAll, setShowAll] = useState(false); 
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [formData, setFormData] = useState(null); 
  const [email, setEmail] = useState(''); // Added email state
  const { user } = useAuth();

  // Handle payment method change
  const handlePaymentMethodChange = (event) => {
    const method = event.target.value;
    setSelectedPaymentMethod(method);

    if (method === 'Cash on Delivery') {
      setShowStripeForm(false);
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are choosing Cash on Delivery.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, proceed',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Confirmed!', 'Your order will be processed with Cash on Delivery.', 'success');
        } else {
          setSelectedPaymentMethod('');
        }
      });
    } else if (method === 'Check Payments') {
      setShowStripeForm(true);
    }
  };

  // Handle details form submission
  const handleDetailsInfo = event => {
    event.preventDefault();
    setLoading(true); // Set loading state to true when submitting

    const form = event.target;
    const newFormData = {
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      companyname: form.companyname.value,
      country: form.country.value,
      streetaddress: form.streetaddress.value,
      city: form.city.value,
      state: form.state.value,
      zip: form.zip.value,
      phone: form.phone.value,
      email: email, // Use the state variable here
      terms: form.terms.checked
    };
    
    console.log(newFormData);
    setFormData(newFormData); // Update formData state

    // Simulate loading and show Payment Method after form submission
    setTimeout(() => {
      setLoading(false); // Set loading back to false
      setShowPaymentMethod(true); // Show payment methods after submitting details
    }, 1500); // Simulating loading for 1.5 seconds
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Update email state on input change
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex space-x-2 ">
        <Link to={"/"}>
          <h1 className="flex items-center text-lg text-gray-300">
            Home <FaChevronRight />
          </h1>
        </Link>
        <p className="text-lg text-black">Checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side: Billing details */}
        <div className="lg:col-span-2 bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
          <form onSubmit={handleDetailsInfo} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstname"
                placeholder="First name"
                className="border border-purple-600 p-3 w-full rounded"
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last name"
                className="border border-purple-600 p-3 w-full rounded"
                required
              />
            </div>
            <input
              type="text"
              name="companyname"
              placeholder="Company name (optional)"
              className="border border-purple-600 p-3 w-full rounded"
            />
            <input
              type="text"
              name="country"
              placeholder="Country / Region"
              className="border border-purple-600 p-3 w-full rounded"
              required
            />
            <input
              type="text"
              name="streetaddress"
              placeholder="Street address"
              className="border border-purple-600 p-3 w-full rounded"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="Town / City"
              className="border border-purple-600 p-3 w-full rounded"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State / County"
              className="border border-purple-600 p-3 w-full rounded"
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP / Postal code"
              className="border border-purple-600 p-3 w-full rounded"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="border border-purple-600 p-3 w-full rounded"
              required
            />
            <input
              value={user?.email} // Controlled input
              onChange={handleEmailChange} // Add onChange handler
              type="email"
              name="email"
              placeholder="Email address"
              className="border border-purple-600 p-3 w-full rounded"
              required
            />
            <div className="flex items-center mt-4">
              <input
                name="terms"
                type="checkbox"
                id="terms"
                className="mr-2"
                required
              />
              <label htmlFor="terms">
                I have read and agree to the website{" "}
                <a href="#" className="text-purple-600">
                  terms and conditions
                </a>{" "}
                *
              </label>
            </div>

            {/* Submit Details button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center bg-white border border-purple-600 text-purple-600 p-3 rounded hover:bg-purple-600 hover:text-white transition-all duration-200 font-bold"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Submit Details"
              )}
            </button>
          </form>
        </div>

        {/* Right side: Order summary */}
        <div className="bg-gray-100 p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-6">
            Your order: <span className="ml-1">{cartItems.length}</span>
          </h2>
          {/* orders */}
          <CheckOutOrders
            setShowAll={setShowAll}
            showAll={showAll}
            product={product}
            cartItems={cartItems}
          />

          {/* Conditionally render Payment Methods */}
          {showPaymentMethod && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Payment Method</h3>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="checkPayment"
                  name="payment"
                  value="Check Payments"
                  checked={selectedPaymentMethod === "Check Payments"}
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
                  checked={selectedPaymentMethod === "Cash on Delivery"}
                  onChange={handlePaymentMethodChange}
                  className="mr-2"
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
            </div>
          )}

          {/* Conditionally render Stripe checkout form */}
          {showStripeForm && (
            <Elements stripe={stripePromise}>
              <CheckoutForm
                formData={formData}
                selectedPaymentMethod={selectedPaymentMethod}
                cartItems={cartItems}
                product={product}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}

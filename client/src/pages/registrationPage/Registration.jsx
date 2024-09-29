import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Registration() {
  const [role, setRole] = useState('customer');

  return (
    <div className="flex justify-center items-center h-screen mt-10 mb-10 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          <Link to={'/login'}><span className="text-gray-400">Login</span></Link> <span className="text-black">Register</span>
        </h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          There are many advantages to creating an account: the payment process is faster, shipment tracking is possible and much more.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Username *</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Username"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email address *</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password *</label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <div className="flex  items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={role === 'customer'}
                  onChange={() => setRole('customer')}
                  className="text-blue-500 focus:ring-blue-400"
                />
                <span>I am a customer</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="vendor"
                  checked={role === 'vendor'}
                  onChange={() => setRole('vendor')}
                  className="text-blue-500 focus:ring-blue-400"
                />
                <span>I am a vendor</span>
              </label>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
          </p>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

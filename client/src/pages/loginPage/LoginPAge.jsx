import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="flex justify-center  items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          <span className="text-black">Login</span> <Link to={'/signin'}><span className=" text-gray-400">Register</span></Link>
        </h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          If you have an account, sign in with your username or email address.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Username or email address *</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Username or email"
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

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="text-blue-500 focus:ring-blue-400"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">Lost your password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

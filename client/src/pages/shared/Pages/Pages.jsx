import React from 'react'
import { Link } from 'react-router-dom'

export default function Pages() {
  return (
    <div>
        {/* Carousel Section */}
        <div className="hidden lg:flex justify-between pb-4">
          <Link to="/" className="text-gray-700 hover:text-purple-600">Home</Link>
          <Link to="/shop" className="text-gray-700 hover:text-purple-600">Shop</Link>
          <Link to="/fruits-vegetables" className="text-gray-700 hover:text-purple-600">Fruits & Vegetables</Link>
          <Link to="/beverages" className="text-gray-700 hover:text-purple-600">Beverages</Link>
          <Link to="/blog" className="text-gray-700 hover:text-purple-600">Blog</Link>
          <Link to="/contact" className="text-gray-700 hover:text-purple-600">Contact</Link>
          <Link to="/trending" className="text-gray-700 hover:text-purple-600">Trending Products</Link>
        </div>
    </div>
  )
}

import React from 'react'
import Pages from '../shared/Pages/Pages'
import Navbar from '../shared/Navbar/Navbar'
import DiscountOffer from '../shared/dicountOffer/DiscountOffer'
import errorImg from '../../assets/404.png.png'
import { Link } from 'react-router-dom'
import Footer from '../shared/Footer/Footer'
export default function ErrorPage() {
  return (
    <div>
        <div>
        <div className="hidden md:block">
      <DiscountOffer />
      </div>
            <Navbar />
        </div>
        <div className='container mx-auto'>
        <Pages />
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <img src={errorImg} alt="404 Error" className="w-1/2 max-w-md mb-8" />
      <h1 className="text-3xl font-bold mb-4">That Page Can't Be Found</h1>
      <p className="text-gray-600 mb-6">
        It looks like nothing was found at this location. Maybe try to search for what you are looking for?
      </p>
      <Link
        href="/"
        className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition-colors"
      >
        Go To Homepage
      </Link>
    </div>
    <Footer />
    </div>
  )
}

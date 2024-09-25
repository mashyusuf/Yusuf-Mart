import React from 'react';
import { Outlet } from 'react-router-dom';
import DiscountOffer from '../pages/shared/dicountOffer/DiscountOffer';
import Navbar from '../pages/shared/Navbar/Navbar';
import ThisWeakProducts from '../pages/Home/thisWeakProducts/ThisWeakProducts';
import NewArrivals from '../pages/Home/newArrivals/NewArrivals';
import DiscountProducts from '../pages/Home/discountPRoducts/DiscountProducts';
import SuperOffer from '../pages/Home/superOffer/SuperOffer';
import BestSelles from '../pages/Home/bestSelles/BestSelles';
import DiscountImg from '../pages/Home/discountImg/DiscountImg';
import Reviews from '../pages/Home/reviews/Reviews';
import Footer from '../pages/shared/Footer/Footer';

function Main() {
  return (
    <div>
      {/* Show DiscountOffer only on md and larger devices */}
      <div className="hidden md:block">
      <DiscountOffer />
      </div>
      <Navbar />
      <Outlet />
      <ThisWeakProducts />
      <NewArrivals />
      <DiscountProducts />
      <SuperOffer />
      <BestSelles />
      <DiscountImg />
      <Reviews />
      <Footer />
    </div>
  );
}

export default Main;

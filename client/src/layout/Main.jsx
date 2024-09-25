import React from 'react';
import { Outlet } from 'react-router-dom';
import DiscountOffer from '../pages/shared/dicountOffer/DiscountOffer';
import Navbar from '../pages/shared/Navbar/Navbar';
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
      <Footer />
    </div>
  );
}

export default Main;

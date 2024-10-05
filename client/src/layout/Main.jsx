import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DiscountOffer from '../pages/shared/dicountOffer/DiscountOffer';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';

function Main() {
  const location = useLocation();
  const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signUp')
  return (
    <div>
      {/* Show DiscountOffer only on md and larger devices */}
      <div className="hidden md:block">
      <DiscountOffer />
      </div>
     {noHeaderFooter ||  <Navbar />}
      <Outlet />
     {noHeaderFooter ||  <Footer />}
    </div>
  );
}

export default Main;

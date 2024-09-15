import React from 'react';
import { Outlet } from 'react-router-dom';
import DiscountOffer from '../pages/shared/dicountOffer/DiscountOffer';
import Navbar from '../pages/shared/Navbar/Navbar';

function Main() {
  return (
    <div>
      {/* Show DiscountOffer only on md and larger devices */}
      <div className="hidden md:block">
        <DiscountOffer />
      </div>
      <Navbar></Navbar>
     
      <Outlet />
    </div>
  );
}

export default Main;

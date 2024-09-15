import React from 'react';
import { Outlet } from 'react-router-dom';
import DiscountOffer from '../pages/shared/dicountOffer/DiscountOffer';
import Navbar from '../pages/shared/Navbar/Navbar';
import CategorySection from '../pages/shared/CategorySection/CategorySection';

function Main() {
  return (
    <div>
      {/* Show DiscountOffer only on md and larger devices */}
      <div className="hidden md:block">
        <DiscountOffer />
      </div>
      <Navbar></Navbar>
      <CategorySection></CategorySection>
      <Outlet />
    </div>
  );
}

export default Main;

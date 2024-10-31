import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DiscountOffer from '../pages/shared/dicountOffer/DiscountOffer';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';
import Loading from '../hooks/Loading';

function Main() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signUp');

  useEffect(() => {
    // Simulate loading with a timeout (adjust the time as needed)
    const timer = setTimeout(() => setLoading(false), 1500);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (loading) {
    return <Loading />; // Your loading component here
  }

  return (
    <div>
      {/* Show DiscountOffer only on md and larger devices */}
      <div className="hidden md:block">
        <DiscountOffer />
      </div>
      {noHeaderFooter || <Navbar />}
      <Outlet />
      {noHeaderFooter || <Footer />}
    </div>
  );
}

export default Main;

import React, { useState } from "react";
import { FaHome, FaMoneyCheckAlt, FaBars, FaTimes } from "react-icons/fa"; 
import logo from "../../assets/logoo.png";
import { Link, Outlet } from "react-router-dom"; // Import Outlet
import { Helmet } from "react-helmet-async";

export default function DashBoard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex h-screen">
      <Helmet>
                <title>DashBoard</title>
            </Helmet>
      {/* Sidebar / Drawer */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-purple-600 text-white transition-transform duration-300 transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-50`}
      >
        <div className="flex items-center justify-between p-4">
          <Link to={"/"} className="flex items-center justify-center">
            <img src={logo} alt="Logo" className="h-20 " />
            <h1 className="text-md text-white font-bold">
              YUSUF MART GROCERY SHOP
            </h1>
          </Link>
          <button className="lg:hidden" onClick={toggleDrawer}>
            <FaTimes className="text-xl" />
          </button>
        </div>

        <nav className="flex flex-col mt-10 space-y-4">
          <Link to={'/'}
            className="flex items-center px-4 py-2 hover:bg-purple-500"
          >
            <FaHome className="mr-2" />
            User Home
          </Link>
          <Link
            to={'/dashboard/payment-history'}
            className="flex items-center px-4 py-2 hover:bg-purple-500"
          >
            <FaMoneyCheckAlt className="mr-2" />
            Payment History
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-6 bg-gray-100">
        <button className="lg:hidden mb-4 p-2" onClick={toggleDrawer}>
          <FaBars className="text-xl" />
        </button>

        {/* Dashboard content */}
        <div>
          <h1 className="text-2xl font-bold mb-6">
            Hi, Welcome Back To Yusuf Mart !
          </h1>

          <Outlet /> {/* This is where child components like PaymentHistory will render */}
        </div>
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={toggleDrawer}
        />
      )}
    </div>
  );
}

import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const Root = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Root;

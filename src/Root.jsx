import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const Root = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="w-[1300px] mx-auto pt-20">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Root;

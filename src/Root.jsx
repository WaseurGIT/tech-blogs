import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const Root = () => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Navbar />
      <div className="flex-1 w-full">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 sm:pb-12">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Root;

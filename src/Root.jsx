import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "./context/ThemeProvider";
import Footer from "./components/Footer";

const Root = () => {
  const {theme} = useContext(ThemeContext)
  return (
    <div className={`w-[1300px] mx-auto ${theme} bg-[var(--bg-primary)] text-[var(--text-primary)]`}>
      <Navbar />
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default Root;

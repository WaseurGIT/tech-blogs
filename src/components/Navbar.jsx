import React from "react";
import { IoPersonCircle } from "react-icons/io5";

const Navbar = () => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/blogs", label: "Blogs" },
    { path: "/saved", label: "Saved" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-20 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold">
            Blog<span className="text-orange-500">i</span>fy
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <IoPersonCircle className="text-3xl text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-200" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

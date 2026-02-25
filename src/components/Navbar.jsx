import React, { useContext } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
      // console.error("Logout error:", error);
    }
  };

  const links = [
    { path: "/", label: "Home" },
    { path: "/blogs", label: "Blogs" },
    { path: "/saved", label: "Saved" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-20 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold whitespace-nowrap"
          >
            Blog<span className="text-orange-500">i</span>fy
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
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

        {/* Mobile Menu Indicator */}
        <div className="flex md:hidden">
          <button className="text-gray-600 hover:text-gray-900 text-lg">
            &#9776;
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-orange-500 transition-all"
                  />
                ) : (
                  <IoPersonCircle className="text-2xl sm:text-3xl text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-200" />
                )}
              </div>
              <button
                onClick={handleLogout}
                className="text-red-500 cursor-pointer font-medium text-sm px-3 sm:px-4 py-2 rounded-md transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 font-medium text-sm"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

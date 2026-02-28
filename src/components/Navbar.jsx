import React, { useContext, useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import axiosSecure from "../api/axiosSecure";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/userData/${user.email}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

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
      setMobileMenuOpen(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const links = [
    { path: "/", label: "Home" },
    { path: "/blogs", label: "Blogs" },
    ...(user ? [
      { path: "/savedBlogs", label: "Saved" },
      { path: "/profile", label: "Profile" },
    ] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-lg sm:text-2xl font-bold whitespace-nowrap"
          >
            Blog<span className="text-orange-500">i</span>fy
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-600 hover:text-gray-900 text-2xl p-1"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transition-transform ${mobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* User Profile - Desktop */}
        <div className="hidden md:flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-3">
                {userData?.profilePicture ? (
                  <img
                    src={`/uploads/${userData.profilePicture}`}
                    alt={user.displayName}
                    className="w-9 h-9 rounded-full cursor-pointer hover:ring-2 hover:ring-orange-500 transition-all"
                  />
                ) : (
                  <div className="text-white font-medium bg-purple-500 text-sm w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all">
                    {user.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="text-red-500 cursor-pointer font-medium text-sm px-3 sm:px-4 py-2 rounded-md hover:bg-red-50 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 font-medium text-sm px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-gray-900 font-medium text-sm py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
          {user ? (
            <div className="pt-3 border-t border-gray-200 space-y-3">
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-600 hover:text-gray-900 font-medium text-sm py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-red-500 cursor-pointer font-medium text-sm py-2 px-3 rounded-md hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-gray-900 font-medium text-sm py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const Error = () => {
  const error = useRouteError();
  const status = error?.status || 404;
  const statusText = error?.statusText || "Page Not Found";

  const errorMessages = {
    404: {
      title: "Oops! Page Not Found",
      description: "The page you're looking for doesn't exist or has been moved.",
      icon: "🔍",
    },
    500: {
      title: "Server Error",
      description: "Something went wrong on our end. Please try again later.",
      icon: "⚠️",
    },
    default: {
      title: "Something Went Wrong",
      description: "An unexpected error occurred. Please try again.",
      icon: "❌",
    },
  };

  const errorInfo = errorMessages[status] || errorMessages.default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-md sm:max-w-lg w-full">
        {/* Error Icon */}
        <div className="text-5xl sm:text-7xl mb-6">{errorInfo.icon}</div>

        {/* Error Code */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
          {status}
        </h1>

        {/* Error Title */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
          {errorInfo.title}
        </h2>

        {/* Error Description */}
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-8 leading-relaxed">
          {errorInfo.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition cursor-pointer text-sm sm:text-base w-full sm:w-auto"
          >
            <IoArrowBack className="w-5 h-5" />
            Go Back
          </button>
          <Link
            to="/"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition text-sm sm:text-base text-center w-full sm:w-auto"
          >
            Back to Home
          </Link>
        </div>

        {/* Additional Links */}
        <div className="mt-8 sm:mt-12 pt-8 border-t border-gray-300">
          <p className="text-gray-600 mb-4 text-sm sm:text-base">Quick Links:</p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <Link to="/" className="text-orange-500 hover:text-orange-600 font-medium text-xs sm:text-sm">
              Home
            </Link>
            <Link to="/blogs" className="text-orange-500 hover:text-orange-600 font-medium text-xs sm:text-sm">
              Blogs
            </Link>
            <Link to="/profile" className="text-orange-500 hover:text-orange-600 font-medium text-xs sm:text-sm">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;

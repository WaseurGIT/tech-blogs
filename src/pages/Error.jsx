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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="text-7xl mb-6">{errorInfo.icon}</div>

        {/* Error Code */}
        <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 mb-4">
          {status}
        </h1>

        {/* Error Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          {errorInfo.title}
        </h2>

        {/* Error Description */}
        <p className="text-gray-600 text-base sm:text-lg mb-8">
          {errorInfo.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition cursor-pointer"
          >
            <IoArrowBack className="w-5 h-5" />
            Go Back
          </button>
          <Link
            to="/"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>

        {/* Additional Links */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-gray-600 mb-4">Quick Links:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="text-orange-500 hover:text-orange-600 font-medium">
              Home
            </Link>
            <Link to="/blogs" className="text-orange-500 hover:text-orange-600 font-medium">
              Blogs
            </Link>
            <Link to="/profile" className="text-orange-500 hover:text-orange-600 font-medium">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;

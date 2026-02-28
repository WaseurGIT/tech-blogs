import React from "react";
import { IoArrowForward } from "react-icons/io5";

const Banner = () => {
  return (
    <div className="relative w-full h-screen md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden mb-12 sm:mb-16 md:mb-20 lg:mb-24">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 w-full">
        <div className="max-w-3xl mx-auto text-center lg:text-left">
          {/* Subtitle */}
          <p className="text-orange-500 font-semibold text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-4 md:mb-6">
            Welcome to Our Tech Blog Community
          </p>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight">
            Explore the Latest in{" "}
            <span className="text-orange-500">Technology</span> & Development
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Discover in-depth articles, tutorials, and insights on AI, Web
            Development, DevOps, and more. Stay updated with the latest trends
            in tech.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base">
              Start Reading
              <IoArrowForward className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition duration-300 ease-in-out text-xs sm:text-sm md:text-base">
              Learn More
            </button>
          </div>

          {/* Stats Section */}
          <div className="mt-8 sm:mt-10 md:mt-14 lg:mt-16 grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 max-w-xl mx-auto lg:mx-0">
            <div className="text-center lg:text-left">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">
                10+
              </p>
              <p className="text-gray-300 text-xs sm:text-sm mt-1 md:mt-2">
                Articles
              </p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">
                5+
              </p>
              <p className="text-gray-300 text-xs sm:text-sm mt-1 md:mt-2">
                Categories
              </p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">
                1K+
              </p>
              <p className="text-gray-300 text-xs sm:text-sm mt-1 md:mt-2">
                Community
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block">
        <div className="text-white text-center">
          <p className="text-xs sm:text-sm mb-2">Scroll to explore</p>
          <div className="animate-bounce">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;

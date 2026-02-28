import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-text-primary mt-16 sm:mt-20 lg:mt-24">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* About Section */}
          <div className="flex flex-col text-center sm:text-left">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-blue mb-4">
              TechBlogs
            </h3>
            <p className="text-text-secondary text-xs sm:text-sm lg:text-base leading-relaxed">
              Sharing insights, stories, and knowledge about technology,
              programming, and digital innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg lg:text-xl font-semibold mb-4 text-primary-blue">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm lg:text-base">
              <li>
                <a
                  href="/"
                  className="text-text-secondary hover:text-primary-blue transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/blogs"
                  className="text-text-secondary hover:text-primary-blue transition"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary-blue transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary-blue transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg lg:text-xl font-semibold mb-4 text-primary-blue">
              Categories
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm lg:text-base">
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary-blue transition"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary-blue transition"
                >
                  Mobile Apps
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary-blue transition"
                >
                  AI & Machine Learning
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary-blue transition"
                >
                  DevOps
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg lg:text-xl font-semibold mb-4 text-primary-blue">
              Follow Us
            </h4>
            <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-blue flex items-center justify-center hover:bg-secondary-blue transition text-base sm:text-lg text-white"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-blue flex items-center justify-center hover:bg-secondary-blue transition text-base sm:text-lg text-white"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-blue flex items-center justify-center hover:bg-secondary-blue transition text-base sm:text-lg text-white"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-blue flex items-center justify-center hover:bg-secondary-blue transition text-base sm:text-lg text-white"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-text-secondary opacity-20"></div>

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm lg:text-base text-text-secondary text-center sm:text-left">
          <p>© 2026 TechBlogs. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="hover:text-primary-blue transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-blue transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

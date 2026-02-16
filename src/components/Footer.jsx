import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-text-primary mt-16">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* About Section */}
          <div className="flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold text-primary-blue mb-4">
              TechBlogs
            </h3>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              Sharing insights, stories, and knowledge about technology,
              programming, and digital innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg md:text-xl font-semibold mb-4 text-primary-blue">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm md:text-base">
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
          <div>
            <h4 className="text-lg md:text-xl font-semibold mb-4 text-primary-blue">
              Categories
            </h4>
            <ul className="space-y-2 text-sm md:text-base">
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
          <div>
            <h4 className="text-lg md:text-xl font-semibold mb-4 text-primary-blue">
              Follow Us
            </h4>
            <div className="flex gap-4 text-[var(--text-secondary)] ">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-blue flex items-center justify-center hover:bg-secondary-blue transition text-lg"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-blue flex items-center justify-center hover:bg-secondary-blue transition text-lg"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-blue flex items-center justify-center hover:bg-secondary-blue transition text-lg"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-blue flex items-center justify-center hover:bg-secondary-blue transition text-lg"
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
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm md:text-base text-text-secondary">
          <p>© 2026 TechBlogs. All rights reserved.</p>
          <div className="flex gap-6">
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

import React, { useContext, useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import add1 from "../assets/ad_1.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import axiosSecure from "../api/axiosSecure";

const Blogs = () => {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const categories = [
    "All",
    "Artificial Intelligence",
    "Web Development",
    "DevOps",
    "Software Engineering",
    "Cyber Security",
    "Data Science",
  ];

  const handleCategories = (category) => {
    axiosSecure.get("/blogs").then((res) => {
      const filteredBlogs =
        category === "All"
          ? res.data.data || res.data
          : (res.data.data || res.data).filter(
              (blog) => blog.category.toLowerCase() === category.toLowerCase(),
            );
      setBlogs(filteredBlogs);
    });
  };

  useEffect(() => {
    axiosSecure.get("/blogs").then((response) => {
      if (Array.isArray(response.data)) {
        setBlogs(response.data);
      } else if (Array.isArray(response.data.data)) {
        setBlogs(response.data.data);
      } else {
        setBlogs([]);
      }
    });
  }, []);

  return (
    <div className="mb-12 sm:mb-20 lg:mb-36 px-4 sm:px-6 lg:px-8">
      {/* Category Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 sm:mb-12 lg:mb-16 flex-wrap">
        <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 justify-center sm:justify-start w-full">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategories(category)}
              className="cursor-pointer px-3 sm:px-4 py-2 text-[var(--text-primary)] bg-[var(--bg-secondary)] hover:bg-gray-300 rounded-lg text-xs sm:text-sm font-medium transition duration-200 whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>
        {user && (
          <Link 
            to="/createBlog" 
            className="flex items-center justify-center gap-2 px-4 py-2 text-blue-500 border-2 border-blue-500 rounded-full cursor-pointer hover:bg-blue-50 transition whitespace-nowrap font-semibold text-sm"
          >
            +New Blog
          </Link>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Blog Posts Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6">
          {blogs.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No blogs available</p>
          ) : (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          )}
        </div>

        {/* Sidebar Ads - Hidden on mobile, visible on lg screens */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-4">
          <img src={add1} alt="Advertisement" className="w-full h-auto object-contain rounded-lg" />
          <img src={add1} alt="Advertisement" className="w-full h-auto object-contain rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default Blogs;

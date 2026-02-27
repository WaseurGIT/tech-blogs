import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import add1 from "../assets/ad_1.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Blogs = () => {
  const {user} = useContext(AuthContext);
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
    axios.get("http://localhost:5000/blogs").then((res) => {
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
    axios
      .get("http://localhost:5000/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  return (
    <div className="mb-12 sm:mb-20 lg:mb-36">
      <div className="flex justify-center mb-6 sm:mb-8 lg:mb-12 px-4">
        <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategories(category)}
              className="cursor-pointer px-3 sm:px-4 py-2 text-[var(--text-primary)] bg-[var(--bg-secondary)] hover:bg-gray-300 rounded-lg text-xs sm:text-sm font-medium transition duration-200"
            >
              {category}
            </button>
          ))}
        </div>
        <div className={` ml-4 flex px-2 items-center justify-center text-blue-500 border rounded-full cursor-pointer ${user ? '' : 'hidden'}`}>
          <Link to="/createBlog" className="text-lg font-semibold">+New Blog</Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-0">
        <div className="md:col-span-2 space-y-4 sm:space-y-6">
          {blogs.length === 0 ? (
            <p className="text-center text-gray-500">No blogs available</p>
          ) : (
            blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          )}
        </div>
        <div className="col-span-1 hidden lg:block">
          <img src={add1} alt="" className="w-full h-50 object-contain mb-4" />
          <img src={add1} alt="" className="w-full h-50 object-contain my-2" />
        </div>
      </div>
    </div>
  );
};

export default Blogs;

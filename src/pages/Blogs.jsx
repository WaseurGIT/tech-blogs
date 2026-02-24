import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
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
    axios.get("/blogs.json").then((res) => {
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
      .get("/blogs.json")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  return (
    <div className="my-36">
      <div className="flex justify-center mb-8">
        <div className="flex gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategories(category)}
              className="cursor-pointer px-4 py-2 text-[var(--text-primary)] bg-[var(--bg-secondary)] hover:bg-gray-300 rounded-lg text-sm font-medium"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-2">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs available</p>
        ) : (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        )}
      </div>
    </div>
  );
};

export default Blogs;

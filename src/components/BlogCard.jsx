import React, { useContext, useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { PiShareFatLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import axiosSecure from "../api/axiosSecure";
import Swal from "sweetalert2";

const BlogCard = ({ blog }) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

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

  const handleSavedBlog = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in to save blogs.");
      return;
    }

    try {
      await axiosSecure.post("/savedBlogs", {
        userEmail: user.email,
        blogId: blog._id,
      });

      Swal.fire({
        title: "Saved!",
        text: "Blog has been saved to your profile.",
        icon: "success",
      });
    } catch (err) {
      if (err.response?.status === 409) {
        Swal.fire({
          title: "Already Saved",
          text: "You already saved this blog.",
          icon: "info",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to save blog.",
          icon: "error",
        });
      }
    }
  };

  if (!blog) {
    return <div>No blog data available</div>;
  }

  return (
    <Link to={`/blogs/${blog._id}`}>
      <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-5 mb-3 hover:-translate-y-1">
        {/* Author Section */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${blog.authorImage}`}
            alt={blog.author}
            className="w-12 h-12 rounded-full object-cover border border-gray-200"
          />

          <div>
            <p className="text-base font-semibold text-gray-800">
              {blog.author}
            </p>

            {/* Date */}
            <span className="text-sm">
              {blog.publishedDate
                ? new Date(blog.publishedDate).toLocaleDateString("en-BD", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </span>
          </div>
        </div>

        {/* Blog Title */}
        <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition mb-4 line-clamp-2">
          {blog.title}
        </h2>

        <span className=" text-gray-700 text-sm font-medium mb-2">
          {blog.readTime} mins
        </span>

        {/* Bottom Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Stats */}
          <div className="flex items-center gap-5 text-gray-600">
            <div className="flex items-center gap-1 hover:text-red-500 transition">
              <IoIosHeart className="w-5 h-5" />
              <span className="text-sm font-medium">{blog.likes || 0}</span>
            </div>

            <div className="flex items-center gap-1 hover:text-blue-500 transition">
              <FaRegComment className="w-4 h-4" />
              <span className="text-sm font-medium">
                {blog.comments?.length || 0}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSavedBlog(e);
              }}
              className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-500 transition-all duration-300"
            >
              <CiBookmark className="w-5 h-5" />
            </button>

            <button className="p-2 rounded-full bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-500 transition-all duration-300">
              <PiShareFatLight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

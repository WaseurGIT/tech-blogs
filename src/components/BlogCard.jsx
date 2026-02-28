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
      <div className="cursor-pointer border-2 rounded-lg sm:rounded-xl md:rounded-2xl mb-4 sm:mb-6 hover:shadow-lg transition-shadow duration-200 overflow-hidden h-full">
        <div className="">
          <div className="relative">
            <img
              src={`/uploads/${blog.imageOne}`}
              alt={blog.title}
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
            />
            <span className="absolute top-2 sm:top-3 right-2 bg-white px-2 sm:px-4 py-1 rounded-lg text-xs sm:text-sm font-medium z-10">
              {blog.category}
            </span>
            <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 w-full px-2 sm:px-3 py-2 bg-gradient-to-t from-black via-black/50 to-transparent">
              <img
                src={`/uploads/${blog.authorImage}`}
                alt={blog.author}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
              />
              <h1 className="text-white font-bold text-xs sm:text-base md:text-lg truncate">
                {blog.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-around my-2 sm:my-3 px-2 sm:px-0">
            <div className="flex items-center gap-1">
              <IoIosHeart className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-red-500 transition" />
              <span className="text-sm sm:text-base">{blog.likes || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRegComment className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-blue-500 transition" />
              <span className="text-sm sm:text-base">
                {blog.comments?.length || 0}
              </span>
            </div>
            <CiBookmark
              onClick={handleSavedBlog}
              className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-orange-500 transition"
            />
            <PiShareFatLight className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-green-500 transition" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

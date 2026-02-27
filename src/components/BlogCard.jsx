import React, { useContext, useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { PiShareFatLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";

const BlogCard = ({ blog }) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/userData/${user.email}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  if (!blog) {
    return <div>No blog data available</div>;
  }

  return (
    <Link to={`/blogs/${blog._id}`}>
      <div className="cursor-pointer border-2 rounded-lg sm:rounded-xl md:rounded-2xl mb-4 sm:mb-6 hover:shadow-lg transition-shadow duration-200">
        <div className="">
          <div className="relative">
            <img
              src={`http://localhost:5000/uploads/${blog.imageOne}`}
              alt={blog.title}
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
            />
            <span className="absolute top-2 sm:top-3 right-2 bg-white px-2 sm:px-4 py-1 rounded-lg text-xs sm:text-sm font-medium">
              {blog.category}
            </span>
            <div className="absolute bottom-2 left-2 flex items-center gap-2 w-full pr-4">
              <img
                src={
                  userData?.profilePicture
                    ? `http://localhost:5000/uploads/${userData.profilePicture}`
                    : null
                }
                alt={user?.displayName}
                className="w-10 h-10 sm:w-10 sm:h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-orange-500 transition-all"
              />
              <h1 className="text-white font-bold text-xs sm:text-lg md:text-xl truncate">
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
            <CiBookmark className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-orange-500 transition" />
            <PiShareFatLight className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-green-500 transition" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

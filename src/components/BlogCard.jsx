import React from "react";
import { CiBookmark } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { IoIosHeartEmpty, IoIosShareAlt } from "react-icons/io";
import { PiShareFatLight } from "react-icons/pi";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`}>
      <div className="cursor-pointer border-2 rounded-lg sm:rounded-xl md:rounded-2xl mb-4 sm:mb-6 hover:shadow-lg transition-shadow duration-200">
        <div className="">
          <div className="relative">
            <img
              src={blog.image_one}
              alt={blog.title}
              className="w-full h-48 sm:h-64 md:h-80 mb-2 rounded-lg object-cover hover:opacity-90 transition-opacity"
            />
            <span className="absolute top-2 sm:top-3 right-2 bg-white px-2 sm:px-4 py-1 rounded-lg text-xs sm:text-sm font-medium">
              {blog.category}
            </span>
            <div className="absolute bottom-2 left-2 flex items-center gap-2 w-full pr-4">
              <img
                src={blog.author_profile}
                alt={blog.author}
                className="w-6 sm:w-8 h-6 sm:h-8 rounded-full object-cover flex-shrink-0"
              />
              <h1 className="text-white font-bold text-xs sm:text-lg md:text-xl truncate">
                {blog.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-around my-2 sm:my-3 px-2 sm:px-0">
            <div className="flex items-center gap-1">
              <IoIosHeartEmpty className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-red-500 transition" />
              <span className="text-sm sm:text-base">{blog.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRegComment className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-blue-500 transition" />
              <span className="text-sm sm:text-base">{blog.comments.length}</span>
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

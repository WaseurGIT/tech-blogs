import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import { FaRegComment, FaCalendarAlt } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/blogs.json")
      .then((response) => {
        const foundBlog = response.data.find((b) => b.id === parseInt(id));
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setError("Blog not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setError("Error loading blog");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading blog...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-600">{error || "Blog not found"}</p>
      </div>
    );
  }

  return (
    <div className="w-full py-8 sm:py-12 lg:py-16">
      <button
        onClick={() => window.history.back()}
        className="cursor-pointer flex items-center gap-2 mb-6 sm:mb-8 text-orange-500 hover:text-orange-600 font-semibold transition"
      >
        <IoArrowBack className="w-5 h-5" />
        Back to Blogs
      </button>

      {/* Header Section */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        {/* Category and Date */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center mb-4">
          <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm font-semibold">
            {blog.category}
          </span>
          <div className="flex items-center gap-2 text-gray-600">
            <FaCalendarAlt className="w-4 h-4" />
            <span className="text-sm">{blog.published_date}</span>
          </div>
          <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
            {blog.read_time}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-8 sm:mb-12">
          <img
            src={blog.author_profile}
            alt={blog.author}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-base sm:text-lg text-gray-900">
              {blog.author}
            </p>
            <p className="text-sm text-gray-600">Tech Blogger & Writer</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 sm:gap-8">
          <div className="flex items-center gap-2">
            <IoIosHeartEmpty className="w-5 h-5 text-red-500" />
            <span className="text-gray-700 font-semibold">{blog.likes} Likes</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRegComment className="w-5 h-5 text-blue-500" />
            <span className="text-gray-700 font-semibold">
              {blog.comments.length} Comments
            </span>
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <img
          src={blog.image_one}
          alt={blog.title}
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Content with Image Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
        <div>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
            {blog.content.substring(0, blog.content.length / 2)}
          </p>
        </div>

        <div>
          <img
            src={blog.image_two}
            alt={`${blog.title} - Image 1`}
            className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
        <div className="order-2 lg:order-1">
          <img
            src={blog.image_one}
            alt={`${blog.title} - Image 2`}
            className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
            {blog.content.substring(blog.content.length / 2)}
          </p>
        </div>
      </div>


      {/* Comments Section */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900">
          Comments ({blog.comments.length})
        </h2>

        <div className="space-y-2">
          {blog.comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-50 rounded-lg p-2 border border-gray-200 hover:shadow-md transition"
            >
              <div className="flex items-start gap-4 mb-3">
                {/* Placeholder for comment profile image */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Comment Content */}
                <div className="flex-grow">
                  <h3 className="font-semibold text-base sm:text-sm text-gray-900">
                    {comment.author}
                  </h3>
                  <p className="text-sm">
                    {comment.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Section */}
        <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-gray-200">
          <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-900">
            Leave a Comment
          </h3>
          <form className="space-y-4">
            <div>
              <textarea
                placeholder="Your Comment"
                name="comment"
                rows="4"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition text-sm sm:text-base"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

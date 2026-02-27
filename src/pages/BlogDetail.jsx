import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaRegComment, FaCalendarAlt } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import axiosSecure from "../api/axiosSecure";

const BlogDetail = () => {
  const { user, role } = useContext(AuthContext);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const alreadyLiked = blog?.likedUsers?.includes(user?.email);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentText = e.target.comment.value.trim();
    if (!user) {
      alert("You must be logged in to post a comment.");
      return;
    }
    if (commentText.length === 0) {
      alert("Comment cannot be empty.");
      return;
    }
    try {
      const newComment = {
        author: user.displayName,
        text: commentText,
      };
      const response = await axiosSecure.post(
        `/blogs/${id}/comments`,
        newComment,
      );
      setBlog((prevBlog) => ({
        ...prevBlog,
        comments: [...(prevBlog.comments || []), response.data],
      }));
      e.target.reset();
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Failed to post comment. Please try again.");
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert("You must be logged in to like a blog.");
      return;
    }

    try {
      await axiosSecure.post(`/blogs/${id}/like`, {
        email: user.email,
      });

      setBlog((prev) => ({
        ...prev,
        likedUsers: [...(prev.likedUsers || []), user.email],
        likes: (prev.likes || 0) + 1,
      }));
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };

  useEffect(() => {
    axiosSecure
      .get(`/blogs/${id}`)
      .then((response) => {
        const foundBlog = response.data.data || response.data;
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

  const handleDelete = async () => {
    if (!user) {
      alert("You must be logged in to delete a blog.");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/blogs/${id}`, {
          data: { email: user.email },
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your blog has been deleted.",
          icon: "success",
        });
        window.history.back();
      } catch (err) {
        console.error("Error deleting blog:", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete blog.",
          icon: "error",
        });
      }
    }
  };

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
          <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
            {blog.readTime} min
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-8 sm:mb-12">
          <img
            src={
              blog.authorImage
                ? blog.authorImage
                : "https://via.placeholder.com/150"
            }
            alt={blog.author}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-bold text-base sm:text-lg text-blue-500">
              {blog.author}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 sm:gap-8">
          <div className="flex items-center gap-2">
            <IoIosHeart
              onClick={!alreadyLiked ? handleLike : undefined}
              className={`w-5 h-5 transition ${
                alreadyLiked
                  ? "text-red-500 cursor-not-allowed"
                  : "text-gray-600 cursor-pointer hover:text-red-600"
              }`}
            />
            <span className={`text-gray-700 font-semibold `}>
              {blog.likes || 0} Likes
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaRegComment className="w-5 h-5 text-blue-500" />
            <span className="text-gray-700 font-semibold">
              {blog.comments?.length || 0} Comments
            </span>
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <img
          src={`/uploads/${blog.imageOne}`}
          alt={blog.title}
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Content with Image Section */}
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <div>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
            {blog.content.substring(0, blog.content.length / 2)}
          </p>
        </div>
      </div>
      <div>
        <img
          src={`/uploads/${blog.imageTwo}`}
          alt={`${blog.title} - Image 1`}
          className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="mt-5 mb-12 sm:mb-16 lg:mb-20">
        <div className="order-1 lg:order-2">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
            {blog.content.substring(blog.content.length / 2)}
          </p>
        </div>
      </div>

      {/* Comments Section */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900">
          Comments ({blog.comments?.length || 0})
        </h2>

        <div className="space-y-2">
          {blog.comments
            ?.filter((comment) => comment !== null)
            .map((comment, index) => (
              <div
                key={comment.id || index}
                className="bg-gray-50 rounded-lg p-2 border border-gray-200 hover:shadow-md transition"
              >
                <div className="flex items-start gap-4 mb-3">
                  {/* Placeholder for comment profile image */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {comment.author?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  </div>

                  {/* Comment Content */}
                  <div className="flex-grow">
                    <h3 className="font-semibold text-base sm:text-sm text-gray-900">
                      {comment.author}
                    </h3>
                    <p className="text-sm">{comment.text}</p>
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
          <form onSubmit={handleCommentSubmit} className="space-y-4">
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
              className={`bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition text-sm sm:text-base ${user ? "" : "cursor-not-allowed"}`}
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
      {role === "admin" && (
        <div>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-3 w-full mt-3 rounded-xl font-semibold hover:bg-red-600 transition cursor-pointer"
          >
            Delete Blog
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;

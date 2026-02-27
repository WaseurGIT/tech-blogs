import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import axiosSecure from "../api/axiosSecure";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const SavedBlogs = () => {
  const { user } = useContext(AuthContext);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    axiosSecure
      .get(`/savedBlogs/${user.email}`)
      .then((response) => {
        setSavedBlogs(response.data.data || response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching saved blogs:", error);
        setError("Error loading saved blogs");
        setLoading(false);
      });
  }, [user]);

  const handleDeleteBlog = async (blogId, e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user?.email) {
      Swal.fire({
        title: "Error",
        text: "User email not found",
        icon: "error",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Delete Saved Blog?",
      text: "Are you sure you want to remove this from your saved blogs?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/savedBlogs/${blogId}`);
      setSavedBlogs(savedBlogs.filter((blog) => blog._id !== blogId));
      Swal.fire({
        title: "Deleted!",
        text: "Blog removed from saved blogs.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error deleting saved blog:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to delete saved blog",
        icon: "error",
      });
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">
          Please log in to view saved blogs
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading saved blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mb-12 sm:mb-20 lg:mb-36 px-4 sm:px-6 lg:px-0">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          Saved Blogs
        </h1>
        <p className="text-gray-600 mt-2">
          {savedBlogs.length} {savedBlogs.length === 1 ? "blog" : "blogs"} saved
        </p>
      </div>

      <div className="space-y-3">
        {savedBlogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-8">
            No saved blogs yet. Start saving blogs to see them here!
          </p>
        ) : (
          savedBlogs.map((blog) => (
            <Link key={blog._id || blog.id} to={`/blogs/${blog._id}`}>
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition cursor-pointer flex items-center justify-between group">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-blue-500 hover:text-blue-600">
                    {blog.title}
                  </h2>
                  <h1 className="text-sm text-gray-500 mt-1">{blog.author}</h1>
                </div>
                <button
                  onClick={(e) => handleDeleteBlog(blog._id, e)}
                  className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                  title="Delete saved blog"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedBlogs;

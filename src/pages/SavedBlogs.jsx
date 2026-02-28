import { useContext, useEffect, useState } from "react";
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
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Saved Blogs
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            {savedBlogs.length} {savedBlogs.length === 1 ? "blog" : "blogs"} saved
          </p>
        </div>

        {/* Blogs List */}
        <div className="space-y-3 sm:space-y-4">
          {savedBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-base sm:text-lg mb-4">
                No saved blogs yet. Start saving blogs to see them here!
              </p>
              <Link
                to="/blogs"
                className="inline-block text-blue-500 hover:text-blue-600 font-semibold text-sm sm:text-base"
              >
                Browse blogs
              </Link>
            </div>
          ) : (
            savedBlogs.map((blog) => (
              <Link key={blog._id || blog.id} to={`/blogs/${blog._id}`}>
                <div className="p-4 sm:p-6 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg font-semibold text-blue-500 hover:text-blue-600 truncate">
                      {blog.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      By {blog.author}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDeleteBlog(blog._id, e)}
                    className="w-full sm:w-auto p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition font-semibold text-sm"
                    title="Delete saved blog"
                  >
                    <MdDelete className="w-5 h-5 inline mr-2" />
                    Remove
                  </button>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedBlogs;

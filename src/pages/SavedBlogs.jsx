import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

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

    axios
      .get(`http://localhost:5000/savedBlogs/${user.email}`)
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

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Please log in to view saved blogs</p>
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
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition cursor-pointer">
                <h2 className="text-lg sm:text-xl font-semibold text-blue-500 hover:text-blue-600">
                  {blog.title}
                </h2>
                <h1 className="text-sm text-gray-500 mt-1">{blog.author}</h1>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedBlogs;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axiosSecure from "../../api/axiosSecure";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [statistics, setStatistics] = useState({
    totalBlogs: 0,
    totalUsers: 0,
    totalCategories: 0,
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch blogs
      const blogsRes = await axiosSecure.get("/blogs");
      const blogsData = Array.isArray(blogsRes.data) ? blogsRes.data : blogsRes.data.data || [];
      setBlogs(blogsData);

      // Fetch users
      const usersRes = await axiosSecure.get("/admin/users");
      const usersData = Array.isArray(usersRes.data) ? usersRes.data : usersRes.data.data || [];
      setUsers(usersData);

      // Calculate statistics
      const categories = new Set(blogsData.map((blog) => blog.category));
      setStatistics({
        totalBlogs: blogsData.length,
        totalUsers: usersData.length,
        totalCategories: categories.size,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await axiosSecure.delete(`/blogs/${blogId}`);
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
      setDeleteConfirm(null);
      alert("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axiosSecure.delete(`/users/${userId}`);
      setUsers(users.filter((u) => u._id !== userId));
      setDeleteConfirm(null);
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome, {user?.displayName || "Admin"}</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Blogs</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{statistics.totalBlogs}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-11.747S17.5 6.253 12 6.253z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{statistics.totalUsers}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM16 20a3 3 0 00-6 0m6 0a2 2 0 01-1 1.732M9 20a2 2 0 00-1-1.732"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Categories</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{statistics.totalCategories}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.5a2 2 0 00-1 .268m-6 0A2 2 0 103 7m6 0L7 5m6 0v4m0 11V5m6 0a2 2 0 012 2v12a2 2 0 01-2 2h-2.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 sm:px-6 py-4 font-medium text-sm sm:text-base transition-colors ${
                  activeTab === "overview"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("blogs")}
                className={`px-4 sm:px-6 py-4 font-medium text-sm sm:text-base transition-colors ${
                  activeTab === "blogs"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Manage Blogs
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`px-4 sm:px-6 py-4 font-medium text-sm sm:text-base transition-colors ${
                  activeTab === "users"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Manage Users
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="text-gray-700">
                      <span className="font-semibold">Total Activity:</span> You have{" "}
                      <span className="text-blue-600 font-bold">{statistics.totalBlogs}</span> blogs
                      published across{" "}
                      <span className="text-blue-600 font-bold">{statistics.totalCategories}</span> categories
                      with{" "}
                      <span className="text-blue-600 font-bold">{statistics.totalUsers}</span> registered
                      users.
                    </p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <p className="text-gray-700">
                      <span className="font-semibold">Recent Updates:</span> Use the tabs above to manage
                      your blogs and users.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Blogs Tab */}
            {activeTab === "blogs" && (
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Blogs</h2>
                  <button
                    onClick={() => navigate("/createBlog")}
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    + Create New Blog
                  </button>
                </div>

                {blogs.length === 0 ? (
                  <p className="text-center text-gray-500 py-12">No blogs found</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell">
                            Category
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">
                            Author
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogs.map((blog) => (
                          <tr key={blog._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                            <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                              {blog.title}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">
                              {blog.category}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                              {blog.author || "Unknown"}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => navigate(`/blog/${blog._id}`)}
                                  className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm({ type: "blog", id: blog._id })}
                                  className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Manage Users</h2>

                {users.length === 0 ? (
                  <p className="text-center text-gray-500 py-12">No users found</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell">
                            Email
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">
                            Role
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                            <td className="px-4 py-3 text-sm text-gray-900">{u.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell max-w-xs truncate">
                              {u.email}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                                {u.role || "User"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => navigate(`/profile/${u._id}`)}
                                  className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm({ type: "user", id: u._id })}
                                  className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this {deleteConfirm.type}? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteConfirm.type === "blog") {
                    deleteBlog(deleteConfirm.id);
                  } else {
                    deleteUser(deleteConfirm.id);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

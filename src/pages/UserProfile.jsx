import React, { useState, useContext, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import axiosSecure from "../api/axiosSecure";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    name: "",
    profession: "",
    bio: "",
    coverImage: "",
    profileImage: "",
  });
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/userData/${user.email}`)
      .then((res) => {
        if (res.data) {
          setUserData(res.data);
        } else {
          setUserData(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/blogs/user/${user.email}`)
      .then((res) => {
        setUserPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative w-full h-40 sm:h-56 md:h-64 lg:h-80 bg-gray-300 overflow-hidden">
        <img
          src={`/uploads/${userData?.coverImage}`}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Profile Header with Image */}
        <div className="relative -mt-16 sm:-mt-20 md:-mt-24 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6 md:gap-8">
            {/* Profile Image Container */}
            <div className="flex justify-center sm:justify-start mb-6 sm:mb-0">
              <div className="relative">
                <img
                  src={`/uploads/${userData?.profilePicture}`}
                  alt={userData?.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 sm:border-4 border-white shadow-lg object-cover"
                />
                <Link
                  to="/updateProfileData"
                  className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold transition"
                >
                  Edit
                </Link>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center sm:text-left flex-1 pb-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                {user?.displayName}
              </h1>
              <p className="text-lg sm:text-xl text-blue-600 font-semibold mt-1">
                {userData?.profession || "Professional"}
              </p>
              <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto sm:mx-0">
                {userData?.bio || "No bio added yet"}
              </p>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            Posts ({userPosts.length})
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : userPosts.length > 0 ? (
            <div className="grid gap-4 sm:gap-6">
              {userPosts.map((post) => (
                <BlogCard key={post._id} blog={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-base sm:text-lg">No posts yet</p>
              <Link
                to="/createBlog"
                className="mt-4 inline-block text-blue-500 hover:text-blue-600 font-semibold"
              >
                Create your first blog
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

import React, { useState, useEffect, useContext } from "react";
import BlogCard from "../components/BlogCard";
import { AuthContext } from "../context/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: user?.displayName,
    profession: "Full Stack Developer",
    coverImage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=300&fit=crop",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Passionate about building beautiful and functional web applications.",
  });

  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setUserPosts([]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative w-full h-64 md:h-80 bg-gray-300 overflow-hidden">
        <img
          src={userData.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header with Image */}
        <div className="relative -mt-20 mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:gap-6">
            {/* Profile Image */}
            <div className="flex justify-center md:justify-start">
              <img
                src={userData.profileImage}
                alt={userData.name}
                className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="absolute bottom-0 left-20 bg-white px-2 rounded-lg mb-2 cursor-pointer">
                <h1>Edit Profile</h1>
              </div>
            </div>

            {/* User Info */}
            <div className="mt-6 md:mt-26 md:pb-2 text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {userData.name}
              </h1>
              <p className="text-xl text-blue-600 font-semibold mt-1">
                {userData.profession}
              </p>
              <p className="text-gray-600 mt-3 max-w-lg">{userData.bio}</p>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Posts ({userPosts.length})
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : userPosts.length > 0 ? (
            <div className="grid gap-6">
              {userPosts.map((post) => (
                <BlogCard key={post._id} blog={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

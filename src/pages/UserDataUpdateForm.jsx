import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import axiosSecure from "../api/axiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UserDataUpdateForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState(user?.displayName || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const coverImage = form.coverImage.files[0];
    const profilePicture = form.profilePicture.files[0];
    const profession = form.profession.value;
    const institute = form.institute.value;
    const bio = form.bio.value;

    const formData = new FormData();

    formData.append("email", user?.email);
    formData.append("name", name);
    formData.append("profession", profession);
    formData.append("institute", institute);
    formData.append("bio", bio);

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      await axiosSecure.put(
        `/userData/${user.email}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      Swal.fire({
        title: "Success!",
        text: "Your profile has been updated.",
        icon: "success",
      });

      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Update Profile
        </h1>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Cover Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
              <label
                htmlFor="coverImage"
                className="flex flex-col items-center justify-center cursor-pointer py-8"
              >
                <svg
                  className="w-12 h-12 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <p className="text-gray-600 font-medium">
                  Click to upload cover image
                </p>
              </label>
              <input
                id="coverImage"
                type="file"
                name="coverImage"
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Profile Picture
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
              <label
                htmlFor="profilePicture"
                className="flex flex-col items-center justify-center cursor-pointer py-8"
              >
                <svg
                  className="w-12 h-12 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <p className="text-gray-600 font-medium">
                  Click to upload profile picture
                </p>
              </label>
              <input
                id="profilePicture"
                type="file"
                name="profilePicture"
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Profession Input */}
          <div>
            <label
              htmlFor="profession"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Profession
            </label>
            <input
              id="profession"
              type="text"
              name="profession"
              placeholder="e.g., Full Stack Developer"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Institute Input */}
          <div>
            <label
              htmlFor="institute"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Institute/Organization
            </label>
            <input
              id="institute"
              type="text"
              name="institute"
              placeholder="e.g., Your Company or University"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Bio/Description Input */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Bio/Description
            </label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself..."
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDataUpdateForm;

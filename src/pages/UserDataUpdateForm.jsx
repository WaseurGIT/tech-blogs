import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import axiosSecure from "../api/axiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UserDataUpdateForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [coverPreview, setCoverPreview] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const handleUserDataUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData();
    formData.append("name", form.name.value);
    formData.append("profession", form.profession.value);
    formData.append("institute", form.institute.value);
    formData.append("bio", form.bio.value);

    if (form.coverImage.files[0]) {
      formData.append("coverImage", form.coverImage.files[0]);
    }

    if (form.profileImage.files[0]) {
      formData.append("profilePicture", form.profileImage.files[0]);
    }

    try {
      const result = await axiosSecure.put(
        `/userData/${user.email}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Updated:", result.data);

      Swal.fire({
        title: "Success!",
        text: "Your profile has been updated.",
        icon: "success",
      });

      navigate("/profile");
    } catch (error) {
      console.error("Error response:", error.response?.data);
      Swal.fire({
        title: "Error!",
        text: "Failed to update profile.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Update Profile
        </h2>

        <form className="space-y-5" onSubmit={handleUserDataUpdate}>
          {/* Cover Image */}
          <div>
            <label className="block mb-2 font-medium">Cover Image</label>
            {coverPreview && (
              <img
                src={coverPreview}
                alt="Cover Preview"
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
            )}
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block mb-2 font-medium">Profile Image</label>
            {profilePreview && (
              <img
                src={profilePreview}
                alt="Profile Preview"
                className="w-24 h-24 object-cover rounded-full mb-2"
              />
            )}
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              defaultValue={user?.displayName}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Profession */}
          <div>
            <label className="block mb-2 font-medium">Profession</label>
            <input
              type="text"
              name="profession"
              placeholder="Enter your profession"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Institute */}
          <div>
            <label className="block mb-2 font-medium">Institute</label>
            <input
              type="text"
              name="institute"
              placeholder="Enter your institute"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-2 font-medium">Bio</label>
            <textarea
              rows="4"
              name="bio"
              placeholder="Write something about yourself..."
              className="w-full border rounded-lg p-2"
            ></textarea>
          </div>

          {/* Update Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
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

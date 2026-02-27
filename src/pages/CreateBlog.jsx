import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    readTime: "",
    content: "",
    imageOne: null,
    imageTwo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData();

    formData.append("author", user?.displayName);
    formData.append('authorImage', user?.photoURL);
    formData.append("email", user?.email);
    formData.append("publishedDate", new Date().toISOString());
    formData.append("title", form.title.value);
    formData.append("category", form.category.value);
    formData.append("readTime", form.readTime.value);
    formData.append("content", form.content.value);
    formData.append("imageOne", form.imageOne.files[0]);
    formData.append("imageTwo", form.imageTwo.files[0]);

    try {
      const res = await axios.post("http://localhost:5000/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        title: "Success!",
        text: "Your blog has been created.",
        icon: "success",
      });

      form.reset();
      navigate("/blogs");
    } catch (err) {
      console.error(err);
      alert("Failed to create blog.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Enter blog title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          {/* Category Input */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              required
            >
              <option value="">Select a category</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Web Development">Web Development</option>
              <option value="DevOps">DevOps</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>

          {/* Read Time Input */}
          <div>
            <label
              htmlFor="readTime"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Read Time (minutes)
            </label>
            <input
              id="readTime"
              type="number"
              name="readTime"
              placeholder="e.g., 5"
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          {/* Blog Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Blog Content
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Write your blog content here..."
              rows="10"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none"
              required
            />
          </div>

          {/* Image One Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Image One
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
              <label
                htmlFor="imageOne"
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-600 font-medium">
                  Click to upload image one
                </p>
                {formData.imageOne && (
                  <p className="text-green-600 text-sm mt-2">
                    {formData.imageOne.name}
                  </p>
                )}
              </label>
              <input
                id="imageOne"
                type="file"
                name="imageOne"
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Image Two Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Image Two
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
              <label
                htmlFor="imageTwo"
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-600 font-medium">
                  Click to upload image two
                </p>
                {formData.imageTwo && (
                  <p className="text-green-600 text-sm mt-2">
                    {formData.imageTwo.name}
                  </p>
                )}
              </label>
              <input
                id="imageTwo"
                type="file"
                name="imageTwo"
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;

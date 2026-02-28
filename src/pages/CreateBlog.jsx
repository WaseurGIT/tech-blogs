import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import axiosSecure from "../api/axiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const blogData = {
      author: user?.displayName,
      authorImage: user?.photoURL,
      email: user?.email,
      publishedDate: new Date().toISOString(),
      title: form.title.value,
      category: form.category.value,
      readTime: form.readTime.value,
      content: form.content.value,
    };

    try {
      const res = await axiosSecure.post("/blogs", blogData);

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
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8 lg:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
          Create Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              required
            >
              <option value="">Select a category</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
              rows="8"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 text-base sm:text-lg"
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

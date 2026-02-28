import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import axiosSecure from "../api/axiosSecure";

export default function Login() {
  const { loginUser, googleLogin, loading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const result = await loginUser(email, password);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
      };
      await axiosSecure.post("/users", userData);

      //  request JWT token from backend
      const tokenRes = await axiosSecure.post("/jwt", {
        email: result.user.email,
      });
      // store token in localStorage
      localStorage.setItem("access-token", tokenRes.data.token);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Welcome ${result.user.displayName}`,
        showConfirmButton: false,
        timer: 2000,
      });
      form.reset();
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      const userData = {
        name: res.user.displayName || "",
        email: res.user.email,
        uid: res.user.uid,
      };
      await axiosSecure.post("/users", userData);

      // get JWT
      const tokenRes = await axiosSecure.post("/jwt", {
        email: res.user.email,
      });

      localStorage.setItem("access-token", tokenRes.data.token);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Welcome ${res.user.displayName}`,
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-md bg-white px-6 sm:px-8 py-8 sm:py-10 rounded-lg shadow-sm">
        <h2 className="text-center mb-8 text-2xl sm:text-3xl font-semibold text-gray-800">
          Login
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md mb-6 text-xs sm:text-sm border-l-4 border-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-xs sm:text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-xs sm:text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-blue-500 text-white rounded-md text-base font-semibold cursor-pointer transition-colors hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-6 sm:my-8 text-gray-400 text-xs sm:text-sm">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-3">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          className="w-full py-3 bg-white border border-gray-300 rounded-md text-sm sm:text-base font-semibold cursor-pointer flex items-center justify-center gap-2.5 transition-all hover:bg-gray-50 hover:border-gray-400 hover:shadow-md active:scale-95"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={24} />
          <span className="text-xs sm:text-sm">Continue with Google</span>
        </button>

        <p className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

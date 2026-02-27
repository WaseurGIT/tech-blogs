import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FiCheck, FiEye, FiEyeOff, FiX } from "react-icons/fi";
import axios from "axios";

export default function Register() {
  const { createUser, googleLogin, loading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordState, setPasswordState] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPasswordState({
      length: pwd.length,
      special: /[!@#$%^&*]/.test(pwd),
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const result = await createUser(email, password, name);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
      };
      await axios.post("/users", userData);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Welcome ${name}! Account created successfully.`,
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
      setError("Registration failed. Please try again.");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const res = await googleLogin();
      const userData = {
        name: res.user.displayName || "",
        email: res.user.email,
        uid: res.user.uid,
      };
      await axios.post("/users", userData);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Welcome ${res.user.displayName}! Account created successfully.`,
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-5 py-10">
      <div className="w-full max-w-md bg-white px-8 py-10 rounded-lg shadow-sm">
        <h2 className="text-center mb-8 text-3xl font-semibold text-gray-800">
          Register
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md mb-6 text-sm border-l-4 border-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-5">
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
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
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <FiEyeOff className="text-lg" />
                ) : (
                  <FiEye className="text-lg" />
                )}
              </button>
            </div>
            {passwordState.length > 0 && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  {passwordState.length >= 6 ? (
                    <FiCheck className="text-green-500 font-bold" />
                  ) : (
                    <FiX className="text-red-500 font-bold" />
                  )}
                  <span
                    className={
                      passwordState.length < 6
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    At least 6 characters
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {passwordState.special ? (
                    <FiCheck className="text-green-500 font-bold" />
                  ) : (
                    <FiX className="text-red-500 font-bold" />
                  )}
                  <span
                    className={
                      passwordState.special ? "text-green-600" : "text-gray-600"
                    }
                  >
                    One special character (!@#$%^&*)
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="text-lg" />
                ) : (
                  <FiEye className="text-lg" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-blue-500 text-white rounded-md text-base font-semibold cursor-pointer transition-colors hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex items-center my-8 text-gray-400 text-sm">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-3">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          className="w-full py-3 bg-white border border-gray-300 rounded-md text-base font-semibold cursor-pointer flex items-center justify-center gap-2.5 transition-all hover:bg-gray-50 hover:border-gray-400 hover:shadow-md active:scale-95"
          onClick={handleGoogleRegister}
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        <p className="text-center mt-5 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

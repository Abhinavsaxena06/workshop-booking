import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully 🎉");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data.msg || "Registration failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error ⚠️");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-10 bg-gradient-to-br from-indigo-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-black transition-colors duration-300">
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-300/30 dark:bg-indigo-700/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300/30 dark:bg-pink-700/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-orange-200/30 dark:bg-orange-700/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-2xl bg-white/70 dark:bg-gray-900/70 border border-white/60 dark:border-gray-800 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] p-8">
          <h2 className="text-3xl font-black text-center text-gray-900 dark:text-white mb-2">
            Create Account ✨
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
            Join and start learning today
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-600 dark:text-gray-300 select-none"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 transition-all duration-200 shadow-lg"
            >
              Register 🚀
            </button>
          </form>

          <p className="text-center mt-5 text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline font-semibold text-indigo-600 dark:text-indigo-400"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
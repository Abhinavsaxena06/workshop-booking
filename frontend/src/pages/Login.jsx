import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isRedirecting) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);

        toast.success("Login successful 🚀");
        setIsRedirecting(true);

        setTimeout(() => {
          navigate("/");
        }, 1800);
      } else {
        toast.error(data.msg || "Login failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error ⚠️");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden
                    bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50
                    dark:from-gray-900 dark:via-gray-950 dark:to-black transition">

      {/* Background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/80 via-purple-500/70 to-pink-500/80 dark:from-indigo-900/40 dark:via-purple-900/30 dark:to-pink-900/40"></div>
      <div className="absolute inset-0 backdrop-blur-3xl bg-white/10 dark:bg-black/20"></div>

      {/* Floating glow blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-400/40 dark:bg-pink-700/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-400/40 dark:bg-indigo-700/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Redirect overlay */}
      {isRedirecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md animate-fadeIn">
          <div className="backdrop-blur-2xl bg-white/15 dark:bg-gray-900/60 border border-white/25 dark:border-gray-700 rounded-3xl px-10 py-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="w-14 h-14 mx-auto mb-4 border-4 border-white/80 border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Login Successful
            </h2>
            <p className="text-white/80 dark:text-gray-300">
              Redirecting to home...
            </p>
          </div>
        </div>
      )}

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="backdrop-blur-2xl bg-white/20 dark:bg-gray-900/50 border border-white/30 dark:border-gray-700 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-8">

          <h2 className="text-3xl font-black text-center text-white dark:text-white mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-white/80 dark:text-gray-300 text-center mb-8">
            Login to continue
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl
                         bg-white/20 dark:bg-gray-800/70
                         border border-white/30 dark:border-gray-700
                         text-white dark:text-white
                         placeholder-white/70 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-indigo-400"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl
                           bg-white/20 dark:bg-gray-800/70
                           border border-white/30 dark:border-gray-700
                           text-white dark:text-white
                           placeholder-white/70 dark:placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-indigo-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white dark:text-gray-300"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button
              type="submit"
              disabled={isRedirecting}
              className="w-full py-3 rounded-xl font-bold text-white
                         bg-black/80 hover:bg-black
                         dark:bg-indigo-600 dark:hover:bg-indigo-700
                         transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isRedirecting ? "Redirecting..." : "Login 🚀"}
            </button>
          </form>

          <p className="text-center mt-5 text-sm text-white/80 dark:text-gray-300">
            Don’t have an account?{" "}
            <Link to="/register" className="text-white dark:text-indigo-300 font-semibold underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login; 
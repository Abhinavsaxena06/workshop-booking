import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/fossee.png"
              alt="FOSSEE Logo"
              className="h-9 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
            <span className="font-bold text-gray-800 dark:text-white text-lg">
              FOSSEE Workshops
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition ${
                isActive('/')
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
              }`}
            >
              Home
            </Link>

            <Link
              to="/workshops"
              className={`text-sm font-medium transition ${
                isActive('/workshops')
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
              }`}
            >
              Workshops
            </Link>

            {isLoggedIn && (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition ${
                    isActive('/dashboard')
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                  }`}
                >
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  className={`text-sm font-medium transition ${
                    isActive('/profile')
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                  }`}
                >
                  Profile
                </Link>
              </>
            )}

            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>

                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {isDark ? "☀ Light" : "🌙 Dark"}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Login
                </Link>

                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {isDark ? "☀ Light" : "🌙 Dark"}
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 py-3 flex flex-col gap-3">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={`py-2 px-3 rounded-lg ${
              isActive('/')
                ? 'bg-blue-50 dark:bg-gray-800 text-blue-600'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Home
          </Link>

          <Link
            to="/workshops"
            onClick={() => setMenuOpen(false)}
            className={`py-2 px-3 rounded-lg ${
              isActive('/workshops')
                ? 'bg-blue-50 dark:bg-gray-800 text-blue-600'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Workshops
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className={`py-2 px-3 rounded-lg ${
                  isActive('/dashboard')
                    ? 'bg-blue-50 dark:bg-gray-800 text-blue-600'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Dashboard
              </Link>

              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className={`py-2 px-3 rounded-lg ${
                  isActive('/profile')
                    ? 'bg-blue-50 dark:bg-gray-800 text-blue-600'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Profile
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 text-white py-2 px-3 rounded-lg text-center"
              >
                Logout
              </button>

              <button
                onClick={toggleTheme}
                className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white py-2 px-3 rounded-lg text-center"
              >
                {isDark ? "☀ Switch to Light" : "🌙 Switch to Dark"}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-blue-600 text-white py-2 px-3 rounded-lg text-center"
              >
                Login
              </Link>

              <button
                onClick={toggleTheme}
                className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white py-2 px-3 rounded-lg text-center"
              >
                {isDark ? "☀ Switch to Light" : "🌙 Switch to Dark"}
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
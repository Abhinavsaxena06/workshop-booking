import React from "react";
import { Link, useLocation } from "react-router-dom";

function BottomNav() {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  const navItems = [
    { label: "Home", path: "/", icon: "🏠" },
    { label: "Workshops", path: "/workshops", icon: "🎓" },
    ...(isLoggedIn
      ? [
          { label: "Dashboard", path: "/dashboard", icon: "📊" },
          { label: "Profile", path: "/profile", icon: "👤" },
        ]
      : [{ label: "Login", path: "/login", icon: "🔐" }]),
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 
                       bg-white/90 dark:bg-gray-900/90 
                       backdrop-blur-xl 
                       border-t border-gray-200 dark:border-gray-800 
                       shadow-[0_-5px_25px_rgba(0,0,0,0.08)]">

      {/* NAVIGATION */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-2">

          {navItems.map((item) => {
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center flex-1 py-1"
              >
                <div
                  className={`text-lg transition-all duration-300 ${
                    active
                      ? "text-indigo-600 dark:text-indigo-400 scale-110"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {item.icon}
                </div>

                <span
                  className={`text-xs font-medium ${
                    active
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-200 dark:border-gray-800"></div>

      {/* COPYRIGHT + INFO */}
      <div className="text-center text-xs py-2 px-4
                      text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} FOSSEE Workshops • Built for learning 🚀
      </div>
    </footer>
  );
}

export default BottomNav;
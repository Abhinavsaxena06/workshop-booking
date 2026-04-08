import React from "react";
import { Link } from "react-router-dom";

function BottomNav() {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/fossee.png"
                alt="FOSSEE Logo"
                className="h-10 w-auto object-contain"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  FOSSEE Workshops
                </h2>
                <p className="text-sm text-gray-500 dark:text-slate-400">
                  Learn. Build. Grow.
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-300">
              Empowering students with hands-on workshops, practical learning,
              and real-world technical skills through the FOSSEE ecosystem.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-white mb-4">
              Services
            </h3>
            <div className="space-y-3">
              <Link
                to="/workshops"
                className="block text-sm text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Workshops
              </Link>
              <Link
                to="/workshops"
                className="block text-sm text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Book a Workshop
              </Link>
              <Link
                to="/dashboard"
                className="block text-sm text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Student Dashboard
              </Link>
              <Link
                to="/profile"
                className="block text-sm text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Profile Management
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-white mb-4">
              Support
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:support@fossee.in"
                className="block text-sm text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="block text-sm text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Help Center
              </a>
              <a
                href="#"
                className="block text-sm text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                FAQ
              </a>
              <a
                href="#"
                className="block text-sm text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Terms & Privacy
              </a>
            </div>
          </div>

          {/* Social / Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-white mb-4">
              Connect
            </h3>
            <div className="space-y-3">
              <a
                href="https://fossee.in"
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Official Website
              </a>
              <a
                href="https://instagram.com/fossee_official"
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                LinkedIn
              </a>
              <p className="text-sm text-gray-600 dark:text-slate-300">
                Email: support@fossee.in
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-gray-200 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500 dark:text-slate-400 text-center md:text-left">
            © {new Date().getFullYear()} FOSSEE Workshops. All rights reserved.
          </p>

          <p className="text-sm text-gray-500 dark:text-slate-400 text-center md:text-right">
            Built with ❤️ for student learning and innovation.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default BottomNav;
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FinMitraLogo from "../FinMitraLogo";
import { getCurrentUser, logout } from "../../utils/auth";

const DashboardNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-primary font-semibold"
      : "text-slate-600 hover:text-primary";

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo + Title */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center hover-lift">
              <FinMitraLogo variant="simple" size="md" />
            </Link>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-semibold text-slate-800">
                FinMitra Dashboard
              </span>
              <span className="text-xs text-slate-500">
                Cloud-powered expense tracker
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/dashboard"
              className={`text-sm transition-colors duration-200 ${isActive(
                "/dashboard"
              )}`}
            >
              Overview
            </Link>

            {user && (
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="text-xs text-slate-700 max-w-[120px] truncate">
                  {user.fullName || user.email}
                </span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-xl px-3 py-1.5 smooth-transition"
            >
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3-3m0 0l3 3m-3-3v12"
                />
              </svg>
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 pt-3 pb-4 space-y-3">
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className={`block text-sm ${isActive("/dashboard")}`}
            >
              Overview
            </Link>

            {user && (
              <div className="flex items-center space-x-2 py-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-800">
                    {user.fullName || "FinMitra User"}
                  </span>
                  <span className="text-xs text-slate-500 truncate max-w-[180px]">
                    {user.email}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="w-full inline-flex items-center justify-center text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl px-3 py-2 smooth-transition"
            >
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3-3m0 0l3 3m-3-3v12"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavigation;

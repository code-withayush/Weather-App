import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import {
  HomeIcon,
  ChartBarIcon,
  HeartIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  CloudIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Guest links
  const guestLinks = [
    { name: "Home", path: "/", icon: <HomeIcon className="h-5 w-5 mr-1 inline-block" /> },
    { name: "Login", path: "/login", icon: <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1 inline-block" /> },
    { name: "Register", path: "/register", icon: <UserPlusIcon className="h-5 w-5 mr-1 inline-block" /> },
  ];

  // Auth links
  const authLinks = [
    { name: "Weather", path: "/weather", icon: <CloudIcon className="h-5 w-5 mr-1 inline-block" /> },
    { name: "Dashboard", path: "/dashboard", icon: <ChartBarIcon className="h-5 w-5 mr-1 inline-block" /> },
    { name: "Favorites", path: "/favorites", icon: <HeartIcon className="h-5 w-5 mr-1 inline-block" /> },
    { name: "Logout", action: handleLogout, icon: <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1 inline-block" /> },
  ];

  const links = token ? authLinks : guestLinks;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full backdrop-blur-xl bg-gradient-to-r from-blue-500/80 via-indigo-600/80 to-purple-700/80 shadow-2xl z-50 border-b border-white/20 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold text-white flex items-center gap-2 tracking-wide">
            🌤️
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500">
              WeatherApp
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            {links.map((link) =>
              link.action ? (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="text-white font-medium hover:text-yellow-300 transition flex items-center"
                >
                  {link.icon} {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-white font-medium hover:text-yellow-300 transition flex items-center ${
                    location.pathname === link.path ? "text-yellow-300" : ""
                  }`}
                >
                  {link.icon} {link.name}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white transition-transform duration-300 hover:scale-125"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-gradient-to-b from-blue-600/90 to-purple-700/90 backdrop-blur-xl px-6 py-4 space-y-3 transition-all duration-500 overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {links.map((link) =>
            link.action ? (
              <button
                key={link.name}
                onClick={() => {
                  link.action();
                  setIsOpen(false);
                }}
                className="block w-full text-left text-lg font-semibold px-3 py-2 text-white hover:bg-yellow-300 hover:text-gray-900 rounded-md flex items-center"
              >
                {link.icon} {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-semibold rounded-md px-3 py-2 flex items-center ${
                  location.pathname === link.path
                    ? "bg-yellow-300 text-gray-900"
                    : "text-white hover:bg-yellow-300 hover:text-gray-900"
                }`}
              >
                {link.icon} {link.name}
              </Link>
            )
          )}
        </div>
      </nav>

      <div className="h-20"></div>
    </>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../Provider/AuthProvider";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false); // close menu on logout
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-700 tracking-wide">
          <Link to="/" onClick={closeMenu}>
            CozyPaws
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center font-medium">
          <NavLink
            to="/"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/services"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            Services
          </NavLink>
          <NavLink
            to="/profile"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 flex items-center gap-2"
          >
            {isAuthenticated() && user?.photoURL && (
              <div className="relative group">
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || "User"} 
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {user.displayName || "User"}
                </div>
              </div>
            )}
            My Profile 
          </NavLink>

          {isAuthenticated() ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 hidden lg:block">
                Welcome, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={handleMenuToggle}
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-blue-100 shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-4 flex flex-col space-y-4 text-center font-medium">
          <NavLink
            to="/"
            onClick={closeMenu}
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/services"
            onClick={closeMenu}
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            Services
          </NavLink>
          <NavLink
            to="/profile"
            onClick={closeMenu}
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            {isAuthenticated() && user?.photoURL && (
              <div className="relative group">
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || "User"} 
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {user.displayName || "User"}
                </div>
              </div>
            )}
            My Profile
          </NavLink>

          {isAuthenticated() ? (
            <div className="space-y-3">
              <span className="text-gray-700 block">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-all duration-300 w-full text-center"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-300 w-full text-center"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

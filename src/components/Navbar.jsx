import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white shadow px-8 py-4">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Company Logo" className="w-10 h-10" />
        {/* <span className="text-xl font-bold text-gray-800">MyCompany</span> */}
      </div>

      {/* Center: Menu Links */}
      <div className="flex-1 flex justify-center">
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <Link to="/anti-counterfeit" className="hover:text-blue-600">Anti-Counterfeit</Link>
          <Link to="/blog" className="hover:text-blue-600">Blog</Link>
          <Link to="/Contact" className="hover:text-blue-600">Contact</Link>
        </div>
      </div>

      {/* Right: Empty */}
      <div className="w-10"></div>
    </nav>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Anti-Counterfeit", path: "/anti-counterfeit" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // New state for scroll
  const linkRefs = useRef([]);

  // Update underline whenever route changes
  useEffect(() => {
    const activeIndex = links.findIndex((link) => link.path === location.pathname);
    if (linkRefs.current[activeIndex]) {
      const { offsetLeft, offsetWidth } = linkRefs.current[activeIndex];
      setUnderlineProps({ left: offsetLeft, width: offsetWidth });
    }
  }, [location.pathname]);

  // Detect scroll and change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 shadow-md transition-colors duration-500 ${
        scrolled ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-center relative">
          <div className="flex space-x-6 relative">
            {links.map((link, idx) => (
              <NavLink
                key={link.name}
                to={link.path}
                ref={(el) => (linkRefs.current[idx] = el)}
                className={({ isActive }) =>
                  `relative font-medium transition-transform duration-300 transform hover:scale-105 ${
                    scrolled
                      ? "text-white hover:text-blue-400"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Animated underline */}
            <motion.div
              className={`absolute bottom-0 h-0.5 rounded-full ${
                scrolled ? "bg-blue-400" : "bg-blue-600"
              }`}
              animate={{ left: underlineProps.left, width: underlineProps.width }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiX className={`w-7 h-7 ${scrolled ? "text-white" : "text-gray-700"}`} />
            ) : (
              <HiMenu className={`w-7 h-7 ${scrolled ? "text-white" : "text-gray-700"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`overflow-hidden md:hidden shadow-md ${
          scrolled ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-medium transition-transform duration-300 transform hover:scale-105 ${
                  scrolled ? "text-white hover:text-blue-400" : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}

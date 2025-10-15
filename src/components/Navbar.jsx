import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import logo from '../assets/nova_new-removebg-preview.png'

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
    scrolled ? "bg-[#ffffff]" : "bg-white"
  }`}
>
  <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between h-20">
    {/* Logo */}
    <div className="flex items-center">
      <img
        src={logo}
        alt="Logo"
        className="h-26 w-auto object-contain"  // height 16, width auto
      />
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
                  ? "text-gray-700 hover:text-blue-400"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}

        <motion.div
          className={`absolute bottom-0 h-0.5 rounded-full ${
            scrolled ? "bg-[#3386bc]" : "bg-[#3386bc]"
          }`}
          initial={{ opacity: 0, scaleX: 0.5 }}
          animate={{
            left: underlineProps.left,
            width: underlineProps.width,
            opacity: 1,
            scaleX: 1,
          }}
          exit={{ opacity: 0, scaleX: 0.5 }}
          transition={{
            width: {
              type: "keyframes",
              values: [
                underlineProps.width * 0.8,
                underlineProps.width * 1.1,
                underlineProps.width,
              ],
              times: [0, 0.7, 1],
            },
            left: {
              type: "spring",
              stiffness: 300,
              damping: 25,
            },
            opacity: { duration: 0.2 },
            scaleX: {
              type: "spring",
              stiffness: 400,
              damping: 30,
            },
            duration: 0.5,
          }}
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
              scrolled
                ? "text-white hover:text-blue-400"
                : "text-gray-700 hover:text-blue-600"
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

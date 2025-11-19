import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import logoDark from "../assets/nova_new-removebg-preview.png";
import logoLight from "../assets/logo_footer.png";
import { handleCtrlClick } from "../utils/openInNewTab";   // <-- NEW

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
  const [scrolled, setScrolled] = useState(false);
  const linkRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activeIndex = links.findIndex((link) => link.path === location.pathname);
    if (linkRefs.current[activeIndex]) {
      const { offsetLeft, offsetWidth } = linkRefs.current[activeIndex];
      setUnderlineProps({ left: offsetLeft, width: offsetWidth });
    }
  }, [location.pathname]);

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 shadow-md transition-colors duration-500 ${
        scrolled || menuOpen ? "bg-[#0b1e39]" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        
        {/* LOGO */}
        <div
          className="flex items-center cursor-pointer"
          onClick={(e) => {
            handleCtrlClick(e, "/");
            if (!e.ctrlKey && !e.metaKey && e.button !== 1) {
              window.location.href = "/";
            }
          }}
        >
          <div className="relative w-[170px] h-[48px] flex items-center justify-center">
            <img
              src={logoDark}
              alt="NovaTech dark logo"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                scrolled || menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <img
              src={logoLight}
              alt="NovaTech light logo"
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                scrolled || menuOpen ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex flex-1 justify-center relative">
          <div className="flex space-x-6 relative">
            {links.map((link, idx) => (
              <NavLink
                key={link.name}
                to={link.path}
                ref={(el) => (linkRefs.current[idx] = el)}
                onClick={(e) => handleCtrlClick(e, link.path)}  // <-- CTRL CLICK
                className={({ isActive }) =>
                  `relative font-medium transition-transform duration-300 transform hover:scale-105 ${
                    scrolled
                      ? "text-white hover:text-[#4bb2e5]"
                      : "text-[#3386bc] hover:text-[#18487d]"
                  } ${isActive ? "font-semibold" : ""}`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* UNDERLINE */}
            <motion.div
              className={`absolute bottom-0 h-0.5 rounded-full ${
                scrolled ? "bg-[#4bb2e5]" : "bg-[#314977]"
              }`}
              initial={{ opacity: 0, scaleX: 0.5 }}
              animate={{
                left: underlineProps.left,
                width: underlineProps.width,
                opacity: 1,
                scaleX: 1,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="transition-colors duration-300">
            {menuOpen ? (
              <HiX className={`w-7 h-7 ${scrolled || menuOpen ? "text-white" : "text-gray-800"}`} />
            ) : (
              <HiMenu className={`w-7 h-7 ${scrolled ? "text-white" : "text-gray-800"}`} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className={`overflow-hidden md:hidden shadow-lg border-t ${
          scrolled || menuOpen
            ? "bg-[#0b1e39] border-[#18487d]"
            : "bg-white border-gray-100"
        }`}
      >
        <div className="flex flex-col items-center py-5 space-y-4">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={(e) => {
                handleCtrlClick(e, link.path);  
                if (!e.ctrlKey) setMenuOpen(false);
              }}
              className={({ isActive }) =>
                `w-full text-center font-medium transition-all duration-300 py-2 ${
                  scrolled || menuOpen
                    ? "text-white hover:text-[#4bb2e5]"
                    : "text-gray-800 hover:text-[#3386bc]"
                } ${isActive ? "font-semibold underline underline-offset-4" : ""}`
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

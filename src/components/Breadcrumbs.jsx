import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react"; // optional (npm install lucide-react)

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <div className="w-full bg-gradient-to-r from-[#0b1e39] via-[#18487d] to-[#3386bc] shadow-md py-4 px-6  ">
      <nav className="max-w-7xl mx-auto flex justify-left">
        <ol className="flex flex-wrap items-center text-sm md:text-base text-white gap-2 md:gap-3">
          <li>
            <Link
              to="/"
              className="px-4 py-2 bg-white/15 backdrop-blur-md rounded-lg font-medium hover:bg-white/25 transition-all duration-200"
            >
              Home
            </Link>
          </li>

          {pathnames.map((name, idx) => {
            const routeTo = "/" + pathnames.slice(0, idx + 1).join("/");
            const isLast = idx === pathnames.length - 1;

            return (
              <li key={idx} className="flex items-center">
                <ChevronRight className="w-4 h-4 text-white/70 mx-2" />
                {isLast ? (
                  <span className="px-4 py-2 bg-white/30 text-white font-semibold rounded-lg shadow-sm cursor-default backdrop-blur-md">
                    {decodeURIComponent(name)}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="px-4 py-2 bg-white/15 text-white rounded-lg hover:bg-white/25 font-medium transition-all duration-200 backdrop-blur-md"
                  >
                    {decodeURIComponent(name)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}

import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null; // hide on home page

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ol className="flex space-x-2">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        {pathnames.map((name, idx) => {
          const routeTo = "/" + pathnames.slice(0, idx + 1).join("/");
          const isLast = idx === pathnames.length - 1;

          return (
            <li key={idx} className="flex items-center space-x-2">
              <span>/</span>
              {isLast ? (
                <span className="text-gray-800 font-medium">{name}</span>
              ) : (
                <Link to={routeTo} className="hover:underline">
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

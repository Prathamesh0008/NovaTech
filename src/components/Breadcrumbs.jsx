import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function cleanLabel(text = "") {
  return decodeURIComponent(text)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function Breadcrumbs() {
  const location = useLocation();
  const { category, productSlug, id } = useParams();

  const parts = location.pathname.split("/").filter(Boolean);
  if (parts.length === 0) return null;

  const crumbs = [{ label: "HOME", to: "/" }];

  // --------------------------------
  // HANDLING PRODUCTS
  // --------------------------------
  if (parts[0] === "products") {
    crumbs.push({ label: "PRODUCTS", to: "/products" });

    if (category) {
      crumbs.push({
        label: cleanLabel(category),
        to: `/products/${category}`,
      });
    }

    if (productSlug) {
      crumbs.push({
        label: cleanLabel(productSlug),
        to: location.pathname,
      });
    }
  }

  // --------------------------------
  // HANDLING BLOG
  // --------------------------------
  else if (parts[0] === "blog") {
    crumbs.push({ label: "BLOG", to: "/blog" });

    if (id) {
      crumbs.push({
        label: `Article ${id}`,
        to: `/blog/${id}`,
      });
    }
  }

  // --------------------------------
  // OTHER PAGES (About, Contact, etc.)
  // --------------------------------
  else {
    crumbs.push({
      label: cleanLabel(parts[0]),
      to: location.pathname,
    });
  }

  return (
    <div className="w-full bg-gradient-to-r from-[#0b1e39] via-[#18487d] to-[#3386bc] shadow-md py-3 sm:py-4 px-3 sm:px-6">
      <nav className="max-w-7xl mx-auto">
        <ol className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base text-white">
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;

            return (
              <li key={i} className="flex items-center flex-shrink-0">
                {i > 0 && (
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/70 mx-1 sm:mx-2" />
                )}

                {isLast ? (
                  <span className="px-2 sm:px-4 py-1 sm:py-2 bg-white/30 text-white font-semibold rounded-lg shadow-sm cursor-default backdrop-blur-md">
                    {c.label}
                  </span>
                ) : (
                  <Link
                    to={c.to}
                    className="px-2 sm:px-4 py-1 sm:py-2 bg-white/15 text-white rounded-lg hover:bg-white/25 font-medium transition-all duration-200 backdrop-blur-md"
                  >
                    {c.label}
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

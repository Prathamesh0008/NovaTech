import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function cleanLabel(text = "") {
  const decoded = decodeURIComponent(text);
  return decoded
    .replace(/^tab[-_]/i, "")
    .replace(/[-_]/g, " ")
    .trim();
}

export default function Breadcrumbs() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const parts = location.pathname.split("/").filter(Boolean);
  // Example:
  // /               → []
  // /products       → ["products"]
  // /products/abc   → ["products", "abc"]

  // ❌ If we are on home page, show nothing
  if (parts.length === 0) return null;

  const crumbs = [{ label: "HOME", to: "/" }];

  // ✅ Only add "PRODUCTS" breadcrumb when the path actually starts with /products
  if (parts[0].toLowerCase() === "products") {
    crumbs.push({ label: "PRODUCTS", to: "/products" });

    if (category) {
      crumbs.push({
        label: category.toUpperCase(),
        to: `/products?category=${encodeURIComponent(category)}`,
      });
    }

    // If on a specific product details page
    if (parts.length > 1) {
      crumbs.push({
        label: cleanLabel(parts[1]),
        to: location.pathname + location.search,
      });
    }
  } else {
    // ✅ For any other route like /about, /contact, etc.
    crumbs.push({
      label: cleanLabel(parts[0]).toUpperCase(),
      to: location.pathname,
    });
  }

  return (
    <div className="w-full bg-gradient-to-r from-[#0b1e39] via-[#18487d] to-[#3386bc] shadow-md py-4 px-6">
      <nav className="max-w-7xl mx-auto flex justify-left">
        <ol className="flex flex-wrap items-center text-sm md:text-base text-white gap-2 md:gap-3">
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={i} className="flex items-center">
                {i > 0 && (
                  <ChevronRight className="w-4 h-4 text-white/70 mx-2" />
                )}
                {isLast ? (
                  <span className="px-4 py-2 bg-white/30 text-white font-semibold rounded-lg shadow-sm cursor-default backdrop-blur-md">
                    {c.label}
                  </span>
                ) : (
                  <Link
                    to={c.to}
                    className="px-4 py-2 bg-white/15 text-white rounded-lg hover:bg-white/25 font-medium transition-all duration-200 backdrop-blur-md"
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

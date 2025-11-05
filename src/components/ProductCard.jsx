import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    navigate(
      `/products/${product.id}?category=${encodeURIComponent(
        product.category || ""
      )}`
    );
  };

  // ✅ Use first image or fallback
  const image =
    product.images?.[0] ||
    "https://via.placeholder.com/500x500?text=Image+Coming+Soon";

  return (
    <div
      onClick={handleClick}
      className="flex flex-col bg-white shadow-sm hover:shadow-lg transition-all p-4 text-center h-full cursor-pointer overflow-hidden  hover:scale-[1.02] duration-300 border border-gray-100"
    >
      {/* === Image Area === */}
      <div className="w-full h-44 pr-1.5 overflow-hidden mb-3 flex-shrink-0 relative bg-white">
        {/* {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm">
            <div className="w-6 h-6 border-4 border-[#18487d] border-t-[#3386bc] rounded-full animate-spin"></div>
          </div>
        )} */}

        <img
          src={image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setLoading(false)}
          className={`w-full h-full object-contain transition-opacity duration-500 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* === Text Area === */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
          {/* <p className="text-gray-500 text-sm mt-1">
            {product.description || product.indication}
          </p> */}
          {/* {product.presentation && (
            <p className="text-xs text-gray-400 mt-1">{product.presentation}</p>
          )} */}
        </div>
      </div>
    </div>
  );
}

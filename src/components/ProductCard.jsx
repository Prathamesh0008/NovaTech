import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    navigate(`/products/${product.id}?category=${encodeURIComponent(product.category || "")}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col bg-white shadow-sm hover:shadow-md transition p-4 text-center h-full cursor-pointer overflow-hidden"
    >
      {/* === Image Area === */}
      <div className="w-full h-40 overflow-hidden rounded-md mb-3 flex-shrink-0 relative">
        {loading && (
  <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm">
    <div className="w-8 h-8 border-4 border-[#18487d] border-t-[#3386bc] rounded-full animate-spin"></div>
  </div>
)}

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setLoading(false)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* === Text Area === */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mt-1">{product.price}</p>
        </div>
      </div>
    </div>
  );
}

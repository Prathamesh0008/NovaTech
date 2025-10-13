import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-xl shadow-sm hover:shadow-md transition p-4 text-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-500 text-sm mt-1">{product.price}</p>
      <Link
        to={`/products/${product.id}`}
        className="inline-block mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        View Details →
      </Link>
    </div>
  );
}

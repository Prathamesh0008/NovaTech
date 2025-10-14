import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="flex flex-col border rounded-xl shadow-sm hover:shadow-md transition p-4 text-center h-full">
      {/* Image area — fixed height / clipped */}
      <div className="w-full h-40 overflow-hidden rounded-md mb-3 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text & link area — make this flexible to fill the remainder */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mt-1">{product.price}</p>
        </div>
        <div className="mt-3">
          <Link
            to={`/products/${product.id}`}
            className="inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

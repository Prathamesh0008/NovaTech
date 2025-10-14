import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/categories";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function DiseaseFeaturedSection() {
  const [selected, setSelected] = useState(categories[0].key);
  const navigate = useNavigate();

  const onSelect = (catKey) => {
    console.log("Clicked category:", catKey);
    setSelected(catKey);
  };

  const filteredProducts = products.filter((p) => {
    // Debug: show categories and product
    // console.log("Checking product", p.name, "category", p.category, "vs selected", selected);
    return p.category === selected;
  });

  console.log("Selected:", selected, "Filtered count:", filteredProducts.length);

  const toShow = filteredProducts.slice(0, 4);

  const onViewAllProducts = () => {
    navigate(`/products?category=${encodeURIComponent(selected)}`);
  };

  const onViewAllCategories = () => {
    navigate(`/products`);
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Featured For You
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-6 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onSelect(cat.key)}
            className={`px-4 py-2 whitespace-nowrap rounded-full border transition-colors duration-200
              ${
                selected === cat.key
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100 hover:border-blue-400"
              }`}
          >
            {cat.name}
          </button>
        ))}

        <button
          onClick={onViewAllCategories}
          className="px-4 py-2 whitespace-nowrap rounded-full border transition-colors duration-200 bg-white text-gray-800 border-gray-300 hover:bg-blue-100 hover:border-blue-400"
        >
          View All Categories
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {toShow.length > 0 ? (
          toShow.map((p) => (
            <div key={p.id} className="h-full">
              <ProductCard product={p} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No medicines for this category yet.
          </p>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onViewAllProducts}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700  transform hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          Check More {selected}
        </button>
      </div>
    </section>
  );
}

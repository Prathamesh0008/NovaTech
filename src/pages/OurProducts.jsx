import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { products } from "../data/products";
import { categories } from "../data/categories";
import ProductCard from "../components/ProductCard";
import Breadcrumbs from "../components/Breadcrumbs";

export default function ProductsPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const categoryParam = query.get("category");  // e.g. "Asthma" or null

  // Initialize selectedCats from the query param
  const [selectedCats, setSelectedCats] = useState(() => {
    const initial = new Set();
    if (categoryParam) {
      // If the param matches a valid category, add it
      const found = categories.find((cat) => cat.key === categoryParam);
      if (found) {
        initial.add(categoryParam);
      }
    }
    return initial;
  });

  // If the user manually changes checkboxes, toggleCategory as before
  const toggleCategory = (catKey) => {
    setSelectedCats((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(catKey)) {
        newSet.delete(catKey);
      } else {
        newSet.add(catKey);
      }
      return newSet;
    });
  };

  // Compute filtered products
  const filteredProducts =
    selectedCats.size === 0
      ? products
      : products.filter((p) => selectedCats.has(p.category));

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <Breadcrumbs />

      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Our Products
      </h1>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Sidebar / filters */}
        <div className="md:w-1/4 bg-white border rounded-lg p-4 max-h-screen overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
          {categories.map((cat) => {
            const isChecked = selectedCats.has(cat.key);
            return (
              <label
                key={cat.key}
                className="group flex items-center gap-3 mb-3 p-2 rounded-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-400 hover:bg-blue-50"
              >
                <div
                  className={`relative w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all duration-300
                    ${isChecked ? "border-blue-600 bg-blue-600" : "border-gray-400 bg-white"}
                  `}
                >
                  <svg
                    className={`w-3 h-3 text-white transform transition-transform duration-300 ${
                      isChecked ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M7.629 13.193l-3.536-3.536L3.073 11.676l4.556 4.556L17.492 6.37l-1.414-1.414z" />
                  </svg>
                </div>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCategory(cat.key)}
                  className="hidden"
                />
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isChecked ? "text-blue-700" : "text-gray-700"
                  }`}
                >
                  {cat.name}
                </span>
              </label>
            );
          })}
        </div>

        {/* Product area */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div key={p.id} className="animate-fade-in-up">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

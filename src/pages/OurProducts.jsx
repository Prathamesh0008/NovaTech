import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { products } from "../data/products";
import { categories } from "../data/categories";
import ProductCard from "../components/ProductCard";
import Breadcrumbs from "../components/Breadcrumbs";

export default function ProductsPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const categoryParam = query.get("category");

  const [selectedCats, setSelectedCats] = useState(() => {
    const initial = new Set();
    if (categoryParam) {
      const found = categories.find((cat) => cat.key === categoryParam);
      if (found) initial.add(categoryParam);
    }
    return initial;
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const toggleCategory = (catKey) => {
    setSelectedCats((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(catKey)) newSet.delete(catKey);
      else newSet.add(catKey);
      return newSet;
    });
  };

  const filteredProducts =
    selectedCats.size === 0
      ? products
      : products.filter((p) => selectedCats.has(p.category));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f9fb] via-[#f3f8fa] to-[#e8f3f8]">
      {/* ===== Header Section ===== */}
      <div className="bg-gradient-to-r from-[#0b1e39] via-[#18487d] to-[#3386bc] text-white py-10 shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">
                Our Product Portfolio
              </h1>
              <p className="text-white/80 mt-2 max-w-2xl">
                Explore our range of pharmaceutical and nutraceutical
                formulations designed with precision, quality, and care.
              </p>
            </div>

            {/* ===== Mobile Filter Dropdown ===== */}
            <div className="block md:hidden mt-4">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="flex items-center justify-center gap-2 bg-white/20 text-white font-medium px-4 py-2 rounded-lg backdrop-blur-md hover:bg-white/30 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-11.25 6h11.25m-6.75 6h6.75"
                  />
                </svg>
                Filter Categories
              </button>

              {mobileFilterOpen && (
                <div className="mt-3 bg-white text-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 animate-fade-in">
                  {categories.map((cat) => {
                    const isChecked = selectedCats.has(cat.key);
                    return (
                      <label
                        key={cat.key}
                        className={`flex items-center gap-3 mb-2 p-2 rounded-md cursor-pointer transition ${
                          isChecked
                            ? "bg-[#e6f4fa] text-[#18487d]"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCategory(cat.key)}
                          className="w-4 h-4 accent-[#3386bc]"
                        />
                        <span className="text-sm font-medium">{cat.name}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10 pb-20 flex flex-col md:flex-row gap-8">
        {/* ===== Sidebar (Desktop) ===== */}
        <aside className="hidden md:block md:w-1/4 bg-white rounded-2xl p-6 shadow-lg border border-gray-200 sticky top-10 h-fit">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Filter by Category
          </h2>
          <div className="space-y-2">
            {categories.map((cat) => {
              const isChecked = selectedCats.has(cat.key);
              return (
                <label
                  key={cat.key}
                  className={`group flex items-center justify-between gap-3 p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                    isChecked
                      ? "border-[#3386bc] bg-[#e6f4fa]"
                      : "border-gray-200 hover:border-[#3386bc]/40 hover:bg-[#f8fcfd]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 flex items-center justify-center rounded-md border-2 ${
                        isChecked
                          ? "border-[#3386bc] bg-[#3386bc]"
                          : "border-gray-400 bg-white"
                      } transition-all`}
                    >
                      <svg
                        className={`w-3 h-3 text-white transform transition-transform duration-200 ${
                          isChecked
                            ? "scale-100 opacity-100"
                            : "scale-0 opacity-0"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M7.629 13.193l-3.536-3.536L3.073 11.676l4.556 4.556L17.492 6.37l-1.414-1.414z" />
                      </svg>
                    </div>
                    <span
                      className={`font-medium ${
                        isChecked ? "text-[#18487d]" : "text-gray-700"
                      }`}
                    >
                      {cat.name}
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCategory(cat.key)}
                    className="hidden"
                  />
                </label>
              );
            })}
          </div>
        </aside>

        {/* ===== Products Grid ===== */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-16">
              <p className="text-lg">No products found for this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300"
                >
                  <ProductCard
                    product={{
                      ...p,
                      image: p.images?.[0] || // use the first image
                        "https://via.placeholder.com/500x500?text=No+Image",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

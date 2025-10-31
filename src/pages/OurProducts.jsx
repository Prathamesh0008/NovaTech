import React, { useState, useMemo } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Breadcrumbs from "../components/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedMg, setSelectedMg] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // === Extract unique values dynamically ===
  const categoryOptions = ["Tablets", "Injectables"];

  const productOptions = useMemo(() => {
    if (!selectedCategory) return [];
    const filtered = products.filter(
      (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
    return Array.from(new Set(filtered.map((p) => p.name))).sort();
  }, [selectedCategory]);

  const mgOptions = useMemo(() => {
    const strengths = new Set();
    products.forEach((p) => {
      const match = p.description.match(/(\d+(\.\d+)?\s?(mg|mcg))/i);
      if (match) strengths.add(match[0].toLowerCase());
    });
    return Array.from(strengths).sort((a, b) => parseFloat(a) - parseFloat(b));
  }, []);

  // === Filter logic ===
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      !selectedCategory ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchProduct =
      !selectedProduct ||
      p.name.toLowerCase() === selectedProduct.toLowerCase();

    const matchMg =
      !selectedMg ||
      (p.description && p.description.toLowerCase().includes(selectedMg.toLowerCase()));

    return matchCategory && matchProduct && matchMg;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f9fb] via-[#f3f8fa] to-[#e8f3f8]">
      {/* ===== Header ===== */}
      <div className="bg-gradient-to-r from-[#0b1e39] via-[#18487d] to-[#3386bc] text-white py-10 shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">
                Our Product Portfolio
              </h1>
              <p className="text-white/80 mt-2 max-w-2xl">
                Browse by category, product name, or dosage strength — precision
                pharmaceuticals crafted with care.
              </p>
            </div>

            {/* ===== Mobile Filter Toggle ===== */}
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
                {mobileFilterOpen ? "Close Filters" : "Filters"}
              </button>

              {/* ===== Animated Mobile Filter ===== */}
              <AnimatePresence>
                {mobileFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 bg-white text-gray-800 rounded-xl shadow-xl p-4 border border-gray-100 space-y-4"
                  >
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-[#18487d] mb-2">
                        Category
                      </label>
                      <select
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3386bc]"
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setSelectedProduct("");
                        }}
                      >
                        <option value="">All</option>
                        {categoryOptions.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Product Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-[#18487d] mb-2">
                        Product
                      </label>
                      <select
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3386bc]"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        disabled={!selectedCategory}
                      >
                        <option value="">All</option>
                        {productOptions.map((prod) => (
                          <option key={prod} value={prod}>
                            {prod}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Dosage Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-[#18487d] mb-2">
                        Dosage Strength
                      </label>
                      <select
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3386bc]"
                        value={selectedMg}
                        onChange={(e) => setSelectedMg(e.target.value)}
                      >
                        <option value="">All</option>
                        {mgOptions.map((mg) => (
                          <option key={mg} value={mg}>
                            {mg.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10 pb-20 flex flex-col md:flex-row gap-8">
        {/* ===== Sidebar (Desktop Filters) ===== */}
        <aside className="hidden md:block md:w-1/4 bg-white  p-6 shadow-lg sticky top-10 h-fit space-y-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-[#18487d] mb-2">
              Category
            </label>
            <select
              className="w-full  p-2 focus:ring-2 focus:ring-[#3386bc]"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedProduct("");
              }}
            >
              <option value="">All</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Product Filter */}
          <div>
            <label className="block text-sm font-semibold text-[#18487d] mb-2">
              Product
            </label>
            <select
              className="w-full  p-2 focus:ring-2 focus:ring-[#3386bc]"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              disabled={!selectedCategory}
            >
              <option value="">All</option>
              {productOptions.map((prod) => (
                <option key={prod} value={prod}>
                  {prod}
                </option>
              ))}
            </select>
          </div>

          {/* Dosage Filter */}
          <div>
            <label className="block text-sm font-semibold text-[#18487d] mb-2">
              Dosage Strength
            </label>
            <select
              className="w-full  p-2 focus:ring-2 focus:ring-[#3386bc]"
              value={selectedMg}
              onChange={(e) => setSelectedMg(e.target.value)}
            >
              <option value="">All</option>
              {mgOptions.map((mg) => (
                <option key={mg} value={mg}>
                  {mg.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* ===== Product Grid ===== */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-16">
              <p className="text-lg">No products found for the selected filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((p) => (
                <motion.div
                  key={p.id || p.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300"
                >
                  <ProductCard
                    product={{
                      ...p,
                      image:
                        p.images?.[0] ||
                        "https://via.placeholder.com/500x500?text=No+Image",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

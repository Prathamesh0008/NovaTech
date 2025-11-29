import React, { useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Title, Meta, Link as LinkTag } from "react-head";

import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Breadcrumbs from "../components/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductsPage() {
  const navigate = useNavigate();
  const { category } = useParams();

  const categoryOptions = ["Tablets", "Injectables"];
  const initialCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedMg, setSelectedMg] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const slugify = (name) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  const productOptions = useMemo(() => {
    if (!selectedCategory) return [];
    return Array.from(
      new Set(
        products
          .filter(
            (p) =>
              p.category?.toLowerCase() === selectedCategory.toLowerCase()
          )
          .map((p) => p.name)
      )
    ).sort();
  }, [selectedCategory]);

  const mgOptions = useMemo(() => {
    const strengths = new Set();
    let filteredList = products;
    if (selectedCategory) {
      filteredList = filteredList.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (selectedProduct) {
      filteredList = filteredList.filter(
        (p) => p.name.toLowerCase() === selectedProduct.toLowerCase()
      );
    }
    filteredList.forEach((p) => {
      const match = p.description?.match(/(\d+(\.\d+)?\s?(mg|mcg))/gi);
      if (match) match.forEach((m) => strengths.add(m.toLowerCase()));
    });
    return Array.from(strengths).sort((a, b) => parseFloat(a) - parseFloat(b));
  }, [selectedCategory, selectedProduct]);

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      !selectedCategory ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchProduct =
      !selectedProduct || p.name.toLowerCase() === selectedProduct.toLowerCase();
    const matchMg =
      !selectedMg ||
      (p.description &&
        p.description.toLowerCase().includes(selectedMg.toLowerCase()));
    return matchCategory && matchProduct && matchMg;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f9fb] via-[#f3f8fa] to-[#e8f3f8]">
      {/* ⭐ Page Meta */}
      <Title>NovaTech Sciences – Pharmaceutical Tablets & Injectables</Title>
      <Meta
        name="description"
        content="Browse high-quality steroid tablets, injectables, PCT medicines, and performance enhancers manufactured by NovaTech Sciences."
      />
      <LinkTag rel="canonical" href="https://novatechsciences.com/products" />
      <Meta name="robots" content="index, follow" />

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
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10 pb-20 flex flex-col md:flex-row gap-8">
        {/* ===== Sidebar Filters ===== */}
        <aside className="hidden md:block md:w-1/4 bg-white p-6 shadow-lg sticky top-10 h-fit space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#18487d] mb-2">
              Category
            </label>
            <select
              className="w-full p-2 focus:ring-2 focus:ring-[#3386bc]"
              value={selectedCategory}
              onChange={(e) => {
                const newCat = e.target.value;
                setSelectedCategory(newCat);
                setSelectedProduct("");
                setSelectedMg("");
                if (newCat) navigate(`/products/${newCat.toLowerCase()}`);
                else navigate(`/products`);
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

          <div>
            <label className="block text-sm font-semibold text-[#18487d] mb-2">
              Product
            </label>
            <select
              className="w-full p-2 focus:ring-2 focus:ring-[#3386bc]"
              value={selectedProduct}
              onChange={(e) => {
                setSelectedProduct(e.target.value);
                setSelectedMg("");
              }}
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

          <div>
            <label className="block text-sm font-semibold text-[#18487d] mb-2">
              Dosage Strength
            </label>
            <select
              className="w-full p-2 focus:ring-2 focus:ring-[#3386bc]"
              value={selectedMg}
              onChange={(e) => setSelectedMg(e.target.value)}
              disabled={!selectedProduct}
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

        {/* ===== Products Grid ===== */}
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
                      slug: slugify(p.name),
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

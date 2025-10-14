import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/categories";
import { products } from "../data/products";
import CategoryCard from "./CategoryCard";
import ProductCard from "./ProductCard";

export default function FeaturedByCategory() {
  // Default selected category: the first one
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const navigate = useNavigate();

  // Filter products that belong to selected category
  const filtered = products.filter((p) => p.category === selectedCategory);

  // Maybe limit to first N featured
  const featuredToShow = filtered.slice(0, 6);

  const handleClickCategory = (catName) => {
    setSelectedCategory(catName);
  };

  const handleViewAll = () => {
    // navigate to products page with category filter
    navigate(`/products?category=${encodeURIComponent(selectedCategory)}`);
  };

  return (
    <div>
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Medicine Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.name}
              className={`cursor-pointer transform transition duration-300 ${
                selectedCategory === cat.name
                  ? "scale-110 shadow-xl"
                  : "hover:scale-105 opacity-90"
              }`}
              onClick={() => handleClickCategory(cat.name)}
            >
              <CategoryCard
                name={cat.name}
                image={cat.image}
                link={cat.link}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Featured Products — {selectedCategory}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredToShow.length > 0 ? (
            featuredToShow.map((p, idx) => (
              <div
                key={p.id}
                className={`opacity-0 animate-slideUp delay-[${idx * 150}ms]`}
              >
                <ProductCard product={p} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products in this category.
            </p>
          )}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={handleViewAll}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition transform hover:scale-105"
          >
            View All {selectedCategory}
          </button>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Welcome to MyCompany
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Explore some of our featured products below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

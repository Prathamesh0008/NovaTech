import React from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Breadcrumbs from "../components/Breadcrumbs";

export default function OurProducts() {
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

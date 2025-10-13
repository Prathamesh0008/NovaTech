import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import Breadcrumbs from "../components/Breadcrumbs";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto mt-8 text-center">
        <Breadcrumbs />
        <h2 className="text-xl text-gray-600">Product not found.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Breadcrumbs />
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-lg font-semibold mt-4">{product.price}</p>
        </div>
      </div>
    </div>
  );
}

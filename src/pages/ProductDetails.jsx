import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCard from "../components/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductDetails() {
  const { id } = useParams();
  const prodId = parseInt(id);
  const product = products.find((p) => p.id === prodId);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto mt-8 text-center">
        <Breadcrumbs />
        <h2 className="text-xl text-gray-600">Product not found.</h2>
      </div>
    );
  }

  const images = product.images || [product.image];

  const related = products
    .filter((p) => p.category === product.category && p.id !== prodId)
    .slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <Breadcrumbs />

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Image carousel */}
          <div className="md:w-1/2">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="h-96 md:h-full"
            >
              {images.map((imgUrl, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={imgUrl}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-96 md:h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Info section */}
          <div className="p-6 md:w-1/2 flex flex-col">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-4">{product.description}</p>

            <p className="text-2xl font-semibold text-blue-600 mb-6">{product.price}</p>

            <ul className="mb-6 space-y-2 text-gray-700">
              {product.category && (
                <li>
                  <strong>Category:</strong> {product.category}
                </li>
              )}
              {product.composition && (
                <li>
                  <strong>Composition:</strong> {product.composition}
                </li>
              )}
              {product.usage && (
                <li>
                  <strong>Usage:</strong> {product.usage}
                </li>
              )}
              {product.benefits && (
                <li>
                  <strong>Benefits:</strong> {product.benefits}
                </li>
              )}
              {product.storage && (
                <li>
                  <strong>Storage:</strong> {product.storage}
                </li>
              )}
            </ul>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200">
              Contact to Purchase
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <Link key={p.id} to={`/products/${p.id}`}>
                <ProductCard product={p} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

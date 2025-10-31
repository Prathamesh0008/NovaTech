import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import catalogue from "/src/assets/catalogue/Catalogue.pdf";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

// Dynamically import all product images
const allImages = import.meta.glob(
  "/src/assets/products/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
  }
);

// Helper to fetch product images by product name
const getProductImages = (name) => {
  const keyMatch = Object.keys(allImages).filter((key) =>
    key.toLowerCase().includes(name.toLowerCase().replace(/\s+/g, "_"))
  );
  const imgs = keyMatch.map((k) => allImages[k].default);
  if (imgs.length === 0) {
    return [
      "https://via.placeholder.com/600x600?text=Image+Coming+Soon",
      "https://via.placeholder.com/600x600?text=Image+Coming+Soon",
      "https://via.placeholder.com/600x600?text=Image+Coming+Soon",
    ];
  }
  return imgs;
};

function ZoomImage({ src, alt }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [zoom, setZoom] = useState(false);

  const handleMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPos({ x, y });
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-gray-100 bg-white"
      onMouseMove={handleMove}
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
    >
      <img
        src={src}
        alt={alt}
        style={{
          transformOrigin: `${pos.x}% ${pos.y}%`,
          transform: zoom ? "scale(2)" : "scale(1)",
          transition: "transform 0.3s ease-out",
        }}
        className="w-full h-[420px] object-contain select-none"
      />
    </div>
  );
}


export default function ProductDetails() {
  const { id } = useParams();
  const prodId = parseInt(id);
  const product = products.find((p) => p.id === prodId);

  const productImages = useMemo(
    () => (product ? getProductImages(product.name) : []),
    [product]
  );

  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const [activeTab, setActiveTab] = useState("indication");
  const [openFAQ, setOpenFAQ] = useState(null);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto mt-8 text-center">
        <Breadcrumbs />
        <h2 className="text-xl text-gray-600">Product not found.</h2>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== prodId)
    .slice(0, 4);

  const faqs = [
    {
      q: "How should I use this medicine?",
      a: "Use as directed by your healthcare provider. Follow dosage and timing strictly to ensure effectiveness.",
    },
    {
      q: `What is ${product.name}?`,
      a: `${product.name} is used for ${
        product.shortDescription ||
        "therapeutic purposes as advised by your doctor."
      }`,
    },
    {
      q: "Can I take this medicine with food?",
      a: "It depends on your doctor's advice. Some medicines should be taken before meals, others after.",
    },
    {
      q: "What should I do if I miss a dose?",
      a: "Take it as soon as you remember unless it's almost time for the next dose. Never double the dose.",
    },
    {
      q: "Is this medicine safe for pregnant or breastfeeding women?",
      a: "Consult your physician before using this medicine during pregnancy or lactation.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f9fb] via-[#f3f8fa] to-[#e8f3f8]">
      {/* ===== Header ===== */}
      <div className="bg-gradient-to-r from-[#0b1e39] via-[#18487d] to-[#3386bc] text-white py-10 shadow-md mb-10">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs />
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12 pb-20">
        {/* === Product Details === */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:flex gap-10">
          {/* LEFT — Image Gallery */}
          <div className="md:w-1/2">
            <div className="overflow-hidden rounded-xl border border-gray-100">
             <ZoomImage src={selectedImage} alt={product.name} />

            </div>

            <div className="flex gap-3 mt-4 justify-center flex-wrap">
              {productImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-24 border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedImage === img
                      ? "border-[#3386bc] ring-2 ring-[#3386bc]/40"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Product Info */}
          <div className="md:w-1/2 flex flex-col justify-between mt-8 md:mt-0">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                {product.name}
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {product.shortDescription || product.description}
              </p>

              {/* Tabs */}
              <div className="flex gap-4 mt-8 border-b border-gray-300">
                {["indication", "presentation"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 font-semibold capitalize ${
                      activeTab === tab
                        ? "text-[#314977] border-b-2 border-[#314977]"
                        : "text-gray-500 hover:text-[#314977]"
                    } transition-all duration-200`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-6 text-gray-700 leading-relaxed min-h-[120px]">
                {activeTab === "indication" && (
                  <p>
                    {product.indication ||
                      "Information about indications will be available soon."}
                  </p>
                )}
                {activeTab === "presentation" && (
                  <p>
                    {product.presentation ||
                      "Information about presentation will be available soon."}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="bg-[#3386bc] text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#4bb2e5] hover:scale-105 hover:shadow-lg transition-all duration-300 inline-block"
                >
                  Enquire Now
                </Link>

                <a
                  href={catalogue}
                  download
                  className="flex items-center gap-2 bg-white border border-[#3386bc] text-[#3386bc] px-6 py-3 rounded-lg shadow-sm hover:bg-[#e6f4fa] hover:shadow-md transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  Download Catalogue
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* === FAQ Section === */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Important Information & FAQs
          </h2>

          <div className="flex flex-wrap gap-6 items-start">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-300 w-full md:w-[48%]"
              >
                <button
                  className="w-full flex justify-between items-center font-semibold text-lg text-gray-800"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  {faq.q}
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openFAQ === index && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 text-gray-600 leading-relaxed overflow-hidden"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* === Precautions === */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:flex items-center gap-10">
          <div className="md:w-2/3 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Precautions & Contraindications
            </h2>
            <p className="text-gray-600">
              Always consult your healthcare provider before using{" "}
              {product.name}. Avoid self-medication and follow prescribed
              dosages only.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Do not use if allergic to any active ingredient.</li>
              <li>Inform your doctor about other medications you’re taking.</li>
              <li>Keep out of reach of children.</li>
              <li>
                Avoid alcohol or other substances that may interfere with
                treatment.
              </li>
              <li>
                Seek immediate medical attention if unusual symptoms appear.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6">
              Possible Side Effects
            </h3>
            <p className="text-gray-600">
              Common side effects include mild headache, nausea, or stomach
              discomfort. Rarely, serious reactions may occur—consult your
              doctor immediately.
            </p>
          </div>

          <div className="md:w-1/3 flex justify-center mt-8 md:mt-0">
            <img
              src={productImages[0]}
              alt={product.name}
              className="w-72 h-72 object-contain rounded-xl shadow-md hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* === Related Products === */}
        {related.length > 0 && (
          <section className="mt-14 pb-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

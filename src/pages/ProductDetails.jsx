import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const prodId = parseInt(id);
  const product = products.find((p) => p.id === prodId);

  const [mainImage, setMainImage] = useState(product?.images?.[0] || product?.image);
  const [activeTab, setActiveTab] = useState("indication");
  const [openFaq, setOpenFaq] = useState(null);

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

  // FAQ Data
  const faqs = [
    {
      q: "How to use Nova?",
      a: "Use Nova strictly as prescribed by your healthcare provider. Follow dosage instructions on the packaging or as directed by your doctor. Do not exceed the recommended dose, and always take it with water unless otherwise advised."
    },
    {
      q: "Is Nova safe during pregnancy and breastfeeding?",
      a: "Consult your doctor before using Nova if you are pregnant, planning pregnancy, or breastfeeding. Nova is generally safe in prescribed doses, but professional guidance is essential."
    },
    {
      q: "What to do if you overdose?",
      a: "Seek immediate medical attention or contact a poison control center. Overdose symptoms may include dizziness, nausea, or severe fatigue."
    },
    {
      q: "What other drugs could affect Nova?",
      a: "Certain antibiotics, antifungals, or heart medicines may interact with Nova. Always tell your doctor about all medications or supplements you are taking."
    },
    {
      q: "What to do if you miss a dose?",
      a: "If you miss a dose, take it as soon as you remember. If it’s close to your next scheduled dose, skip the missed one — do not double up to make up for it."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <Breadcrumbs />

      {/* MAIN PRODUCT CARD */}
      <div className="bg-white shadow-xl overflow-hidden p-8 md:flex gap-10 transition-all duration-300 hover:shadow-2xl">
        {/* LEFT IMAGE SECTION */}
        <div className="md:w-1/2 flex flex-col items-center">
          <motion.img
            key={mainImage}
            src={mainImage}
            alt={product.name}
            className="w-full h-96 object-cover  border"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="flex justify-center gap-3 mt-4">
            {images.slice(0, 3).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumbnail ${idx + 1}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover  cursor-pointer border-2 ${
                  mainImage === img
                    ? "border-blue-600 scale-105"
                    : "border-transparent hover:border-gray-300"
                } transition-all duration-300`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT INFO SECTION */}
        <div className="md:w-1/2 flex flex-col justify-center mt-8 md:mt-0 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>
          </div>

          {/* INDICATION / PRESENTATION BOX */}
          <div className="border rounded-2xl p-6 bg-gray-50 shadow-inner space-y-4">
            <div className="flex justify-center items-center gap-10 border-b pb-3">
              {["indication", "presentation"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative text-base font-semibold transition-all duration-300 pb-1 ${
                    activeTab === tab
                      ? "text-[#3386bc] after:w-full"
                      : "text-gray-500 hover:text-gray-700 after:w-0"
                  } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#314977] after:transition-all after:duration-300`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-gray-700 text-sm leading-relaxed px-1 text-justify"
              >
                {activeTab === "indication" && (
                  <p>{product.indication || "No indication details available."}</p>
                )}
                {activeTab === "presentation" && (
                  <p>{product.presentation || "No presentation details available."}</p>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Enquire Button */}
            <div className="flex justify-left">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 text-sm px-5 py-2 rounded-md bg-[#314977] text-white font-medium shadow hover:bg-[#314979] transition-all"
              >
                Enquire Now
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ CARD - SEPARATE */}
    <div className="bg-white  shadow-xl overflow-hidden p-8 mt-30 transition-all duration-300 hover:shadow-2xl">
  <h2 className="text-2xl font-bold text-[#314977] mb-10 text-left">
    Important Information
  </h2>

  <div className="grid md:grid-cols-2 gap-8 items-start">
    {faqs.map((faq, idx) => (
      <motion.div
        key={idx}
        className={`p-5 border rounded-xl shadow-sm transition-all duration-300 hover:shadow-md bg-gray-50 ${
          idx % 2 === 0 ? "md:justify-self-start" : "md:justify-self-end"
        } w-full`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: idx * 0.05 }}
      >
        <button
          onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
          className="w-full flex justify-between items-center text-left font-medium text-gray-800 hover:text-[#3386bc] transition-all"
        >
          {faq.q}
          {openFaq === idx ? (
            <ChevronUp size={18} className="text-blue-600" />
          ) : (
            <ChevronDown size={18} className="text-gray-500" />
          )}
        </button>

        <AnimatePresence>
          {openFaq === idx && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {faq.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    ))}
  </div>
</div>


     

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="mt-16">
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

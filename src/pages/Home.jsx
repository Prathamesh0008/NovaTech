import React, { useEffect } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSection from "../components/HeroSection";



export default function Home() {
  useEffect(() => { AOS.init({ duration: 800 }); }, []);
  const categories = [
    { name: "Asthma", image: "/images/asthma.jpg", link: "/products" },
    { name: "Thyrocare", image: "/images/thyrocare.jpg", link: "/products" },
    { name: "Weight Loss", image: "/images/weightloss.jpg", link: "/products" },
    { name: "High Sugar", image: "/images/highsugar.jpg", link: "/products" },
    { name: "BP", image: "/images/bp.jpg", link: "/products" },
  ];

  return (
    <>
    <HeroSection/>
    <div className="max-w-5xl w-full mx-auto ">
      
      {/* Hero Section */}
      <section className="bg-blue-100 rounded-xl p-10 text-center mb-12 overflow-hidden">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 animate-fadeIn">
          Innovative Healthcare Solutions
        </h1>
        <p className="text-gray-700 mb-6 animate-slideUp">
          NovaTech Sciences brings you trusted medicines and health solutions
          for a healthier life.
        </p>
        <div className="flex justify-center gap-4 animate-fadeIn delay-200">
          <a
            href="/products"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition"
          >
            Explore Products
          </a>
          <a
            href="/contact"
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transform hover:scale-105 transition"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Medicine Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
  {categories.map((cat, index) => (
    <CategoryCard
      key={cat.name}
      name={cat.name}
      image={cat.image}
      link={cat.link}
      className="transform transition duration-500 hover:scale-105 opacity-0 animate-fadeIn delay-[${index*100}ms]"
    />
  ))}
</div>

      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Featured Products
        </h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {products.slice(0, 6).map((p, idx) => (
    <div
      key={p.id}
      className="opacity-0 animate-slideUp delay-[${idx*150}ms]"
    >
      <ProductCard product={p} />
    </div>
  ))}
</div>

      </section>

      {/* About NovaTech */}
      <section className="bg-gray-100 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          About NovaTech
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          NovaTech Sciences is dedicated to providing innovative healthcare
          solutions, trusted medicines, and advanced diagnostics. Our mission is
          to improve the quality of life with science-driven healthcare products
          for every need, from asthma and thyroid care to diabetes and blood
          pressure management.
        </p>
      </section>

      {/* Optional Blog / Health Tips */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Health Tips & Blog
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800">
              Managing Diabetes Naturally
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Learn lifestyle tips and precautions to manage your blood sugar
              effectively.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800">
              Asthma Care Tips
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Important guidelines to keep your asthma under control and prevent
              attacks.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800">
              Weight Loss Safely
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Effective and safe strategies to achieve your weight loss goals
              with health in mind.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

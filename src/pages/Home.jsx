import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import HeroSection from "../components/HeroSection";
import DiseaseFeaturedSection from "../components/DiseaseFeaturedSection";
import BannerSlider from "../components/BannerSlider";

import banner1 from "../assets/banners/gdrive1.png";
import banner2 from "../assets/banners/gdrive2.jpg";
import banner3 from "../assets/banners/gdrive3.jpg";

// ✅ Animated Count Component
function CountUp({ target, suffix }) {
  const [count, setCount] = React.useState(0);
  const duration = 1500;
  const frame = React.useRef(0);

  React.useEffect(() => {
    const start = performance.now();
    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) frame.current = requestAnimationFrame(animate);
    };
    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame.current);
  }, [target]);

  return (
    <h3 className="text-4xl font-extrabold text-[#3386bc] mb-1">
      {count}
      {suffix}
    </h3>
  );
}

// ✅ Stats Section (Animated)
function StatsSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  React.useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [inView, controls]);

  const stats = [
    { num: 10, text: "Countries Served", suffix: "+" },
    { num: 200, text: "Products Formulated", suffix: "+" },
    { num: 15, text: "Therapeutic Segments", suffix: "+" },
    { num: 100, text: "Quality Commitment", suffix: "%" },
  ];

  return (
    <section
      ref={ref}
      className="relative my-20 bg-[#f5fafb] rounded-xl p-10 grid md:grid-cols-4 text-center shadow-sm overflow-hidden"
      data-aos="fade-up"
    >
      <div className="absolute top-0 left-0 w-full h-1 " />
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className="p-6"
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          <CountUp target={stat.num} suffix={stat.suffix} />
          <p className="text-gray-700 font-medium mt-2">{stat.text}</p>
        </motion.div>
      ))}
    </section>
  );
}

// ✅ Main Home Component
export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const categories = [
    { name: "Asthma", image: "/images/asthma.jpg", link: "/products" },
    { name: "Thyrocare", image: "/images/thyrocare.jpg", link: "/products" },
    { name: "Weight Loss", image: "/images/weightloss.jpg", link: "/products" },
    { name: "High Sugar", image: "/images/highsugar.jpg", link: "/products" },
    { name: "BP", image: "/images/bp.jpg", link: "/products" },
  ];

  const banners = [
    { image: banner1, alt: "Health Concern", title: "Your Health, Our Priority" },
    { image: banner2, alt: "Medicine Banner", title: "World Class Medicines" },
    { image: banner3, alt: "Medical Banner", title: "Trusted Healthcare Solutions" },
    { image: banner1, alt: "Health Care", title: "Caring for You Always" },
  ];

  return (
    <>
      {/* ✅ Banner Section */}
      <BannerSlider banners={banners} />

      <div className="max-w-7xl w-full mx-auto px-4 md:px-8">
        {/* ✅ Hero */}
        <section className="text-center py-16" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Innovative Healthcare Solutions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
            NovaTech Sciences brings you trusted medicines, diagnostics, and health solutions
            to help you live healthier and stronger every day.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/products"
              className="bg-[#314977] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#0d1b4b] hover:scale-105 transition-all duration-300"
            >
              Explore Products
            </a>
            <a
              href="/contact"
              className="bg-[#3386bc] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#4bb2e5] hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </section>

        {/* ✅ Why Choose Us */}
        <section
          className="grid md:grid-cols-3 gap-6 bg-gradient-to-r from-[#e9f7fc] to-[#e6f9f5] rounded-2xl p-10 my-16 text-center"
          data-aos="fade-up"
        >
          {[
            {
              title: "✔ WHO-GMP Certified",
              text: "Our manufacturing facilities follow WHO-GMP, ISO, and stringent quality standards.",
            },
            {
              title: "🌍 Global Reach",
              text: "Trusted by healthcare professionals across multiple countries with continuous expansion.",
            },
            {
              title: "🔬 Research-Driven",
              text: "We focus on science, innovation, and clinical efficacy for every product we deliver.",
            },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="text-xl font-semibold text-[#314977] mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </div>
          ))}
        </section>

        {/* ✅ Categories */}
        <section className="my-20" data-aos="fade-up">
  <div className="text-center mb-10">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
      Our Therapeutic Divisions
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto text-base">
      NovaTech Sciences specializes in two core pharmaceutical divisions — precision-formulated{" "}
      <span className="font-semibold text-[#18487d]">Tablets</span> and
      {" "}
      <span className="font-semibold text-[#3386bc]">Injectables</span>,
      designed to meet the highest standards of global healthcare and manufacturing quality.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
    {/* Tablets Division */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
    >
      <img
        src="/assets/banners/tablets.jpg"
        alt="Tablets Division"
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-[#18487d]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <a
          href="/products?category=Tablets"
          className="bg-white text-[#18487d] px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#e6f3fa] transition-all"
        >
          Explore Tablets
        </a>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-[#18487d] mb-2">Tablets Division</h3>
        <p className="text-gray-600 text-sm">
          Oral solid dosage forms including hormones, anabolic, and therapeutic formulations
          designed for precision and reliability.
        </p>
      </div>
    </motion.div>

    {/* Injectables Division */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="relative group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
    >
      <img
        src="/assets/banners/injectables.jpg"
        alt="Injectables Division"
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-[#3386bc]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <a
          href="/products?category=Injectables"
          className="bg-white text-[#3386bc] px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#e6f4fa] transition-all"
        >
          Explore Injectables
        </a>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-[#3386bc] mb-2">Injectables Division</h3>
        <p className="text-gray-600 text-sm">
          Sterile formulations including testosterone blends, anabolic esters, and specialized
          therapeutic injectables ensuring purity and precision.
        </p>
      </div>
    </motion.div>
  </div>
</section>

        {/* ✅ Disease Highlight */}
        <DiseaseFeaturedSection />

        {/* ✅ Stats Section (Animated) */}
        <StatsSection />

        {/* ✅ About */}
        <section
          className="bg-gray-100 rounded-xl p-8 mb-16 text-center"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About NovaTech</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            NovaTech Sciences is dedicated to providing innovative healthcare solutions and trusted medicines.
            Our mission is to improve the quality of life with advanced, affordable, and reliable healthcare products.
          </p>
        </section>

        {/* ✅ Blog Section */}
        <section className="mb-20" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Health Tips & Blog
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Managing Diabetes Naturally",
                text: "Lifestyle tips and precautions to manage your blood sugar effectively.",
              },
              {
                title: "Asthma Care Tips",
                text: "Guidelines to control asthma and prevent attacks.",
              },
              {
                title: "Safe Weight Loss",
                text: "Achieve your health goals through safe and sustainable practices.",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold text-[#314977] mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ Call to Action */}
        <section
          className="text-center py-16 bg-gradient-to-r from-[#3386bc] to-[#4bb2e5] text-white rounded-2xl mb-16"
          data-aos="zoom-in"
        >
          <h2 className="text-3xl font-bold mb-4">Partner with NovaTech Sciences</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Collaborate with us to bring cutting-edge pharmaceutical and nutraceutical solutions to global markets.
          </p>
          <a
            href="/contact"
            className="bg-white text-[#314977] font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300"
          >
            Get in Touch
          </a>
        </section>
      </div>
    </>
  );
}

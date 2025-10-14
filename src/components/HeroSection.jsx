import React from "react";
import { motion } from "framer-motion";
import pill1 from "../assets/capsule.png";

const headline = "Innovative Healthcare Solutions".split(" ");

export default function HeroSection() {
  return (
    <section className="relative w-full  bg-gradient-to-r from-blue-200 to-blue-400 overflow-hidden flex flex-col md:flex-row items-center justify-between p-10">

      {/* Floating pills */}
      {[...Array(4)].map((_, i) => (
        <motion.img
          key={i}
          src={pill1}
          alt={`pill${i}`}
          className={`absolute w-${10 + i * 2} h-${10 + i * 2}`}
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
          }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
            rotate: [0, Math.random() * 360, 0],
            opacity: [0, 1, 1],
          }}
          transition={{ duration: 8 + Math.random() * 3, repeat: Infinity, repeatType: "mirror" }}
        />
      ))}

      {/* Floating background circles */}
      <motion.div
        className="absolute w-60 h-60 bg-white opacity-10 rounded-full top-20 left-1/4"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-48 h-48 bg-white opacity-10 rounded-full bottom-10 right-1/3"
        animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Hero Image */}
      <motion.img
        src="/images/hero-medicine.png"
        alt="Medicine"
        className="w-60 h-60 md:w-80 md:h-80 object-cover mb-6 md:mb-0 z-10"
        initial={{ x: -200, opacity: 0, rotate: -10 }}
        animate={{ x: 0, opacity: 1, rotate: [-2, 2, 0], y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Text Section */}
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-xl z-20 text-center md:text-left"
      >
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 flex flex-wrap justify-center md:justify-start">
          {headline.map((word, idx) => (
            <motion.span
              key={idx}
              className="mr-2"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: idx * 0.2, type: "spring", stiffness: 120 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          className="text-gray-800 mb-6 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          NovaTech Sciences brings you trusted medicines and health solutions for a healthier life.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex justify-center md:justify-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.a
            href="/products"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 25px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
          >
            Explore Products
          </motion.a>
          <motion.a
            href="/contact"
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, repeatType: "mirror" }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

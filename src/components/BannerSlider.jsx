import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function BannerSlider({ banners }) {
  const [imageLoaded, setImageLoaded] = useState({});

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination, EffectFade]}
      effect="fade"
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      className="w-full h-[50vh] md:h-[50vh] relative overflow-hidden"
    >
      {banners.map((banner, idx) => (
        <SwiperSlide key={idx}>
          <div className="relative w-full h-full">
            {/* ===== Image Loader (Shimmer Effect) ===== */}
            {!imageLoaded[idx] && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_1.5s_infinite]">
                <style>
                  {`
                    @keyframes shimmer {
                      0% { background-position: -500px 0; }
                      100% { background-position: 500px 0; }
                    }
                  `}
                </style>
              </div>
            )}

            {/* ===== Banner Image ===== */}
            <img
              src={banner.image}
              alt={banner.alt || `Banner ${idx + 1}`}
              loading="lazy"
              onLoad={() => handleImageLoad(idx)}
              className={`w-full h-full object-cover transition-all duration-[2000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]
                ${imageLoaded[idx] ? "scale-105 opacity-100" : "scale-110 opacity-0"}
              `}
            />

            {/* ===== Subtle Overlay Gradient ===== */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1e39]/70 via-[#0b1e39]/40 to-transparent" />

            {/* ===== Text & Buttons ===== */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
              <h1
                className="text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-4 animate-fadeInUp"
                style={{ animationDelay: "0.3s" }}
              >
                {banner.title || "Welcome to Nova TechSciences"}
              </h1>

              <p
                className="text-lg md:text-xl max-w-2xl text-white/90 animate-fadeInUp"
                style={{ animationDelay: "0.6s" }}
              >
                {banner.subtitle ||
                  "Empowering innovation in pharmaceuticals and medical technology."}
              </p>

              <div
                className="flex justify-center gap-4 mt-8 animate-fadeInUp"
                style={{ animationDelay: "0.9s" }}
              >
                <a
                  href="/products"
                  className="bg-gradient-to-r from-[#18487d] to-[#3386bc] text-white px-6 py-2 rounded-lg shadow-md hover:scale-110 hover:shadow-xl transition-all duration-500"
                >
                  Explore Products
                </a>
                <a
                  href="/contact"
                  className="bg-white/90 text-[#0b1e39] px-6 py-2 rounded-lg shadow-md hover:bg-white hover:scale-110 hover:shadow-xl transition-all duration-500"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}

      {/* ===== Keyframes ===== */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeInUp {
            opacity: 0;
            animation: fadeInUp 1s ease forwards;
          }
        `}
      </style>
    </Swiper>
  );
}

// // src/components/BannerSlider.jsx
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-fade";

// export default function BannerSlider({ banners }) {
//   return (
//     <Swiper
//       modules={[Autoplay, Navigation, Pagination, EffectFade]}
//       effect="fade"
//       slidesPerView={1}
//       loop={true}
//       autoplay={{ delay: 3000, disableOnInteraction: false }}
//       navigation
//       pagination={{ clickable: true }}
//       className="w-full h-64 md:h-160  overflow-hidden shadow-md"
//     >
//       {banners.map((banner, idx) => (
//         <SwiperSlide key={idx}>
//           <div className="w-full h-full">
//             <img
//               src={banner.image}
//               alt={banner.alt || `Banner ${idx + 1}`}
//               className="w-full h-full object-top "
//             />
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }

// src/components/BannerSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function BannerSlider({ banners }) {
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
            {/* Banner Image */}
            <img
              src={banner.image}
              alt={banner.alt || `Banner ${idx + 1}`}
              className="w-full h-full object-cover"
            />

            {/* ===== Overlay Waves ===== */}
            {/* <div className="absolute bottom-0 left-0 w-full h-[220px] overflow-hidden">
             
              <svg
                className="absolute bottom-0 left-0 w-[300%] animate-[wave_10s_linear_infinite]"
                viewBox="0 0 1200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0,100 C150,200 350,0 600,100 C850,200 1050,0 1200,100 L1200,200 L0,200 Z"
                  fill="rgba(255,255,255,0.15)"
                />
              </svg>
              <svg
                className="absolute bottom-0 left-0 w-[300%] animate-[wave_14s_linear_infinite_reverse]"
                viewBox="0 0 1200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0,120 C200,220 400,20 600,120 C800,220 1000,20 1200,120 L1200,200 L0,200 Z"
                  fill="rgba(255,255,255,0.25)"
                />
              </svg>
              <svg
                className="absolute bottom-0 left-0 w-[300%] animate-[wave_18s_linear_infinite]"
                viewBox="0 0 1200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0,140 C250,240 450,40 700,140 C950,240 1150,40 1200,140 L1200,200 L0,200 Z"
                  fill="rgba(255,255,255,0.35)"
                />
              </svg>
              <svg
                className="absolute bottom-0 left-0 w-[300%] animate-[wave_22s_linear_infinite_reverse]"
                viewBox="0 0 1200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0,160 C250,260 500,60 750,160 C1000,260 1200,60 1200,160 L1200,200 L0,200 Z"
                  fill="rgba(255,255,255,0.45)"
                />
              </svg>
            </div> */}

            {/* ===== Center Text & Buttons ===== */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/40">
              <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg animate-fadeInUp">
                {banner.title || "Welcome to Nova Pharmaceuticals"}
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-2xl animate-fadeInUp delay-150">
                {banner.subtitle ||
                  "Leading innovation in pharmaceutical steroids and advanced medical formulations."}
              </p>

              {/* Buttons */}
              <div className="flex justify-center gap-4 mt-8 animate-fadeInUp delay-300">
                <a
                  href="/products"
                  className="bg-[#314977] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#0d1b4b] transform hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  Explore Products
                </a>
                <a
                  href="/contact"
                  className="bg-[#3386bc] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#4bb2e5] transform hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}

      {/* ===== Wave Animation Keyframes ===== */}
      <style>
        {`
          @keyframes wave {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeInUp {
            animation: fadeInUp 1s ease forwards;
          }

          .delay-150 { animation-delay: 0.15s; }
          .delay-300 { animation-delay: 0.3s; }
        `}
      </style>
    </Swiper>
  );
}

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
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      className="w-full h-64 md:h-160  overflow-hidden shadow-md"
    >
      {banners.map((banner, idx) => (
        <SwiperSlide key={idx}>
          <div className="w-full h-full">
            <img
              src={banner.image}
              alt={banner.alt || `Banner ${idx + 1}`}
              className="w-full h-full object-top "
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

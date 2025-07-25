import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, EffectFade, Pagination } from "swiper/modules";
import HeroSection from "./HeroSection";

export const SwiperCarousel = () => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      effect="fade"
      modules={[Navigation, EffectFade, Pagination]}
    >
      <SwiperSlide>
        <HeroSection
          title="T-SHIRT SUIT FOR EVERYONE"
          subTitle="Discover our latest collection of t-shirts that suit every style and occasion."
          imageUrl="https://images.unsplash.com/photo-1665815844395-06f64f44b5e3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </SwiperSlide>
      <SwiperSlide>
        <HeroSection
          title="DIVERSITY OF COLLECTIONS"
          subTitle="Explore our versatile t-shirts designed for comfort and style."
          imageUrl="https://images.unsplash.com/photo-1507553532144-b9df5e38c8d1?q=80&w=1213&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </SwiperSlide>
      <SwiperSlide>
        <HeroSection
          title="T-SHIRT SUIT FOR EVERYONE"
          subTitle="Find the perfect t-shirt that fits your personality and lifestyle."
          imageUrl="https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </SwiperSlide>
      {/* Add more SwiperSlides as needed */}
    </Swiper>
  );
};


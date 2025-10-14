"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const products = [
  { id: 1, image: "/images/gallery/1.jpg" },
  { id: 2, image: "/images/gallery/2.jpg" },
  { id: 3, image: "/images/gallery/3.jpg" },
  { id: 4, image: "/images/gallery/4.jpg" },
  { id: 5, image: "/images/gallery/5.jpg" },
  { id: 6, image: "/images/gallery/7.jpg" },
];

export default function ProductCarousel() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section
      style={{
        background: "var(--color-about-bg)",
        color: "var(--color-text)",
      }}
      className="py-20 relative"
    >
      <div className="container mx-auto px-6 text-center relative">
        <h2
          style={{ color: "var(--color-title)" }}
          className="text-2xl md:text-4xl font-bold mb-8"
        >
          گالری تصاویر
        </h2>

        {/* فلش‌های ناوبری */}
        <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 px-2 pointer-events-none">
          <div className="swiper-button-prev-custom pointer-events-auto bg-[#c76700] hover:bg-[#a35603] text-white rounded-md p-2 md:p-3 shadow-lg transition duration-300 cursor-pointer">
            ❮
          </div>
          <div className="swiper-button-next-custom pointer-events-auto bg-[#c76700] hover:bg-[#a35603] text-white rounded-md p-2 md:p-3 shadow-lg transition duration-300 cursor-pointer">
            ❯
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div
                onClick={() => setSelectedImage(product.image)}
                style={{ backgroundColor: "var(--color-card-bg)" }}
                className="backdrop-blur-lg rounded-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt="gallery"
                  className="object-cover w-full h-96 hover:scale-110 transition-transform duration-500"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* نمایش بزرگ تصویر */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-[90%] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 text-white bg-black/60 hover:bg-black/80 rounded-full w-8 h-8 flex items-center justify-center text-lg"
              >
                ×
              </button>
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

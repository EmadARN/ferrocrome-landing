"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const products = [
  {
    id: 1,
    name: "فروکروم پرکربن",
    image: "/images/high-carbon-ferrochrome.webp",
  },
  {
    id: 2,
    name: "فروکروم کم‌کربن",
    image: "/images/low-carbon-ferrochrome.jpg",
  },
  {
    id: 3,
    name: "فروکروم میکروکربن",
    image: "/images/micro-carbon-ferrochrome.webp",
  },
  {
    id: 4,
    name: "فروکروم میکروکربن",
    image: "/images/micro-carbon-ferrochrome.webp",
  },
  {
    id: 5,
    name: "فروکروم میکروکربن",
    image: "/images/micro-carbon-ferrochrome.webp",
  },
];

export default function ProductCarousel() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 text-gray-300">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#c76700] mb-8">
          تصاویر محصولات
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-700 hover:scale-105 transition-transform duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-64 hover:scale-110 transition-transform duration-500"
                />
                <div className="p-4 text-right">
                  <h3 className="text-xl font-bold text-[#a15300]">
                    {product.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

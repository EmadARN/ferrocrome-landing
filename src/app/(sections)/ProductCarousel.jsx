"use client";
import { useRef } from "react";
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
    name: "فروکروم سیلیکون",
    image: "/images/micro-carbon-ferrochrome.webp",
  },
  {
    id: 5,
    name: "فروکروم نیتروژن‌دار",
    image: "/images/micro-carbon-ferrochrome.webp",
  },
];

export default function ProductCarousel() {
  const paginationRef = useRef(null);

  return (
    <section
      style={{
         background: "var(--color-about-bg)",
        color: "var(--color-text)",
      }}
      className="py-20  relative"
    >
      <div className="container mx-auto px-6 text-center relative">
        <h2
          style={{ color: "var(--color-title)" }}
          className="text-2xl md:text-4xl font-bold  mb-8"
        >
          تصاویر محصولات
        </h2>

        {/* فلش‌های ناوبری */}
        <div className="hidden md:flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 px-4 pointer-events-none">
          <div className="swiper-button-prev-custom pointer-events-auto bg-[#c76700] hover:bg-[#a35603] text-white rounded-md p-3 shadow-lg transition duration-300 cursor-pointer">
            ❮
          </div>
          <div className="swiper-button-next-custom pointer-events-auto bg-[#c76700] hover:bg-[#a35603] text-white rounded-md p-3 shadow-lg transition duration-300 cursor-pointer">
            ❯
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          // pagination={{
          //   el: paginationRef.current,
          //   clickable: true,
          //   renderBullet: (index, className) => {
          //     return `<span class="${className} w-4 h-4 md:w-5 md:h-5 rounded-full inline-block cursor-pointer bg-[#c76700]"></span>`;
          //   },
          // }}
          onBeforeInit={(swiper) => {
            swiper.params.pagination.el = paginationRef.current;
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
                style={{ backgroundColor: "var(--color-card-bg)" }}
                className=" backdrop-blur-lg rounded-md overflow-hidden  hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-64 hover:scale-110 transition-transform duration-500"
                />
                <div className="p-4 text-right">
                  <h3 style={{ color: "var(--color-title-secondary)" }} className="text-md font-bold text-center text-white">
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

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { products } from "@/lib/constants";

export default function ProductsWithModal({ setModalOpen }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [waveIndex, setWaveIndex] = useState(null);

  useEffect(() => {
    setModalOpen(!!selectedProduct); // true اگر مودال باز باشه، false اگر بسته باشه
  }, [selectedProduct, setModalOpen]);

  // موج رندوم روی یک کارت
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * products.length);
      setWaveIndex(randomIndex);

      const timeout = setTimeout(() => setWaveIndex(null), 2000);
      return () => clearTimeout(timeout);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        background: "var(--color-about-bg)",
        color: "var(--color-text)",
      }}
      className="py-24"
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ color: "var(--color-title)" }}
          className="text-2xl md:text-4xl font-bold mb-4"
        >
          محصولات ما
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ color: "var(--color-text-muted)" }}
          className="mb-16 text-[12px] md:text-lg"
        >
          ما در حال راه اندازی خط تولید محصولات زیر هستیم تا نیازهای مختلف صنایع
          فولاد و آلیاژسازی را برطرف کنیم
        </motion.p>
        {/* product in desktop */}
        <div className="hidden  md:grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: "var(--color-card-bg)",
                borderColor: "var(--color-card-border)",
                boxShadow: `0 0 20px var(--color-card-shadow)`,
              }}
              className="relative backdrop-blur-lg rounded-md overflow-hidden border hover:scale-[1.05] hover:shadow-xl transition-transform duration-300 cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              {/* موج رندوم */}
              {waveIndex === index && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div
                    className="w-full h-full rounded-xl"
                    style={{
                      background:
                        "linear-gradient(to right, var(--color-glow-1), var(--color-glow-2))",
                    }}
                  ></div>
                </motion.div>
              )}

              <div className="h-56 w-full overflow-hidden relative z-10">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6 text-right relative z-10">
                <h3
                  style={{ color: "var(--color-title-secondary)" }}
                  className="text-lg md:text-2xl font-bold mb-3"
                >
                  {product.name}
                </h3>
                <p
                  style={{ color: "var(--color-text-secondary)" }}
                  className="mb-4 leading-relaxed text-sm md:text-lg"
                >
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* product in mobile */}
        <div className=" relative  md:hidden ">
          <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 px-2 pointer-events-none">
            <div className="swiper-button-prev-custom pointer-events-auto bg-[#00000050] text-white rounded-md p-2 shadow-lg cursor-pointer">
              ❮
            </div>
            <div className="swiper-button-next-custom pointer-events-auto bg-[#00000050] text-white rounded-md p-2 shadow-lg cursor-pointer">
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
            onSwiper={(swiper) => {
              // attach دکمه‌ها وقتی mount شدن
              swiper.params.navigation.prevEl = document.querySelector(
                ".swiper-button-prev-custom"
              );
              swiper.params.navigation.nextEl = document.querySelector(
                ".swiper-button-next-custom"
              );
              swiper.navigation.destroy(); // reset
              swiper.navigation.init(); // init دوباره
              swiper.navigation.update(); // update
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.id}>
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    background: "var(--color-card-bg)",
                    borderColor: "var(--color-card-border)",
                    boxShadow: `0 0 20px var(--color-card-shadow)`,
                  }}
                  className="relative backdrop-blur-lg rounded-md overflow-hidden border hover:scale-[1.05] hover:shadow-xl transition-transform duration-300 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* موج رندوم */}
                  {waveIndex === index && (
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      <div
                        className="w-full h-full rounded-xl"
                        style={{
                          background:
                            "linear-gradient(to right, var(--color-glow-1), var(--color-glow-2))",
                        }}
                      ></div>
                    </motion.div>
                  )}

                  <div className="h-56 w-full overflow-hidden relative z-10">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 text-right relative z-10">
                    <h3
                      style={{ color: "var(--color-title-secondary)" }}
                      className="text-lg md:text-2xl font-bold mb-3"
                    >
                      {product.name}
                    </h3>
                    <p
                      style={{ color: "var(--color-text-secondary)" }}
                      className="mb-4 leading-relaxed text-sm md:text-lg"
                    >
                      {product.description}
                    </p>

                    <div>
                      <span className="inline-block bg-[#7a3c00] bg-gradient-to-br from-[var(--color-title)] to-[#7a3c00] text-white text-xs font-semibold px-3 py-1 rounded-full hover:scale-105 transition-transform cursor-pointer">
                        مشاهده جزئیات
                      </span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* مودال */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-lg"
            style={{
              backgroundColor: "var(--color-backdrop)",
            }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: "var(--color-card-bg)",
                borderColor: "var(--color-card-border)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
              }}
              className="rounded-md max-w-lg w-full p-6 relative text-right "
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                style={{ color: "var(--color-title-secondary)" }}
                className="absolute cursor-pointer top-4 left-4 hover:text-[var(--color-title-hover)] text-2xl"
              >
                &times;
              </button>

              <h3
                style={{ color: "var(--color-title-secondary)" }}
                className="text-xl font-bold mb-4"
              >
                {selectedProduct.name}
              </h3>

              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-sm mb-4"
              />

              <p style={{ color: "var(--color-text)" }} className="mb-4">
                {selectedProduct.description}
              </p>

              <ul className="text-sm space-y-2">
                {selectedProduct.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-start gap-x-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "var(--color-accent)" }}
                    ></span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: 1,
    name: "فروکروم پرکربن",
    description:
      "مناسب برای تولید فولادهای ضدزنگ و آلیاژی. دارای درصد بالای کروم و مقاومت حرارتی عالی.",
    features: ["کروم: 65٪", "کربن: 6–8٪", "اندازه ذرات: 10–100 میلی‌متر"],
    image: "/images/high-carbon-ferrochrome.webp",
  },
  {
    id: 2,
    name: "فروکروم کم‌کربن",
    description:
      "ویژه‌ی صنایع دقیق و فولادهای خاص با میزان کربن پایین. مناسب برای استفاده در فولادهای ابزار و مقاوم به خوردگی.",
    features: ["کروم: 70٪", "کربن: ≤0.1٪", "خلوص بالا و پایداری عالی"],
    image: "/images/low-carbon-ferrochrome.jpg",
  },
  {
    id: 3,
    name: "فروکروم میکروکربن",
    description:
      "مناسب برای فولادهای آلیاژی با حساسیت بالا نسبت به کربن. تولید شده با فرآیند الکترولیتی دقیق.",
    features: ["کروم: 75٪", "کربن: ≤0.03٪", "رطوبت پایین و دانه‌بندی یکنواخت"],
    image: "/images/micro-carbon-ferrochrome.webp",
  },
];

export default function ProductsWithModal() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [waveIndex, setWaveIndex] = useState(null);

  // موج رندوم روی یک کارت
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * products.length);
      setWaveIndex(randomIndex);

      const timeout = setTimeout(() => setWaveIndex(null), 2000); // طول موج 2 ثانیه
      return () => clearTimeout(timeout);
    }, 4000); // هر 4 ثانیه موج جدید
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900 text-gray-300">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-[#c76700] mb-4"
        >
          محصولات ما
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 mb-16 text-[12px] md:text-lg"
        >
          ما مجموعه‌ای از فروکروم‌های صنعتی را با بالاترین کیفیت و خلوص ارائه
          می‌دهیم تا نیازهای مختلف صنایع فولاد و آلیاژسازی را برطرف کنیم.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-gray-800/40 backdrop-blur-lg rounded-md overflow-hidden border border-gray-700 hover:scale-[1.05] hover:shadow-xl transition-transform duration-300 cursor-pointer"
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
                  <div className="w-full h-full bg-gradient-to-r from-yellow-400/20 via-yellow-400/10 to-yellow-400/20 rounded-3xl"></div>
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
                <h3 className="text-2xl font-bold text-[#cac8c7] mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* مودال */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 rounded-3xl max-w-lg w-full p-6 relative text-right"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 left-4 text-gray-400 hover:text-[#c76700] text-2xl"
              >
                &times;
              </button>

              <h3 className="text-xl font-bold text-[#ddd] mb-4">
                {selectedProduct.name}
              </h3>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <p className="text-gray-400 mb-4">
                {selectedProduct.description}
              </p>
              <ul className="text-sm space-y-2">
                {selectedProduct.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-start gap-x-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
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

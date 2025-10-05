"use client";
import { useState } from "react";
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

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900 text-gray-300">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4"
        >
          محصولات ما
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 mb-16 text-lg"
        >
          ما مجموعه‌ای از فروکروم‌های صنعتی را با بالاترین کیفیت و خلوص ارائه
          می‌دهیم تا نیازهای مختلف صنایع فولاد و آلیاژسازی را برطرف کنیم.
        </motion.p>

        {/* Grid محصولات */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-700 hover:scale-[1.05] hover:shadow-xl transition-transform duration-300 cursor-pointer relative"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Badge کلیک */}
              <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                کلیک کنید
              </div>

              <div className="h-56 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6 text-right">
                <h3 className="text-2xl font-bold text-yellow-400 mb-3">
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
                className="absolute top-4 left-4 text-gray-400 hover:text-yellow-400 text-2xl"
              >
                &times;
              </button>

              <h3 className="text-3xl font-bold text-yellow-400 mb-4">
                {selectedProduct.name}
              </h3>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <p className="text-gray-400 mb-4">{selectedProduct.description}</p>
              <ul className="text-sm space-y-2">
                {selectedProduct.features.map((f, i) => (
                  <li key={i} className="flex items-center justify-end gap-x-2">
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

"use client";
import useMoveBack from "@/hooks/useMoveBack";
import { HiArrowRight } from "react-icons/hi";
import { motion } from "framer-motion";

export default function NotFound() {
  const moveBack = useMoveBack();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-hero-dark1 to-hero-dark2">
      <div className="text-center px-6 lg:px-0">
        {/* Floating 404 */}
        <motion.h1
          className="text-[12rem] lg:text-[16rem] font-extrabold text-transparent bg-clip-text drop-shadow-2xl mb-6"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #c76700, #ce7f2b, #d19e68)",
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          404
        </motion.h1>

        <h2 className="text-3xl lg:text-5xl font-bold text-black mb-4 drop-shadow-lg">
          صفحه‌ای که دنبالش بودید پیدا نشد
        </h2>

        <p className="text-gray-700 text-lg lg:text-xl mb-10 max-w-xl mx-auto drop-shadow-sm">
          متاسفانه صفحه مورد نظر شما در دسترس نیست. لطفاً به صفحه قبل برگردید یا
          از منوی اصلی استفاده کنید.
        </p>

        <motion.button
          onClick={moveBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-8 py-4 text-lg font-semibold text-black rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 gap-x-3 cursor-pointer"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #c76700, #ce7f2b, #d19e68)",
          }}
        >
          <HiArrowRight className="w-6 h-6" />
          برگشت
        </motion.button>
      </div>
    </div>
  );
}

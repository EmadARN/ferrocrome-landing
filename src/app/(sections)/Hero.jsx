"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="
    relative flex flex-col items-center justify-center text-center py-32 overflow-hidden
    bg-bg-hero
    transition-colors duration-700
  "
    >
      {/* --- نور مرکزی طلایی --- */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="
          absolute top-1/2 left-1/2 w-[500px] h-[500px]
          -translate-x-1/2 -translate-y-1/2 rounded-full
          bg-gradient-to-br from-[#c76700]/40 via-[#f6b76b]/20 to-transparent
          blur-3xl
        "
      />

      {/* --- ذرات طلایی جرقه‌ای --- */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-1/2 w-[3px] h-[3px] bg-[#c76700] rounded-full blur-[1.5px]"
          animate={{
            y: [0, -200 - Math.random() * 200],
            opacity: [1, 0],
            x: [0, Math.random() * 120 - 60],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* --- متن و محتوا --- */}
      <div className="relative z-10 px-4 md:px-8 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          <span
            className="block"
            style={{ backgroundClip: "text", color: "var(--color-title)" }}
          >
            بهترین
          </span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#b45c00] via-[#e8a24d] to-[#f6b76b] dark:from-[#f6b76b] dark:via-[#e8a24d] dark:to-[#c76700]">
            فروکروم صنعتی
          </span>
          <span
            className="block mt-2 text-lg md:text-xl font-medium"
            style={{
              color: "var(--color-text)", // حالت Light
            }}
          >
            برای صنایع فولاد و ریخته‌گری
          </span>
        </motion.h1>

        {/* --- Badgeها --- */}
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          {[
            { text: "ISO 9001", color: "var(--color-badge-1)" },
            { text: "صادرات به ۴۰+ کشور", color: "var(--color-badge-2)" },
            { text: "تحویل ۹۹.۸٪ به موقع", color: "var(--color-badge-3)" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="flex items-center gap-2 text-text dark:text-text-muted font-medium"
            >
              <span
                style={{ backgroundColor: item.color }}
                className="w-3 h-3 rounded-full"
              ></span>
              {item.text}
            </motion.div>
          ))}
        </div>

        {/* --- دکمه‌ها هماهنگ --- */}
        <div className="flex flex-wrap gap-6 justify-center mt-8">
          {/* دکمه اصلی */}
          <Link
            href="#WorkWithUs"
            className="
              px-6 py-3 rounded-lg text-sm md:text-md font-bold
              bg-gradient-to-r from-[#c76700] via-[#b45c00] to-[#8b3e00]
              text-white shadow-lg hover:scale-105 hover:shadow-xl
              transition-all duration-300
            "
          >
            درخواست قیمت
          </Link>

          {/* دکمه ثانویه */}
          <Link
            href="#product"
            className="
              px-6 py-3 rounded-lg border text-sm md:text-md font-bold
              border-[#c76700]/70 text-[#c76700]
              dark:text-[#f6b76b] dark:border-[#f6b76b]/60
              hover:bg-[#c76700]/10 dark:hover:bg-[#f6b76b]/10
              hover:scale-105 transition-all duration-300
            "
          >
            مشاهده محصولات
          </Link>
        </div>
      </div>

      {/* --- نور طلایی پایین --- */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#c76700]/20 to-transparent blur-2xl" />
    </section>
  );
}

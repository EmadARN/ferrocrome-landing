"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="
        relative flex flex-col items-center justify-center text-center overflow-hidden
    bg-black
    [height:60dvh] md:[height:100dvh]
   mt-28 md:mt-0
      "
    >
      {/* --- ویدیو پس‌زمینه --- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/fallback.PNG"
        className="absolute top-0 left-0 w-full h-full object-fill opacity-80"
      >
        <source src="/video/iran-china.mp4" type="video/mp4" />
      </video>
      {/* --- لایه تیره‌ی نیمه‌شفاف برای وضوح متن --- */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/50 z-0" />

      {/* --- نور طلایی مرکزی (اختیاری برای افکت بیشتر) --- */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="
          absolute top-1/2 left-1/2 w-[500px] h-[500px]
          -translate-x-1/2 -translate-y-1/2 rounded-full
          bg-gradient-to-br from-[#c76700]/40 via-[#f6b76b]/20 to-transparent
          blur-3xl z-0
        "
      />

      {/* --- محتوا --- */}
      <div className="relative z-10 px-4 md:px-8 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl md:text-5xl font-extrabold leading-tight text-white"
        >
          <span className="block">پروژه احداث کارخانه فروکروم</span>
          <span className="text-xl md:text-4xl block bg-clip-text text-transparent bg-gradient-to-r from-[#f6b76b] via-[#e8a24d] to-[#c76700]">
            با سرمایه‌گذاری خارجی
          </span>
          <span className="block mt-2 text-sm md:text-xl font-medium text-gray-200">
            در استان کرمان / شهرستان جیرفت
          </span>
        </motion.h1>

        {/* --- Badgeها --- */}
        <div className="flex flex-wrap gap-4 justify-center  mt-6 text-white ">
          {[
            "میزان سرمایه‌گذاری: 30 میلیون دلار",
            "ظرفیت تولید: 45 هزار تن سالانه",
            "اشتغال‌زایی: 300 نفر",
          ].map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="w-full md:w-auto flex items-center gap-2 font-medium  text-[12px]"
            >
              <span
                className="w-1 h-1 md:w-3 md:h-3 rounded-full "
                style={{
                  backgroundColor:
                    i === 0
                      ? "var(--color-badge-1) "
                      : i === 1
                      ? "var(--color-badge-2)"
                      : "var(--color-badge-3)",
                }}
              ></span>
              {text}
            </motion.div>
          ))}
        </div>

        {/* --- دکمه‌ها --- */}
        <div className="flex flex-wrap gap-6 justify-center mt-8">
          <Link
            href="#about"
            className="
              px-6 py-3 rounded-lg text-sm md:text-md font-bold
              bg-gradient-to-r from-[#c76700] via-[#b45c00] to-[#8b3e00]
              text-white shadow-lg hover:scale-105 hover:shadow-xl
              transition-all duration-300
            "
          >
            درباره ی ما
          </Link>

          <Link
            href="#WorkWithUs"
            className="
              px-6 py-3 rounded-lg border text-sm md:text-md font-bold
              border-[#f6b76b]/60 text-[#f6b76b]
              hover:bg-[#f6b76b]/10 hover:scale-105 transition-all duration-300
            "
          >
            درخواست همکاری
          </Link>
        </div>
      </div>

      {/* --- گرادیان پایین --- */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
    </section>
  );
}

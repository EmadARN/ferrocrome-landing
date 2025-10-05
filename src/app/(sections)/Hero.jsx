"use client";
import React from "react";
import { motion } from "framer-motion";

const navItems = [
  "فروکروم پرکربن",
  "فروکروم کم‌کربن",
  "فروکروم نیتروژن‌دار",
  "کروم متال",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0A0A1A] via-[#16213E] to-[#0F3460] overflow-hidden">
      {/* Floating and decorative elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-16 w-24 h-24 bg-gradient-to-br from-[#FFD700]/30 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-60 left-10 w-16 h-16 bg-gradient-to-br from-[#4682B4]/30 to-transparent rounded-full blur-2xl"
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-32 w-28 h-28 bg-gradient-to-br from-[#C0C0C0]/20 to-transparent rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 lg:px-24 py-20 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Text */}
        <div className="space-y-6 lg:pr-8">
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#F4D03F] to-[#D4AF37] block">
              بهترین
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C0C0C0] via-white to-[#C0C0C0] block">
              فروکروم صنعتی
            </span>
            <span className="block text-gray-300 mt-2 text-xl md:text-2xl font-medium">
              برای صنایع فولاد و ریخته‌گری
            </span>
          </motion.h1>

          {/* Features */}
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { text: "ISO 9001", color: "bg-yellow-400" },
              { text: "صادرات به ۴۰+ کشور", color: "bg-blue-400" },
              { text: "تحویل ۹۹.۸٪ به موقع", color: "bg-slate-400" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="flex items-center gap-2 text-gray-300 font-medium"
              >
                <span className={`w-3 h-3 ${item.color} rounded-full`}></span>
                {item.text}
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-6 mt-8"
          >
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#FFD700] via-[#F4D03F] to-[#D4AF37] font-bold text-black shadow-lg hover:scale-105 transition-transform"
            >
              درخواست قیمت
            </a>
            <a
              href="#products"
              className="px-6 py-3 rounded-lg border border-gray-400 text-gray-200 hover:bg-gray-700 transition-all"
            >
              مشاهده محصولات
            </a>
          </motion.div>
        </div>

        {/* Right Product Cards */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative grid gap-6 "
        >
          {navItems.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-black/40 backdrop-blur-xl border border-gray-600 rounded-xl p-6 text-white shadow-lg flex flex-col justify-between"
            >
              <h3 className="text-lg font-bold">{item}</h3>
              <p className="text-gray-300 text-sm m-2 py-3">
                محصول با کیفیت بالا و کاربرد گسترده در فولادسازی و ریخته‌گری.
              </p>
              <span className="mt-4  text-yellow-400 font-semibold text-[0.80rem] absolute bottom-2 left-3">
                مشاهده جزئیات
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A1A] to-transparent"></div>
    </section>
  );
}

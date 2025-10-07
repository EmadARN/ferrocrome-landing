"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const floatingLights = Array.from({ length: 12 });
  const tinyStars = Array.from({ length: 30 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative bg-gradient-to-br from-[#0A0A1A] via-[#16213E] to-[#0F3460] overflow-hidden min-h-[60vh]  md:min-h-[60vh] xl:min-h-[80vh] pt-24 lg:pt-2"
    >
      <div className="container mx-auto px-6 lg:px-24 py-16 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Text */}
        <div className="space-y-6 lg:pr-8 relative z-10">
          <div className="absolute inset-0 z-0 lg:hidden">
            {tinyStars.map((_, idx) => (
              <motion.div
                key={idx}
                animate={{
                  x: [-80, 80, -80],
                  y: [-40, 40, -40],
                  opacity: [0.1, 0.7, 0.1],
                }}
                transition={{
                  duration: 10 + idx,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.1,
                }}
                className="absolute w-1 h-1 bg-white/30 rounded-full blur-sm"
              />
            ))}

            {floatingLights.map((_, idx) => (
              <motion.div
                key={idx}
                animate={{
                  x: [-50, 50, -50].map((x) => x + (mousePos.x / 50 || 0)),
                  y: [-30, 30, -30].map((y) => y + (mousePos.y / 50 || 0)),
                  opacity: [0.3, 0.9, 0.3],
                }}
                transition={{
                  duration: 6 + idx,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.2,
                }}
                className="absolute w-6 h-6 bg-gradient-to-r from-[#FFD700] via-[#F4D03F] to-[#D4AF37] rounded-full blur-xl"
              />
            ))}

            <motion.div
              animate={{
                scale: [4, 1.4, 4],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-36 h-36 bg-gradient-to-r from-[#FFD700]/50 to-[#F4D03F]/50 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight relative z-10"
          >
            <span
              className="block"
              style={{ backgroundClip: "text", color: "#c76700" }}
            >
              بهترین
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300 block">
              فروکروم صنعتی
            </span>
            <span className="block text-gray-300 mt-2 text-lg md:text-xl font-medium">
              برای صنایع فولاد و ریخته‌گری
            </span>
          </motion.h1>

          <div className="flex flex-wrap gap-4 mt-4 relative z-10">
            {[
              { text: "ISO 9001", color: "bg-gray-400" },
              { text: "صادرات به ۴۰+ کشور", color: "bg-gray-300" },
              { text: "تحویل ۹۹.۸٪ به موقع", color: "bg-gray-500" },
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-6 mt-6 whitespace-nowrap relative z-10"
          >
            <Link
              href="#WorkWithUs"
              className="px-4 py-3 rounded-lg bg-gradient-to-r from-[#a15300] via-[#521f01] to-[#521f01] font-bold text-sm md:text-md text-white shadow-lg hover:scale-105 transition-transform"
            >
              درخواست قیمت
            </Link>
            <Link
              href="#product"
              className="px-4 py-3 rounded-lg border border-gray-400 text-sm md:text-m text-gray-200 hover:bg-gray-700 transition-all"
            >
              مشاهده محصولات
            </Link>
          </motion.div>
        </div>

        {/* Right Animated Visual (Desktop) */}
        <div className="relative w-full h-[400px] lg:h-[500px] hidden items-center justify-center  lg:block">
          {tinyStars.map((_, idx) => (
            <motion.div
              key={idx}
              animate={{
                x: [-80, 80, -80],
                y: [-30, 80, -30],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: 10 + idx,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.1,
              }}
              className="absolute top-48 left-[20rem] w-6 h-6 bg-white/10 rounded-full blur-sm"
            />
          ))}

          {floatingLights.map((_, idx) => (
            <motion.div
              key={idx}
              animate={{
                x: [-50, 50, -50].map((x) => x + (mousePos.x / 50 || 0)),
                y: [-30, 30, -30].map((y) => y + (mousePos.y / 50 || 0)),
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{
                duration: 6 + idx,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.2,
              }}
              className="absolute top-36 left-64 w-8 h-8 bg-gradient-to-r from-[#FFD700] via-[#F4D03F] to-[#521f01] rounded-full blur-2xl"
            />
          ))}

          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-36 h-36 rounded-full bg-gradient-to-r from-[#FFD700]/50 to-[#F4D03F]/50 blur-3xl absolute top-36 left-64"
          />

          {/* Vertical Light Lines */}
          <motion.div
            animate={{ y: [-60, 60, -60], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[2px] h-64 bg-gradient-to-b from-[#FFD700] to-transparent rounded"
          />
          <motion.div
            animate={{ y: [60, -60, 60], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-[2px] h-64 bg-gradient-to-t from-[#c98404] to-transparent rounded"
          />
          <motion.div
            animate={{ y: [-50, 50, -50], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-1/3 w-[2px] h-56 bg-gradient-to-b from-[#9c3b03] to-transparent rounded"
          />
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A0A1A] to-transparent"></div>
    </section>
  );
}

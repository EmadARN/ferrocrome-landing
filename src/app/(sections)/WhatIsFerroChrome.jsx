"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function WhatIsFerroChrome() {
  const images = [
    "/images/high-carbon-ferrochrome.webp",
    "/images/low-carbon-ferrochrome.jpg",
    "/images/micro-carbon-ferrochrome.webp",
  ];

  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-300 relative overflow-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        {/* متن */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400 tracking-tight">
            فرو کروم چیست؟
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            کروم به صورت آزاد در طبیعت پیدا نمی‌شود و غنی ترین ماده معدنی حاوی
            کروم، کرومیت با فرمول FeO.Cr2O3 است. کروم از کانی کرومیت به‌دست
            می‌آید که یک کانی اکسیدی از کروم، آهن، و اکسیژن می‌باشد. در دمای
            اتاق، کروم در حالت خالص، عنصری با ظاهری نرم است، اما به دلیل تمایل
            شدید به واکنش با اکسیژن و عناصر دیگر، فرآیند تهیه کروم خالص با چالش
            مواجه است.
          </p>

          <h3 className="text-2xl font-bold text-blue-400 mt-6">فروکروم</h3>
          <p className="text-lg text-gray-400 leading-relaxed">
            فرو کروم یکی از اصلی‌ترین فروآلیاژهای مورد استفاده در صنعت فولادسازی
            و ریخته گری است. این ماده به عنوان منبع اصلی تأمین عنصر کروم در
            فولادهای ضد زنگ، فولادهای ابزار و آلیاژهای مقاوم به حرارت و خوردگی
            شناخته می‌شود.
          </p>
        </motion.div>

        {/* تصاویر هندسی جذاب */}
        <motion.div className="relative flex justify-start items-start w-full">
          {images.map((src, idx) => {
            const offsetX = idx * 4; // فاصله افقی
            const offsetY = idx * 3; // فاصله عمودی
            const rotate = -10 + idx * 7;

            return (
              <motion.div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                whileHover={{ scale: 1.07, rotate: 0 }}
                animate={{
                  rotate: [rotate, rotate + 3, rotate],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatDelay: 10 + idx * 2,
                  ease: "easeInOut",
                }}
                className="absolute w-64 h-64  mt-16 rounded-xl overflow-hidden shadow-xl border border-gray-700 cursor-pointer"
                style={{
                  top: `${offsetY}rem`,
                  left: `${offsetX}rem`,
                  zIndex: hoveredIdx === idx ? 20 : 10 - idx,
                }}
              >
                <Image
                  src={src}
                  alt={`فروکروم ${idx + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </motion.div>
            );
          })}

          {/* افکت نور پس‌زمینه */}
          <motion.div
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-72 h-72 top-10 left-10 bg-yellow-500/10 rounded-3xl blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-56 h-56 bottom-0 left-20 bg-blue-400/10 rounded-3xl blur-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

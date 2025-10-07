"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function WhatIsFerroChrome() {
  const [activeTab, setActiveTab] = useState("ferrochrome");
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // داده‌های هر تب
  const tabs = {
    ferrochrome: {
      title: "فرو کروم چیست؟",
      subtitle: "فروکروم",
      color: "text-[#c76700]",
      highlight: "text-blue-400",
      text1: `کروم به صورت آزاد در طبیعت پیدا نمی‌شود و غنی‌ترین ماده معدنی حاوی
      کروم، کرومیت با فرمول FeO.Cr2O3 است. کروم از کانی کرومیت به‌دست می‌آید
      که یک کانی اکسیدی از کروم، آهن و اکسیژن می‌باشد.`,
      text2: `فرو کروم یکی از اصلی‌ترین فروآلیاژهای مورد استفاده در صنعت فولادسازی
      و ریخته‌گری است و به عنوان منبع اصلی تأمین عنصر کروم در فولادهای ضدزنگ،
      فولادهای ابزار و آلیاژهای مقاوم به حرارت شناخته می‌شود.`,
      images: [
        "/images/high-carbon-ferrochrome.webp",
        "/images/low-carbon-ferrochrome.jpg",
        "/images/micro-carbon-ferrochrome.webp",
      ],
      glow1: "bg-yellow-500/10",
      glow2: "bg-blue-400/10",
    },
    chromite: {
      title: "کرومیت چیست؟",
      subtitle: "کانی کرومیت",
      color: "text-[#c76700]",
      highlight: "text-blue-400",
      text1: `کرومیت (FeCr₂O₄) تنها منبع اقتصادی استخراج کروم است که در سنگ‌های
      اولترامافیک مانند دونیت و سرپانتین یافت می‌شود. این کانی به دلیل داشتن
      ترکیب آهن و کروم اهمیت بالایی در صنایع فولادسازی دارد.`,
      text2: `کرومیت در فرآیند ذوب به فروکروم تبدیل می‌شود که سپس برای تولید فولاد
      ضدزنگ و سایر آلیاژهای مقاوم به خوردگی به کار می‌رود.`,
      images: [
        "/images/chromite1.webp",
        "/images/chromite2.webp",
        "/images/chromite3.webp",
      ],
      glow1: "bg-green-400/10",
      glow2: "bg-emerald-400/10",
    },
  };

  const currentTab = tabs[activeTab];

  return (
    <section className="pt-12 pb-[28rem] md:pb-[28rem] lg:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-300 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* دکمه‌های تب */}
        <div className="flex justify-center gap-6 mb-12">
          {Object.keys(tabs).map((key) => {
            const isActive = activeTab === key;
            return (
              <motion.button
                key={key}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(key)}
                className={`relative px-8 py-3 rounded-md text-lg font-semibold backdrop-blur-md border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#a15300] via-[#521f01] to-[#521f01]  text-white border-transparent shadow-lg shadow-orange-500/20"
                    : "bg-gray-800/30 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                {key === "ferrochrome" ? "فروکروم" : "کرومیت"}
                {isActive && (
                  <motion.div
                    layoutId="tab-highlight"
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-full blur-md"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* محتوای تب‌ها */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="grid lg:grid-cols-2 gap-16 items-start"
          >
            {/* بخش متن */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2
                className={`text-2xl md:text-4xl font-extrabold tracking-tight ${currentTab.color}`}
              >
                {currentTab.title}
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                {currentTab.text1}
              </p>

              <h3 className={`text-2xl font-bold mt-6 ${currentTab.highlight}`}>
                {currentTab.subtitle}
              </h3>

              <p className="text-lg text-gray-400 leading-relaxed">
                {currentTab.text2}
              </p>
            </motion.div>

            {/* بخش تصاویر */}
            <motion.div className="relative flex justify-start items-start w-full">
              {currentTab.images.map((src, idx) => {
                const offsetX = idx * 4;
                const offsetY = idx * 3;
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
                    className="absolute w-44 h-44 md:w-64 md:h-64 mt-12 rounded-md overflow-hidden shadow-md border border-gray-700 cursor-pointer"
                    style={{
                      top: `${offsetY}rem`,
                      left: `${offsetX}rem`,
                      zIndex: hoveredIdx === idx ? 20 : 10 - idx,
                    }}
                  >
                    <Image
                      src={src}
                      alt={`${currentTab.subtitle} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </motion.div>
                );
              })}

              {/* افکت‌های نوری پس‌زمینه */}
              <motion.div
                animate={{ opacity: [0.1, 0.25, 0.1] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute w-72 h-72 top-10 left-10 ${currentTab.glow1} rounded-3xl blur-3xl`}
              />
              <motion.div
                animate={{ opacity: [0.1, 0.25, 0.1] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute w-56 h-56 bottom-0 left-20 ${currentTab.glow2} rounded-3xl blur-3xl`}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

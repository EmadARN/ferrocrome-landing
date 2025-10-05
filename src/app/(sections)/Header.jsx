"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "خانه", href: "home" },
  { label: "محصولات", href: "products" },
  { label: "خدمات", href: "whyus" },
  { label: "درباره ما", href: "about" },
  { label: "تماس با ما", href: "contact" },
];

export default function Header() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  // Spark Effect
  useEffect(() => {
    const createSpark = () => {
      const spark = document.createElement("div");
      spark.className =
        "absolute w-1 h-1 rounded-full bg-furnace-orange shadow-[0_0_10px_#FF6B35] animate-spark-float";
      spark.style.top = Math.random() * 100 + "%";
      spark.style.left = Math.random() * 100 + "%";
      spark.style.animationDelay = Math.random() * 2 + "s";
      document.getElementById("header")?.appendChild(spark);
      setTimeout(() => spark.remove(), 6000);
    };
    const interval = setInterval(createSpark, 1500);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener برای نمایش نوبار موبایل و مخفی/نمایش هدر دسکتاپ
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // نوبار موبایل
      if (currentScroll > 50) {
        setShowMobileNav(true);
      } else {
        setShowMobileNav(false);
      }

      // هدر دسکتاپ: وقتی اسکرول به پایین، هدر مخفی؛ به بالا، هدر ظاهر
      if (currentScroll > lastScroll && currentScroll > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <>
      {/* Header دسکتاپ با Framer Motion */}
      <AnimatePresence>
        {showHeader && (
          <motion.header
            key="header"
            id="header"
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -120, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black steel-texture z-50 lg:fixed top-0 left-0"
          >
            <div className="container px-6 lg:mr-24 flex items-center justify-between h-32 relative z-10">
              {/* منوی دسکتاپ */}
              <nav className="hidden lg:flex items-center space-x-4 ">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "nav-item text-chrome-silver font-rajdhani font-medium text-sm tracking-wide transition-all duration-300 hover:text-blue-200   p-2"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* لوگو */}
              <div className="flex-1 flex justify-center reflection-effect">
                <div className="text-center">
                  <h1 className="logo-chrome logo-glow font-orbitron font-black text-4xl md:text-5xl lg:text-6xl tracking-wider mb-2">
                    فروستیل
                  </h1>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
                    <p className="text-chrome-silver font-rajdhani font-medium text-sm md:text-base tracking-widest">
                      صنایع
                    </p>
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
                  </div>
                  <p className="text-metallic-gray font-rajdhani font-light text-xs mt-2 tracking-wider">
                    دقت • قدرت • نوآوری
                  </p>
                </div>
              </div>

              {/* دکمه دسکتاپ */}
              <button className="tech-border pulse-glow bg-gradient-to-r from-blue-950 to-amber-950 text-chrome-silver px-12 py-2 rounded-sm font-rajdhani font-semibold text-sm tracking-wide hover:bg-gradient-to-r hover:from-blue-900 hover:to-furnace-orange/30 transition-all duration-300 cursor-pointer hidden lg:block">
                درخواست پشتیبانی
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* خطوط هندسی */}
      <div className="absolute w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[200px] h-[2px] bg-gradient-to-r from-transparent via-blue-200 to-transparent animate-slide-right"></div>
        <div className="absolute bottom-[30%] right-[15%] w-[150px] h-[2px] bg-gradient-to-r from-transparent via-orange-200 to-transparent animate-slide-left"></div>
      </div>

      {/* نوبار موبایل با Framer Motion */}
      <AnimatePresence>
        {showMobileNav && (
          <motion.nav
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="lg:hidden fixed top-12 left-0 w-full z-20 flex justify-around py-3 overflow-x-auto
                 bg-gradient-to-t from-black/80 via-black/60 to-black/20
                 backdrop-blur-xl
                 border-t border-blue-500/30
                 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]
                 rounded-t-xl"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-chrome-silver font-rajdhani font-medium text-sm hover:text-blue-200 transition-all duration-300 whitespace-nowrap px-3"
              >
                {item.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

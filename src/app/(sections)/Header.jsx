"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "خانه", href: "#hero" },
  { label: "محصولات", href: "#product" },
  { label: "خدمات", href: "#whyus" },
  { label: "درباره ما", href: "#about" },
];

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef(null);

  // مدیریت نمایش هدر دسکتاپ هنگام اسکرول
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
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
      {/* هدر دسکتاپ */}
      <AnimatePresence>
        {showHeader && (
          <motion.header
            key="header"
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -120, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black steel-texture z-50 fixed top-0 left-0"
          >
            <div className="container px-6 lg:mr-24 flex items-center justify-between h-32 relative z-10">
              {/* منوی دسکتاپ */}
              <nav className="hidden lg:flex items-center space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "nav-item text-gray-300 font-rajdhani font-medium text-sm tracking-wide transition-all duration-300 hover:text-blue-200 p-2"
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
                    <p className="text-gray-300 font-rajdhani font-medium text-sm md:text-base tracking-widest">
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
              <Link href={"#WorkWithUs"}>
                <button className="tech-border pulse-glow bg-gradient-to-r from-blue-950 to-amber-950 text-gray-300 px-12 py-2 rounded-sm font-rajdhani font-semibold text-sm tracking-wide hover:bg-gradient-to-r hover:from-blue-900 hover:to-furnace-orange/30 transition-all duration-300 cursor-pointer hidden lg:block">
                  درخواست همکاری
                </button>
              </Link>

              {/* همبرگر موبایل */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileMenuOpen(!mobileMenuOpen);
                  }}
                  className="flex flex-col justify-center items-center w-10 h-10 relative z-50"
                >
                  <span
                    className={cn(
                      "block w-6 h-[2px] bg-gray-300 rounded transition-all duration-300",
                      mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                    )}
                  ></span>
                  <span
                    className={cn(
                      "block w-6 h-[2px] bg-gray-300 rounded my-1 transition-all duration-300",
                      mobileMenuOpen ? "opacity-0" : ""
                    )}
                  ></span>
                  <span
                    className={cn(
                      "block w-6 h-[2px] bg-gray-300 rounded transition-all duration-300",
                      mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    )}
                  ></span>
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* منوی همبرگر موبایل */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobileDrawer"
            ref={drawerRef}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full h-[60vh] md:h-[45vh] bg-gradient-to-br from-[#0A0A1A] via-[#16213E] to-[#1658a8] flex flex-col items-center justify-center z-40 rounded-b-xl shadow-xl pt-28 "
          >
            {/* دکمه ضربدر داخل drawer */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute  top-4 right-4 text-gray-300 text-2xl hover:text-blue-200 transition-all duration-300"
            >
              ✕
            </button>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className=" text-gray-300 font-rajdhani font-medium text-[14px] md:text-[16px] my-4 hover:text-blue-200 transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

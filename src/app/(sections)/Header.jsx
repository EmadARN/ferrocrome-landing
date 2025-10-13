"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ThemeToggleSwitch from "@/components/ThemeToggle";

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
  const [headerOpacity, setHeaderOpacity] = useState(0.8);
  const drawerRef = useRef(null);

  // مدیریت نمایش هدر و opacity هنگام اسکرول
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
        setHeaderOpacity(1); // وقتی هدر ظاهر شد، کامل دیده شود
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
            className=" w-full overflow-hidden steel-texture z-50 fixed top-0 left-0 backdrop-blur-md"
            style={{
              backgroundColor: `rgba(var(--color-bg-navbar), ${headerOpacity})`,
            }}
          >
            <div className="container  px-6 lg:mr-24 flex items-center justify-between h-24 md:h-28 lg:h-32 relative z-10">
              {/* منوی دسکتاپ */}
              <nav className="hidden lg:flex items-center space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "nav-item font-rajdhani font-medium text-sm tracking-wide transition-all duration-300 p-2",
                      "text-navlink"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* لوگو */}
              <div className="flex-1 flex justify-center reflection-effect">
                <div className="text-center">
                  <h1 className="logo-chrome logo-glow font-orbitron font-black text-xl md:text-2xl lg:text-3xl tracking-wider mb-1">
                    صنایع ذوب فام سپند
                  </h1>

                  {/* متن دسکتاپ */}
                  <div className="flex items-center justify-center space-x-4">
                    <div className="hidden md:block w-12 h-[2px] bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
                    <p className="text-textBody font-rajdhani  text-[0.7rem] md:text-base tracking-widest">
                      تولید کننده و تامین کننده مواد اولیه فولادی
                    </p>
                    <div className="w-12 hidden md:block  h-[2px] bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
                  </div>

                  <p className=" text-metallic-gray font-rajdhani font-light text-[0.6rem] md:text-sm mt-1 tracking-wider text-center">
                    Ferrocrome Industries Co
                  </p>
                </div>
              </div>

              {/* دکمه همکاری دسکتاپ */}
              <div className="hidden lg:flex items-center gap-4">
                <ThemeToggleSwitch />
                <Link href="#WorkWithUs">
                  <button
                    style={{
                      backgroundColor: "var(--color-btn-bg)",
                      color: "var(--color-btn-text)",
                      borderColor: "var(--color-btn-border)",
                      boxShadow: "0 0 0 var(--color-btn-shadow)",
                    }}
                    className="cursor-pointer px-5 py-3 rounded-md text-sm md:text-base font-medium backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                  >
                    درخواست همکاری
                  </button>
                </Link>
              </div>

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
                  />
                  <span
                    className={cn(
                      "block w-6 h-[2px] bg-gray-300 rounded my-1 transition-all duration-300",
                      mobileMenuOpen ? "opacity-0" : ""
                    )}
                  />
                  <span
                    className={cn(
                      "block w-6 h-[2px] bg-gray-300 rounded transition-all duration-300",
                      mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    )}
                  />
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
            className="fixed top-0 left-0 w-full h-[60vh] md:h-[45vh] flex flex-col items-center justify-center z-40 rounded-b-xl shadow-xl pt-28"
            style={{
              backgroundColor: "var(--color-bg-mobile-menu)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* دکمه ضربدر */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-navlink text-3xl hover:text-navlinkHover transition-all duration-300"
            >
              ✕
            </button>

            {/* لینک‌ها */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-navlink font-rajdhani font-medium text-sm md:text-base my-4 hover:text-navlinkHover transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}

            {/* Theme Toggle */}
            <div className="my-4">
              <ThemeToggleSwitch />
            </div>

            {/* دکمه همکاری */}
            <Link href="#WorkWithUs">
              <button className="mt-4 cursor-pointer px-5 py-3 rounded-xl text-sm md:text-base font-medium border border-borderBtn bg-btn text-textBtn hover:bg-btnHover hover:borderBtnHover hover:shadow-lg hover:btnShadow transition-all duration-300">
                درخواست همکاری
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

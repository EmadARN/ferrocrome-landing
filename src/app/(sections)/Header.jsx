"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ThemeToggleSwitch from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";

export default function Header({ blogPath }) {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const drawerRef = useRef(null);
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith("/blog");

  const navItems = [
    { label: "خانه", href: "#hero" },
    { label: "محصولات", href: "#product" },
    { label: "خدمات", href: "#whyus" },
    { label: "درباره ما", href: "#about" },
    { label: " وبلاگ", href: "/blogs" },
  ];

  const processedNavItems = navItems.map((item) => {
    if (blogPath) return { ...item, href: "/" };
    return item;
  });

  const workWithUsHref = blogPath ? "/" : "#WorkWithUs";

  // کنترل نمایش هدر در اسکرول
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

  // تغییر رنگ در اسکرول
  useEffect(() => {
    if (isBlogPage) return;
    const handleScroll = () => setScrolled(window.scrollY > 850);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBlogPage]);

  return (
    <>
      {/* Header */}
      <AnimatePresence>
        {showHeader && (
          <motion.header
            key="header"
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -120, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={cn(
              "fixed top-0 left-0 w-full z-50 overflow-hidden transition-all duration-300",
              "backdrop-blur-md lg:backdrop-blur-lg",
              "bg-transparent lg:bg-[var(--color-bg-navbar)]"
            )}
          >
            <div className="px-6 flex items-center justify-around h-20 md:h-24 lg:h-28 relative z-10">
              <div className="flex items-center lg:hidden">
                <ThemeToggleSwitch scrolled={scrolled} />
              </div>

              {/* منوی دسکتاپ */}
              <nav className="hidden lg:flex items-center ">
                {processedNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "font-rajdhani font-medium text-sm tracking-wide transition-all duration-300 p-2",
                      isBlogPage
                        ? "text-[var(--color-navlink)]"
                        : scrolled
                        ? "text-[var(--color-navlink)]"
                        : "text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* لوگو و متن وسط */}
              <div className="flex justify-center reflection-effect ">
                <div className="text-center">
                  <h1
                    className={cn(
                      "logo-glow font-orbitron font-black text-md md:text-2xl lg:text-3xl mb-1",
                      isBlogPage
                        ? "text-[var(--color-navlink)]"
                        : scrolled
                        ? "text-[var(--color-navlink)]"
                        : "text-white"
                    )}
                  >
                    صنایع ذوب فام سپند
                  </h1>

                  <div className="flex items-center justify-center text-center">
                    <div className="hidden md:block w-12 h-[2px] bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
                    <p
                      className={cn(
                        "text-textBody font-rajdhani text-[0.7rem] md:text-base",
                        isBlogPage
                          ? "text-[var(--color-navlink)]"
                          : scrolled
                          ? "text-[var(--color-navlink)]"
                          : "text-white"
                      )}
                    >
                      تولید کننده و تامین کننده مواد اولیه فولادی
                    </p>
                    <div className="hidden md:block w-12 h-[2px] bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
                  </div>

                  <p
                    className={cn(
                      "font-rajdhani font-light text-[0.6rem] md:text-sm mt-1 tracking-wider text-center",
                      isBlogPage
                        ? "text-[var(--color-navlink)]"
                        : scrolled
                        ? "text-[var(--color-navlink)]"
                        : "text-white"
                    )}
                  >
                    Ferrocrome Industries Co
                  </p>
                </div>
              </div>

              {/* دکمه همکاری (دسکتاپ) */}
              <div className="hidden lg:flex items-center gap-4">
                <ThemeToggleSwitch scrolled={scrolled} />
                <Link href={workWithUsHref}>
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

              {/* منوی همبرگری موبایل */}
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
                      "block w-6 h-[2px] rounded transition-all duration-300",
                      mobileMenuOpen ? "rotate-45 translate-y-2" : "",
                      isBlogPage
                        ? "bg-[var(--color-navlink)]"
                        : scrolled
                        ? "bg-[var(--color-navlink)]"
                        : "bg-white"
                    )}
                  />
                  <span
                    className={cn(
                      "block w-6 h-[2px] rounded my-1 transition-all duration-300",
                      mobileMenuOpen ? "opacity-0" : "",
                      isBlogPage
                        ? "bg-[var(--color-navlink)]"
                        : scrolled
                        ? "bg-[var(--color-navlink)]"
                        : "bg-white"
                    )}
                  />
                  <span
                    className={cn(
                      "block w-6 h-[2px] rounded transition-all duration-300",
                      mobileMenuOpen ? "-rotate-45 -translate-y-2" : "",
                      isBlogPage
                        ? "bg-[var(--color-navlink)]"
                        : scrolled
                        ? "bg-[var(--color-navlink)]"
                        : "bg-white"
                    )}
                  />
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* منوی موبایل */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobileDrawer"
            ref={drawerRef}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full h-[65vh] flex flex-col items-center justify-evenly z-40 rounded-b-xl shadow-xl pt-10"
            style={{
              backgroundColor: "var(--color-bg-mobile-menu)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
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
            {processedNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-navlink font-rajdhani font-medium text-sm md:text-base my-4 hover:text-navlinkHover transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}

            {/* دکمه همکاری موبایل */}
            <Link href={workWithUsHref}>
              <button className="cursor-pointer px-5 py-3 rounded-xl text-sm md:text-base font-medium border border-borderBtn bg-btn text-textBtn hover:bg-btnHover hover:borderBtnHover hover:shadow-lg transition-all duration-300">
                درخواست همکاری
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

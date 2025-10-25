"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ThemeToggleSwitch from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/constants";

export default function Header({ blogPath }) {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const drawerRef = useRef(null);
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith("/blog");

  // اگر در صفحه بلاگ باشیم، همه لینک‌ها به / هدایت می‌شن ولی key منحصربه‌فرد ساخته میشه
  const processedNavItems = navItems.map((item, index) => {
    if (blogPath) return { ...item, href: "/", key: `blog-${index}` };
    return { ...item, key: `main-${index}` };
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
              "backdrop-blur-lg lg:backdrop-blur-xl",
              "bg-transparent lg:bg-[var(--color-bg-navbar)]"
            )}
          >
            <div className="px-6 flex items-center justify-around h-20 md:h-24 lg:h-28 relative z-50">
              <div className="flex items-center lg:hidden">
                <ThemeToggleSwitch
                  scrolled={scrolled}
                  mobileMenuOpen={mobileMenuOpen}
                />
              </div>

              {/* منوی دسکتاپ */}
              <nav className="hidden lg:flex items-center">
                {processedNavItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={cn(
                      "font-rajdhani font-medium text-sm tracking-wide transition-all duration-300 m-2 z-50",
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

              {/* لوگو */}
              <div className="flex justify-center reflection-effect">
                <div className="text-center">
                  <h1
                    className={cn(
                      "logo-glow font-orbitron font-black text-md md:text-2xl lg:text-3xl mb-1",
                      mobileMenuOpen ? " text-white" : "",
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
                        mobileMenuOpen ? " text-white" : "",

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
                      mobileMenuOpen ? " text-white" : "",

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

              {/* منوی موبایل */}
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
                      mobileMenuOpen ? "rotate-45 translate-y-2 bg-white" : "",
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
                      mobileMenuOpen ? "opacity-0 bg-white" : "",
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
                      mobileMenuOpen
                        ? "-rotate-45 -translate-y-2 bg-white"
                        : "",
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

      {/* Drawer موبایل */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobileDrawer"
            ref={drawerRef}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full h-[70dvh] flex flex-col !bg-black/60 items-center justify-evenly z-40 rounded-b-md shadow-xl pt-10"
            style={{
              backgroundColor: "var(--color-bg-mobile-menu)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-navlinkHover transition-all duration-300"
            >
              ✕
            </button>

            <menu className="mt-6 flex flex-col items-center">
              {processedNavItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white font-rajdhani font-medium text-sm md:text-base py-4 hover:text-navlinkHover transition-all duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </menu>

            <Link href={workWithUsHref}>
              <button className="cursor-pointer px-5 py-3 rounded-md text-sm md:text-base font-medium border border-borderBtn bg-btn text-white hover:bg-btnHover hover:borderBtnHover hover:shadow-lg transition-all duration-300">
                درخواست همکاری
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

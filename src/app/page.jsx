"use client";
import About from "./(sections)/About";
import Footer from "./(sections)/Footer";
import Header from "./(sections)/Header";
import Hero from "./(sections)/Hero";
import Products from "./(sections)/Product";
import ProductCarousel from "./(sections)/ProductCarousel";
import WhyChooseUs from "./(sections)/WhyChooseUs";
import WhatIsFerroChrome from "./(sections)/WhatIsFerroChrome";
import ScrollToTopButton from "@/components/ui/ScrollTopButton";
import ContactModal from "../components/ui/contactUsButton";
import WorkWithUs from "./(sections)/WorkWithUs";
import { motion } from "framer-motion";
import FloatingChromite from "@/components/ui/FloatingChromite";

export default function Home() {
  return (
    <main>
      <Header />
      <section id="hero" className="lg:pt-32 relative">
        <Hero />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          {[0, 1].map((_, idx) => (
            <motion.div
              key={idx}
              animate={{ y: [0, 2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
                delay: idx * 0.2,
              }}
              className="w-2 h-2 md:w-4 md:h-4 border-b-2 border-r-2 border-white/60 rotate-45"
            />
          ))}
        </div>
      </section>

      <FloatingChromite />

      <section id="about">
        <About />
      </section>

      <section id="ferrochrome">
        <WhatIsFerroChrome />
      </section>

      <section id="product">
        <Products />
      </section>

      <section id="whyus">
        <WhyChooseUs />
      </section>

      <section id="carousel">
        <ProductCarousel />
      </section>

      <section id="WorkWithUs">
        <WorkWithUs />
      </section>

      <ContactModal />

      <Footer />

      {/* دکمه Scroll to Top */}
      <ScrollToTopButton />
    </main>
  );
}

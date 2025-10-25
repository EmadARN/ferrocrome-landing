"use client";
import Header from "./(sections)/Header";
import Footer from "./(sections)/Footer";
import Hero from "./(sections)/Hero";
import About from "./(sections)/About";
import Products from "./(sections)/Product";
import WhyChooseUs from "./(sections)/WhyChooseUs";
import WhatIsFerroChrome from "./(sections)/WhatIsFerroChrome";
import WorkWithUs from "./(sections)/WorkWithUs";
import ScrollToTopButton from "@/components/ui/ScrollTopButton";
import Blogs from "./blogs/page";
import WhatsAppButton from "@/components/ui/WhatsappButton";
import Gallary from "./(sections)/Gallary";
import { useState } from "react";
import { motion } from "framer-motion";
import ContactModal from "@/components/ui/contactUsButton";
export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <main>
      <Header />

      <section id="hero" className=" relative">
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

      <section id="about">
        <About />
      </section>

      <section id="ferrochrome">
        <WhatIsFerroChrome />
      </section>

      <section id="product">
        <Products setModalOpen={setModalOpen} />
      </section>

      <section id="whyus">
        <WhyChooseUs />
      </section>

      <section id="carousel">
        <Gallary />
      </section>

      <section id="WorkWithUs">
        <WorkWithUs />
      </section>
      <div className={` ${modalOpen ? "hidden" : "block"}`}>
        <WhatsAppButton />
        <ContactModal />
      </div>

      <section id="blogs">
        <Blogs />
      </section>

      <Footer />
      <ScrollToTopButton />
    </main>
  );
}

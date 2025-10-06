"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa"; 

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-8 left-8 w-12 h-12 bg-[#a15300] text-gray-200 rounded-md shadow-lg flex items-center justify-center hover:bg-[#703a00] active:scale-90 z-50 cursor-pointer"
        >
          <FaArrowUp className="text-xl" /> {/* آیکون جایگزین فلش ساده */}
        </motion.button>
      )}
    </AnimatePresence>
  );
}

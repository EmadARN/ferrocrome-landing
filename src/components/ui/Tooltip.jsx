"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Tooltip({ children, content }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((prev) => !prev)} // برای موبایل
    >
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mt-2 w-64 max-h-48 overflow-y-auto p-3 rounded-md bg-gray-800/90 text-gray-100 text-sm shadow-md backdrop-blur-md border border-white/10"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

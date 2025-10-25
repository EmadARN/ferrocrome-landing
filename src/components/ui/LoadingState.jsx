"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#0A0A1A] via-[#16213E] to-[#0F3460]">
      <motion.div
        className="w-12 h-12 border-4 border-gray-500 border-t-gray-200 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      />
    </div>
  );
}

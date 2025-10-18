"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60dvh] ">
      <motion.div
        className="w-12 h-12 border-4 border-gray-500 border-t-gray-200 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      />
    </div>
  );
}

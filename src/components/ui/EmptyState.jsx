"use client";

import React from "react";
import { motion } from "framer-motion";

export default function EmptyState({
  text = "هیچ داده‌ای یافت نشد.",
  icon = "📭",
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-10 text-gray-500"
    >
      <span className="text-3xl mb-2">{icon}</span>
      <p className="text-sm">{text}</p>
    </motion.div>
  );
}

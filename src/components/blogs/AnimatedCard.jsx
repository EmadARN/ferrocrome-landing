"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { faIR } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import truncateText from "@/utils/trancrate";

const AnimatedCard = ({ title, summary, createdAt, image, href }) => {
  const dateObj = createdAt ? new Date(createdAt) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => (window.location.href = href)}
      style={{ backgroundColor: "var(--color-card-bg)" }}
      whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      className=" rounded-lg shadow-lg max-w-md overflow-hidden cursor-pointer h-[400px] flex flex-col"
    >
      {/* تصویر */}
      {image && (
        <div className="relative h-50 w-full flex-shrink-0">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      )}

      <div className="p-4 flex flex-col flex-1 overflow-hidden">
        {/* تاریخ پایین عکس */}
        <span
          style={{ color: "var(--color-title-secondary)" }}
          className="text-gray-400 text-sm mb-2"
        >
          🗓{" "}
          {dateObj && !isNaN(dateObj)
            ? format(dateObj, "PPP", { locale: faIR })
            : "تاریخ نامشخص"}
        </span>

        {/* عنوان */}
        <h2
          style={{ color: "var(--color-title-secondary)" }}
          className="text-lg font-bold text-gray-800  "
        >
          {title}
        </h2>

        {/* خلاصه محتوا */}
        <p
          style={{ color: "var(--color-text-secondary)" }}
          className=" hidden md:flex text-sm   overflow-hidden"
        >
          {truncateText(summary, 200)}
        </p>

        <p
          style={{ color: "var(--color-text-secondary)" }}
          className=" text-sm flex-1 md:hidden overflow-hidden"
        >
          {truncateText(summary, 100)}
        </p>

        {/* ادامه مطلب */}
        <span
          style={{ color: "var(--color-text-secondary)" }}
          className="mt-3  font-medium hover:text-blue-800 transition-colors"
        >
          ادامه مطلب →
        </span>
      </div>
    </motion.div>
  );
};

export default AnimatedCard;

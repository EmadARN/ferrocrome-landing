"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { faIR } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

const AnimatedCard = ({ title, summary, createdAt, image, href }) => {
  const dateObj = createdAt ? new Date(createdAt) : null;

  return (
    <Link href={href} className="block">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer h-[400px] flex flex-col"
      >
        {/* تصویر */}
        {image && (
          <div className="relative h-40 w-full flex-shrink-0">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
        )}

        <div className="p-4 flex flex-col flex-1 overflow-hidden">
          {/* تاریخ پایین عکس */}
          <span className="text-gray-400 text-sm mb-2">
            🗓{" "}
            {dateObj && !isNaN(dateObj)
              ? format(dateObj, "PPP", { locale: faIR })
              : "تاریخ نامشخص"}
          </span>

          {/* عنوان */}
          <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {title}
          </h2>

          {/* خلاصه محتوا */}
          <p className="text-gray-600 text-sm line-clamp-2 flex-1 overflow-hidden">
            {summary}
          </p>

          {/* ادامه مطلب */}
          <span className="mt-3 text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
            ادامه مطلب →
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default AnimatedCard;

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import truncateText from "@/utils/trancrate";

const AnimatedCard = ({ title, summary, createdAt, image, href }) => {
  const dateObj = createdAt ? new Date(createdAt) : null;

  // تابع تبدیل تاریخ به فارسی
  const formatDatePersian = (date) => {
    if (!date || isNaN(date)) return "تاریخ نامشخص";
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <Link href={href} className="group">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          scale: 1.03,
        }}
        style={{ backgroundColor: "var(--color-card-bg)" }}
        className="rounded-md max-w-md overflow-hidden cursor-pointer h-[400px] flex flex-col my-5 transition-all"
      >
        {/* تصویر */}
        {image && (
          <div className="relative h-50 w-full flex-shrink-0">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
        )}

        <div className="p-4 flex flex-col flex-1 overflow-hidden">
          <span
            style={{ color: "var(--color-title-secondary)" }}
            className="text-gray-400 text-sm my-2"
          >
            🗓 {formatDatePersian(dateObj)}
          </span>

          <h2
            style={{ color: "var(--color-title-secondary)" }}
            className="text-lg font-bold"
          >
            {title}
          </h2>

          {/* خلاصه محتوا */}
          <p
            style={{ color: "var(--color-text-secondary)" }}
            className="hidden md:flex text-sm overflow-hidden"
          >
            {truncateText(summary, 200)}
          </p>

          <p
            style={{ color: "var(--color-text-secondary)" }}
            className="text-sm flex-1 md:hidden overflow-hidden"
          >
            {truncateText(summary, 100)}
          </p>

          {/* ادامه مطلب */}
          <span
            style={{ color: "var(--color-text-secondary)" }}
            className="mt-3 flex justify-end  font-medium text-[0.75rem] md:text-[1rem] transition-colors hover:!text-amber-800"
          >
            <span>ادامه مطلب</span>
            <span className="pt-0.5 pr-1">
              <MdOutlineArrowOutward />
            </span>
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default AnimatedCard;

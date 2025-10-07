"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function FloatingChromiteParallax() {
  const { scrollYProgress } = useScroll();

  // تغییر در محورهای X, Y برای مانور نرم
  const x = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8]);

  // تغییر مقیاس (بزرگ‌تر شدن تدریجی)
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.1, 1.1, 0.2]);

  // شفافیت نرم برای حالت cinematic
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.4, 0.6, 0.4]);

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        rotate,
        opacity,
        zIndex: 50, // همیشه بالای محتوا
      }}
      className="fixed top-18 right-6 md:right-24 pointer-events-none select-none"
    >
      <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64">
        <Image
          src="/images/chromite1.webp"
          alt="Floating Chromite"
          fill
          priority
          className="object-cover rounded-xl drop-shadow-[0_0_40px_rgba(0,0,0,0.4)]"
        />

        {/* درخشش نرم پشت عکس */}
        <motion.div
          animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full"
        />
      </div>
    </motion.div>
  );
}

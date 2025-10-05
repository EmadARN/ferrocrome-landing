"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  const stats = [
    { value: "30+", label: "سال تجربه", color: "text-yellow-400" },
    { value: "500K+", label: "تن تولید سالانه", color: "text-blue-400" },
    { value: "40+", label: "کشور مقصد صادرات", color: "text-yellow-400" },
  ];

  const images = [
    "/images/high-carbon-ferrochrome.Webp",
    "/images/micro-carbon-ferrochrome.webp",
  ];

  const fallVariants = {
    initial: (id) => ({
      y: -500,
      opacity: 0,
      rotateX: Math.random() * 60 - 30,
      rotateY: Math.random() * 60 - 30,
      x: 0,
    }),
    animate: (idx) => {
      const angle = (idx / images.length) * 2 * Math.PI;
      const radius = 8 * 2; // فاصله کمتر بین تصاویر
      return {
        y: 0,
        x: Math.cos(angle) * radius,
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        transition: {
          delay: idx * 0.3,
          duration: 1.5,
          type: "spring",
          stiffness: 80,
          damping: 20,
        },
      };
    },
    hover: {
      scale: 1.05,
      y: -15,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    float: {
      y: [0, -12, 0],
      rotateX: [0, 10, -10, 0],
      rotateY: [0, 15, -15, 0],
      opacity: [0.9, 1, 0.9],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-950 to-black overflow-hidden text-gray-300">
      {/* اشکال پس‌زمینه */}
      <motion.div
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* تصاویر */}
          <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-6 h-auto sm:h-[32rem] lg:h-[36rem] relative">
            {images.map((src, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={fallVariants}
                initial="initial"
                animate={["animate", "float"]}
                whileHover="hover"
                className="relative w-4/5 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-xl overflow-hidden backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl cursor-pointer"
                style={{ perspective: 1000, zIndex: 10 + idx }}
              >
                <Image
                  src={src}
                  alt={`کارخانه ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
              </motion.div>
            ))}
          </div>

          {/* متن و آمار */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400 tracking-tight">
              درباره ما
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed">
              صنایع فروکروم با بیش از سه دهه تجربه، پیشرو در تولید و صادرات
              فروکروم است. ما با استفاده از فناوری مدرن و نیروی متخصص، محصولاتی
              با کیفیت بالا و قابل اعتماد ارائه می‌کنیم.
            </p>

            <p className="text-lg text-gray-400 leading-relaxed">
              مأموریت ما تولید فروکروم با بالاترین خلوص و استحکام است تا نیازهای
              صنایع فولاد و آلیاژسازی در سراسر جهان برآورده شود.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-gray-800/20 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-600 hover:scale-105 transition-transform cursor-default"
                >
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 border-l-4 border-yellow-400 pl-5 italic text-gray-400"
            >
              "کیفیت نتیجه تخصص، نوآوری و سه دهه تجربه است."
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

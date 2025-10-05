"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black text-gray-300">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* متن معرفی */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
            درباره ما
          </h2>

          <p className="text-lg leading-relaxed text-gray-300">
            صنایع فروکروم، با بیش از سه دهه سابقه درخشان در تولید و صادرات
            فروکروم، یکی از پیشگامان صنعت فلزات آلیاژی در منطقه است. ما با تکیه
            بر تکنولوژی مدرن، نیروی انسانی متخصص و استانداردهای جهانی، محصولاتی
            با کیفیت ممتاز و پایدار تولید می‌کنیم.
          </p>

          <p className="text-lg leading-relaxed text-gray-400">
            مأموریت ما ارائه‌ی فروکروم با بالاترین خلوص و استحکام است تا نیازهای
            صنایع فولاد، آلیاژسازی و متالورژی را در سراسر دنیا برآورده کنیم.
            کارخانه‌های ما با بهره‌گیری از سیستم‌های کنترل کیفی دقیق و فناوری‌های
            نوین ذوب، تضمین‌کننده‌ی محصولی قابل اعتماد و منطبق با نیاز بازارهای
            جهانی هستند.
          </p>

          <div className="border-l-4 border-yellow-400 pl-5 mt-6">
            <p className="italic text-gray-400">
              "کیفیت اتفاقی نیست؛ نتیجه‌ی سه دهه تلاش، تخصص و نوآوری است."
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-10 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400">30+</div>
              <div className="text-gray-400 text-sm">سال تجربه</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">500K+</div>
              <div className="text-gray-400 text-sm">تن تولید سالانه</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">40+</div>
              <div className="text-gray-400 text-sm">کشور مقصد صادرات</div>
            </div>
          </div>
        </motion.div>

        {/* تصویر یا نمای گرافیکی */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center"
        >
          <div className="bg-gray-800/40 backdrop-blur-md rounded-3xl p-12 w-full h-full flex items-center justify-center shadow-xl border border-gray-700">
            {/* جایگزین با عکس کارخانه یا آیکون مرتبط */}
            <svg
              className="w-72 h-72 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3L2 12h3v8h14v-8h3L12 3z" />
              <path d="M9 13h2v4H9v-4zm4 0h2v4h-2v-4z" fill="currentColor" />
            </svg>
          </div>

          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-yellow-500/10 to-blue-400/10 blur-3xl -z-10"></div>
        </motion.div>
      </div>
    </section>
  );
}

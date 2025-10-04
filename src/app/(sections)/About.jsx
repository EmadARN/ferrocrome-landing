"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">
            برتری در تولید فروکروم
          </h2>
          <p className="text-gray-300 leading-relaxed">
            با بیش از سه دهه تجربه در تولید و فروش جهانی فروکروم، ما کیفیتی
            ممتاز ارائه می‌دهیم که فراتر از استانداردهای صنعتی است.
          </p>
          <p className="text-gray-300 leading-relaxed">
            کارخانه‌های پیشرفته ما با استفاده از تکنولوژی مدرن و فرآیندهای
            پایدار، کیفیت ثابت و زنجیره تأمین قابل اعتماد برای شرکای بین‌المللی
            در صنعت فولاد فراهم می‌کنند.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400">500K+</div>
              <div className="text-gray-400 text-sm">تن ظرفیت سالانه</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">40+</div>
              <div className="text-gray-400 text-sm">کشور تحت پوشش</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl p-12 h-96 flex items-center justify-center">
            {/* اینجا می‌تونی تصویر کارخانه یا SVG بذاری */}
            <svg
              className="w-64 h-64 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3L2 12h3v8h14v-8h3L12 3z" />
              <path d="M9 13h2v4H9v-4zm4 0h2v4h-2v-4z" fill="currentColor" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

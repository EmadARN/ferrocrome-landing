"use client";
import WorkWithUsForm from "@/components/forms/WorkWithUsForm";
import { motion } from "framer-motion";

export default function WorkWithUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-5xl font-bold text-[#c76700] mb-4"
        >
          همکاری با ما را آغاز کنید
        </motion.h2>
        <p className="text-gray-300 mb-12 text-[10px] md:text-lg">
          آماده همکاری با شرکت‌های پیشرو هستید؟ نیازهای فروکروم خود را با ما به
          اشتراک بگذارید و یک همکاری موفق بسازیم.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gray-800/50 backdrop-blur-lg p-8 md:p-12 rounded-md shadow-lg">
            <WorkWithUsForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import ContactForm from "@/components/forms/ContactForm";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-8">
      <div className="grid md:grid-cols-2 gap-12 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-5xl font-bold leading-tight">
            تولید و فروش <span className="text-yellow-400">فروکروم ممتاز</span>
          </h1>
          <p className="text-gray-300 text-lg">
            شریک مطمئن شما در صنعت جهانی فروآلیاژها
          </p>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>✔️ گواهی ISO 9001</li>
            <li>✔️ صادرات به بیش از 40 کشور</li>
            <li>✔️ تحویل 99.8٪ به موقع</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}

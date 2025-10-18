"use client";
import WorkWithUsForm from "@/components/forms/WorkWithUsForm";
import { motion } from "framer-motion";

export default function WorkWithUs() {
  return (
    <section
      style={{
        background: "var(--color-about-bg)",
        color: "var(--color-text)",
      }}
      className="py-20 "
    >
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ color: "var(--color-title)" }}
          className="text-2xl md:text-4xl font-bold  mb-4"
        >
          همکاری با ما را آغاز کنید
        </motion.h2>
        <p
          style={{ color: "var(--color-text-muted)" }}
          className="mb-12 text-[10px] md:text-lg"
        >
          آماده همکاری با شرکت‌های پیشرو هستید؟ نیازهای فروکروم خود را با ما به
          اشتراک بگذارید و یک همکاری موفق بسازیم.
        </p>

        <WorkWithUsForm />
      </div>
    </section>
  );
}

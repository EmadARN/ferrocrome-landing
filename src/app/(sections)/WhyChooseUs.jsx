"use client";
import { motion } from "framer-motion";
import { FaAward, FaGlobe, FaCheckCircle, FaLeaf } from "react-icons/fa";

const items = [
  {
    icon: <FaAward className="w-10 h-10 mx-auto text-[#a15300]" />,
    title: "کیفیت ممتاز",
    desc: "تولید با گواهی ISO 9001 و کنترل کیفیت دقیق در تمامی مراحل.",
  },
  {
    icon: <FaGlobe className="w-10 h-10 mx-auto text-blue-400" />,
    title: "پوشش جهانی",
    desc: "خدمات رسانی به بیش از 40 کشور با لجستیک قابل اعتماد.",
  },
  {
    icon: <FaCheckCircle className="w-10 h-10 mx-auto text-gray-400" />,
    title: "قابلیت اطمینان",
    desc: "تحویل 99.8٪ به موقع و مدیریت زنجیره تأمین پایدار.",
  },
  {
    icon: <FaLeaf className="w-10 h-10 mx-auto text-green-400" />,
    title: "پایداری",
    desc: "فرآیندهای تولید دوستدار محیط زیست با حداقل اثر کربن.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      style={{
      background: "var(--color-about-bg)",
        color: "var(--color-text)",
      }}
      className="py-20 bg-black"
    >
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ color: "var(--color-title)" }}
          className="text-2xl md:text-4xl font-bold  mb-4"
        >
          چرا شرکت‌های پیشرو ما را انتخاب می‌کنند
        </motion.h2>
        <p style={{ color: "var(--color-text-muted)" }} className=" text-[12px] md:text-lg mx-auto">
          ارائه برتری از طریق نوآوری، اطمینان و فرآیندهای پایدار
        </p>
      </div>

      {/* کارت‌ها */}
      <div className="flex justify-center">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-xl w-full px-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              style={{ backgroundColor: "var(--color-card-bg)" }}
              className=" backdrop-blur-lg p-8 rounded-md hover:scale-105 transition-transform"
            >
              <div className="mb-4">{item.icon}</div>
              <h3  style={{ color: "var(--color-title-secondary)" }} className="text-xl font-bold  mb-2">
                {item.title}
              </h3>
              <p  style={{ color: "var(--color-text-secondary)" }} className="text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

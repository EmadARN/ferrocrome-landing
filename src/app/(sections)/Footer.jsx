"use client";
import { socialIcons } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="border-t pt-16"
      style={{
        background: "var(--color-footer-bg)",
        color: "var(--color-footer-text)",
        borderColor: "var(--color-footer-border)",
      }}
    >
      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-12">
        {/* برند و توضیحات */}
        <div className="flex flex-col items-start">
          <h3
            className="text-3xl font-bold mb-4"
            style={{ color: "var(--color-accent)" }}
          >
            FerroCorp Industries
          </h3>
          <p
            className="mb-6 text-sm"
            style={{ color: "var(--color-footer-muted)" }}
          >
            پیشرو در صنعت جهانی فروکروم با محصولات ممتاز، تولید پایدار و همکاری
            قابل اعتماد در بیش از 40 کشور.
          </p>
          <div className="flex gap-4">
            {socialIcons.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                className={`w-8 h-8 ${item.bg} rounded-md flex items-center justify-center text-white shadow-lg`}
                whileHover={{
                  scale: 1.2,
                  rotate: 5,
                  boxShadow: "0px 0px 15px rgba(255,255,0,0.7)",
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* اطلاعات تماس */}
        <div className="flex flex-col">
          <h4
            className="font-semibold mb-4"
            style={{ color: "var(--color-footer-heading)" }}
          >
            اطلاعات تماس
          </h4>
          <div className="space-y-2 text-sm">
            <p>📧 sales@yinghaico.com</p>
            <p>📞 02126113043</p>
            <p>🏢 تهران-نیاوران خیابان باهنر ساختمان فارومید</p>
          </div>
        </div>

        {/* نقشه */}
        <div className="flex flex-col">
          <h4
            className="font-semibold mb-4"
            style={{ color: "var(--color-footer-heading)" }}
          >
            مکان ما
          </h4>
          <div
            className="w-full h-40 rounded-lg overflow-hidden shadow-lg"
            style={{ border: "1px solid var(--color-footer-border)" }}
          >
            <iframe
              title="FerroCorp Location"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4520.68976905636!2d57.74239300000001!3d28.798216000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1sen!2sjp!4v1759730282138!5m2!1sen!2sjp"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div
        className="mt-12 text-center text-[0.7rem] md:text-sm"
        style={{ color: "var(--color-footer-muted)" }}
      >
        © 2025 Ferrochrome Industries. تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}

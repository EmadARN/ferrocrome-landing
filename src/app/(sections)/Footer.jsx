"use client";
import Link from "next/link";
import {
  FaLinkedin,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const socialIcons = [
    { href: "#", icon: <FaLinkedin />, bg: "bg-blue-700" },
    { href: "#", icon: <FaFacebookF />, bg: "bg-blue-600" },
    { href: "#", icon: <FaTwitter />, bg: "bg-sky-400" },
    { href: "#", icon: <FaInstagram />, bg: "bg-pink-500" },
  ];

  return (
    <footer className="bg-gradient-to-tr from-black via-gray-900 to-gray-800 text-gray-400 border-t border-gray-700 pt-16">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
        {/* برند و توضیحات */}
        <div>
          <h3 className="text-3xl font-bold text-yellow-400 mb-4">
            FerroCorp Industries
          </h3>
          <p className="mb-6 text-sm">
            پیشرو در صنعت جهانی فروکروم با محصولات ممتاز، تولید پایدار و همکاری
            قابل اعتماد در بیش از 40 کشور.
          </p>
          <div className="flex gap-4">
            {socialIcons.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                className={`w-12 h-12 ${item.bg} rounded-md flex items-center justify-center text-white shadow-lg`}
                whileHover={{
                  scale: 1.2,
                  rotate: 1,
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
        <div>
          <h4 className="text-gray-200 font-semibold mb-4">اطلاعات تماس</h4>
          <div className="space-y-2 text-sm">
            <p>📧 sales@ferrocorp.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>🏢 Industrial District, Steel City</p>
            <p>🌐 www.ferrocorp.com</p>
          </div>
        </div>

        {/* نقشه */}
        <div>
          <h4 className="text-gray-200 font-semibold mb-4">مکان ما</h4>
          <div className="w-full h-40 rounded overflow-hidden border border-gray-700">
            <iframe
              title="FerroCorp Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.123456!2d-122.419415!3d37.774929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064c0f12345%3A0xabcdef1234567890!2sIndustrial+District%2C+Steel+City!5e0!3m2!1sen!2s!4v1696482345678!5m2!1sen!2s"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-500 text-sm">
        © 2025 Ferrochrome Industries. تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { sidebarItems } from "@/lib/constants";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  const handleLogout = async () => {
    await signOut({ redirect: false }); // اول logout بدون redirect
    toast.success("با موفقیت خارج شدید!"); // نمایش Toast
    window.location.href = "/login"; // سپس ریدایرکت
  };

  return (
    <aside className="fixed right-4 top-9 bg-[#0d2d55] text-white shadow-xl rounded-md w-64 p-4 z-50 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-bold tracking-wide">پنل مدیریت</span>
        <button
          onClick={onClose}
          className="md:hidden p-1 hover:bg-gray-700 rounded cursor-pointer"
          aria-label="بستن منو"
        >
          <AiOutlineClose size={20} />
        </button>
      </div>

      {/* Menu Items */}
      <ul className="space-y-3">
        {sidebarItems.map((item) => {
          const active = pathname === item.href;
          return (
            <motion.li
              key={item.href}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="list-none"
            >
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-sm transition-colors ${
                  active
                    ? "bg-yellow-800 font-semibold shadow-md"
                    : "hover:bg-gray-500"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </motion.li>
          );
        })}

        {/* دکمه لاگ‌اوت */}
        <motion.li
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="list-none"
        >
          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-3 px-4 py-2 rounded-sm hover:bg-red-700 w-full text-left"
          >
            <AiOutlineLogout size={20} />
            <span>خروج</span>
          </button>
        </motion.li>
      </ul>

      <div className="mt-6 text-gray-400 text-sm text-center">نسخه 1.0.0</div>
    </aside>
  );
};

export default Sidebar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  AiOutlineHome,
  AiOutlineFileText,
  AiOutlineMessage,
  AiOutlineAlert,
  AiOutlineClose,
} from "react-icons/ai";

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const items = [
    { href: "/panel", label: "خانه", icon: <AiOutlineHome size={20} /> },
    {
      href: "/panel/blogs",
      label: "بلاگ‌ها",
      icon: <AiOutlineFileText size={20} />,
    },
    {
      href: "/panel/comments",
      label: "نظرات",
      icon: <AiOutlineMessage size={20} />,
    },
    {
      href: "/panel/reports",
      label: "گزارش‌ها",
      icon: <AiOutlineAlert size={20} />,
    },
  ];

  return (
    <aside className="fixed right-4 top-9 bg-gray-800 text-white shadow-xl rounded-md w-64 p-4 z-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-bold tracking-wide">پنل مدیریت</span>

        {/* دکمه بستن فقط در موبایل */}
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
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <motion.li
              key={item.href}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-sm transition-colors ${
                  active
                    ? "bg-yellow-800 font-semibold shadow-md"
                    : "hover:bg-gray-700"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </motion.li>
          );
        })}
      </ul>

      {/* Footer / Version */}
      <div className="mt-6 text-gray-400 text-sm text-center">نسخه 1.0.0</div>
    </aside>
  );
};

export default Sidebar;

"use client";

import Sidebar from "@/components/ui/Sidebar";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { HiOutlineViewBoards } from "react-icons/hi";

export default function DashboardUI({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex flex-row-reverse min-h-screen bg-gray-900 text-white font-sans">
      {/* دسکتاپ: سایدبار ثابت */}
      <div className="hidden md:flex w-72 flex-shrink-0">
        <Sidebar isOpen={true} activePath={pathname} />
      </div>

      {/* موبایل: سایدبار انیمیشنی */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="fixed top-0 right-0 z-50 w-72 h-full"
            >
              <Sidebar
                isOpen={true}
                activePath={pathname}
                onClose={() => setSidebarOpen(false)}
              />
            </motion.div>

            {/* بک‌دراپ نیمه شفاف */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setSidebarOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* محتوای اصلی */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-6 md:mr-72"
      >
        {/* دکمه موبایل برای باز کردن سایدبار */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 mt-1 cursor-pointer rounded-md hover:bg-gray-700 transition-colors"
            aria-label="باز کردن منو"
          >
            <HiOutlineViewBoards size={24} />
          </button>
        </div>

        {children}

        <Toaster position="top-right" reverseOrder={false} />
      </motion.div>
    </div>
  );
}

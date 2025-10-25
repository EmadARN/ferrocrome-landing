"use client";

import Sidebar from "@/components/ui/Sidebar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { HiOutlineViewBoards } from "react-icons/hi";

export default function DashboardUI({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-12 min-h-screen bg-gradient-to-br from-[#0A0A1A] via-[#16213E] to-[#0F3460] text-white font-sans">
      {/* دسکتاپ: سایدبار ثابت از lg به بعد */}
      <div className="hidden lg:block lg:col-span-2 w-64 flex-shrink-0">
        <Sidebar isOpen={true} activePath={pathname} />
      </div>

      {/* موبایل و تبلت: سایدبار انیمیشنی */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="fixed top-0 right-0 z-50 w-64 h-full"
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
        className="col-span-12 lg:col-span-10 xl:col-span-9 lg:mr-24 xl:mr-0 p-4 sm:p-6  overflow-x-hidden"
      >
        {/* دکمه موبایل برای باز کردن سایدبار */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 mt-1 cursor-pointer rounded-md hover:bg-gray-700 transition-colors"
            aria-label="باز کردن منو"
          >
            <HiOutlineViewBoards size={24} />
          </button>
        </div>

        {children}
      </motion.div>
    </div>
  );
}

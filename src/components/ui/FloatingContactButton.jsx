"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingContactButton({
  telegramUrl = "https://t.me/example",
  whatsappUrl = "https://wa.me/989000000000",
  items = null,
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const defaultItems = [
    {
      id: "telegram",
      label: "تلگرام",
      href: telegramUrl,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M22 2L2 11.5l4.5 1.6L8 21l3.5-2.1L20 22 22 2z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: "whatsapp",
      label: "واتس‌اپ",
      href: whatsappUrl,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M20.5 3.5A11 11 0 1 0 23 12.5L22 17l-4.5-1.2A11 11 0 0 0 20.5 3.5z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  const menuItems = items && items.length ? items : defaultItems;

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  function openLink(href) {
    window.open(href, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="fixed bottom-5 right-5 z-50">
      {/* پاپ‌آپ */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.16 }}
            className="mb-2 flex flex-col items-end"
            style={{ pointerEvents: open ? "auto" : "none" }}
          >
            <div className="relative">
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg px-2 py-1 w-44">
                {menuItems.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => openLink(it.href)}
                    className="w-full flex items-center gap-3 py-2 px-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer"
                    aria-label={it.label}
                  >
                    <span className="flex-none text-blue-600 dark:text-blue-400">
                      {it.icon}
                    </span>
                    <span className="text-sm text-slate-900 dark:text-slate-100">
                      {it.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* مثلث کوچک */}
              <div className="absolute right-5 -bottom-2 w-3 h-3 rotate-45 bg-white dark:bg-slate-800 border-t border-r border-slate-200 dark:border-slate-700" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* دکمه اصلی */}
      <motion.button
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`
          bg-blue-600 text-white rounded-md px-5 py-3 text-lg shadow-lg
          flex items-center justify-center font-medium cursor-pointer
        `}
        animate={{
          scale: [1, 1.05, 1, 1.05, 1], // موج کوتاه
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        پشتیبانی
      </motion.button>
    </div>
  );
}

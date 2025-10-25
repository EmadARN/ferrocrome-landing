"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  MdLocationOn,
  MdPhone,
  MdSmartphone,
  MdAccessTime,
  MdFactory,
  MdAlternateEmail,
} from "react-icons/md";
import { IoLogoWechat } from "react-icons/io5";

import { SiWhatsapp } from "react-icons/si";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = async () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";

    // ثبت کلیک در سرور (track contact click)
    try {
      const res = await fetch("/api/track-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: window.location.pathname,
          modalName: "contactModal",
          meta: {
            userLanguage: navigator.language,
            platform: navigator.platform,
            isMobile: /Mobi|Android/i.test(navigator.userAgent),
          },
        }),
      });

      // بررسی ریسپانس
      const data = await res.json();

      if (!res.ok) {
        console.error("❌ API error:", data);
      } else {
        console.log("✅ Click tracked successfully!");
      }
    } catch (err) {
      console.error("🚫 Tracking failed:", err);
    }
  };
  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const officeItems = [
    {
      icon: <MdLocationOn className="text-orange-500 w-4 h-4 md:w-5 md:h-5" />,
      text: "آدرس دفتر مرکزی:     تهران-نیاوران-خیابان باهنر-نرسیده به میدان باهنر ساختمان فارومید پلاک 54 ",
    },
    {
      icon: <MdPhone className="text-orange-500 w-4 h-4 md:w-5 md:h-5" />,
      text: "تلفن دفتر:02126113043",
    },
    {
      icon: <MdSmartphone className="text-orange-500 w-4 h-4 md:w-5 md:h-5" />,
      text: "شماره همراه: 09351946619",
    },
    {
      icon: <MdAccessTime className="text-orange-500 w-4 h-4 md:w-5 md:h-5" />,
      text: "ساعت کاری: ۹:۰۰ صبح - ۵:۰۰ عصر",
    },
  ];

  const factoryItems = [
    {
      icon: <MdLocationOn className="text-orange-500 w-4 h-4 md:w-5 md:h-5" />,
      text: "آدرس کارخانه: اصفهان، شهرک صنعتی، خیابان صنایع فلزی",
    },
    {
      icon: (
        <MdAlternateEmail className="text-orange-500 w-4 h-4 md:w-5 md:h-5" />
      ),
      text: (
        <>
          <span>ایمیل: </span>
          <a
            href=" sales@yinghaico.com"
            className="text-[var(--color-modal-link)] hover:text-amber-700 transition"
          >
            sales@yinghaico.com
          </a>
        </>
      ),
    },
    {
      icon: <IoLogoWechat className="text-orange-500 w-4 h-4 md:w-5 md:h-5" />,
      text: (
        <>
          <span>وی‌چت: </span>
          <span className="text-[var(--color-modal-link)] hover:text-amber-700 transition cursor-pointer ">
            8618157688749+
          </span>
        </>
      ),
    },

    {
      icon: <SiWhatsapp className="text-orange-500 w-4 h-4 md:w-5 md:h-5" />,
      text: (
        <>
          <span>واتس‌اپ: </span>
          <a
            href="https://wa.me/989351946619"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-modal-link)] hover:text-amber-700 transition"
          >
            09351946619
          </a>
        </>
      ),
    },
  ];

  return (
    <>
      {/* دکمه باز کردن مودال */}
      <div className="flex justify-center ">
        <button
          onClick={openModal}
          className="contact-btn flex items-center gap-2 text-white bg-gradient-to-r from-amber-700 to-amber-500 px-5 py-2 rounded-md hover:from-amber-600 hover:to-amber-400 transition"
        >
          تماس با ما
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[2000] flex justify-center items-center bg-black/80 backdrop-blur-sm overflow-y-auto transition-opacity duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="relative bg-[var(--color-modal-bg)] text-[var(--color-modal-text)] w-[95%] max-w-[1000px] max-h-[90vh] overflow-y-auto rounded-xl shadow-[0_25px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(199,103,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] transform scale-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
            {/* هدر مودال */}
            <div className="relative bg-gradient-to-r  from-amber-700 to-amber-500 p-6 rounded-t-xl overflow-hidden">
              <button
                className="cursor-pointer   absolute top-4 left-5 bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg w-9 h-9 text-lg z-50"
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold text-white drop-shadow-md relative z-10">
                اطلاعات تماس
              </h2>

              {/* لایه‌ی انیمیشنی در زیر بقیه عناصر
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite] z-0" /> */}
            </div>

            {/* محتوای مودال */}
            <div className="p-6 flex flex-col md:flex-row gap-6">
              {/* دفتر مرکزی */}
              <div className="flex-1 bg-[var(--color-about-bg)] border border-[var(--color-card-border)] shadow-[var(--color-card-shadow)] rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-700 to-amber-400" />
                <h3 className="text-lg font-bold text-amber-700 mb-4 flex items-center gap-2">
                  <MdFactory className="w-5 h-5" />
                  دفتر مرکزی
                </h3>
                {officeItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 mb-3 text-[var(--color-text)] text-base"
                  >
                    {item.icon}
                    <span className="text-[0.6rem] tracking-wider py-1.5 md:text-sm leading-snug  drop-shadow-md">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* کارخانه و ارتباط آنلاین */}
              <div className="flex-1 bg-[var(--color-about-bg)] border border-[var(--color-card-border)] shadow-[var(--color-card-shadow)] rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-700 to-amber-400" />
                <h3 className="text-lg font-bold text-amber-700 mb-4 flex items-center gap-2">
                  <MdFactory className="w-5 h-5" />
                  کارخانه و ارتباط آنلاین
                </h3>
                <div className="flex flex-col gap-3 text-[var(--color-text)] text-base">
                  {factoryItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-[0.7rem] py-1.5 md:text-sm text-nowrap drop-shadow-md">
                        {item.text}
                      </span>
                    </div>
                  ))}
                  {/* <p className="text-xs text-gray-500">
                    با کلیک روی تماس با ما، موقعیت جغرافیایی شما برای تحلیل ثبت
                    می‌شود.{" "}
                    <Link href="/privacy" className="underline text-blue-600">
                      سیاست حفظ حریم خصوصی
                    </Link>
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

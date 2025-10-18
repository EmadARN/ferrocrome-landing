"use client";
import useMoveBack from "@/hooks/useMoveBack";
import { HiArrowRight } from "react-icons/hi";

export default function NotFound() {
  const moveBack = useMoveBack();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-hero)] dark:bg-[var(--color-bg-hero)] transition-colors duration-500">
      <div className="text-center px-6 lg:px-0">
        {/* 404 Text */}
        <h1
          className="text-[12rem] lg:text-[16rem] font-extrabold text-transparent bg-clip-text drop-shadow-lg mb-6"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #c76700, #ce7f2b, #d19e68)",
          }}
        >
          404
        </h1>

        <h2 className="text-3xl lg:text-5xl font-bold text-[var(--color-text-muted)] dark:text-[var(--color-about-text-secondary)] mb-4 drop-shadow-sm">
          صفحه پیدا نشد
        </h2>

        <p className="text-lg lg:text-xl mb-10 max-w-xl mx-auto text-[var(--color-text-muted)] dark:text-[var(--color-text)]">
          متاسفانه صفحه مورد نظر شما در دسترس نیست. لطفاً به صفحه قبل برگردید یا
          از منوی اصلی استفاده کنید.
        </p>

        {/* Back Button */}
        <button
          onClick={moveBack}
          className="inline-flex items-center px-10 py-4 text-lg font-semibold text-[var(--color-btn-text)] rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-300 gap-x-3"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #c76700, #ce7f2b, #d19e68)",
          }}
        >
          <HiArrowRight className="w-6 h-6" />
          برگشت
        </button>
      </div>
    </div>
  );
}

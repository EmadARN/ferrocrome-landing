"use client";
import React from "react";

export default function Hero() {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.textContent = "در حال ارسال...";
    button.disabled = true;
    button.style.opacity = "0.8";

    setTimeout(() => {
      button.textContent = "درخواست ارسال شد! ✓";
      button.style.background =
        "linear-gradient(135deg, #10B981 0%, #059669 100%)";
      button.style.opacity = "1";

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.background =
          "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #F4D03F 100%)";
        event.currentTarget.reset();
      }, 3000);
    }, 1500);
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#16213e] to-[#0f3460]">
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-[#C0C0C0]/20 to-transparent rounded-full blur-2xl animate-[float-gentle_4s_ease-in-out_infinite]"></div>
      <div className="absolute top-40 left-32 w-12 h-12 bg-gradient-to-br from-[#4682B4]/20 to-transparent rounded-full blur-xl animate-[float-gentle_4s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-32 right-40 w-20 h-20 bg-gradient-to-br from-[#C0C0C0]/20 to-transparent rounded-full blur-2xl animate-[float-gentle_4s_ease-in-out_infinite]"></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="space-y-8 lg:pr-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C0C0C0] via-white to-[#C0C0C0] block mb-4 text-glow">
                تولید و فروش
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#F4D03F] block mb-4">
                فرورکروم
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C0C0C0] via-white to-[#C0C0C0] block">
                با کیفیت بالا
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl font-medium">
              شریک مطمئن شما در صنعت جهانی فروآلیاژ
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-3 h-3 bg-[#D4AF37] rounded-full shadow-lg"></div>
                <span className="text-gray-300 font-medium">
                  گواهینامه ISO 9001
                </span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-3 h-3 bg-[#4682B4] rounded-full shadow-lg"></div>
                <span className="text-gray-300 font-medium">
                  صادرات به ۴۰+ کشور
                </span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-3 h-3 bg-[#C0C0C0] rounded-full shadow-lg"></div>
                <span className="text-gray-300 font-medium">
                  ۹۹.۸٪ تحویل به موقع
                </span>
              </div>
            </div>

            <div className="pt-8">
              <div className="grid grid-cols-2 gap-8 max-w-md">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#F4D03F] mb-2">
                    ۵۰۰K+
                  </div>
                  <div className="text-sm text-gray-400">تن ظرفیت سالانه</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4682B4] mb-2">
                    ۳۰+
                  </div>
                  <div className="text-sm text-gray-400">سال تجربه</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:mr-8 relative">
            <div className="bg-white/15 backdrop-blur-xl border-2 border-[#D4AF37]/40 shadow-xl inset-shadow p-6 lg:p-8 rounded-2xl relative z-20 animate-[pulse-glow_3s_ease-in-out_infinite] max-w-md mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#F4D03F] mb-2">
                  دریافت قیمت ویژه
                </h3>
                <p className="text-gray-300 font-medium text-sm">
                  با متخصصان فرورکروم ما در ارتباط باشید
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleFormSubmit}>
                {[
                  {
                    label: "نام و نام خانوادگی *",
                    type: "text",
                    placeholder: "نام کامل خود را وارد کنید",
                    required: true,
                  },
                  {
                    label: "آدرس ایمیل *",
                    type: "email",
                    placeholder: "your.email@company.com",
                    required: true,
                  },
                  {
                    label: "شماره تماس",
                    type: "tel",
                    placeholder: "۰۹۱۲۳۴۵۶۷۸۹",
                  },
                  {
                    label: "نام شرکت *",
                    type: "text",
                    placeholder: "نام شرکت خود را وارد کنید",
                    required: true,
                  },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="block text-[#C0C0C0] font-semibold mb-2 text-right text-sm">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none bg-white/12 border border-white/30 backdrop-blur-sm transition-all duration-300 text-right text-sm"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[#C0C0C0] font-semibold mb-2 text-right text-sm">
                    پیام شما *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="نیازمندی‌های فرورکروم خود را شرح دهید..."
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none bg-white/12 border border-white/30 backdrop-blur-sm transition-all duration-300 resize-none text-right text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl text-black font-bold text-base bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#F4D03F] shadow-xl transition-all duration-300 relative overflow-hidden hover:translate-y-[-2px]"
                >
                  ارسال درخواست
                </button>
              </form>

              {/* Trust Indicators */}
              <div className="mt-6 pt-4 border-t border-gray-600/30">
                <div className="flex justify-center items-center space-x-4 space-x-reverse text-xs text-gray-400">
                  {[
                    { text: "پاسخ سریع", color: "bg-green-500" },
                    { text: "مشاوره رایگان", color: "bg-blue-500" },
                    { text: "قیمت ویژه", color: "bg-yellow-500" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 space-x-reverse"
                    >
                      <div
                        className={`w-2 h-2 ${item.color} rounded-full`}
                      ></div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Form Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-[#4682B4]/20 to-transparent rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
    </section>
  );
}

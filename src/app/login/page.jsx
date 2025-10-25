"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

// اسکیما و اعتبارسنجی فرم
const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
  remember: z.boolean().optional(),
});

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        rememberMe: data.remember,
        callbackUrl: "/panel",
      });

      if (result.error) {
        let msg = "خطا در ورود. دوباره تلاش کنید.";
        switch (result.error) {
          case "CredentialsSignin":
            msg = "ایمیل یا رمز عبور اشتباه است.";
            break;
          case "OAuthSignin":
            msg = "مشکل در ورود با OAuth.";
            break;
          case "OAuthCallback":
            msg = "خطای callback رخ داد.";
            break;
          case "OAuthCreateAccount":
            msg = "امکان ساخت حساب وجود ندارد.";
            break;
          default:
            msg = "خطای سرور. دوباره تلاش کنید.";
        }
        setMessage({ type: "error", text: msg });
      } else {
        setMessage({
          type: "success",
          text: "ورود موفقیت‌آمیز بود! در حال هدایت...",
        });
        setTimeout(() => {
          window.location.href = result.url || "/panel";
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "خطای سرور. دوباره تلاش کنید.",
      });
    } finally {
      setLoading(false);
    }
  };

  // اشکال شناور پس‌زمینه
  const shapes = [
    {
      size: 52,
      top: "10%",
      left: "5%",
      gradient: "bg-gradient-to-br from-[#a15300] to-[#521f01]",
      delay: 0,
    },
    {
      size: 36,
      top: "70%",
      right: "10%",
      gradient: "bg-gradient-to-br from-[#16213E] to-[#0F3460]",
      delay: 3,
    },
    {
      size: 30,
      top: "40%",
      left: "80%",
      gradient: "bg-gradient-to-br from-[#a15300] to-[#16213E]",
      delay: 6,
    },
    {
      size: 20,
      top: "20%",
      right: "30%",
      gradient: "bg-gradient-to-br from-[#521f01] to-[#0F3460]",
      delay: 2,
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#16213E] bg-gradient-to-br from-[#0A0A1A] via-[#16213E] to-[#0F3460] flex items-center justify-center overflow-hidden px-4">
      {shapes.map((s, idx) => (
        <motion.div
          key={idx}
          className={`absolute bg-[#16213E] ${s.gradient} rounded-md `}
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            top: s.top,
            left: s.left,
            right: s.right,
            opacity: 0.4,
          }}
          animate={{ y: [-10, 10, -10], rotate: [0, 35, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: s.delay }}
        />
      ))}

      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-2xl p-10 shadow-2xl border border-white/10 text-right">
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl font-extrabold mb-2 drop-shadow-lg">
            خوش آمدید
          </h1>
          <p className="text-white/70 text-sm">وارد حساب کاربری خود شوید</p>
        </div>

        {/* پیام‌ها */}
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-md text-center font-medium ${
              message.type === "success"
                ? "bg-green-900/20 border border-green-500 text-green-400"
                : "bg-red-900/20 border border-red-500 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-white/90 font-semibold text-sm mb-1 uppercase tracking-wide">
              ایمیل
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-4 rounded-md bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#a15300] backdrop-blur-sm transition-all"
              placeholder="ایمیل خود را وارد کنید"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-white/90 font-semibold text-sm mb-1 uppercase tracking-wide">
              رمز عبور
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-4 rounded-md bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#a15300] backdrop-blur-sm transition-all"
              placeholder="رمز عبور خود را وارد کنید"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("remember")}
              className="w-5 h-5 rounded-lg accent-[#a15300] cursor-pointer"
            />
            <label className="text-white/80 font-medium text-sm ">
              مرا به خاطر بسپار
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-md bg-[#a15300] bg-gradient-to-br from-[#a15300] to-[#521f01] font-bold text-white text-lg uppercase tracking-wider shadow-lg hover:shadow-2xl transition-all relative overflow-hidden disabled:opacity-70 cursor-pointer"
          >
            {loading && (
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            <span className={`${loading ? "opacity-0" : "relative"}`}>
              ورود
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
